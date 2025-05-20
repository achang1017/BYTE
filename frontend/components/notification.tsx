import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { FlightInfo } from '@/dataType/flight';
import { AlertType } from '@/dataType/alert';
import { useRouter } from 'expo-router';

type Props = {
    flightInfo: FlightInfo | null;
    alertType: AlertType;
    onDismiss: () => void;
    conflicts?: any[];
};

export default function Notification({ flightInfo, alertType, onDismiss, conflicts }: Props) {
    const router = useRouter();

    if (!flightInfo) return null;

    const delayMinutes = Number(flightInfo.delay);
    const hours = Math.floor(delayMinutes / 60);
    const minutes = delayMinutes % 60;

    let delayTime = '';

    if (hours > 0) {
        delayTime = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
        if (minutes > 0) {
            delayTime += ` ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
        }
    } else {
        delayTime = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }

    if (alertType === AlertType.FlightInteruption) {
        return (
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <Image
                        source={require('../assets/images/alert-filled-icon.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.sectionTitle}>Flight Interruption Alert</Text>
                </View>

                <View style={styles.detailsRow}>
                    <View>
                        <Text style={styles.text}>Your flight {flightInfo.flightNumber} has been delayed by {delayTime}.
                        </Text>
                        <Text style={styles.text}>New Departure time: {flightInfo.newDepartureTime ?? "TBD"}</Text>
                        <Text style={styles.text}>New arrival time: {flightInfo.newArrivalTime ?? "Not confirmed"}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => router.push({
                    pathname: '/(pages)/alternativeFlights',
                    params: { ...flightInfo },
                })}>
                    <Text style={styles.buttonText} >Find alternative flight</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.dismissButton} onPress={() => { onDismiss() }}>
                    <Text style={styles.dismissText} >Key current flight</Text>
                </TouchableOpacity>
            </View>
        );
    } else if (conflicts && alertType === AlertType.MeetingConflict) {
        return conflicts.length > 0 && (<View style={styles.container}>
            <View style={styles.headerRow}>
                <Image
                    source={require('../assets/images/reschedule-icon.png')}
                    style={styles.icon}
                />
                <Text style={styles.sectionTitle}>Meeting Conflict</Text>
            </View>

            <View style={styles.detailsRow}>
                <View>
                    <Text style={styles.text}>{conflicts.length} Affected Meeting{conflicts.length !== 1 ? 's' : ''}</Text>
                    <Text style={styles.text}>
                        {conflicts.map((event, i) =>
                            `${event.summary} on ${new Date(event.start.dateTime).toLocaleString()}${i < conflicts.length - 1 ? ' and ' : ''}`
                        ).join('')}
                    </Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => { router.replace('/(tabs)/schedule') }}>
                <Text style={styles.buttonText} >View Scheduling Options</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dismissButton} onPress={() => { onDismiss() }}>
                <Text style={styles.dismissText} >Dismiss</Text>
            </TouchableOpacity>
        </View>)

    } else {
        return null;
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
