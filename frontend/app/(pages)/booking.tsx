import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlightInfo, AltFlightInfo } from '@/dataType/flight';
import { IconSymbol } from '@/app-example/components/ui/IconSymbol.ios';
import { auth } from '../../firebase';



export default function BookingScreen() {

    const router = useRouter();


    // Match the params to FlightInfo type
    const params = useLocalSearchParams();

    const oldFlight = params.oldFlight ? JSON.parse(params.oldFlight as string) as FlightInfo : null;
    const newFlight = params.newFlight ? JSON.parse(params.newFlight as string) as AltFlightInfo : null;

    const userImage = '../../assets/images/user-icon.png';
    const user = auth.currentUser;

    const displayName = user?.displayName || 'User';
    const userPhoto = user?.photoURL || userImage;


    if (!oldFlight || !newFlight) {
        return <Text>Error loading flight data.</Text>;
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollArea}>

                {/* Detail flight section */}
                <View style={styles.flightSection}>
                    {/* old flight section */}
                    <FlightInfoBox departure={oldFlight.departure} arrival={oldFlight.arrival} departureTime={oldFlight.departureTime} arrivalTime={oldFlight.arrivalTime} flightNumber={oldFlight.flightNumber} />
                    <View>
                        <IconSymbol
                            name="arrow.right"
                            size={20}
                            color={'black'}
                            style={styles.flightIcon}
                        />
                    </View>
                    {/* new flight section */}
                    <FlightInfoBox departure={newFlight.departure} arrival={newFlight.arrival} departureTime={newFlight.departureTime} arrivalTime={newFlight.arrivalTime} flightNumber={newFlight.flightNumber} />

                </View>

                {/* Passenger detail section */}
                <View style={styles.userSection}>
                    <Text style={styles.subTitle}>
                        Passenger Details
                    </Text>
                    <View style={styles.userInfo}>
                        <Image source={{ uri: userPhoto }} style={styles.userImage} />
                        <View>
                            <Text style={styles.userName}>{displayName}</Text>
                            <Text style={styles.userSeat}>{newFlight.seat}</Text>
                        </View>
                    </View>
                </View>

                {/* Price detail section */}
                <View style={styles.userSection}>
                    <Text style={styles.subTitle}>
                        Price Summary
                    </Text>
                    <View>
                        <View style={styles.priceRow}>
                            <Text >Change Fee</Text>
                            <Text >{newFlight.changeFee}</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Booking button */}
            <View style={styles.buttonSection}>
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }
                    }>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.bottomButtonContainer}>
                    <TouchableOpacity style={styles.bookingButton} onPress={() => { }
                    }>
                        <Text style={styles.bookingButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >


    );
}

function FlightInfoBox({ departure, arrival, departureTime, arrivalTime, flightNumber }: any) {
    return (
        <View style={styles.flightBox}>
            <View style={styles.flightInfoRow}>
                <Text style={styles.flightText}>From</Text>
                <Text style={styles.flightText}>To</Text>
            </View>
            <View style={styles.flightInfoRow}>
                <Text style={styles.flightTitle}>{departure}</Text>
                <Text style={styles.flightTitle}>{arrival}</Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    width: '100%',
                }}
            />
            <View style={styles.flightInfoRow}>
                <Text style={styles.flightText}>Date</Text>
                <Text style={styles.flightText}>{new Date(departureTime.toString()).toLocaleDateString()}</Text>
            </View>
            <View style={styles.flightInfoRow}>
                <Text style={styles.flightText}>Flight</Text>
                <Text style={styles.flightText}>{flightNumber}</Text>
            </View>
            <View style={styles.flightInfoRow}>
                <Text style={styles.flightText}>Departure</Text>
                <Text style={styles.flightText}>{new Date(departureTime.toString()).toLocaleTimeString()}</Text>
            </View>
            <View style={styles.flightInfoRow}>
                <Text style={styles.flightText}>Arrival</Text>
                <Text style={styles.flightText}>{new Date(arrivalTime.toString()).toLocaleTimeString()}</Text>
            </View>
        </View>
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
        marginTop: 20,
        marginBottom: 20,
    },
    flightSection: {
        marginTop: 20,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    userSection: {
        marginBottom: 10,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    buttonSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    flightInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    }, priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    eachRow: {
        flexDirection: 'row',
        alignItems: 'center',
    }, filterRow: {
        flexDirection: 'row',
        justifyContent: `flex-start`,
        alignItems: 'center',
        marginTop: 20,
    }, bottomButtonContainer: {
        width: '50%',
        paddingHorizontal: 30,
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#ccc',
    },


    // Container
    flightBox: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 10,
        width: '45%',
        height: 150,
    },

    // Text
    flightTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    flightText: {
        fontSize: 12,
    },
    subTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#000',
    }, bookingButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    backButtonText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },

    // Elements
    flightIcon: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        marginTop: 60,
        marginBottom: 20,
    }, userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    }, userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    }, userName: {
        fontSize: 15,
        fontWeight: 'bold',
    }, userSeat: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#676767'
    }, bookingButton: {
        backgroundColor: '#012A86',
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButton: {
        backgroundColor: '#BFCAE1',
        height: 50,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});


