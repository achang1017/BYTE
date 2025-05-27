import { AltFlightInfo, FlightInfo } from '@/dataType/flight';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AlternativeFlight from '@/components/alternativeFlight';
import { useEffect, useState } from 'react';
import { useAuth } from '../../authContext';



type FilterType = 'Recommended' | 'Duration' | 'Price' | 'Business Schedule' | 'Flight Class' | null;


export default function AlternativeFlightScreen() {
    const params = useLocalSearchParams();
    const [alternativeFlights, setAlternativeFlights] = useState<AltFlightInfo[] | null>(null);
    const [filtered, setFiltered] = useState<FilterType | null>('Recommended');
    const [selectedFlight, setSelectedFlight] = useState<AltFlightInfo | null>(null);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Economy', value: 'Economy' },
        { label: 'Business', value: 'Business' },
        { label: 'First Class', value: 'First Class' },
    ]);


    const router = useRouter();
    const { accessToken } = useAuth();

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

    useEffect(() => {
        const fetchAlternativeFlights = async () => {
            try {
                // Get user email from auth (import if not already)
                // @ts-ignore
                const user = require('@/firebase').auth.currentUser;
                const userEmail = user?.email;
                if (!userEmail) {
                    throw new Error('User not logged in');
                }
                const encodedFlightInfo = encodeURIComponent(JSON.stringify(flightInfo));
                const response = await fetch(`http://localhost:3000/api/alternativeFlights?flightInfo=${encodedFlightInfo}&email=${encodeURIComponent(userEmail)}&accessToken=${accessToken}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch alternative flights');
                }
                const altFlights = await response.json();
                setAlternativeFlights(altFlights);
            } catch (error) {
                console.error('Error fetching alternative flights:', error);
            }
        };

        fetchAlternativeFlights();
    }, []);

    const setRecommendedFilter = () => {
        if (alternativeFlights) {
            const sortedFlights = [...alternativeFlights].sort((a, b) => {
                if (a.isRecommended && !b.isRecommended) return -1;
                if (!a.isRecommended && b.isRecommended) return 1;
                return 0;
            });
            setAlternativeFlights(sortedFlights);
        }
        setFiltered('Recommended');
    }

    const setDurationFilter = () => {
        if (alternativeFlights) {
            // Parse duration like '11h 50m' to minutes
            const parseDuration = (durationStr: string) => {
                if (!durationStr) return Number.MAX_SAFE_INTEGER;
                const match = durationStr.match(/(\d+)h\s*(\d+)?m?/);
                if (!match) return Number.MAX_SAFE_INTEGER;
                const hours = parseInt(match[1] || '0', 10);
                const minutes = parseInt(match[2] || '0', 10);
                return hours * 60 + minutes;
            };
            const sortedFlights = [...alternativeFlights].sort((a, b) => {
                const durationA = parseDuration(a.duration);
                const durationB = parseDuration(b.duration);
                return durationA - durationB;
            });
            setAlternativeFlights(sortedFlights);
            setFiltered('Duration');
        }
    };

    const setFlightClassFilter = () => {
        if (alternativeFlights) {
            const sortedFlights = [...alternativeFlights].sort((a, b) => {
                if (a.seat == value && b.seat != value) return -1;
                if (a.seat != value && b.seat == value) return 1;
                return 0;
            })
            setAlternativeFlights(sortedFlights);
            setFiltered('Flight Class');
        }
    }

    const setBusinessScheduleFilter = () => {
        if (alternativeFlights) {
            const sortedFlights = [...alternativeFlights].sort((a, b) => {
                const conflictsA = a.meetingConflicts;
                const conflictsB = b.meetingConflicts;
                return conflictsA - conflictsB;
            })
            setAlternativeFlights(sortedFlights);
            setFiltered('Business Schedule');
        }
    };

    const setPriceFilter = () => {
        if (alternativeFlights) {
            const sortedFlights = [...alternativeFlights].sort((a, b) => {
                // price may be string, so parse to float
                const priceA = typeof a.price === 'string' ? parseFloat(a.price.replace(/[^\d.]/g, '')) : a.price;
                const priceB = typeof b.price === 'string' ? parseFloat(b.price.replace(/[^\d.]/g, '')) : b.price;
                return priceA - priceB;
            });
            setAlternativeFlights(sortedFlights);
            setFiltered('Price');
        }
    }


    return (
        <View style={styles.container}>

            <ScrollView style={styles.scrollArea}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    <View style={styles.filterRow} >
                        <TouchableOpacity style={[styles.filter, (filtered == 'Recommended' && { backgroundColor: '#012A86' })]} onPress={() => setRecommendedFilter()}>
                            <Text style={[styles.filterText, filtered == 'Recommended' && { color: '#fff' }]}>Recommended</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filter, (filtered == 'Duration' && { backgroundColor: '#012A86' })]} onPress={() => setDurationFilter()}>
                            <Text style={[styles.filterText, filtered == 'Duration' && { color: '#fff' }]}>Duration</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filter, (filtered == 'Price' && { backgroundColor: '#012A86' })]} onPress={() => setPriceFilter()}>
                            <Text style={[styles.filterText, filtered == 'Price' && { color: '#fff' }]}>Price</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filter, (filtered == 'Business Schedule' && { backgroundColor: '#012A86' })]} onPress={() => setBusinessScheduleFilter()}>
                            <Text style={[styles.filterText, filtered == 'Business Schedule' && { color: '#fff' }]}>Business Schedule</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.filter, (filtered == 'Flight Class' && { backgroundColor: '#012A86' })]} onPress={() => setFlightClassFilter()}>
                            <Text style={[styles.filterText, filtered == 'Flight Class' && { color: '#fff' }]}>Flight class</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
                {alternativeFlights && alternativeFlights.map((flight, index) => (
                    <TouchableOpacity key={index} style={styles.section} onPress={() => setSelectedFlight(flight)}>
                        <AlternativeFlight flightInfo={flight} isSelected={selectedFlight?.flightNumber === flight.flightNumber} />
                    </TouchableOpacity>
                ))}

            </ScrollView >
            <View style={[styles.bottomButtonContainer]}>
                <TouchableOpacity
                    style={[
                        styles.bookingButton,
                        !selectedFlight && { backgroundColor: '#BFCAE1' },
                    ]}
                    onPress={() => {
                        if (selectedFlight) {
                            router.push({
                                pathname: '/(pages)/booking',
                                params: {
                                    oldFlight: JSON.stringify(flightInfo),
                                    newFlight: JSON.stringify({
                                        ...selectedFlight,
                                        departureTime: selectedFlight.departureTime.toString(),
                                        arrivalTime: selectedFlight.arrivalTime.toString(),
                                        isRecommended: selectedFlight.isRecommended ? selectedFlight.isRecommended.toString() : "",
                                    }),
                                },
                            });
                        }
                    }}
                    disabled={!selectedFlight}
                >
                    <Text style={styles.bookingButtonText}>Continue</Text>
                </TouchableOpacity>

            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    // Layout
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollArea: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 10,
        marginBottom: 10,
    },
    filterRow: {
        flexDirection: 'row',
        justifyContent: `flex-start`,
        alignItems: 'center',
        marginTop: 20,
    }, bottomButtonContainer: {
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },

    // Elements
    filter: {
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        marginRight: 10,
    },
    bookingButton: {
        backgroundColor: '#012A86',
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Text styles
    filterText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    }, bookingButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
