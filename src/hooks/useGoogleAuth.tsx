import { useState, useEffect } from 'react';

declare global {
  interface Window {
    google: any;
    gapi: any;
  }
}

interface GoogleAuthConfig {
  clientId: string;
}

export const useGoogleAuth = ({ clientId }: GoogleAuthConfig) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initGoogleAuth = async () => {
      try {
        // Load Google Identity Services
        if (!window.google) {
          const script = document.createElement('script');
          script.src = 'https://accounts.google.com/gsi/client';
          script.async = true;
          script.defer = true;
          document.head.appendChild(script);
          
          await new Promise((resolve) => {
            script.onload = resolve;
          });
        }

        // Initialize Google Sign-In
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
          auto_select: false,
        });

        // Check if user is already signed in
        const savedToken = localStorage.getItem('google_id_token');
        if (savedToken) {
          setIdToken(savedToken);
          setIsAuthenticated(true);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing Google Auth:', error);
        setIsLoading(false);
      }
    };

    initGoogleAuth();
  }, [clientId]);

  const handleCredentialResponse = (response: any) => {
    const credential = response.credential;
    
    // Decode the JWT token to get user info
    const payload = JSON.parse(atob(credential.split('.')[1]));
    
    setUser(payload);
    setIdToken(credential);
    setIsAuthenticated(true);
    
    // Store the token for future use
    localStorage.setItem('google_id_token', credential);
  };

  const signIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  const signOut = () => {
    setUser(null);
    setIdToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('google_id_token');
    
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  return {
    isAuthenticated,
    user,
    idToken,
    isLoading,
    signIn,
    signOut,
  };
};