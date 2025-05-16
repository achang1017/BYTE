import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { use } from "react";


export default function PrivacyRequestScreen() {
    const router = useRouter();

    return <View style={styles.container}>
        <ScrollView>

            <View style={styles.header}>
                <Text style={styles.title}>Privacy Access Request</Text>
            </View>
            <View style={styles.privacyRequest}>
                <Text >
                    We ask for your permission to get access to personal data connected to your SAP Concur account.
                </Text>
                <Text style={{ padding: 10 }}>
                    1. Our app needs personal data including your first name, last name, business ID, passport info, and itinerary to provide streamlined steps of flight reschedule.
                </Text>
                <Text style={{ padding: 10 }}>
                    2. Our app needs contact information like contact number and email of your supervisors or managers to provide AI-generated flight change notification drafts after you make a flight reschedule.
                </Text>
                <Text style={{ padding: 10 }}>
                    3. Our app needs a permission to access your calendar data including your business meeting schedules and flight schedules to provide an alternative flight recommendations with much more feasible options.
                </Text>
                <Text style={{ padding: 10 }}>
                    4. Our app needs a permission to access your calendar data including your business meeting schedules and flight schedules to provide an alternative flight recommendations with much more feasible options.
                </Text>
                <Text >
                    We promise that your personal data won’t be used for any other purposes other than our services to support your flight reschedule.
                </Text>
            </View>

            <TouchableOpacity style={styles.buttonContinue} onPress={() => router.push('/(pages)/initialPreference')}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    // Header
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    title: {
        fontSize: 21,
        fontWeight: 'bold',
    },

    // Privacy Request
    privacyRequest: {
        padding: 20,
        margin: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
    },

    buttonContinue: {
        marginTop: 20,
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
    },
})
