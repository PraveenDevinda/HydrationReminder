import *as Notifications from 'expo-notifications';
import {useEffect, useState} from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';

export default function ReminderTab(){
  const [isReminding, setIsReminding]=useState(false);
  const [message, setMessage]=useState("Time to drink a glass of water");
  const [intervalMinutes, setIntervalMinutes]=useState(1);

  useEffect(()=>{
    async function requestPermission(){
      const {status} = await Notifications.requestPermissionsAsync();
      if(status !=='granted'){
        Alert.alert(
          'Permission  required',
          'We need notifications to remind you to drink water!'
        );
      }
    }
    requestPermission();
  }, []);

  async function scheduleReminder(){
    await Notifications.requestPermissionsAsync();
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.scheduleNotificationAsync({
      content:{
        title:"💧 Hydration Alert", 
        body: message,
        sound: true,
      },

      trigger:{
        type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: intervalMinutes *60,
        repeats: true
      },
    });

    setIsReminding(true);
    Alert.alert("Set!", `Reminding you every ${intervalMinutes} minutes.`);
  }

  async function stopReminder(){
    await Notifications.cancelAllScheduledNotificationsAsync();
    setIsReminding(false);
    Alert.alert("Stopped", "Reminders cancelled.");
  }

  return(
    <View style={styles.container}>
      <Text style={styles.emoji}>🥤</Text>

      <Text style={styles.label}>Add a custom message</Text>
      <TextInput
      style={styles.input}
      placeholder="Enter your reminder message"
      value={message}
      onChangeText={setMessage}/>

      <Text style={styles.label}>Set Interval(minutes)</Text>
      <TextInput
      style={styles.input}
      value={intervalMinutes.toString()}
      onChangeText={(text)=>setIntervalMinutes(parseInt(text)||1)}
      keyboardType='numeric'
      />

      <Text style={styles.status}>
        Status:{isReminding ? "Active 🟢": "Inactive 🔴"}
      </Text>

      <Button
      title="Start Reminder"
      onPress={scheduleReminder}/>

      <View style={{height:10}}/>

      <Button
      title="Stop Reminder"
      color="red"
      onPress={stopReminder}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F0F9FF',
  },
  emoji: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#0EA5E9',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  status: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});