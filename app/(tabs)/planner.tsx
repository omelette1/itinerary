import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { Button, Platform, Text, TextInput, View } from 'react-native';

type EventItem = {
  text: string;
  date: Date;
};

export default function TabTwoScreen() {
  const [event, setEvent] = useState('');
  const [eventList, setEventList] = useState<EventItem[]>([]);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const addEvent = () => {
    if (event.trim() !== '') {
      setEventList(prev => [...prev, { text: event, date }]);
      setEvent('');
      setDate(new Date());
    }
    fetch("http://127.0.0.1:5000/add-event", {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "text": event, "date": date })
    })
    .then(() =>
      console.log("yay, owen'sevent was added to the database and stuff")
    )
    .catch((error) =>
      console.log("nooo it didn't work, ", error)
    )
  };

  const onChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Events' }} />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Events</Text>

        <TextInput
          placeholder="Enter an event"
          value={event}
          onChangeText={setEvent}
          style={{ borderColor: 'gray', borderWidth: 1, padding: 8, marginBottom: 10 }}
        />

        <Button title="Pick Date" onPress={() => setShowPicker(true)} />

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}

        <Text style={{ marginVertical: 10 }}>
          Selected Date: {date.toLocaleDateString()}
        </Text>

        <Button title="Submit" onPress={addEvent} />

        <View style={{ marginTop: 20 }}>
          {eventList.map((e, index) => (
            <Text key={index}>
              • {e.text} ({e.date.toLocaleDateString()})
            </Text>
          ))}
        </View>
      </View>
    </>
  );
}
