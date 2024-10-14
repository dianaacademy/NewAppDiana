import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Colors, colors} from '../../constants/Colors'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false ,
      tabBarActiveTintColor: Colors.PRIMARY
    }}>
      <Tabs.Screen 
        name='home'
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontFamily: 'outfit', 
            fontSize: 13,
            
          },
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />
        }}
      />
      <Tabs.Screen name='explore'
       options={{
        tabBarLabel: 'Explore',
        tabBarLabelStyle: {
          fontFamily: 'outfit', 
          fontSize: 13,
          
        },
        tabBarIcon: ({ color }) => <MaterialIcons name="explore" size={24} color={color} />
      }} />
      <Tabs.Screen name='profile' 
       options={{
        tabBarLabel: 'Profile',
        tabBarLabelStyle: {
          fontFamily: 'outfit', 
          fontSize: 13,
          
        },
        tabBarIcon: ({ color }) => <MaterialIcons name="people" size={24} color={color} />
      }}/>
    </Tabs>
  )
}
