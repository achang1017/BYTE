import { Text, View, StyleSheet, Image } from 'react-native';

type Props = {
    flightInfo: {
        date: string;
        flightNumber: string;
        gate: string;
        departure: string;
        arrival: string;
        departureTime: string;
        arrivalTime: string;
        duration: string;
        status: string;
    } | null;
};

export default function UpcomingFlight({ flightInfo }: Props) {
    if (!flightInfo) return null;

    return (
        <View style={styles.container}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Upcoming Flights</Text>
                <Text style={styles.text}>{flightInfo.date}</Text>
            </View>

            {/* Flight Route Info */}
            <View style={styles.flightRow}>
                <View style={styles.locationBox}>
                    <Text style={styles.code}>{flightInfo.departure}</Text>
                    <Text style={styles.text}>{flightInfo.departureTime}</Text>
                </View>

                <View style={styles.middleBox}>
                    <Image
                        source={require('../assets/images/plane.png')}
                        style={styles.planeIcon}
                    />
                    <Text style={styles.text}>{flightInfo.duration}</Text>
                </View>

                <View style={styles.locationBox}>
                    <Text style={styles.code}>{flightInfo.arrival}</Text>
                    <Text style={styles.text}>{flightInfo.arrivalTime}</Text>
                </View>
            </View>

            {/* Flight Details */}
            <View style={styles.detailsRow}>
                <View>
                    <Text style={styles.text}>Flight: {flightInfo.flightNumber}</Text>
                    <Text style={styles.text}>Gate: {flightInfo.gate}</Text>
                </View>
                <View>
                    <Text style={styles.text}>{flightInfo.status}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        padding: 20,
        marginBottom: 20,
    },

    // Sections
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flightRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },

    // Elements
    locationBox: {
        alignItems: 'center',
    },
    middleBox: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    planeIcon: {
        width: 20,
        height: 20,
        marginBottom: 4,
    },

    // Text styles
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    code: {
        fontSize: 21,
        fontWeight: 'bold',
        color: '#000',
    },
    text: {
        color: '#000',
    },
});
