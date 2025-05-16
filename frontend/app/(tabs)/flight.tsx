import { View, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { FlightInfo } from '@/dataType/flight';
import UpcomingFlight from '@/components/upcomingFlight';
import { useAuth } from '../../authContext';


export default function FlightScreen() {

    const { accessToken } = useAuth();

    // connect with firbase 
    const [flightInfos, setFlightInfos] = useState<FlightInfo[] | null>(null);

    useEffect(() => {
        if (!accessToken) return;

        async function fetchFlightData() {
            try {
                const response = await fetch('http://localhost:3000/api/gmail/flights', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch flight data');
                }

                const data = await response.json();
                setFlightInfos(data);
            } catch (err) {
                console.error('Error fetching flight info:', err);
            }
        }

        fetchFlightData();
    }, [accessToken]);

    return (
        <ScrollView style={styles.container}>
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
