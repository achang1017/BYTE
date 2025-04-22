import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AltFlightInfo, FlightInfo } from '@/dataType/flight';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/app-example/components/ui/IconSymbol.ios';

type Props = {
    flightInfo: AltFlightInfo | null;
};

export default function AlternativeFlight({ flightInfo }: Props) {
    if (!flightInfo) return null;

    const router = useRouter();
    const newArriavaltime = new Date(flightInfo.arrivalTime);
    const newDeparturetime = new Date(flightInfo.departureTime);


    return (
        <View style={styles.container} >

            {/* Header Row */}
            <View style={styles.headerRow}>
                <View style={styles.flightInfoRow}>
                    <View>
                        <View style={styles.flightRow}>
                            <View style={styles.locationBox}>
                                <Text style={styles.sectionTitle}>{flightInfo.departure} → </Text>
                                <Text style={styles.sectionTitle}>{flightInfo.arrival}</Text>
                            </View>
                            <Text style={styles.fadedtext}>{newArriavaltime.toDateString()}</Text>
                        </View>
                        <Text style={styles.fadedtext}>{flightInfo.flightNumber}</Text>
                    </View>
                    <Text style={[styles.riskIcon, { backgroundColor: getRiskColor(flightInfo.riskLevel) }]}>
                        {flightInfo.riskLevel} risk</Text>
                </View>

                <View style={styles.timeRow}>
                    <View style={styles.timeBox}>
                        <Text style={{ fontWeight: 'bold' }}>Departure</Text>
                        <Text>{newDeparturetime.getHours()}</Text>
                    </View>
                    <View style={styles.timeBox}>
                        <Text style={{ fontWeight: 'bold' }}>Duration</Text>
                        <Text>{flightInfo.duration}</Text>
                    </View>
                    <View style={styles.timeBox}>
                        <Text style={{ fontWeight: 'bold' }}>Arrival</Text>
                        <Text>{newArriavaltime.getUTCDate()}</Text>
                    </View>
                </View>
            </View>


            {/* Additioanl information Details */}
            <View style={styles.detailsRow}>
                <View style={styles.eachRow}>
                    <IconSymbol name="calendar" size={20} color='black' />
                    {flightInfo.meetingConflicts > 1 ? (
                        <Text style={styles.text}>{flightInfo.meetingConflicts} meeting conflicts</Text>
                    ) : (
                        <Text style={styles.text}>No meeting conflict</Text>
                    )}
                </View>
                <View style={styles.eachRow}>
                    <IconSymbol name="dollarsign" size={20} color='black' />

                    {flightInfo.changeFee > 0 ? (
                        <Text style={styles.text}>{flightInfo.changeFee} change fee</Text>)
                        : (<Text style={styles.text}>No change fee</Text>)
                    }
                </View>
                <View style={styles.eachRow}>
                    <IconSymbol name="carseat.left" size={20} color='black' />

                    <Text style={styles.text}>{flightInfo.seat} </Text>
                </View>
                {flightInfo.layover > 0 && (
                    <View style={styles.eachRow}>
                        <IconSymbol name="airplane" size={20} color='black' />
                        <Text style={styles.text}>{flightInfo.layover} Layover flight</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

function getRiskColor(level: string) {
    switch (level.toLowerCase()) {
        case 'low':
            return '#32D400';
        case 'medium':
            return '#FDB03C';
        case 'high':
            return '#FB0000';
        default:
            return 'gray'; // fallback
    }
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
