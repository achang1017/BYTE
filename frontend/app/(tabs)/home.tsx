import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { auth, db } from '../../firebase';
import { useAuth } from '../../authContext';

import UpcomingFlight from '@/components/upcomingFlight';
import { FlightInfo } from '@/dataType/flight';
import { AlertType, Alert } from '@/dataType/alert';
import Notification from '@/components/notification';

import { collection, getDocs } from 'firebase/firestore';

export default function Home() {
  const userImage = '../../assets/images/user-icon.png';
  const user = auth.currentUser;
  const { gmailAccessToken } = useAuth();

  const displayName = user?.displayName || 'User';
  const userPhoto = user?.photoURL || userImage;

  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  // Fetch from Firestore directly
  useEffect(() => {
    const fetchFlightsFromFirestore = async () => {
      if (!user?.email) return;
  
      try {
        const tripsRef = collection(db, 'users', user.email, 'trips');
        const snapshot = await getDocs(tripsRef);
  
        if (!snapshot.empty) {
          const firstTrip = snapshot.docs[0].data();
          setFlightInfo(firstTrip as FlightInfo);
        } else {
          console.log('No trips found for this user.');
        }
      } catch (err) {
        console.error('Error fetching trip info from Firestore:', err);
      }
    };
  
    fetchFlightsFromFirestore();
  }, [user]);

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
        <UpcomingFlight flightInfo={flightInfo} />
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
