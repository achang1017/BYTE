// frontend/app/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { auth } from '../firebase'; // Corrected import path
import { AuthProvider } from '../authContext'; // Corrected import path
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { UserPreferencesProvider } from '../context/userPreferencesContext'; // Import UserPreferencesProvider

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Firebase and Firestore Initialization Test
  useEffect(() => {
    console.log('Firebase Auth Initialized:', auth); // Log Firebase Auth instance
    const db = getFirestore(); // Initialize Firestore
    console.log('Firestore Initialized:', db); // Log Firestore instance
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (initializing) return;

    if (user) {
      router.replace('/(tabs)/home');
    } else {
      router.replace('/');
    }
  }, [user, initializing]);

  return (
    <AuthProvider>
      <UserPreferencesProvider> {/* Wrap the Stack with UserPreferencesProvider */}
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
           {/* Add other screens here if they are part of this stack */}
           <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
           <Stack.Screen name="(pages)/alternativeFlights" options={{ headerShown: false }}/>
           <Stack.Screen name="(pages)/booking" options={{ headerShown: false }}/>
           <Stack.Screen name="(pages)/flightDetails" options={{ headerShown: false }}/>
           <Stack.Screen name="+not-found" />
        </Stack>
      </UserPreferencesProvider> {/* Close UserPreferencesProvider */}
    </AuthProvider>
  );
}
