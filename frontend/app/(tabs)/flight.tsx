import FlightTracker from '@/components/flightTracker';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';

export default function FlightScreen() {
    const flightInfo = {
        date: '2023-10-01',
        departure: 'LAX',
        departureTime: '12:00 PM',
        arrival: 'JFK',
        arrivalTime: '8:00 PM',
        flightNumber: 'AA123',
        gate: 'A1',
        status: 'On Time',
        duration: '6h 0m'
    }

    return (
        <ScrollView style={styles.container}>
            {/* Detail flight section */}
            <View style={styles.section}>
                <FlightTracker flightInfo={flightInfo} ></FlightTracker>

            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    // Layout
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    section: {
        marginTop: 20,
        marginBottom: 20,
    },
});
