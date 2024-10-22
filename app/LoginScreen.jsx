import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'
import { TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Link } from 'expo-router';

export default function LoginScreen() {
  const navigation = useNavigation();


  const handleLogin = () => {
    navigation.navigate("LoginSS");
  };

  return (
    <View>
      <View style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: 100
      }}>
        <Image source={require('./../components/mobileapp.png')} 
          style={{
            width: 220,
            height: 450,
            borderRadius: 2,
            
            
          }} 
        />
      </View>
      <View style={{ backgroundColor: '#fff00', padding: 20 }}>
        <Text style={{
          fontSize: 31,
          fontFamily: 'outfit-bold',
          textAlign: 'center',
          marginTop: -19,
        }}>
          Learning at Your Place With <Text style={{ color: Colors.PRIMARY }}>Diana</Text>
        </Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'outfit',
          textAlign: 'center',
          marginVertical: 15,
          color: Colors.GRAY
        }}>
          Find Your Best Courses with Diana and Learn at your Home
        </Text>

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={{
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'outfit'
          }}>
            Continue With Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 17,
    borderRadius: 99,
    marginTop: 20
  }
})