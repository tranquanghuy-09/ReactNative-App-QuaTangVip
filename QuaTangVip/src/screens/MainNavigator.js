import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {Ionicons, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import HomeNavigation from './HomeNavigator';
import History from './History';
import ScreenQR from './ScreenQR';
import Account from './Account';
import Notification from './Notification';

const Tab = createBottomTabNavigator();

export default function App({navigation, route}) {
  return (
      <Tab.Navigator initialRouteName='HomeNavigation' screenOptions={{ headerShown: false, }}>
        <Tab.Screen name="HomeNavigation" component={HomeNavigation} 
          options={{
            tabBarLabel: 'Trang chủ',
            tabBarIcon: ({ focused, color, size }) => (
              focused 
              ? <Ionicons name="home" size={24} color="rgb(255, 191, 62)" /> 
              : <Ionicons name="home-outline" size={24} color="black" />
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? 'rgb(255, 191, 62)' : color }}>
                Trang chủ
              </Text>
            ),
          }}
        />
        <Tab.Screen name="Lịch sử" component={History} 
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              focused 
              ? <MaterialIcons name="history-edu" size={24} color="rgb(255, 191, 62)" />
              : <MaterialIcons name="history-edu" size={24} color="black" />
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? 'rgb(255, 191, 62)' : color }}>
                Lịch sử
              </Text>
            ),
          }}
        />
        <Tab.Screen name="QR" component={ScreenQR} 
          options={{
            tabBarLabel: '',
            tabBarIcon: ()=>(
            <View style={{backgroundColor: 'rgb(255, 191, 62)', width: 50, height: 50, marginTop: 0, justifyContent: 'center', alignItems: 'center', borderRadius: 17}}>  
              <MaterialCommunityIcons name="qrcode-scan" size={26} color="black" />
            </View>
            ),
          }}
        />
        <Tab.Screen name="Thông báo" component={Notification} 
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              focused 
              ? <Ionicons name="notifications-sharp" size={24} color="rgb(255, 191, 62)" />
              : <Ionicons name="notifications-outline" size={24} color="black" />
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? 'rgb(255, 191, 62)' : color }}>
                Thông báo
              </Text>
            ),
          }}
        />
        <Tab.Screen name="Tài khoản" component={Account} 
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              focused 
              ? <MaterialIcons name="account-circle" size={24} color="rgb(255, 191, 62)" />
              : <MaterialIcons name="account-circle" size={24} color="black" />
            ),
            tabBarLabel: ({ focused, color }) => (
              <Text style={{ color: focused ? 'rgb(255, 191, 62)' : color }}>
                Account
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
  );
}
