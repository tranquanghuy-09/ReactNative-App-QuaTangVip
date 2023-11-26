import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ipv4 } from "../../global";
import axios from "axios";
import { set } from "date-fns";

const colorGray = "#8D8D8D";
const colorRed = "red";
const colorYellow = "#FFC62E";
const colorBlack = "#000000";

const image = require("../../../assets/icons_Dai/Su-thanh-cong-cua-TGDD.png");

export default function App({ navigation, route }) {
  const submit = () => {
    const user = {
      name: name,
      sex: sex,
      phone: phone
    };
    navigation.navigate("Home", { user: user });
  };

  const { phone } = route.params ? route.params.phone : "";
  const [sex, setSex] = useState();
  const [name, setname] = useState();

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colorYellow,
          justifyContent: "center",
          width: Dimensions.get("window").width,
          marginTop: 0
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
            marginTop: 50,
            textAlign: "left",
            marginLeft: 20
          }}
        >
          Đăng nhập
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 0
        }}
      >
        <Text style={{ fontSize: 20, textAlign: "center", color: "#4474EE" }}>
          Bạn đã tạo tài khoản thành công 👌👌!
        </Text>
        <Text style={{ fontSize: 20, textAlign: "center" }}>
          Vui lòng cung cấp thêm thông tin
        </Text>
      </View>
      <View style={{ marginTop: 20, justifyContent: "center", marginTop: 0 }}>
        <Text style={{ fontSize: 18, fontWeight: 700 }}>Họ và tên</Text>
        <TextInput
          style={{
            height: 50,
            width: Dimensions.get("window").width * 0.9,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 10,
            paddingLeft: 10,
            fontSize: 20,
            marginTop: 10
          }}
          onChangeText={(text) => setname(text)}
          placeholder="Nhập họ và tên của bạn..."
        ></TextInput>
        {/* Danh xưng */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 700 }}>Danh xưng:</Text>
          <TouchableOpacity
            onPress={() => setSex(true)}
            style={{
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Ionicons
              name={sex ? "ios-radio-button-on" : "ios-radio-button-off"}
              size={24}
              style={{
                marginRight: 5,
                color: sex ? "gold" : "black"
              }}
            />
            <Text style={{ marginRight: 16, color: "#4474EE" }}>Anh</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 18, color: colorGray }}>hay</Text>
          <TouchableOpacity
            onPress={() => setSex(false)}
            style={{
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Ionicons
              name={!sex ? "ios-radio-button-on" : "ios-radio-button-off"}
              size={24}
              style={{
                marginRight: 5,
                color: !sex ? "gold" : "black"
              }}
            />
            <Text style={{ marginRight: 16, color: "#4474EE" }}>Chị</Text>
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // behavior là hành động khi bàn phím hiện lên, padding là di chuyển view lên trên
      >
        <View style={{ marginBottom: 75, alignSelf: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: colorYellow,
              padding: 15,
              borderRadius: 10,
              width: "auto",
              alignSelf: "center",
              minWidth: Dimensions.get("window").width * 0.9,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={submit}
          >
            <Text
              style={{
                color: "black",
                fontSize: 20,
                textAlign: "center",
                fontWeight: "700"
              }}
            >
              Tiếp theo
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Image
        source={image}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height * 0.2
        }}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
