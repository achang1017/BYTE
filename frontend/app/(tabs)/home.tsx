import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { useState, useEffect } from 'react';

import { auth } from '../../firebase';
import { useAuth } from '../../authContext';

import UpcomingFlight from '@/components/upcomingFlight';
import { FlightInfo } from '@/dataType/flight';
import { AlertType, Alert } from '@/dataType/alert';
import Notification from '@/components/notification';
import 'dotenv/config';

export default function Home() {
  const userImage = '../../assets/images/user-icon.png';
  const user = auth.currentUser;
  const { gmailAccessToken } = useAuth();
  const FLIGHT_API_KEY = process.env.FLIGHT_API_KEY;

  const displayName = user?.displayName || 'User';
  const userPhoto = user?.photoURL || userImage;

  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (!gmailAccessToken) return;

    async function fetchFlightData() {
      try {
        const response = await fetch('http://localhost:3000/api/gmail/flights', {
          headers: {
            Authorization: `Bearer ${gmailAccessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch flight data');
        }

        const data = await response.json();
        setFlightInfo(data[0]);
      } catch (err) {
        console.error('Error fetching flight info:', err);
      }
    }

    fetchFlightData();
  }, [gmailAccessToken]);

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
    if (!flightInfo) return;

    async function checkFlightInterruption() {
      try {
        if (!flightInfo?.departureTime || !flightInfo.flightNumber) {
          throw new Error('Failed to get data from flightInfo');
        }
        const departureTimeUTC = new Date(flightInfo.departureTime).toISOString();

        const response = await fetch(`https://aviation-edge.com/v2/public/timetable?key=${FLIGHT_API_KEY}&flight_iata=${flightInfo.flightNumber}&type=departure&dep_schTime=${departureTimeUTC}`);

        if (!response.ok) {
          throw new Error('Failed to fetch flight schedule');
        }

        const data = await response.json();
        const flight = data[0];

        if (flight && flight.departure?.delay > 0) {
          const flightNumberOnly = flightInfo.flightNumber.replace(/[A-Za-z]/g, '');
          const date = new Date(flightInfo.departureTime).toISOString().split('T')[0]; 
          const delayResponse = await fetch(`https://aviation-edge.com/v2/public/delay_reason?key=${FLIGHT_API_KEY}&flight_number=${flightNumberOnly}&date=${date}`)
          
          if (!delayResponse.ok) {
            throw new Error('Failed to fetch flight delay reason');
          }
          
          const delayData = await delayResponse.json();

          const updatedFlightInfo: FlightInfo = {
            ...flightInfo,
            newDepartureTime: flight.departure.actualTime,
            newArrivalTime: flight.arrival.actualTime,
            status: flight.status,
            delay: flight.departure.delay,
            delayReason: delayData[0]?.delay?.reason,
          };
          setFlightInfo(updatedFlightInfo);
          // need to add new flight data into db

          const newAlert: Alert = {
            id: Date.now(),
            type: AlertType.FlightInteruption,
            flightInfo: flightInfo,
          };

          setAlerts([newAlert]);
        }

        if (flight && flight.status == "canceled") {
          const updatedFlightInfo: FlightInfo = {
            ...flightInfo,
            status: flight.status,
          };
          setFlightInfo(updatedFlightInfo);
          // need to add new flight data into db

          const newAlert: Alert = {
            id: Date.now(),
            type: AlertType.FlightInteruption,
            flightInfo: flightInfo,
          };

          setAlerts([newAlert]);
        }
      } catch (err) {
        console.error('Error checking flight interruption:', err);
      }
    }
    const interval = setInterval(() => {
      checkFlightInterruption();
    }, 5 * 60 * 1000);

    checkFlightInterruption();
    return () => clearInterval(interval);
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
