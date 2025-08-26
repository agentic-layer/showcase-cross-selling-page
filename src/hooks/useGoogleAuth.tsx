import { useState, useEffect } from 'react';

declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      auth2: {
        init: (config: { client_id: string }) => any;
        getAuthInstance: () => {
          isSignedIn: {
            get: () => boolean;
          };
          currentUser: {
            get: () => {
              getAuthResponse: () => { id_token: string };
              getBasicProfile: () => {
                getId: () => string;
                getName: () => string;
                getEmail: () => string;
                getImageUrl: () => string;
              };
            };
          };
          signIn: () => Promise<{
            getAuthResponse: () => { id_token: string };
            getBasicProfile: () => {
              getId: () => string;
              getName: () => string;
              getEmail: () => string;
              getImageUrl: () => string;
            };
          }>;
          signOut: () => Promise<void>;
        };
      };
    };
  }
}

interface GoogleAuthConfig {
  clientId: string;
}

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

export const useGoogleAuth = ({ clientId }: GoogleAuthConfig) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [googleAuth, setGoogleAuth] = useState<any>(null);

  useEffect(() => {
    const initGoogleAuth = async () => {
      try {
        // Load Google API script
        if (!window.gapi) {
          const script = document.createElement('script');
          script.src = 'https://apis.google.com/js/api.js';
          script.async = true;
          document.head.appendChild(script);
          
          await new Promise((resolve) => {
            script.onload = resolve;
          });
        }

        // Initialize gapi
        await new Promise<void>((resolve) => {
          window.gapi.load('auth2', () => resolve());
        });

        const auth = window.gapi.auth2.init({
          client_id: clientId,
        });

        setGoogleAuth(auth);

        // Check if user is already signed in
        const authInstance = window.gapi.auth2.getAuthInstance();
        if (authInstance.isSignedIn.get()) {
          const googleUser = authInstance.currentUser.get();
          const authResponse = googleUser.getAuthResponse();
          const profile = googleUser.getBasicProfile();
          
          setUser({
            id: profile.getId(),
            name: profile.getName(),
            email: profile.getEmail(),
            picture: profile.getImageUrl()
          });
          setIdToken(authResponse.id_token);
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

  const signIn = async () => {
    try {
      if (!googleAuth) return;
      
      const authInstance = window.gapi.auth2.getAuthInstance();
      const googleUser = await authInstance.signIn();
      const authResponse = googleUser.getAuthResponse();
      const profile = googleUser.getBasicProfile();
      
      setUser({
        id: profile.getId(),
        name: profile.getName(),
        email: profile.getEmail(),
        picture: profile.getImageUrl()
      });
      setIdToken(authResponse.id_token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const signOut = async () => {
    try {
      if (!googleAuth) return;
      
      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signOut();
      
      setUser(null);
      setIdToken(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
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