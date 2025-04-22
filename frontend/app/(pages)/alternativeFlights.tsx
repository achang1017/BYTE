import FlightTracker from '@/components/flightTracker';
import { AltFlightInfo, FlightInfo } from '@/dataType/flight';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AlternativeFlight from '@/components/alternativeFlight';
import { useEffect, useState } from 'react';



export default function AlternativeFlightScreen() {
    const params = useLocalSearchParams();
    const [alternativeFlights, setAlternativeFlights] = useState<AltFlightInfo[] | null>(null);

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
    };

    useEffect(() => {
        setAlternativeFlights([
            {
                altID: 'A123',
                tripID: 'T123',
                flightNumber: 'FL123',
                departureTime: new Date('2023-10-01T10:00:00Z'),
                arrivalTime: new Date('2023-10-01T12:00:00Z'),
                duration: '2h',
                changeFee: 50,
                isRecommended: true,
                meetingConflicts: 1,
                riskLevel: 'Low',
                departure: 'NYC',
                arrival: 'LAX',
                seat: 'Economy',
                layover: 0,

            },
            {
                altID: 'B456',
                tripID: 'T456',
                flightNumber: 'FL456',
                departureTime: new Date('2023-10-01T11:00:00Z'),
                arrivalTime: new Date('2023-10-01T13:00:00Z'),
                duration: '2h',
                changeFee: 100,
                isRecommended: false,
                meetingConflicts: 2,
                riskLevel: 'High',
                departure: 'NYC',
                arrival: 'LAX',
                seat: 'Business',
                layover: 2,
            },
        ]);
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Alternative flight section */}
            {alternativeFlights && alternativeFlights.map((flight, index) => (
                <View key={index} style={styles.section}>
                    <AlternativeFlight flightInfo={flight} />
                </View>
            ))}
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
        marginTop: 10,
        marginBottom: 10,
    },
});
