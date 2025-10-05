
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase URL or anonymous key is missing. Supabase client not initialized.');
  // Provide a mock client to prevent crashes during build when env vars are not set
  supabase = {
    from: () => ({
      select: async () => ({ data: [], error: { message: 'Supabase not initialized', details: '', hint: '', code: '' } }),
      insert: async () => ({ data: [], error: { message: 'Supabase not initialized', details: '', hint: '', code: '' } }),
      update: async () => ({ data: [], error: { message: 'Supabase not initialized', details: '', hint: '', code: '' } }),
      delete: async () => ({ data: [], error: { message: 'Supabase not initialized', details: '', hint: '', code: '' } }),
    }),
    auth: {
      // Add mock auth methods that your app uses
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ data: { user: null, session: null }, error: { message: 'Supabase not initialized', name: 'AuthApiError', status: 500 } }),
      signUp: async () => ({ data: { user: null, session: null }, error: { message: 'Supabase not initialized', name: 'AuthApiError', status: 500 } }),
      signOut: async () => ({ error: null }),
      updateUser: async () => ({ data: { user: null }, error: { message: 'Supabase not initialized', name: 'AuthApiError', status: 500 } }),
    },
    // Add other Supabase methods if needed
  } as unknown as SupabaseClient;
}

export { supabase };
