import React, { createContext, useState, useContext, ReactNode } from 'react';

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

  return (
    <UserPreferencesContext.Provider value={{ preferences, setPreferences }}>
      {children}
    </UserPreferencesContext.Provider>
  );
};

// Custom hook to consume the context
export const useUserPreferences = () => {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error('useUserPreferences must be used within a UserPreferencesProvider');
  }
  return context;
};
