import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [usn, setUsn] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUSN = async () => {
      try {
        const storedUsn = await AsyncStorage.getItem('userUSN');
        if (storedUsn) {
          console.log('USN fetched from AsyncStorage:', storedUsn); // Debugging log
          setUsn(storedUsn);
        } else {
          console.log('No USN found in AsyncStorage'); // Debugging log
        }
      } catch (error) {
        console.error('Failed to fetch USN from AsyncStorage', error);
      }
    };

    fetchUSN();
  }, []);

  const handleSignupPress = () => {
    navigation.navigate('SignUp'); // Replace 'SignUp' with the actual name of your SignupScreen route
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Success', 'You have been logged out.');
      navigation.navigate('Login'); // Navigate to Login screen after logout
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
      console.error('Error clearing AsyncStorage', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.usnText}>USN: {usn}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
        <Text style={styles.buttonText}>Go to Signup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  usnText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#34ccff',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff4c4c',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

export default Home;
