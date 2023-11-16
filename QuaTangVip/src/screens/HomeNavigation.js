import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

import GiftScreen from '../screens/Gift';
import Home from '../screens/Home';

const Stack = createStackNavigator();

const HomeNavigation = ({navigation}) => {
    const isIPhone = Platform.OS === 'ios';
  return (
    <Stack.Navigator initialRouteName='Quà của tôi'>
        <Stack.Screen name="Trang chủ" component={Home} options={{headerShown: false}}/>
        <Stack.Screen name="Quà của tôi" component={GiftScreen} options={{
            headerTitleAlign: 'left',
            headerTitleStyle: {
                fontSize: isIPhone?15:17,
                fontWeight: 400,
                color: '#1A93D4',
            },
            title: '',
            headerBackground: () => (
                <View style={{backgroundColor: 'rgba(245, 245, 245, 1)', flex: 1}}/>
            ),
        }}/>
    </Stack.Navigator>

  )
}

export default HomeNavigation