import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function BorderedBoxes() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Email Address:</Text>
      </View>
      <View style={styles.box}>
        <Text>Phone Number:</Text>
      </View>
      <View style={styles.box}>
        <Text>Address:</Text>
      </View>
      <View style={styles.box}>
        <Text>Birthday:</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  box: {
    width: 200,
    height: 100,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
});
