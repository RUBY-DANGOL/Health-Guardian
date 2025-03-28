// login.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// If you're storing user data in memory:
import { usersInMemory } from '../data/store'; // optional

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    // Optional: If you're checking an in-memory list of users:
    const foundUser = usersInMemory.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      Alert.alert('Success', 'You are logged in!');
      setEmail('');
      setPassword('');
      // Navigate to needed.tsx
      router.replace('/needed');
    } else {
      Alert.alert('Error', 'Invalid credentials. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo1.png')}
        style={styles.logo}
        resizeMode="contain"
      />
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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* If you have a Sign Up page */}
      <View style={styles.bottomTextContainer}>
        <Text style={styles.dontHaveText}>Don’t have an Account ? </Text>
        <TouchableOpacity onPress={() => router.replace('/signup')}>
          <Text style={styles.signUpLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Same styling as before
const BORDER_COLOR = '#00BCD4';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    color: BORDER_COLOR,
    fontSize: 16,
  },
  iconWrapper: {
    paddingHorizontal: 5,
  },
  loginButton: {
    width: '100%',
    backgroundColor: BORDER_COLOR,
    paddingVertical: 15,
    borderRadius: 6,
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dontHaveText: {
    color: '#000',
    fontSize: 14,
  },
  signUpLink: {
    color: BORDER_COLOR,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
