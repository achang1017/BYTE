import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'expo-router';

export default function SettingScreen() {
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.replace('/');
        } catch (error) {
            Alert.alert('Sign out error', (error as Error).message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Setting screen</Text>
            <Button title='Sign out' onPress={handleSignOut} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
    },
});
