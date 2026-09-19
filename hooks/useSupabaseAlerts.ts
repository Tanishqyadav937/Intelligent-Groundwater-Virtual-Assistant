/**
 * Custom hook for real-time Supabase alerts
 */
import { useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Alert } from '@/lib/alertTypes'
import { RealtimeChannel } from '@supabase/supabase-js'

interface UseSupabaseAlertsOptions {
  districtId?: string
  severity?: 'CRITICAL' | 'WARNING' | 'INFO'
  limit?: number
  autoSubscribe?: boolean
}

export const useSupabaseAlerts = (options: UseSupabaseAlertsOptions = {}) => {
  const {
    districtId,
    severity,
    limit = 50,
    autoSubscribe = true,
  } = options

  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  // Fetch initial alerts
  const fetchAlerts = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) {
      setError('Supabase not configured')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      let query = supabase
        .from('alerts')
        .select('*')
        .order('triggered_at', { ascending: false })
        .limit(limit)

      if (districtId) {
        query = query.eq('district_id', districtId)
      }

      if (severity) {
        query = query.eq('severity', severity)
      }

      const { data, error: fetchError } = await query

      if (fetchError) {
        throw fetchError
      }

      setAlerts(data || [])
      setError(null)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch alerts'
      setError(errorMessage)
      console.error('Error fetching alerts:', err)
    } finally {
      setLoading(false)
    }
  }, [districtId, severity, limit])

  // Subscribe to real-time updates
  useEffect(() => {
    if (!autoSubscribe || !isSupabaseConfigured() || !supabase) {
      setLoading(false)
      return
    }

    fetchAlerts()

    let channel: RealtimeChannel

    try {
      // Subscribe to real-time changes
      channel = supabase
        .channel('public:alerts')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'alerts',
          },
          (payload) => {
            const newAlert = payload.new as Alert

            // Apply filters
            if (districtId && newAlert.district_id !== districtId) return
            if (severity && newAlert.severity !== severity) return

            setAlerts((prev) => [newAlert, ...prev].slice(0, limit))
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'alerts',
          },
          (payload) => {
            const updatedAlert = payload.new as Alert

            setAlerts((prev) =>
              prev.map((a) => (a.id === updatedAlert.id ? updatedAlert : a))
            )
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'DELETE',
            schema: 'public',
            table: 'alerts',
          },
          (payload) => {
            const deletedAlert = payload.old as Alert

            setAlerts((prev) => prev.filter((a) => a.id !== deletedAlert.id))
          }
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            setIsConnected(true)
            console.log('✓ Subscribed to real-time alerts')
          } else if (status === 'CLOSED') {
            setIsConnected(false)
            console.log('✗ Real-time connection closed')
          } else if (status === 'CHANNEL_ERROR') {
            setIsConnected(false)
            console.error('✗ Real-time channel error')
          }
        })
    } catch (err) {
      console.error('Error subscribing to alerts:', err)
      setError('Failed to connect to real-time updates')
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel)
        setIsConnected(false)
      }
    }
  }, [districtId, severity, limit, autoSubscribe, fetchAlerts])

  // Acknowledge an alert
  const acknowledgeAlert = useCallback(
    async (alertId: number, userId: string) => {
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase not configured')
      }

      try {
        const { error: updateError } = await supabase
          .from('alerts')
          .update({
            acknowledged_by: userId,
            acknowledged_at: new Date().toISOString(),
          })
          .eq('id', alertId)

        if (updateError) {
          throw updateError
        }

        // Optimistically update local state
        setAlerts((prev) =>
          prev.map((a) =>
            a.id === alertId
              ? {
                  ...a,
                  acknowledged_by: userId,
                  acknowledged_at: new Date().toISOString(),
                }
              : a
          )
        )
      } catch (err) {
        console.error('Error acknowledging alert:', err)
        throw err
      }
    },
    []
  )

  // Refresh alerts manually
  const refresh = useCallback(() => {
    fetchAlerts()
  }, [fetchAlerts])

  return {
    alerts,
    loading,
    error,
    isConnected,
    acknowledgeAlert,
    refresh,
  }
}
