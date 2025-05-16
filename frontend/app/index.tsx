import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import {
  signInWithCredential,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { useAuth } from '../authContext';

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

import { useUserPreferences } from '../context/userPreferencesContext'; // Import the hook
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { set, setDate } from 'date-fns';

WebBrowser.maybeCompleteAuthSession();

const googleClientIds = Constants.expoConfig?.extra?.googleClientIds;

export default function LoginScreen() {
  const router = useRouter();
  const { setAccessToken, setGmailAccessToken, setFirebaseReady } = useAuth();
  const { preferences, setPreferences } = useUserPreferences(); // Use the hook
  const [login, setLogin] = useState(false);


  const config = {
    webClientId: googleClientIds?.web,
    iosClientId: googleClientIds?.ios,
    androidClientId: googleClientIds?.android,
    scopes: [
      'profile',
      'email',
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/gmail.readonly',
    ],
  };

  const [request, response, signInwithGoogle] = Google.useAuthRequest(config);

  useEffect(() => {
    if (response?.type === 'success' && response.authentication) {
      const idToken = response.authentication.idToken;
      const accessToken = response.authentication.accessToken;

      if (idToken && accessToken) {
        const credential = GoogleAuthProvider.credential(idToken, accessToken);

        signInWithCredential(auth, credential)
          .then(() => {
            setAccessToken(accessToken);
            setGmailAccessToken(accessToken);
            setFirebaseReady(true);
            setLogin(true);
          })
          .catch((error) => {
            alert('Firebase sign-in failed: ' + error.message);
            setPreferences(null); // Set to null on sign-in failure
          });
      }
    }
  }, [response]);


  useEffect(() => {
    const checkPreferencesAndNavigate = async () => {

      if (!preferences || preferences === null || Object.keys(preferences).length === 0) {
        const userEmail = auth.currentUser!.email ?? '';
        const userRef = doc(db, 'users', userEmail);

        // set up the user db if it doesn't exist
        try {
          await setDoc(userRef, {
            email: userEmail,
            name: auth.currentUser?.displayName,
          }, { merge: true });
        } catch (error) {

        }
        router.replace('/(pages)/privacyRequest');
      } else if (preferences) {
        router.replace('/(tabs)/home');
      }
    };

    checkPreferencesAndNavigate();
  }, [login]);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, "test@gmail.com", "test123");
    } catch (e) {
      const err = e as Error;
    } finally {
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-icon.png')}
        style={styles.logo}
      />
      <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
        <Text style={styles.subTitle} onPress={signIn}>SAP Concur</Text>
        <TouchableOpacity
          style={styles.signInwithGoogle}
          onPress={() => signInwithGoogle()}
        >
          <Text style={styles.signInButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginBottom: 10,
    color: '#000',
  },
  signInwithGoogle: {
    backgroundColor: '#012A86',
    width: '100%',
    height: 50,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  signInButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
