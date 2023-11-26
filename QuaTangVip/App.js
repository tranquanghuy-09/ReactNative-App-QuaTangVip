import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import LoginPhone from "./src/screeens/LoginPhone";
// import LoginPassword from "./src/screeens/LoginPassword";
// import SignUp from "./src/screeens/SignUp";
// import Home from "./src/screeens/Home";
// import Account from "./src/screeens/Account";
//Con accoutn
import InforUser from "./src/screeens/InforUser";
// import NearbyStore from "./src/screeens/NearbyStore";
// import TermsQTVIP from "./src/screeens/TermsQTVIP";
// import ApplicationManagement from "./src/screeens/ApplicationManagement";
// //Con trang chủ
import SuggestionsAndFeedBack from "./src/screeens/SuggestionsAndFeedBack";
import Camera from "./src/screeens/Camera";
// import Notification from "./src/screeens/Notification";
// import OrderTracking from "./src/screeens/OrderTracking";
// import WarrantyAndMaintenance from "./src/screeens/WarrantyAndMaintenance";
// import First from "./src/screeens/First";
// import test from "./src/screeens/test";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Thông tin cá nhân"}
        // initialRouteName={"SuggestionsAndFeedBack"}

        // initialRouteName={"test"}
      >
        <Stack.Screen name="Thông tin cá nhân" component={InforUser} />
        {/* <Stack.Screen name="test" component={test} /> */}
        <Stack.Screen name="Camera" component={Camera} />

        {/* <Stack.Screen name="SuggestionsAndFeedBack" component={SuggestionsAndFeedBack} /> */}
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App;
