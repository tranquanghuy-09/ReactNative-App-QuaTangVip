import React from "react";
import { Platform } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPhone from "./src/screens/logins/LoginPhone";
import LoginPassword from "./src/screens/logins/LoginPassword";
import SignUp from "./src/screens/logins/SignUp";
import infoLogin from "./src/screens/logins/infoLogin"

import NearbyStore from "./src/screens/accounts/NearbyStore";
import MainNavigator from "./src/screens/MainNavigator"

import { UserProvider } from "./src/UserContext";

const Stack = createNativeStackNavigator();

function App({ navigation}) {
  return (
    <UserProvider>
    <NavigationContainer>
      
      <Stack.Navigator
        initialRouteName={"NearbyStore"}
        screenOptions={{ headerShown: false }}
      >
        {/* <Stack.Screen name="LoginPhone" component={LoginPhone} />
        <Stack.Screen name="LoginPassword" component={LoginPassword} />
        <Stack.Screen name="MainNavigator" component={MainNavigator}/>
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="infoLogin" component={infoLogin} /> */}
        <Stack.Screen name="NearbyStore" component={NearbyStore} />

        {/* <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Account"
          component={Account}
          options={
            {
              headerShown: true,
              headerTitleAlign: "Cá nhân"
            }
          }
        /> */}

        {/* <Stack.Screen name="Thông tin cá nhân" component={InforUser} />
        <Stack.Screen name="Cửa hàng gần bạn" component={NearbyStore} />
        <Stack.Screen name="Điều khoản Quà Tặng VIP" component={TermsQTVIP} />
        <Stack.Screen
          name="Quản lý ứng dụng"
          component={ApplicationManagement}
        />

        <Stack.Screen
          name="Góp ý, khiếu nại"
          component={SuggestionsAndFeedBack}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="Thông báo" component={Notification} />

        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Theo dõi đơn hàng" component={OrderTracking}    options={
            {
              headerShown: true,
              headerTitleAlign: "Theo dõi dơn hàng"
            }
          }
        />
        <Stack.Screen
          name="Bảo hành, bảo dưỡng"
          component={WarrantyAndMaintenance}
          options={{ headerShown: true }}
        /> */}
      </Stack.Navigator>
      
    </NavigationContainer>
    </UserProvider>
  );
}

export default App;
