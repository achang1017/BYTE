import { Text, View, StyleSheet, Image } from 'react-native';
import { FlightInfo } from '@/dataType/flight';
import { useState, useEffect } from 'react';


type TimelineItem = {
    icon: 'check' | 'warning' | 'info';
    title: string;
    bullets: string[];
};


type Props = {
    flightInfo: FlightInfo | null;
};

export default function FlightTracker({ flightInfo }: Props) {
    if (!flightInfo) return null;

    const [sectionHeights, setSectionHeights] = useState<number[]>([]);

    let delayTime = '';

    if (flightInfo.delay && parseInt(flightInfo.delay) > 0) {
        const delayMinutes = Number(flightInfo.delay);
        const hours = Math.floor(delayMinutes / 60);
        const minutes = delayMinutes % 60;
        if (hours > 0) {
            delayTime = `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
            if (minutes > 0) {
                delayTime += ` ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
            }
        } else {
            delayTime = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
        }
    }


    // Sample timeline data
    // TODO need to think about how to get alert -- when status is delayed or cancelled in flightInfo add the reason and delayed time
    // Expected behavoir: using the flight info, get the alert from backend?
    const timelineData: TimelineItem[] = [
        {
            icon: 'check',
            title: 'Flight Scheduled',
            bullets: [
                `Flight Date: ${flightInfo.date}`,
                `Gate: ${flightInfo.gate}`,
                `Flight: ${flightInfo.flightNumber}`,
                `Airline: TODO`,
                `Flight Departure: ${flightInfo.departure}`,
                `Flight Arrival: ${flightInfo.arrival}`,
                `Duration: ${flightInfo.duration}`,
            ],
        },
        ...(delayTime.length > 0
            ? [{
                icon: 'warning' as const,
                title: 'Flight Delayed',
                bullets: [
                    `Flight has been delayed by ${delayTime}`,
                    `New Departure Time: ${flightInfo.newDepartureTime ?? 'TBD'}`,
                    `New Arrival Time: ${flightInfo.newArrivalTime ?? 'TBD'}`,
                ],
            }]
            : []),
        {
            icon: 'info',
            title: 'Ready for Boarding',
            bullets: ['Boarding to begin soon'],
        },
    ];


    const newArriavaltime = new Date(flightInfo.arrivalTime);
    const newDeparturetime = new Date(flightInfo.departureTime);

    function splitIso(iso: string) {
        const [date, timeWithOffset] = iso.split("T");

        return { date, timeWithOffset };
    }



    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.sectionTitle}>Flight: {flightInfo.flightNumber}</Text>
            </View>

            <View style={styles.flightRow}>
                <View style={styles.locationBox}>
                    <Text style={styles.code}>{flightInfo.departure}</Text>
                    <Text style={styles.text}>{splitIso(flightInfo.departureTime).date}</Text>
                    <Text style={styles.text}>{splitIso(flightInfo.departureTime).timeWithOffset}</Text>

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
                    <Text style={styles.text}>{splitIso(flightInfo.arrivalTime).date}</Text>
                    <Text style={styles.text}>{splitIso(flightInfo.arrivalTime).timeWithOffset}</Text>

                </View>
            </View>

            <View style={styles.timelineRow}>
                <View style={styles.timeline}>
                    {timelineData.map((_, index) => (
                        <View key={index} style={styles.timelineItem}>
                            <View style={index < timelineData.length - 2 ? styles.prevDot : (index == timelineData.length - 1 ? styles.finalDot : styles.currDot)} />
                            {index < timelineData.length - 1 ? (
                                <View
                                    style={{
                                        width: 2,
                                        backgroundColor: '#ccc',
                                        height: sectionHeights[index] ?? 40, // fallback if not yet measured
                                    }}
                                />
                            ) : null}
                        </View>
                    ))}
                </View>

                <View style={styles.content}>
                    {timelineData.map((item, index) => (
                        <View
                            key={index}
                            onLayout={(event) => {
                                const { height } = event.nativeEvent.layout;
                                setSectionHeights(prev => {
                                    const updated = [...prev];
                                    updated[index] = height;
                                    return updated;
                                });
                            }}
                            style={styles.section}
                        >
                            <Text style={styles.sectionTitle}>
                                {(item.icon === 'check' ? '✓' : item.icon === 'warning' ? '⚠' : '') + ' ' + String(item.title)}
                            </Text>

                            {item.bullets.map((bullet, i) => (
                                <Text key={i} style={styles.bullet}>• {bullet}</Text>
                            ))}
                        </View>
                    ))}


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
        justifyContent: 'center',
        alignItems: 'center',
    },
    flightRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    detailsRow: {
        padding: 5,
        marginTop: 20,
        marginBottom: 20,
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


    timelineRow: {
        flexDirection: 'row',
        marginTop: 20,
    },
    timeline: {
        width: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timelineItem: {
        alignItems: 'center',
    },
    prevDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#012A86',
    },
    currDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderColor: '#012A86',
        borderWidth: 2,
        backgroundColor: '#81A8FF',
    },
    finalDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#81A8FF',
    },
    verticalLine: {
        height: 50, // adjust based on expected content height
        width: 2,
        backgroundColor: '#ccc',
    },

    content: {
        flex: 1,
        paddingLeft: 10,
    },
    section: {
        marginBottom: 20,
    },
    bullet: {
        fontSize: 12,
        marginVertical: 2,
        marginLeft: 30,
    },
    bold: {
        fontWeight: 'bold',
    },
    footer: {
        fontWeight: '600',
        color: '#999',
    },
});
