import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../Context/AuthContext';
import { auth } from '../../firebase.config';
import { signOut } from 'firebase/auth';
import Services from '../Shared/Services';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const { userData, setUserData } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (userData) {
      setUserName(userData.name || userData.email?.split('@')[0] || 'User');
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Yes, Logout",
            onPress: async () => {
              try {
                // Sign out from Firebase
                await signOut(auth);
                // Clear AsyncStorage using the Logout function from Services
                await Services.Logout();
                // Clear context
                setUserData(null);
                // Navigate back to login
                navigation.replace('LoginSS');
              } catch (error) {
                console.error('Logout error:', error);
                Alert.alert('Error', 'Failed to logout. Please try again.');
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome back, <Text style={styles.highlightText}>{userName}</Text>
      </Text>
      <Text style={styles.subText}>
        Browse Course and Enroll
      </Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 70,
  },
  welcomeText: {
    fontSize: 31,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    marginTop: -19,
  },
  highlightText: {
    color: Colors.PRIMARY,
  },
  subText: {
    fontSize: 15,
    fontFamily: 'outfit',
    textAlign: 'center',
    marginVertical: 15,
    color: Colors.GRAY,
  },
  logoutButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 17,
    borderRadius: 99,
    marginTop: 20,
  },
  logoutText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'outfit',
  },
});

export default Home;