import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPhone from "./src/screeens/LoginPhone";
import LoginPassword from "./src/screeens/LoginPassword";
import SignUp from "./src/screeens/SignUp";
import Home from "./src/screeens/Home";
import Account from "./src/screeens/Account";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={"Account"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginPassword" component={LoginPassword} />
        <Stack.Screen name="LoginPhone" component={LoginPhone} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
