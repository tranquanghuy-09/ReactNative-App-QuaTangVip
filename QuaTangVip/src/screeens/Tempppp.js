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
//Con trang chủ
import SuggestionsAndFeedBack from "./src/screeens/SuggestionsAndFeedBack";
import Camera from "./src/screeens/Camera";
import Notification from "./src/screeens/Notification";
import OrderTracking from "./src/screeens/OrderTracking";
import WarrantyAndMaintenance from "./src/screeens/WarrantyAndMaintenance";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Bảo hành, bảo dưỡng"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginPhone" component={LoginPhone} />
        <Stack.Screen name="LoginPassword" component={LoginPassword} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Account"
          component={Account}
          options={
            {
              headerShown: true,
              headerTitleAlign: "Cá nhân"
            }
          }
        />

        <Stack.Screen name="Thông tin cá nhân" component={InforUser} />
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
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
