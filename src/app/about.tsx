
import { StyleSheet, Text, View } from 'react-native';

export default function AboutTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>About This App</Text>

      <Text style={styles.description}>
        Built for Mobile Application Development
        Lab 6. Demonstrates local notifications
        and Expo Router tab navigation.
      </Text>

      <Text style={styles.footer}>
        Developed with React Native and Expo.
        {'\n'}
        Created by L.G. Praveen Devinda.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111111',
    marginBottom: 10,
  },
  description: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 17,
  },
  footer: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 17,
    marginTop: 35,
  },
});
