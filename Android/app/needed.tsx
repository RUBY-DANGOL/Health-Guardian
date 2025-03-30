import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';

export default function NeededScreen() {
  const router = useRouter();

  const [gender, setGender] = useState('Not Specified');
  const [age, setAge] = useState('71');
  const [height, setHeight] = useState('71');
  const [weight, setWeight] = useState('71');

  const handleContinue = () => {
    // Process or save these values as needed.
    // Then navigate to dashboard.tsx
    router.replace('/dashboard');
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/logo1.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.heading}>Let’s Get Started With The Basics</Text>

      {/* Gender */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Gender</Text>
        <View style={styles.genderRow}>
          <Image
            source={require('../assets/images/gender.png')}
            style={styles.genderIcon}
            resizeMode="contain"
          />
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={[styles.pickerStyle, { flex: 1 }]}
            mode="dropdown"
          >
            <Picker.Item label="Not Specified" value="Not Specified" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>
      </View>

      {/* Age */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Age</Text>
        <View style={styles.dualField}>
          <TextInput
            style={styles.dualFieldInput}
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
          <Text style={styles.dualFieldLabel}>Yrs</Text>
        </View>
      </View>

      {/* Height */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Height</Text>
        <View style={styles.dualField}>
          <TextInput
            style={styles.dualFieldInput}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
          <Text style={styles.dualFieldLabel}>cm</Text>
        </View>
      </View>

      {/* Weight */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>Weight</Text>
        <View style={styles.dualField}>
          <TextInput
            style={styles.dualFieldInput}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <Text style={styles.dualFieldLabel}>Kg</Text>
        </View>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- Styles ----------
const BORDER_COLOR = '#CCC';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
  },
  fieldContainer: {
    width: '100%',
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    fontWeight: '500',
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 44,
  },
  genderIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: '#999',
  },
  pickerStyle: {
    color: '#333',
  },
  dualField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 44,
  },
  dualFieldInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  dualFieldLabel: {
    marginLeft: 8,
    color: '#666',
  },
  continueButton: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#00BCD4',
    paddingVertical: 15,
    borderRadius: 8,
  },
  continueButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
