import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FlightInfo } from '@/dataType/flight';
import { useRouter } from 'expo-router';
import { format, parseISO, differenceInMinutes } from 'date-fns';

type Props = {
  flightInfo: FlightInfo | null;
};

function formatTime(isoTime: string): string {
  try {
    return format(parseISO(isoTime), 'h:mm a');
  } catch {
    return 'Unknown';
  }
}

function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch {
    return 'Unknown';
  }
}

function getDuration(start: string, end: string): string {
  try {
    const minutes = differenceInMinutes(parseISO(end), parseISO(start));
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  } catch {
    return '—';
  }
}

export default function UpcomingFlight({ flightInfo }: Props) {
  const router = useRouter();

  if (!flightInfo) return null;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: '/(pages)/flightDetails',
          params: { ...flightInfo },
        })
      }
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Upcoming Flight</Text>
          <Text style={styles.text}>{formatDate(flightInfo.date)}</Text>
        </View>

        {/* Flight Path */}
        <View style={styles.flightRow}>
          <View style={styles.locationBox}>
            <Text style={styles.code}>{flightInfo.departure}</Text>
            <Text style={styles.text}>{formatTime(flightInfo.departureTime)}</Text>
          </View>

          <View style={styles.middleBox}>
            <Image
              source={require('../assets/images/plane.png')}
              style={styles.planeIcon}
            />
            <Text style={styles.text}>
              {getDuration(flightInfo.departureTime, flightInfo.arrivalTime)}
            </Text>
          </View>

          <View style={styles.locationBox}>
            <Text style={styles.code}>{flightInfo.arrival}</Text>
            <Text style={styles.text}>{formatTime(flightInfo.arrivalTime)}</Text>
          </View>
        </View>

        {/* Flight Details */}
        <View style={styles.detailsRow}>
          <View>
            <Text style={styles.text}>Flight: {flightInfo.flightNumber}</Text>
            <Text style={styles.text}>Gate: {flightInfo.gate}</Text>
          </View>
          <View>
            <Text style={styles.text}>Status: {flightInfo.status}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    padding: 20,
  },
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
