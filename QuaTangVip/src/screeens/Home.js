import React, { useState } from "react";
import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Home = ({ navigation, route }) => {
  const user = route.params
    ? route.params.user
    : {
        id: 1,
        name: "Không một ai",
        phone: "0000000000",
        password: "123",
        sex: true
      };
  // const user = route.params.user;

  return (
    <View style={{ marginTop: 150 }}>
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
      <TouchableOpacity
        style={{ backgroundColor: "red", padding: 10 }}
        onPress={() => navigation.navigate("Thông tin cá nhân")}
      >
        <View style={{ backgroundColor: "red", padding: 10 }}>
          <Text>Navigate to Thông tin cá nhân</Text>
        </View>
      </TouchableOpacity>
      {/* thông báo*/}
      <TouchableOpacity
        style={{ backgroundColor: "yellow", padding: 10 }}
        onPress={() => navigation.navigate("Thông báo")}
      >
        <View style={{ backgroundColor: "yellow", padding: 10 }}>
          <Text>Navigate to Thông báo</Text>
        </View>
      </TouchableOpacity>
      {/* trang theo dõi đơn hàng*/}
      <TouchableOpacity
        style={{ backgroundColor: "pink", padding: 10 }}
        onPress={() => navigation.navigate("Theo dõi đơn hàng")}
      >
        <View style={{ backgroundColor: "pink", padding: 10 }}>
          <Text>Navigate to Theo dõi đơn hàng</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
