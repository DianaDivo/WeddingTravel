import { supabase } from './client';

export const checkExistingSession = async () => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Session check timeout')), 5000);
    });
    
    const sessionPromise = supabase.auth.getSession();
    const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]) as any;
    return session;
  } catch (error) {
    console.error('Session check error:', error);
    return null;
  }
};

export const signInWithPassword = async (email: string, password: string) => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Sign in timeout')), 10000);
    });
    
    const signInPromise = supabase.auth.signInWithPassword({ email, password });
    return await Promise.race([signInPromise, timeoutPromise]) as any;
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Sign out timeout')), 5000);
    });
    
    const signOutPromise = supabase.auth.signOut();
    return await Promise.race([signOutPromise, timeoutPromise]) as any;
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const onAuthStateChange = (callback: (event: string, session: any) => void) => {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
};

// Function to get current user
export const getCurrentUser = async () => {
  try {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Get user timeout')), 5000);
    });
    
    const userPromise = supabase.auth.getUser();
    const { data: { user } } = await Promise.race([userPromise, timeoutPromise]) as any;
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};