import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  // Updated function to navigate based on block name
  const handleBlockPress = (blockName: string) => {
    if (blockName === 'Healthcare') {
      router.replace('/healthcare'); // Navigate to healthcare.tsx
    } else {
      console.log(`${blockName} block pressed!`);
      // You can add additional navigation logic for other blocks if needed
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header (Greeting + Avatar) */}
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Hi, Guardian!</Text>
        <Image
          source={require('../assets/images/avatar.png')}
          style={styles.avatar}
        />
      </View>

      {/* --- Block 1: Normal Full-Width Image --- */}
      <View style={styles.blockWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleBlockPress('Healthcare')}
        >
          <Image
            source={require('../assets/images/healthcare.png')}
            style={styles.blockImage1}
          />
        </TouchableOpacity>
        <Text style={styles.blockTitle}>Find your all reports at same place</Text>
        <Text style={styles.blockSubtitle}>
          Access your healthcare documents and records in one convenient location.
        </Text>
      </View>

      {/* --- Block 2: HORIZONTAL SWIPABLE SERVICES --- */}
      <View style={styles.swipeableWrapper}>
        <Text style={styles.swipeableHeader}>Services</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={styles.horizontalScroll}
        >
          {/* Slide 1: Medication Schedule */}
          <TouchableOpacity
            style={[styles.slide, { backgroundColor: '#ADD8E6' }]}
            activeOpacity={0.8}
            onPress={() => handleBlockPress('Medication Schedule')}
          >
            <Image
              source={require('../assets/images/frame1.png')}
              style={styles.slideImage1}
            />
            <Text style={styles.slideTitle}>Medication Schedule</Text>
            <Text style={styles.slideSubtitle}>
              Simple Pickup At Your Home.
            </Text>
          </TouchableOpacity>

          {/* Slide 2: Instant Video Consultation */}
          <TouchableOpacity
            style={[styles.slide, { backgroundColor: '#C8E6C9' }]}
            activeOpacity={0.8}
            onPress={() => handleBlockPress('Instant Video Consultation')}
          >
            <Image
              source={require('../assets/images/consultation.png')}
              style={styles.slideImage2}
            />
            <Text style={styles.slideTitle}>Instant Video Consultation</Text>
            <Text style={styles.slideSubtitle}>
              Connect Within 60 Seconds.
            </Text>
          </TouchableOpacity>

          {/* Slide 3: Bot Control */}
          <TouchableOpacity
            style={[styles.slide, { backgroundColor: '#F8BBD0' }]}
            activeOpacity={0.8}
            onPress={() => handleBlockPress('Bot Control')}
          >
            <Image
              source={require('../assets/images/bot.png')}
              style={styles.slideImage3}
            />
            <Text style={styles.slideTitle}>Bot Control</Text>
            <Text style={styles.slideSubtitle}>
              Dementia Bot, A Smart Companion
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* --- Block 3: Normal Full-Width Image --- */}
      <View style={styles.blockWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleBlockPress('Healthy Lifestyle Tips')}
        >
          <Image
            source={require('../assets/images/frame.png')}
            style={styles.blockImage2}
          />
        </TouchableOpacity>
        <Text style={styles.blockTitle}>Our Tips for your Healthy Lifestyle</Text>
        <Text style={styles.blockSubtitle}>
          Nutrition & Mental Health guidance to keep you feeling your best.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    justifyContent: 'space-between',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  blockWrapper: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  blockImage1: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  blockImage2: {
    width: '100%',
    height: 498,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
  blockSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  swipeableWrapper: {
    marginBottom: 20,
  },
  swipeableHeader: {
    marginHorizontal: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  horizontalScroll: {
    // Optional styling for the horizontal scroller
  },
  slide: {
    width: 300,
    borderRadius: 10,
    marginHorizontal: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideImage1: {
    width: 150,
    height: 150,
    marginBottom: 30,
    marginTop: 10,
    resizeMode: 'contain',
  },
  slideImage2: {
    width: 150,
    height: 160,
    marginBottom: 30,
    marginTop: 10,
    resizeMode: 'contain',
  },
  slideImage3: {
    width: 220,
    height: 190,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  slideSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
