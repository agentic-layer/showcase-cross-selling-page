
import React, { createContext, useContext } from 'react';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

interface GoogleUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: GoogleUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // You need to replace this with your actual Google OAuth Client ID from Google Cloud Console
  const GOOGLE_CLIENT_ID = "YOUR_ACTUAL_GOOGLE_CLIENT_ID_HERE";
  const { user, isLoading, signOut } = useGoogleAuth({
    clientId: GOOGLE_CLIENT_ID
  });

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading: isLoading, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
