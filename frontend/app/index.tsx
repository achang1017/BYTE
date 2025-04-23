<<<<<<< Updated upstream
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';



import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession();

const googleClientIds = Constants.expoConfig?.extra?.googleClientIds;


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    const config = {
        webClientId: googleClientIds?.web,
        iosClientId: googleClientIds?.ios,
        androidClientId: googleClientIds?.android,
        scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.readonly'],
        useProxy: true,
=======
import {
    Text,
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import { useEffect } from 'react';
  import { auth } from '../firebase';
  import {
    signInWithCredential,
    GoogleAuthProvider,
  } from 'firebase/auth';
  import { useRouter } from 'expo-router';
  import Constants from 'expo-constants';
  import { useAuth } from '../authContext';
  
  import * as Google from 'expo-auth-session/providers/google';
  import * as WebBrowser from 'expo-web-browser';
  
  WebBrowser.maybeCompleteAuthSession();
  
  const googleClientIds = Constants.expoConfig?.extra?.googleClientIds;
  
  export default function LoginScreen() {
    const router = useRouter();
    const { setAccessToken, setGmailAccessToken, setFirebaseReady } = useAuth();
  
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
>>>>>>> Stashed changes
    };
  
    const [request, response, signInwithGoogle] = Google.useAuthRequest(config);
<<<<<<< Updated upstream

    useEffect(() => {
        if (response?.type === 'success' && response.authentication) {
            const id_token = response.authentication.idToken;

            if (id_token) {
                const credential = GoogleAuthProvider.credential(id_token);
                signInWithCredential(auth, credential)
                    .then(() => {
                        alert('Signed in with Google + Firebase!');
                        router.replace('/(tabs)/home');
                    })
                    .catch((error) => {
                        alert('Firebase sign-in failed: ' + error.message);
                    });
            }
=======
  
    useEffect(() => {
      if (response?.type === 'success' && response.authentication) {
        const idToken = response.authentication.idToken;
        const accessToken = response.authentication.accessToken;
  
        if (idToken && accessToken) {
          const credential = GoogleAuthProvider.credential(idToken);
  
          signInWithCredential(auth, credential)
            .then(() => {
              setAccessToken(accessToken);
              setGmailAccessToken(accessToken); // ✅ Save for Gmail API
              setFirebaseReady(true);
              router.replace('/(tabs)/home');   // ✅ Navigate
            })
            .catch((error) => {
              alert('Firebase sign-in failed: ' + error.message);
            });
>>>>>>> Stashed changes
        }
      }
    }, [response]);
<<<<<<< Updated upstream




    const signUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Sign-up successful. Check your email.");
        } catch (e) {
            const err = e as Error;
            alert("Error signing up: " + err.message);
        } finally {
            setEmail('');
            setPassword('');
        }
    };

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Signed in!");
        } catch (e) {
            const err = e as Error;
            alert("Error signing in: " + err.message);
        } finally {
            setEmail('');
            setPassword('');
        }
    };


    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/splash-icon.png')} style={styles.logo} />
            <KeyboardAvoidingView behavior='padding' style={styles.formContainer}>
                <Text style={styles.subTitle}>SAP Concur</Text>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Username, verified email address or SSO code"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
                    <Text style={styles.signInButtonText}  >Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signUpButton} onPress={signIn}>
                    <Text style={styles.signInButtonText} >Sign in</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.signInwithGoogle} onPress={() => signInwithGoogle()}>
                    <Text style={styles.signInButtonText} >Sign in with google</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
=======
  
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/images/splash-icon.png')}
          style={styles.logo}
        />
        <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
          <Text style={styles.subTitle}>SAP Concur</Text>
          <TouchableOpacity
            style={styles.signInwithGoogle}
            onPress={() => signInwithGoogle()}
          >
            <Text style={styles.signInButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
>>>>>>> Stashed changes
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
  