import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pclpidoaifhsmsvkjojh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjbHBpZG9haWZoc21zdmtqb2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MTIxMjIsImV4cCI6MjA5NDE4ODEyMn0.eVz9zHqPMQgw7UBwt1jYHqbHJjHbPJyTHIrg666yQGA';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;
