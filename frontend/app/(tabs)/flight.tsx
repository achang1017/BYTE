import {  View, StyleSheet, ScrollView} from 'react-native';
import { useState, useEffect } from 'react';
import { FlightInfo } from '@/dataType/flight';
import { auth } from '@/firebase';
import UpcomingFlight from '@/components/upcomingFlight';


export default function FlightScreen() {

    const user = auth.currentUser;

    // connect with firbase 
    const [flightInfos, setFlightInfos] = useState<FlightInfo[] | null>(null);

    useEffect(() => {

        async function fetchFlightData() {
            try {
                const userToken = await user?.getIdToken();

                if (!userToken) {
                    throw new Error('User token not available');
                }

                const response = await fetch('http://localhost:5000/api/flights', {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });

                setFlightInfos([{
                    date: '2023-10-01',
                    departure: 'LAX',
                    departureTime: '12:00 PM',
                    arrival: 'JFK',
                    arrivalTime: '8:00 PM',
                    flightNumber: 'AA123',
                    gate: 'A1',
                    status: 'On Time',
                    duration: '6h 0m'
                } as FlightInfo, {
                    date: '2023-10-01',
                    departure: 'LAX',
                    departureTime: '12:00 PM',
                    arrival: 'JFK',
                    arrivalTime: '8:00 PM',
                    flightNumber: 'AA123',
                    gate: 'A1',
                    status: 'On Time',
                    duration: '6h 0m'
                } as FlightInfo]);

                if (!response.ok) {
                    throw new Error('Failed to fetch flight data');
                }

                const data = await response.json();
                setFlightInfos(data as FlightInfo[]);
            } catch (err) {
                console.error(err);
            }
        }

        fetchFlightData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* Detail flight section */}
            {flightInfos && flightInfos.map((flightInfo, index) => (
                <View style={styles.section} key={index}>
                    <UpcomingFlight flightInfo={flightInfo}></UpcomingFlight>
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
