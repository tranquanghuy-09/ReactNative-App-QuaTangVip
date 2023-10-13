import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginPhone from "./src/screeens/LoginPhone";
import LoginPassword from "./src/screeens/LoginPassword";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginPhone" component={LoginPhone} />
        <Stack.Screen name="LoginPassword" component={LoginPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
