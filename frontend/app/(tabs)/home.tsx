import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { auth } from '../../firebase';
import { useAuth } from '../../authContext';

import UpcomingFlight from '@/components/upcomingFlight';
import { FlightInfo } from '@/dataType/flight';
import { AlertType, Alert } from '@/dataType/alert';
import Notification from '@/components/notification';



export default function Home() {


  const userImage = '../../assets/images/user-icon.png';
  const user = auth.currentUser;
  const { accessToken } = useAuth();

  const displayName = user?.displayName || 'User';
  const userPhoto = user?.photoURL || userImage;


  // connect with firbase 
  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);

  // if you wanna test calendar sync when getting flight info doesn't work, use this hard coded info

  useEffect(() => {
    setFlightInfo({
      date: '2023-10-01',
      departure: 'LAX',
      departureTime: '2025-04-20T07:00:00-07:00',
      arrival: 'JFK',
      arrivalTime: '2025-04-20T12:00:00-04:00',
      flightNumber: 'DL123',
      gate: 'A1',
      status: 'On Time',
      duration: '6h 0m',
    });
  }, []);

  useEffect(() => {

    async function fetchFlightData() {
      try {
        if (!accessToken) {
          throw new Error('User token not available');
        }

        const response = await fetch('http://localhost:3000/api/flights', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch flight data');
        }

        const data = await response.json();
        setFlightInfo(data[0]);
      } catch (err) {
        console.error(err);
      }
    }

    fetchFlightData();
  }, []);

  const [alerts, setAlerts] = useState<Alert[]>([]);

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


  const dismissAlert = (id: number) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };


  return (
    <ScrollView style={styles.container}>
      {/*User Info Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hello {displayName}</Text>
          <Text style={styles.subtitle}>How can I help you?</Text>
        </View>
        <Image source={{ uri: userPhoto }} style={styles.userImage} />
      </View>

      {/* Upcoming flight section */}
      <View style={styles.section}>
        <UpcomingFlight flightInfo={flightInfo} />
      </View>

      {/* Alert section */}
      <View style={styles.section}>
        {alerts.map(alert => (
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
