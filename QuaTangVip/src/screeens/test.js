import React, { useState, useRef } from "react";

import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
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
  SafeAreaView
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ipv4 } from "../../global";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const colorGray = "#8D8D8D";
const colorRed = "red";
const colorYellow = "#FFC62E";

export default function App({ navigation, route }) {
  const txtxAuthentication = "000000";

  const [codes, setCodes] = useState(["", "", "", "", "", ""]);
  // Tạo một mảng refs để theo dõi các ô TextInput
  const inputRefs = useRef(
    Array(6)
      .fill(null)
      .map(() => React.createRef())
  );

  // Hàm xử lý khi nhập mã xác thực
  const handleCodeChange = (index, value) => {
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    // Chuyển sang ô tiếp theo nếu chưa phải ô cuối cùng và giá trị đã được nhập
    if (index < codes.length - 1 && value !== "") {
      const nextInputRef = inputRefs.current[index + 1];
      if (nextInputRef && nextInputRef.current) {
        nextInputRef.current.focus();
      }
    }

    if (index === 5) {
      const verificationCode = newCodes.join("");
      if (verificationCode === txtxAuthentication) {
        Alert.alert("Xác thực thành công");
      }
    }
  };

  // Hàm xử lý khi xoá mã xác thực
  const handleBackspace = (index) => {
    if (index > 0) {
      //xoá nếu không phải ô đầu tiên
      const prevInputRef = inputRefs.current[index - 1];
      const newCodes = [...codes];
      newCodes[index - 1] = "";
      setCodes(newCodes);

      if (prevInputRef && prevInputRef.current) {
        prevInputRef.current.focus();
      }
    }
  };

  //Nút tiếp tục
  const handleVerifyCode = () => {
    const verificationCode = codes.join("");
    if (verificationCode === txtxAuthentication) {
      Alert.alert("Xác thực thành công");
    } else {
      Alert.alert("Mã xác nhận không đúng");
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 35,
            fontWeight: "bold",
            marginBottom: 20,
            marginTop: 50,
            textAlign: "center",
            paddingTop: 20
          }}
        >
          Đăng nhập
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            marginLeft: 5,
            width: Dimensions.get("window").width * 0.9
          }}
        >
          <Text style={{ color: "red", marginRight: 5 }}>*</Text>
          <Text style={{ color: colorGray, fontSize: 18 }}>
            Nhập mã xác thực
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          {/* Ô nhập mã xác thực gồ 6 số và chia  ô bằng nhau */}
          {codes.map((code, index) => (
            <TextInput
              style={{
                borderColor: colorGray,
                borderWidth: 1,
                borderRadius: 10,
                width: 50,
                height: 50,
                textAlign: "center",
                marginRight: 10,
                fontSize: 20
              }}
              keyboardType="numeric"
              maxLength={1}
              value={code}
              onChangeText={(value) => handleCodeChange(index, value)}
              ref={inputRefs.current[index]}
              key={index}
              //Nhập thì sang phải
              // onSubmitEditing={() => {
              //   if (index < codes.length - 1) {
              //     const nextInputRef = inputRefs.current[index + 1];
              //     if (nextInputRef && nextInputRef.current) {
              //       nextInputRef.current.focus();
              //     }
              //   }
              // }}

              //Xoá thì sang trái
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  //nativeEvent là sự kiện của bàn phím, backspace là phím xoá
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // behavior là hành động khi bàn phím hiện lên, padding là di chuyển view lên trên
      >
        <View style={{ marginBottom: 10, alignSelf: "center" }}>
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
            onPress={handleVerifyCode}
          >
            <Text
              style={{
                color: "black",
                fontSize: 16,
                textAlign: "center",
                fontWeight: 700
              }}
            >
              Tiếp tục
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30
  }
});
