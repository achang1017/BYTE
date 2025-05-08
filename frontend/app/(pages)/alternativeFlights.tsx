import { AltFlightInfo, FlightInfo } from '@/dataType/flight';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AlternativeFlight from '@/components/alternativeFlight';
import { useEffect, useState } from 'react';


type FilterType = 'Recommended' | 'Duration' | 'Price';


export default function AlternativeFlightScreen() {
    const params = useLocalSearchParams();
    const [alternativeFlights, setAlternativeFlights] = useState<AltFlightInfo[] | null>(null);
    const [filtered, setFiltered] = useState<FilterType | null>(null);
    const [selectedFlight, setSelectedFlight] = useState<AltFlightInfo | null>(null);

    const router = useRouter();

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
                departureTime: '2023-10-01T10:00:00Z',
                arrivalTime: '2023-10-01T12:00:00Z',
                duration: '5h',
                changeFee: 50,
                isRecommended: true,
                meetingConflicts: 1,
                departure: 'NYC',
                arrival: 'LAX',
                seat: 'Economy',
                layover: 0,

            },
            {
                altID: 'B456',
                tripID: 'T456',
                flightNumber: 'FL456',
                departureTime: '2023-10-01T11:00:00Z',
                arrivalTime: '2023-10-01T13:00:00Z',
                duration: '2h',
                changeFee: 100,
                isRecommended: false,
                meetingConflicts: 2,
                departure: 'NYC',
                arrival: 'LAX',
                seat: 'Business',
                layover: 2,
            },
        ]);
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
            const sortedFlights = [...alternativeFlights].sort((a, b) => {
                const durationA = parseInt(a.duration);
                const durationB = parseInt(b.duration);
                return durationA - durationB;
            });
            setAlternativeFlights(sortedFlights);
            setFiltered('Duration');

        }
    };

    const setPriceFilter = () => {
        if (alternativeFlights) {
            const sortedFlights = [...alternativeFlights].sort((a, b) => {
                return a.changeFee - b.changeFee;
            })

            setAlternativeFlights(sortedFlights);
            setFiltered('Price');
        }
    }


    return (
        <View style={styles.container}>

            <ScrollView style={styles.scrollArea}>
                {/* Filter */}
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
                </View>
                {/* Alternative flight section */}
                {alternativeFlights && alternativeFlights.map((flight, index) => (
                    <TouchableOpacity key={index} style={styles.section} onPress={() => setSelectedFlight(flight)}>
                        <AlternativeFlight flightInfo={flight} isSelected={selectedFlight?.altID == flight.altID} />
                    </TouchableOpacity>
                ))}

            </ScrollView >
            {/* Booking button */}
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
                                        isRecommended: selectedFlight.isRecommended.toString(),
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
        paddingHorizontal: 30,
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
