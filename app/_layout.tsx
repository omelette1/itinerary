import { AuthProvider, useAuth } from '@/AuthContext';
import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

function RootLayoutContent() {
  const { isLoading, userToken } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading app...</Text>
      </View>
    );
  }

  return (
    <Stack>
      {userToken ? (
        // User is authenticated: show your protected screens
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        // User not authenticated: show auth screens
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent />
    </AuthProvider>
  );
}
