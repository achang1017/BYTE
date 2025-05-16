import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { auth, db } from '../../firebase';
import { useAuth } from '../../authContext';

import UpcomingFlight from '@/components/upcomingFlight';
import { FlightInfo } from '@/dataType/flight';
import { AlertType, Alert } from '@/dataType/alert';
import Notification from '@/components/notification';

import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

export default function Home() {
  const userImage = '../../assets/images/user-icon.png';
  const user = auth.currentUser;
  const { gmailAccessToken, accessToken } = useAuth();

  const displayName = user?.displayName || 'User';
  const userPhoto = user?.photoURL || userImage;

  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [conflicts, setConflicts] = useState<any[]>([]);

  function attachOffsetToISOString(base: string, referenceWithOffset: string): string {
    const offsetMatch = referenceWithOffset.match(/([+-]\d{2}:\d{2})$/);
    if (!offsetMatch) throw new Error('Invalid reference offset format');

    const offset = offsetMatch[1];
    const trimmed = base.replace(/\.000$/, '');

    return `${trimmed}${offset}`;
  }

  // Fetch from Firestore directly
  useEffect(() => {
    const fetchFlightsFromFirestore = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(`http://localhost:3000/api/gmail/flights?email=${auth.currentUser!.email ?? ''}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch flight data');
        }

        const data = await response.json();
        if (data.length > 0) {
          const flightInfo = data[0];
          setFlightInfo(flightInfo);
        } else {
          console.log('No valid flights found for this user.');
        }
      } catch (err) {
        console.error('Error fetching flight info:', err);
      }


    };

    fetchFlightsFromFirestore();
  }, [user]);

  useEffect(() => {
    const checkConflicts = async () => {

      if (!flightInfo || !flightInfo.flightNumber || !flightInfo.arrivalTime || !flightInfo.departureTime) return;
      const departureTime = new Date(flightInfo.newDepartureTime || flightInfo.departureTime).toISOString();
      const arrivalTime = new Date(flightInfo.newArrivalTime || flightInfo.arrivalTime).toISOString();
      const res = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${departureTime}&timeMax=${arrivalTime}&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await res.json();

      const calendarEvents = data.items || [];
      setConflicts(calendarEvents);

      if (calendarEvents.length > 0) {
        const calendarAlert: Alert = {
          id: 2,
          type: AlertType.MeetingConflict,
          flightInfo,
          conflicts: calendarEvents,
        };

        setAlerts(prev => {
          const deletePrevConflictAlert = prev.filter(alert => alert.type !== AlertType.MeetingConflict);
          return [...deletePrevConflictAlert, calendarAlert];
        });
      }
    };

    checkConflicts();
  }, [flightInfo]);

  useEffect(() => {
    if (!flightInfo || !flightInfo.flightNumber || !flightInfo.departure || !flightInfo.departureTime) return;

    async function checkFlightInterruption() {
      try {
        if (!flightInfo) return;
        const response = await fetch(`http://localhost:3000/api/flightInterruption?flightNumber=${flightInfo.flightNumber}&departure=${flightInfo.departure}&departureTime=${flightInfo.departureTime}`);

        if (!response.ok) throw new Error('Failed to fetch flight interruption');

        const flight = await response.json();
        let newFlightInfo = flightInfo;
        if (flight.departure?.delay && flight.departure?.delay != flightInfo.delay) {

          newFlightInfo = {
            ...flightInfo,
            status: flight.status,
            delay: flight.departure?.delay,
            newDepartureTime: flight.departure?.estimatedTime
              ? attachOffsetToISOString(flight.departure.estimatedTime, flightInfo.departureTime)
              : flight.departure?.estimatedTime,
            newArrivalTime: flight.arrival?.estimatedTime
              ? attachOffsetToISOString(flight.arrival.estimatedTime, flightInfo.departureTime)
              : flight.arrival?.estimatedTime,
          };
          setFlightInfo(newFlightInfo);

          await fetch('http://localhost:3000/api/updateFlight', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              flightInfo: newFlightInfo,
            }),
          });
        }

        if (flight.departure?.delay > 0) {
          const flightAlert: Alert = {
            id: 1,
            type: AlertType.FlightInteruption,
            flightInfo: newFlightInfo,
          }
          setAlerts(prev => {
            const deletePrevFlightAlert = prev.filter(alert => alert.type !== AlertType.FlightInteruption);
            return [...deletePrevFlightAlert, flightAlert];
          });
        }
      } catch (err) {
        console.error('Error checking flight interruption:', err);
      }
    }
    const interval = setInterval(() => {
      checkFlightInterruption();
    }, 1 * 60 * 1000);

    checkFlightInterruption();
    return () => clearInterval(interval);
  }, [flightInfo]);

  const dismissAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Hello {displayName}</Text>
          <Text style={styles.subtitle}>How can I help you?</Text>
        </View>
        <Image source={{ uri: userPhoto }} style={styles.userImage} />
      </View>

      <View style={styles.section}>
        <UpcomingFlight flightInfo={flightInfo} />
      </View>

      <View style={styles.section}>
        {alerts.map((alert) => (
          <Notification
            key={alert.id}
            alertType={alert.type}
            flightInfo={alert.flightInfo}
            onDismiss={() => dismissAlert(alert.id)}
            conflicts={alert.conflicts}
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
