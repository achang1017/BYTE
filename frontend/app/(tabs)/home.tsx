import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';
import UpcomingFlight from '@/components/upcomingFlight';
import { auth } from '../../firebase';

type FlightInfo = {
  date: string;
  flightNumber: string;
  gate: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  status: string;
};

export default function Home() {

  //TODO connetc the backend
  const userImage = require('../../assets/images/user-icon.png');

  let user;
  if (!auth) {
    user = {
      displayName: 'User',
      photoURL: userImage,
    }
  } else {
    user = auth.currentUser;
  }


  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);

  useEffect(() => {
    const temp: FlightInfo = {
      date: '2023-10-01',
      flightNumber: 'AC123',
      gate: 'A1',
      departure: 'SEA',
      arrival: 'LAX',
      departureTime: '7:20 AM',
      arrivalTime: '10:05 AM',
      duration: '2h 45m',
      status: 'DELAYED',
    };

    setFlightInfo(temp);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hello {user?.displayName}</Text>
          <Text style={styles.subtitle}>How can I help you?</Text>
        </View>
        <Image source={{ uri: user?.photoURL }} style={styles.userImage} />
      </View>

      <View style={styles.section}>
        <UpcomingFlight flightInfo={flightInfo} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  // Text
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    color: '#000',
  },
});
