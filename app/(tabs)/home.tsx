import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
      <Button title="Add Planner" onPress={() => router.replace('/(tabs)/planner')} />
      <Button title="View Planner" onPress={() => router.replace('/(tabs)/viewer')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 50,
    width: 200,
    height: 100,
  },
});
