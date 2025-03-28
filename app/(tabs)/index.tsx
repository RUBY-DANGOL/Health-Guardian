import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo1.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Health Guardian</Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          // Navigate to the Login screen
          router.push('/login');
        }}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signUpButton}
        onPress={() => {
          // Navigate to the Sign Up screen
          router.push('/signup');
        }}
      >
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

// ... same styles as before


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#00BCD4',
    fontWeight: '600',
    marginBottom: 40,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#00BCD4',
    paddingVertical: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  signUpButton: {
    width: '100%',
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#00BCD4',
    borderRadius: 6,
  },
  signUpButtonText: {
    color: '#00BCD4',
    textAlign: 'center',
    fontSize: 16,
  },
});
