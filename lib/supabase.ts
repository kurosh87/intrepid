import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const getItineraries = async (userId: string) => {
  const { data, error } = await supabase
    .from('itineraries')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const createItinerary = async (userId: string, itinerary: Omit<Itinerary, 'id'>) => {
  const { data, error } = await supabase
    .from('itineraries')
    .insert({ ...itinerary, user_id: userId })
    .single()

  if (error) throw error
  return data
}