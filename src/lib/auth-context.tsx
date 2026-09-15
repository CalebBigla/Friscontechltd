import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('[Auth] AuthProvider mounted, initializing...');
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('[Auth] Initial session loaded:', { 
        hasSession: !!session, 
        hasUser: !!session?.user,
        userId: session?.user?.id?.substring(0, 8) 
      });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('[Auth] State change:', { 
        event, 
        hasSession: !!session, 
        hasUser: !!session?.user,
        userId: session?.user?.id?.substring(0, 8)
      });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log('[Auth] AuthProvider unmounting, cleaning up subscription');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('[Auth] Attempting sign in');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('[Auth] Sign in result:', { hasError: !!error, errorMessage: error?.message });
    return { error };
  };

  const signOut = async () => {
    console.log('[Auth] Sign out requested');
    await supabase.auth.signOut();
    console.log('[Auth] Sign out complete');
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
