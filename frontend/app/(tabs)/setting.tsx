import { Text, View, ScrollView, Image, StyleSheet, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useUserPreferences } from '../../context/userPreferencesContext';

export default function SettingScreen() {
    const router = useRouter();
    const { preferences } = useUserPreferences();

    const userImage = '../../assets/images/user-icon.png';
    const user = auth.currentUser;

    const displayName = user?.displayName || 'User';
    const userPhoto = user?.photoURL || userImage;
    const userPhone = user?.phoneNumber || 'none';
    const userEmail = user?.email || "example@uw.edu";

    const [autoCalendar, setAutoCalendar] = useState<String>('Off');
    const [aiFlightRec, setAiFlightRec] = useState<String>('Off');
    const [dataSync, setDataSync] = useState<String>('Off');

    useEffect(() => {
        if(preferences.preferences.autoCalendarUpdate) {
            setAutoCalendar('On');
        } else {
            setAutoCalendar('Off');
        }
        if(preferences.preferences.aiFlightRecommendation) {
            setAiFlightRec('On');
        } else {
            setAiFlightRec('Off');
        }
        if(preferences.preferences.personalDataSync) {
            setDataSync('On');
        } else {
            setDataSync('Off');
        }
    })

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
            <View style={styles.header}>
                <Text style={styles.title}>User Setting</Text>
            </View>

            <View style={styles.profile}>
                <Image source={{ uri: userPhoto }} style={styles.userImage} />
                <Text style={styles.title}>{displayName}</Text>
            </View>

            <View style={styles.sections}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    <Text style={styles.sectionText}>Email Connected: {userEmail}</Text>
                    <Text style={styles.sectionTextLast}>Phone Connected: {userPhone}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Personal Setting</Text>
                    <Text style={styles.sectionText}>Automatic Calendar Sync: { autoCalendar }</Text>
                    <Text style={styles.sectionText}>AI Generated Recommended Flights: { aiFlightRec }</Text>
                    <Text style={styles.sectionText}>Personal Data Sync: { dataSync }</Text>
                    <TouchableOpacity onPress={() => { router.push({ pathname: '/(pages)/preference' })}}>
                        <View style={styles.sectionTouch}>
                            <Text style={styles.sectionTouchText}>Preference</Text>
                            <Image source={require('../../assets/images/arrow.png')} style={styles.arrow} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.sectionTextLast}>Privacy Access Form: </Text>
                </View>
            </View>
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
        borderBottomWidth: 1,
        padding: 20, 
    },
    text: {
        color: '#fff',
        fontSize: 24, 
        marginBottom: 20, 
    },
    preferenceText: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
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
        marginBottom: 10,
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
    },
    sections: {
        alignItems: 'center',
        marginBottom: 15,
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
        marginTop: -1,
    },
    sectionTouch: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        paddingLeft: 15,
        borderWidth: 1,
        borderColor: '#000',
        marginTop: -1,
    },
    sectionTouchText: {
        flex: 5,
        fontSize: 12,
        color: '#000',
        fontWeight: 'bold',
    },
    arrow: {
        width: 6.5,
        height: 10,
        alignSelf: 'center',
        marginRight: 5,
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
        marginTop: -1,
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