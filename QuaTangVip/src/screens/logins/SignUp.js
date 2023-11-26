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
import { ipv4 } from "../../global";
import axios from "axios";
import { set } from "date-fns";

const colorGray = "#8D8D8D";
const colorRed = "red";
const colorYellow = "#FFC62E";

// Chức năng tạo mã 6 số ngẫu nhiên
// Xoá sang trái, nhập sang phải
export default function App({ navigation, route }) {
  const [txtxAuthentication, setTxtxAuthentication] = useState(
    generateRandomCode(6)
  );
  const [time, setTime] = useState(10);
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
    // Luôn dồn các số về bên trái,
    // nếu ô hiện tại chưa có giá trị thì quay lại ô trước đó
    if (index > 0 && value === "") {
      const prevInputRef = inputRefs.current[index - 1];
      if (prevInputRef && prevInputRef.current) {
        prevInputRef.current.focus();
        // Nếu ô hiện tại chưa có giá trị thì xoá giá trị ô trước đó
        const newCodes = [...codes];
        newCodes[index - 1] = "";
        setCodes(newCodes);
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
    // nếu là ô cuối cùng thì xoá giá trị ô hiện tại
    if (index === 5) {
      const newCodes = [...codes];
      newCodes[index] = "";
      setCodes(newCodes);
    } else if (index > 0) {
      const prevInputRef = inputRefs.current[index - 1];
      const newCodes = [...codes];
      newCodes[index - 1] = "";
      setCodes(newCodes);
      if (prevInputRef && prevInputRef.current) {
        prevInputRef.current.focus();
      }
    }
  };

  // Nút tiếp tục
  const handleVerifyCode = () => {
    const verificationCode = codes.join("");
    if (verificationCode === txtxAuthentication) {
      Alert.alert("Xác thực thành công");
    } else {
      Alert.alert("Mã xác nhận không đúng");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000); // 1 second
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTxtxAuthentication(generateRandomCode(6));
      setTime(10);
    }, 10000); // 7 seconds
    // Clear interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);

  // Hàm sinh mã xác thực ngẫu nhiên
  function generateRandomCode(length) {
    const characters = "0123456789"; // Các ký tự bạn muốn sử dụng trong mã xác thực
    let code = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    return code;
  }

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
        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 25 }}
        >
          <Text style={{ color: colorGray, fontSize: 18 }}>
            Mã {txtxAuthentication} hết hạn sau
          </Text>
          <Text style={{ color: colorRed, fontSize: 18 }}> 00:{time}</Text>
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
                fontWeight: "700"
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
