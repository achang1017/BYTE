import { Text, View, ScrollView, Image, StyleSheet, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'expo-router';
import { useUserPreferences } from '../../context/userPreferencesContext'; // Import the hook

export default function SettingScreen() {
    const router = useRouter();
    const { preferences } = useUserPreferences(); // Use the hook to access preferences

    console.log('Preferences in Settings screen:', preferences); // Add this logging statement

    const userImage = '../../assets/images/user-icon.png';
    const user = auth.currentUser;

    const displayName = user?.displayName || 'User';
    const userPhoto = user?.photoURL || userImage;
    const userPhone = user?.phoneNumber || 'none';
    const userEmail = user?.email || "example@uw.edu";

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.replace('/');
        } catch (error) {
            Alert.alert('Sign out error', (error as Error).message);
        }
    };

    return (
      
        <ScrollView style={styles.container}>
            {/*User Setting Header */}
            <View style={styles.header}>
                <Text style={styles.title}>User Setting</Text>
            </View>

            {/*User Profile */}
            <View style={styles.profile}>
                <Image source={{ uri: userPhoto }} style={styles.userImage} />
                <Text style={styles.title}>{displayName}</Text>
            </View>

            {/*User Settings*/}
            <View style={styles.sections}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <Text style={styles.sectionText}>Email Connected: {userEmail}</Text>
                    <Text style={styles.sectionTextLast}>Phone Connected: {userPhone}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Setting</Text>
                    <Text style={styles.sectionText}>Automatic Calendar Sync: {}</Text>
                    <Text style={styles.sectionText}>AI Generated Recommended Flights: {}</Text>
                    <TouchableOpacity onPress={() => { router.push({ pathname: '/(pages)/preference' })}}>
                        <Text style={styles.sectionText} >Preference</Text>
                    </TouchableOpacity>
                    <Text style={styles.sectionTextLast}>Privacy Access Form: </Text>
                </View>
            </View>
            {/*Sign-out */}
            <TouchableHighlight style={styles.button} onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableHighlight>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // Layout
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // Header
    header: {
        flexDirection: 'row',
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
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    profile: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 10,
    },
    // Body
    userImage: {
        width: 77,
        height: 77,
        borderRadius: 50,
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
    },
    sections: {
        alignItems: 'center',
        marginBottom: 25,
    },
    section: {
        width: 343,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        padding: 10,
        paddingLeft: 15,
        backgroundColor: '#BFCAE1',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 1,
        borderColor: '#000',
    },
    sectionText: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
        padding: 10,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#000',
    },
    sectionTextLast: {
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
        padding: 10,
        paddingLeft: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderWidth: 1,
        borderColor: '#000',
    },
    button: {
        width: 343,
        borderRadius: 15,
        padding: 10,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: '#012A86',
    },
    buttonText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: 'bold',
    }
});
