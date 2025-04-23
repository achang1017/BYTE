import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  gmailAccessToken: string | null;
  setGmailAccessToken: (token: string | null) => void;
  firebaseReady: boolean;
  setFirebaseReady: (ready: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  setAccessToken: () => {},
  gmailAccessToken: null,
  setGmailAccessToken: () => {},
  firebaseReady: false,
  setFirebaseReady: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [gmailAccessToken, setGmailAccessToken] = useState<string | null>(null);
  const [firebaseReady, setFirebaseReady] = useState<boolean>(false);

  useEffect(() => {
    // Restore Gmail token on app load
    AsyncStorage.getItem('gmailAccessToken').then((token) => {
      if (token) setGmailAccessToken(token);
    });
  }, []);

  const saveGmailAccessToken = (token: string | null) => {
    setGmailAccessToken(token);
    if (token) {
      AsyncStorage.setItem('gmailAccessToken', token);
    } else {
      AsyncStorage.removeItem('gmailAccessToken');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        gmailAccessToken,
        setGmailAccessToken: saveGmailAccessToken,
        firebaseReady,
        setFirebaseReady,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
