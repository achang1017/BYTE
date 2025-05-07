import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'expo-router';
import { useUserPreferences } from '../../context/userPreferencesContext'; // Import the hook

export default function SettingScreen() {
    const router = useRouter();
    const { preferences } = useUserPreferences(); // Use the hook to access preferences

    console.log('Preferences in Settings screen:', preferences); // Add this logging statement

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

            {/* Display some user preferences */}
            {preferences ? (
                <View style={styles.preferencesContainer}>
                    <Text style={styles.preferenceText}>
                        Preferred Class: {preferences.preferredClass || 'Not set'}
                    </Text>
                    <Text style={styles.preferenceText}>
                        Preferred Seat: {preferences.preferredSeat || 'Not set'}
                    </Text>
                    <Text style={styles.preferenceText}>
                        AI Flight Recommendation:{' '}
                        {preferences.aiFlightRecommendation ? 'Enabled' : 'Disabled'}
                    </Text>
                    {/* Add more preferences to display as needed */}
                </View>
            ) : (
                <Text style={styles.loadingText}>Loading preferences...</Text>
            )}

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
        padding: 20, // Added padding for better spacing
    },
    text: {
        color: '#fff',
        fontSize: 24, // Increased font size
        marginBottom: 20, // Added margin
    },
    preferencesContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#35393e', // Slightly lighter background for the preferences box
        borderRadius: 10,
        width: '100%', // Take full width
    },
    preferenceText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10, // Margin between preference lines
    },
    loadingText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 20,
    },
});
