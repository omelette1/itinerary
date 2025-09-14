import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack initialRouteName='index'>
      <Stack.Screen name="..." />
      <Stack.Screen name="index" options={{ title: 'login' }} />

      <Stack.Screen name="signup" options={{ title: 'signup' }} />

      {/* Add more screens as needed */}
    </Stack>
  );
}
