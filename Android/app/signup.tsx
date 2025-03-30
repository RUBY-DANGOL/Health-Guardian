// signup.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// 1) Import from store
import { addUser } from '../data/store';

export default function SignUpScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // 2) Add user to in-memory array
    addUser({ email, password });

    Alert.alert('Success', 'User saved in memory!');
    // Reset fields
    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
      {/* UI is the same as before */}
      <Image
        source={require('../assets/images/logo1.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Email input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="example@example.com"
          placeholderTextColor="#00BCD4"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {/* Password input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.textInput, { flex: 1 }]}
          placeholder="********"
          placeholderTextColor="#00BCD4"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.iconWrapper}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={24}
            color="#00BCD4"
          />
        </TouchableOpacity>
      </View>
      {/* Sign Up button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Already Have Account? Sign in */}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.alreadyText}>Already Have Account ? </Text>
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.signInLink}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// -- Styles as before --


const BORDER_COLOR = '#00BCD4';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // White background
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
  },
  textInput: {
    color: '#00BCD4',
    fontSize: 16,
  },
  iconWrapper: {
    paddingHorizontal: 5,
  },
  signUpButton: {
    width: '100%',
    backgroundColor: BORDER_COLOR,
    paddingVertical: 15,
    borderRadius: 6,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyText: {
    color: '#000',
    fontSize: 14,
  },
  signInLink: {
    color: BORDER_COLOR,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
