import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlightInfo } from '@/dataType/flight';
import { AlertType } from '@/dataType/alert';
import { useRouter } from 'expo-router';

type Props = {
    flightInfo: FlightInfo | null;
    alertType: AlertType;
    onDismiss: () => void;
};

export default function Notification({ flightInfo, alertType, onDismiss }: Props) {
    if (!flightInfo) return null;

    const router = useRouter();

    if (alertType === AlertType.FlightInteruption) {
        return (
            <View style={styles.container}>
                {/* Header Row */}
                <View style={styles.headerRow}>
                    <Image
                        source={require('../assets/images/alert-filled-icon.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.sectionTitle}>Flight Interruption Alert</Text>
                </View>

                {/* Flight Details */}
                <View style={styles.detailsRow}>
                    <View>
                        <Text style={styles.text}>Your flight {flightInfo.flightNumber} has been delayed by 444 hours.
                        </Text>
                        <Text style={styles.text}>New arrival time: {flightInfo.arrivalTime}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => { router.replace('/(tabs)/flight') }}>
                    <Text style={styles.buttonText} >Find alternative flight</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dismissButton} onPress={() => { onDismiss() }}>
                    <Text style={styles.dismissText} >Keey current flight</Text>
                </TouchableOpacity>
            </View>
        );
    } else if (alertType === AlertType.MeetingConflict) {
        return (<View style={styles.container}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <Image
                    source={require('../assets/images/reschedule-icon.png')}
                    style={styles.icon}
                />
                <Text style={styles.sectionTitle}>Meeting Conflict</Text>
            </View>

            {/* Flight Details */}
            <View style={styles.detailsRow}>
                <View>
                    <Text style={styles.text}>2 Affected Meeting
                    </Text>
                    <Text style={styles.text}>Bob’s meeting on Feb 24 1:00 PM and Sarah’s meeting on Feb 24 4:00 PM need to be rescheduled.</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => { router.replace('/(tabs)/schedule') }}>
                <Text style={styles.buttonText} >View Scheduling Options</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dismissButton} onPress={() => { onDismiss() }}>
                <Text style={styles.dismissText} >Dismiss</Text>
            </TouchableOpacity>
        </View>)

    }


}

const styles = StyleSheet.create({
    // Container
    container: {
        backgroundColor: '#BFCAE1',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,

    },

    // Sections
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
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
    icon: {
        width: 15,
        height: 15,
        marginRight: 8,
    }, button: {
        backgroundColor: '#012A86',
        width: '100%',
        height: 35,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    }, buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    dismissButton: {
        backgroundColor: '#fff',
        width: '100%',
        height: 35,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
    }, dismissText: {
        color: '#012A86',
        fontSize: 12,
        fontWeight: 'bold',
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
