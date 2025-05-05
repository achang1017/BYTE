import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
<<<<<<< Updated upstream
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
=======
import { useState, useEffect, useLayoutEffect } from 'react';
>>>>>>> Stashed changes

import { auth, db } from '../../firebase';
import { useAuth } from '../../authContext';

import UpcomingFlight from '@/components/upcomingFlight';
import { FlightInfo } from '@/dataType/flight';
import { AlertType, Alert } from '@/dataType/alert';
import Notification from '@/components/notification';

export default function Home() {
  const userImage = '../../assets/images/user-icon.png';
  const user = auth.currentUser;
  const displayName = user?.displayName || 'User';
  const userPhoto = user?.photoURL || userImage;

  const [upcomingFlights, setUpcomingFlights] = useState<FlightInfo[]>([])
  const [loading, setLoading] = useState(false);
  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([]);

  async function fetchFlightData() {
    try {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const userId = currentUser.uid;
      const flightsQuery = query(
        collection(db, 'flights'),
        where('userId', '==', userId),
        orderBy('departureTime')
      );

      const querySnapshot = await getDocs(flightsQuery);
      const flights = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as FlightInfo),
      }));

      if (flights.length > 0) {
        setFlightInfo(flights[0]); // Closest upcoming flight
      } else {
        console.log('No upcoming flights found');
      }
    } catch (err) {
      console.error('Error fetching flight info:', err);
    }
  }

  useEffect(() => {
    fetchFlightData();
  }, []);

  useEffect(() => {
    if (!flightInfo) return;

    const newAlerts: Alert[] = [
      {
        id: 1,
        type: AlertType.FlightInteruption,
        flightInfo,
      },
      {
        id: 2,
        type: AlertType.MeetingConflict,
        flightInfo,
      },
    ];

    setAlerts(newAlerts);
  }, [flightInfo]);

  useEffect(() => {
    const fetchUpcomingFlights = async () => {
      if (!user?.uid) return;

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/api/firestore/upcoming-flights/${user.uid}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch upcoming flights');
        }

        const data = await response.json();
        setUpcomingFlights(data);
      } catch (error) {
        console.error('Error fetching upcoming flights:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingFlights();
  }, [user?.uid]);


  const dismissAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Info Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hello {displayName}</Text>
          <Text style={styles.subtitle}>How can I help you?</Text>
        </View>
        <Image source={{ uri: userPhoto }} style={styles.userImage} />
      </View>

      {/* Upcoming flight section */}
      <View style={styles.section}>
<<<<<<< Updated upstream
        {flightInfo ? (
          <UpcomingFlight flightInfo={flightInfo} />
        ) : (
          <Text>No upcoming flights</Text>
=======
      {loading ? (
          <Text>Loading upcoming flights...</Text>
        ) : upcomingFlights.length > 0 ? (
          upcomingFlights.map((flight) => <UpcomingFlight key={flight.id} flightInfo={flight} />)
        ) : (
          <Text>No upcoming flights found.</Text>
>>>>>>> Stashed changes
        )}
      </View>

      {/* Alert section */}
      <View style={styles.section}>
        {alerts.map((alert) => (
          <Notification
            key={alert.id}
            alertType={alert.type}
            flightInfo={alert.flightInfo}
            onDismiss={() => dismissAlert(alert.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
  },
  section: {
    marginTop: 20,
    marginBottom: 20,
  },
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
  title: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    color: '#000',
  },
});
