
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { LogIn, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  
  // You need to replace this with your actual Google OAuth Client ID from Google Cloud Console
  const GOOGLE_CLIENT_ID = "YOUR_ACTUAL_GOOGLE_CLIENT_ID_HERE";
  const { isAuthenticated, user, isLoading, signIn } = useGoogleAuth({
    clientId: GOOGLE_CLIENT_ID
  });

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated && user) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, user, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Lade Google Authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Anmeldung
          </h2>
          <p className="mt-2 text-muted-foreground">
            Melden Sie sich mit Ihrem Google-Konto an
          </p>
        </div>

        <div className="space-y-6">
          <Button
            onClick={signIn}
            className="w-full flex items-center justify-center gap-3"
            size="lg"
          >
            <LogIn className="w-5 h-5" />
            Mit Google anmelden
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
