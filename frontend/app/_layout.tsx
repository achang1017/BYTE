// app/_layout.tsx
import { Stack, useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import { auth } from '../firebase'; // import your shared auth instance
import { AuthProvider } from '../authContext';
import { getFirestore } from 'firebase/firestore'; // Import Firestore
import { setupNotificationHandler, registerBackgroundTask } from '../components/pushNotification';


export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    setupNotificationHandler();
    registerBackgroundTask();
  }, []);

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
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}