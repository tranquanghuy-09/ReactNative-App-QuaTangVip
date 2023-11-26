import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
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
import OrderTracking from "./order_trackings/OrderTracking"
import WarrantyAndMaintenance from "./warranty_maintenances/WarrantyAndMaintenance"
import SuggestionsAndFeedBack from "./feedbacks/SuggestionsAndFeedBack"
import Camera from "./feedbacks/Camera"
import NearbyStore from "./accounts/NearbyStore"

const Stack = createStackNavigator();

const HomeNavigation = ({navigation, route}) => {
    const handleCallPress = () => {
        Linking.openURL('tel:19009198'); 
    };

    const isIPhone = Platform.OS === 'ios';
    React.useLayoutEffect(() => {
        const tabHiddenRoutes = ["Hỗ trợ trực tuyến","Quà của tôi", "Đặt lịch vệ sinh thiết bị", "OrderEquipmentCleaningScreen", "Góp ý, khiếu nại", "Camera", "Cửa hàng gần bạn"];
        if(tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))){
            navigation.setOptions({tabBarStyle: {display: 'none'}});
        } else {
            navigation.setOptions({tabBarStyle: {display: 'flex'}});
        }
    }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName='Trang chủ'>
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
                    <TouchableOpacity onPress={handleCallPress} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
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
        <Stack.Screen name='OrderTracking' component={OrderTracking}/>
        <Stack.Screen name='WarrantyAndMaintenance' component={WarrantyAndMaintenance}/>
        <Stack.Screen name='Góp ý, khiếu nại' component={SuggestionsAndFeedBack}/>
        <Stack.Screen name='Camera' component={Camera}/>
        <Stack.Screen name='Cửa hàng gần bạn' component={NearbyStore} options={{headerShown: false}}/>
    </Stack.Navigator>

  )
}

export default HomeNavigation