import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AltFlightInfo, FlightInfo } from '@/dataType/flight';
import { useRouter } from 'expo-router';

type Props = {
    flightInfo: AltFlightInfo | null;
    isSelected?: boolean;
};

export default function AlternativeFlight({ flightInfo, isSelected }: Props) {
    if (!flightInfo) return null;

    const router = useRouter();
    const newArriavaltime = new Date(flightInfo.arrivalTime.toString());
    const newDeparturetime = new Date(flightInfo.departureTime.toString());


    return (
        <View style={[styles.container, (isSelected && { backgroundColor: '#1F5FC1' })]} >

            {/* Header Row */}
            <View style={styles.headerRow}>
                <View style={styles.flightInfoRow}>
                    <View>
                        <View style={styles.flightRow}>
                            <View style={styles.locationBox}>
                                <Text style={[styles.sectionTitle, isSelected && { color: '#FFFFFF' }]}>{flightInfo.departure} → </Text>
                                <Text style={[styles.sectionTitle, isSelected && { color: '#FFFFFF' }]}>{flightInfo.arrival}</Text>
                            </View>
                            <Text style={[styles.fadedtext, isSelected && { color: '#FFFFFF' }]}>{newArriavaltime.toDateString()}</Text>
                        </View>
                        <Text style={[styles.fadedtext, isSelected && { color: '#FFFFFF' }]}>{flightInfo.flightNumber}</Text>
                    </View>

                </View>

                <View style={styles.timeRow}>
                    <View style={styles.timeBox}>
                        <Text style={[{ fontWeight: 'bold' }, isSelected && { color: '#FFFFFF' }]}>Departure</Text>
                        <Text style={[isSelected && { color: '#FFFFFF' }]}>{newDeparturetime.getHours()}</Text>
                    </View>
                    <View style={styles.timeBox}>
                        <Text style={[{ fontWeight: 'bold' }, isSelected && { color: '#FFFFFF' }]}>Duration</Text>
                        <Text style={[isSelected && { color: '#FFFFFF' }]}>{flightInfo.duration}</Text>
                    </View>
                    <View style={styles.timeBox}>
                        <Text style={[{ fontWeight: 'bold' }, isSelected && { color: '#FFFFFF' }]}>Arrival</Text>
                        <Text style={[isSelected && { color: '#FFFFFF' }]}>{newArriavaltime.getUTCDate()}</Text>
                    </View>
                </View>
            </View>


            {/* Additioanl information Details */}
            <View style={styles.detailsRow}>
                <View style={styles.eachRow}>
                    {flightInfo.meetingConflicts > 1 ? (
                        <Text style={[styles.text, isSelected && { color: '#FFFFFF' }]}>{flightInfo.meetingConflicts} meeting conflicts</Text>
                    ) : (
                        <Text style={[styles.text, isSelected && { color: '#FFFFFF' }]}>No meeting conflict</Text>
                    )}
                </View>
                <View style={styles.eachRow}>

                    {flightInfo.changeFee > 0 ? (
                        <Text style={[styles.text, isSelected && { color: '#FFFFFF' }]}>{flightInfo.changeFee} change fee</Text>)
                        : (<Text style={[styles.text, isSelected && { color: '#FFFFFF' }]}>No change fee</Text>)
                    }
                </View>
                <View style={styles.eachRow}>

                    <Text style={[styles.text, isSelected && { color: '#FFFFFF' }]}>{flightInfo.seat} </Text>
                </View>
                {flightInfo.layover > 0 && (
                    <View style={styles.eachRow}>
                        <Text style={[styles.text, isSelected && { color: '#FFFFFF' }]}>{flightInfo.layover} Layover flight</Text>
                    </View>
                )}
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
    },

    // Sections
    headerRow: {
        flexDirection: 'column',
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    flightInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    flightRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        // justifyContent: 'space-between',

    },
    detailsRow: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: 20,
    }, timeRow: {
        flexDirection: 'row',

        justifyContent: 'space-between',
    }, eachRow: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'space-between',
    },

    // Elements
    locationBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    }, timeBox: {
        alignItems: 'flex-start',
    },

    planeIcon: {
        width: 20,
        height: 20,
        marginBottom: 4,
    },
    riskIcon: {
        backgroundColor: '#FF0000',
        color: '#fff',
        padding: 5,
        borderRadius: 20,
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
    fadedtext: {
        color: '#676767',
    },
});
