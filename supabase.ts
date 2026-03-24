/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to safely write to Supabase (won't crash if not configured)
export const logToSupabase = async (table: string, data: any) => {
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.log(`[Mock Supabase] Insert into ${table}:`, data);
    return { data, error: null };
  }
  
  try {
    const result = await supabase.from(table).insert([data]);
    return result;
  } catch (error) {
    console.error(`Supabase error writing to ${table}:`, error);
    return { data: null, error };
  }
};

export const updateSupabase = async (table: string, id: string, data: any) => {
  if (supabaseUrl === 'https://placeholder.supabase.co') {
    console.log(`[Mock Supabase] Update ${table} (${id}):`, data);
    return { data, error: null };
  }
  
  try {
    const result = await supabase.from(table).update(data).eq('session_id', id);
    return result;
  } catch (error) {
    console.error(`Supabase error updating ${table}:`, error);
    return { data: null, error };
  }
};
