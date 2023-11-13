import React, { useState } from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Home = ({ navigation, route }) => {
  const user = route.params.user;
  return (
    <View>
      <Text> Trang chủ</Text>
      <TouchableOpacity
        style={{ backgroundColor: "green", padding: 10 }}
        onPress={() => navigation.navigate("Account", { user: user })}
      >
        <View style={{ backgroundColor: "green", padding: 10 }}>
          <Text>Navigate to Account</Text>
        </View>
      </TouchableOpacity>
      {/* trang góp ý */}
      <TouchableOpacity
        style={{ backgroundColor: "blue", padding: 10 }}
        onPress={() => navigation.navigate("Góp ý, khiếu nại")}
      >
        <View style={{ backgroundColor: "blue", padding: 10 }}>
          <Text>Navigate to Góp ý, khiếu nại</Text>
        </View>
      </TouchableOpacity>
      {/* trang thông tin cá nhân */}

    </View>
  );
};

export default Home;
