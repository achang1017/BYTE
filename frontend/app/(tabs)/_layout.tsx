import { Image, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ }) => (
            <Image
              source={require('../../assets/images/home-icon.png')}
              style={styles.logo}

            />
          ),
        }}
      />
      <Tabs.Screen name="flight" options={{
        title: 'Flights', tabBarIcon: ({ }) => (
          <Image
            source={require('../../assets/images/flightTracker-icon.png')}
            style={styles.logo}

          />
        ),
      }} />
      <Tabs.Screen name="chat" options={{
        title: 'Chat', tabBarIcon: ({ }) => (
          <Image
            source={require('../../assets/images/chatbot-icon.png')}
            style={styles.logo}

          />
        ),
      }} />
      <Tabs.Screen name="schedule" options={{
        title: 'Schedule', tabBarIcon: ({ }) => (
          <Image
            source={require('../../assets/images/reschedule-icon.png')}
            style={styles.logo}

          />
        ),
      }} />
      <Tabs.Screen name="setting" options={{
        title: 'Setting', tabBarIcon: ({ }) => (
          <Image
            source={require('../../assets/images/user-icon.png')}
            style={styles.logo}
          />
        ),
      }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 15,
    height: 15,
  }
})
