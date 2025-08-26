
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/AuthProvider';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Redirect authenticated users to dashboard
        navigate('/dashboard');
      } else {
        // Redirect unauthenticated users to login
        navigate('/login');
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Laden...</p>
        </div>
      </div>
    );
  }

  // This component will redirect, so we don't need to render anything else
  return null;
};

export default Index;
