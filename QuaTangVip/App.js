import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPhone from "./src/screeens/LoginPhone";
import LoginPassword from "./src/screeens/LoginPassword";
import SignUp from "./src/screeens/SignUp";
import Home from "./src/screeens/Home";
import Account from "./src/screeens/Account";
//Con accoutn
import InforUser from "./src/screeens/InforUser";
import NearbyStore from "./src/screeens/NearbyStore";
import TermsQTVIP from "./src/screeens/TermsQTVIP";
import ApplicationManagement from "./src/screeens/ApplicationManagement";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Cửa hàng gần bạn"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginPassword" component={LoginPassword} />
        <Stack.Screen name="LoginPhone" component={LoginPhone} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Account" component={Account} />

        <Stack.Screen name="Thông tin cá nhân" component={InforUser} />
        <Stack.Screen name="Cửa hàng gần bạn" component={NearbyStore} />
        <Stack.Screen name="Điều khoản Quà Tặng VIP" component={TermsQTVIP} />
        <Stack.Screen
          name="Quản lý ứng dụng"
          component={ApplicationManagement}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
