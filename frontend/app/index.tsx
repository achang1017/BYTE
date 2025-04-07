import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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