import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthProvider } from '../authContext';
import { UserPreferencesProvider } from '@/context/userPreferencesContext';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe();
  }, []);


  return (
    <AuthProvider>
      <UserPreferencesProvider> 
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(pages)/alternativeFlights" options={{ headerShown: false }} />
          <Stack.Screen name="(pages)/booking" options={{ headerShown: false }} />
          <Stack.Screen name="(pages)/flightDetails" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </UserPreferencesProvider>
    </AuthProvider>
  );
}
