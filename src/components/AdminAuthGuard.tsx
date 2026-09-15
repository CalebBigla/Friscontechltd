import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/lib/auth-context';

interface AdminAuthGuardProps {
  children: React.ReactNode;
}

export function AdminAuthGuard({ children }: AdminAuthGuardProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[AuthGuard] State:', { 
      loading, 
      hasUser: !!user, 
      pathname: window.location.pathname 
    });
    
    if (!loading && !user) {
      console.log('[AuthGuard] No user detected, redirecting to login');
      navigate({ to: '/admin/login' });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-charcoal">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
