import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { TouchableOpacity } from 'react-native';

const home = () => {
  return (
   
      <View style={{ padding: 20, paddingTop: 70 }}>
        <Text style={{
          fontSize: 31,
          fontFamily: 'outfit-bold',
          textAlign: 'center',
          marginTop: -19,
        }}>
          You Have Logged in <Text style={{ color: Colors.PRIMARY }}>Diana</Text>
        </Text>
        <Text style={{
          fontSize: 15,
          fontFamily: 'outfit',
          textAlign: 'center',
          marginVertical: 15,
          color: Colors.GRAY
        }}>
          Browse Course and Enroll
        </Text>

        <TouchableOpacity style={styles.btn} >
          <Text style={{
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'outfit'
          }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    
  )
}

export default home

const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 17,
    borderRadius: 99,
    marginTop: 20
  }
})