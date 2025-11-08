import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a singleton Supabase client
let supabaseClient: ReturnType<typeof createClient> | null = null;

// Flag to track if client was already created
let clientCreated = false;

export const getSupabaseClient = () => {
  if (!supabaseClient && !clientCreated) {
    clientCreated = true;
    const supabaseUrl = `https://${projectId}.supabase.co`;
    
    supabaseClient = createClient(supabaseUrl, publicAnonKey, {
      auth: {
        persistSession: true,
        detectSessionInUrl: false,
        autoRefreshToken: true,
        // Use a unique storage key to avoid conflicts
        storageKey: 'wedding-travel-auth-token',
      }
    });
    
    // Log once when client is created
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('Supabase client initialized for WeddingTravel CMS');
    }
  }
  return supabaseClient;
};

// Export the client directly for convenience
export const supabase = getSupabaseClient();