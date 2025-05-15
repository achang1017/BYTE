import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
// Define the shape of the context data
// Replace 'any' with a more specific type based on your Firestore data structure
interface UserPreferencesContextType {
  preferences: any | null;
  setPreferences: (data: any | null) => void;
}

// Create the context
const UserPreferencesContext = createContext<UserPreferencesContextType | undefined>(undefined);

// Create a provider component
interface UserPreferencesProviderProps {
  children: ReactNode;
}

export const UserPreferencesProvider: React.FC<UserPreferencesProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // This listens for authentication state changes
  useEffect(() => {
    const auth = getAuth();

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to the change of user preferences in Firestore
  useEffect(() => {
    if (!user?.email) return;

    const db = getFirestore();
    const preferenceRef = doc(db, 'users', user.email);

    const unsubscribePref = onSnapshot(
      preferenceRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setPreferences(docSnapshot.data());
        } else {
          setPreferences(null);
        }
      },
      (error) => {
      }
    );

    return () => unsubscribePref();
  }, [user]);


  return (
    <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
