/**
 * Supabase client configuration for real-time alerts
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseKey)
}

// Only create client if credentials are provided
let supabaseInstance: SupabaseClient | null = null

if (isSupabaseConfigured()) {
  supabaseInstance = createClient(supabaseUrl, supabaseKey, {
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  })
} else {
  if (typeof window !== 'undefined') {
    console.warn('Supabase credentials not found. Real-time alerts will be disabled.')
    console.warn('Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
  }
}

// Export a safe supabase client (will be null if not configured)
export const supabase = supabaseInstance as SupabaseClient
