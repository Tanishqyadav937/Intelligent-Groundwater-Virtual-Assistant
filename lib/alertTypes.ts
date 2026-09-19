/**
 * Type definitions for Supabase real-time alerts
 */

export interface Alert {
  id: number
  district_id: string
  severity: 'CRITICAL' | 'WARNING' | 'INFO'
  alert_type: string
  message: string
  metric_type: string | null
  metric_value: number | null
  triggered_at: string
  acknowledged_by: string | null
  acknowledged_at: string | null
  notification_sent: boolean
}

export interface SensorReading {
  id: number
  district_id: string
  groundwater_level: number | null
  rainfall: number | null
  temperature: number | null
  extraction_rate: number | null
  population_affected: number | null
  quality_score: number | null
  created_at: string
}

export interface District {
  id: string
  name: string
  state: string | null
  latitude: number | null
  longitude: number | null
  critical_threshold: number
  warning_threshold: number
  created_at: string
}

export interface AlertStats {
  total_alerts: number
  critical_count: number
  warning_count: number
  info_count: number
  acknowledged_count: number
  by_district: Record<string, number>
  by_type: Record<string, number>
}

export type SeverityType = Alert['severity']

export const SeverityColors: Record<SeverityType, string> = {
  CRITICAL: 'bg-red-50 border-red-300 text-red-900',
  WARNING: 'bg-amber-50 border-amber-300 text-amber-900',
  INFO: 'bg-blue-50 border-blue-300 text-blue-900',
}

export const SeverityBadges: Record<SeverityType, string> = {
  CRITICAL: '🔴',
  WARNING: '🟡',
  INFO: '🔵',
}

export const SeverityLabels: Record<SeverityType, string> = {
  CRITICAL: 'Critical',
  WARNING: 'Warning',
  INFO: 'Info',
}
