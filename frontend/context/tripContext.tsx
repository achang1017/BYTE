import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

interface TripData {
  [key: string]: any;
}

interface TripContextType {
  trip: TripData | null;
  setTrip: (data: TripData | null) => void;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

interface TripProviderProps {
  children: ReactNode;
}

export const TripProvider: React.FC<TripProviderProps> = ({ children }) => {
  const [trip, setTrip] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const fetchTrip = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const user = auth.currentUser;
      if (!user || !user.email) {
        setTrip(null);
        setLoading(false);
        return;
      }
      // Use user.email as the document ID, and ensure it's a string
      const tripRef = doc(db, 'users', String(user.email), 'trips', 'trip123');
      const tripSnap = await getDoc(tripRef);
      if (tripSnap.exists()) {
        setTrip(tripSnap.data());
        console.log('[TripContext] trip123 data fetched:', tripSnap.data());
      } else {
        setTrip(null);
        console.log('[TripContext] No trip123 found for user:', user.email);
      }
    } catch (err: any) {
      setError(err.message);
      console.error('[TripContext] Error fetching trip123:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrip();
    const unsubscribe = navigation.addListener('focus', fetchTrip);
    return unsubscribe;
  }, [fetchTrip, navigation]);

  return (
    <TripContext.Provider value={{ trip, setTrip, loading, error, refetch: fetchTrip }}>
      {children}
    </TripContext.Provider>
  );
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};
