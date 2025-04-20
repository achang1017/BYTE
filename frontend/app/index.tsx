import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'expo-router';
import Constants from 'expo-constants';
import { useAuth } from '../authContext';



import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';


WebBrowser.maybeCompleteAuthSession();

const googleClientIds = Constants.expoConfig?.extra?.googleClientIds;


export default function LoginScreen() {

    const router = useRouter();

    // mock up email and password for testing
    const email = "test@gmail.com";
    const password = "test123";


    const config = {
        webClientId: googleClientIds?.web,
        iosClientId: googleClientIds?.ios,
        androidClientId: googleClientIds?.android,
        scopes: ['profile', 'email', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/gmail.readonly'],
    };

    const [request, response, signInwithGoogle] = Google.useAuthRequest(config);
    const { setAccessToken } = useAuth();

    useEffect(() => {
        if (response?.type === 'success' && response.authentication) {
            const id_token = response.authentication.idToken;
            const accessToken = response.authentication.accessToken;

            if (id_token && accessToken) {
                const credential = GoogleAuthProvider.credential(id_token);
                signInWithCredential(auth, credential)
                    .then(() => {
                        setAccessToken(accessToken);
                        alert('Signed in with Google + Firebase!');
                        router.replace('/(tabs)/home');
                    })
                    .catch((error) => {
                        alert('Firebase sign-in failed: ' + error.message);
                    });
            }
        }
    }, [response]);


    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Signed in!");
        } catch (e) {
            const err = e as Error;
            alert("Error signing in: " + err.message);
        }
    };


    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/splash-icon.png')} style={styles.logo} />
            <KeyboardAvoidingView behavior='padding' style={styles.formContainer} >
                <Text style={styles.subTitle} onPress={signIn}>SAP Concur</Text>

                <TouchableOpacity style={styles.signInwithGoogle} onPress={() => signInwithGoogle()}>
                    <Text style={styles.signInButtonText} >Sign in with google</Text>
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
    input: {
        width: '100%',
        height: 50,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    signUpButton: {
        backgroundColor: '#C9D3E3',
        width: '100%',
        height: 50,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
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
    footerLogo: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        fontWeight: 'bold',
        color: '#003399',
        marginRight: 5,
    },
    footerIcon: {
        width: 24,
        height: 24,
    },
});