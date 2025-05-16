import FlightTracker from '@/components/flightTracker';
import { FlightInfo } from '@/dataType/flight';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';



export default function FlightScreen() {
    const params = useLocalSearchParams();

    // Match the params to FlightInfo type
    const flightInfo: FlightInfo = {
        flightNumber: params.flightNumber as string,
        departure: params.departure as string,
        arrival: params.arrival as string,
        departureTime: params.departureTime as string,
        arrivalTime: params.arrivalTime as string,
        date: params.date as string,
        gate: params.gate as string,
        status: params.status as string,
        duration: params.duration as string,
        newDepartureTime: params.newDepartureTime as string,
        newArrivalTime: params.newArrivalTime as string,
        delay: params.delay as string,
    };

    return (
        <ScrollView style={styles.container}>
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
