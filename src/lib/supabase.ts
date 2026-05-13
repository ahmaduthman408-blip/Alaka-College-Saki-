import { createClient } from '@supabase/supabase-js';

const envUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseUrl = envUrl ? envUrl.replace(/\/rest\/v1\/?$/, '') : undefined;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
