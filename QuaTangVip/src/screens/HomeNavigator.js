import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import GiftScreen from './Gift';
import Home from './Home';
import OnlineSupport from './OnlineSupport';
import ScheduleCleaning from './ScheduleCleaning';
import OrderEquipmentCleaningScreen from './equipment_cleanings/OrderEquipmentCleaning';

const Stack = createStackNavigator();

const HomeNavigation = ({navigation, route}) => {
    const isIPhone = Platform.OS === 'ios';
    React.useLayoutEffect(() => {
        const tabHiddenRoutes = ["Hỗ trợ trực tuyến","Quà của tôi", "Đặt lịch vệ sinh thiết bị", "OrderEquipmentCleaningScreen"];
        if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        } else {
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName='OrderEquipmentCleaningScreen'>
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
            
        }}
        
        />
        <Stack.Screen name="Hỗ trợ trực tuyến" component={OnlineSupport} options={{
            headerTitleAlign: 'left',
            title: '',
            headerBackground: () => (
                <View style={{backgroundColor: 'white', flex: 1}}/>
            ),
            headerLeft: () => (
                <View style={{ paddingLeft: 20, alignItems: 'center', alignItems: 'center', }} >
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity onPress={() => navigation.navigate("Trang chủ")} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../../assets/icons/back.png')} style={{ width: 24, height: 20,}} />
                        </TouchableOpacity>
                    </View>
                </View>
            ),
            headerTitle: () => (
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ marginLeft: 10, fontSize: isIPhone ?24:24, fontWeight: 700, color: '#000', width: 181, height: 66}}>Hỗ trợ kỹ thuật trực tuyến</Text>
                </View>
            ),
            headerStatusBarHeight: 80,
            headerTitleContainerStyle: {
                paddingBottom: 30,
            },
            headerLeftContainerStyle: {
                paddingBottom: 30,
            },
            headerRight:()=>(
                <View style={{ paddingRight: 21, alignItems: 'center', alignItems: 'center', paddingBottom: 40}} >
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../assets/icons/call.png')} style={{ width: 45, height: 45,}} />
                    </TouchableOpacity>
                </View>
            ),
            
        }}/>
        <Stack.Screen name="Đặt lịch vệ sinh thiết bị" component={ScheduleCleaning} options={{
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
        }}
        
        />
        <Stack.Screen name="OrderEquipmentCleaningScreen" component={OrderEquipmentCleaningScreen} options={{
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
        }}
        
        />
    </Stack.Navigator>

  )
}

export default HomeNavigation