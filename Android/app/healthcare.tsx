import React, { useCallback } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';

export default function HealthcareScreen() {
  const router = useRouter();

  // Optionally, handle the hardware back button to go to the dashboard
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace('/dashboard'); // navigate to dashboard
        return true; // prevent default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [router])
  );

  return (
    <View style={styles.container}>
      {/* Content without a header */}
      <Text style={styles.contentText}>Welcome to the Healthcare Screen!</Text>
      <Text style={styles.contentText}>
        This screen is full-screen with no top header. Use the hardware back button (or your own in-content button) to return to the Dashboard.
      </Text>
    </View>
  );
}

// Remove the Expo header by setting headerShown to false
HealthcareScreen.options = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  contentText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 8,
  },
});
