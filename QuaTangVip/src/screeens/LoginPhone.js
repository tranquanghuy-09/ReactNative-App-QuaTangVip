import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const colorGray = "#8D8D8D";
const colorRed = "red";
const colorYellow = "#FFC62E";
const screenWidth = Dimensions.get("window").width;
const removeIcon = require("../../assets/icons_Dai/ic_clear.webp");
const iIcon = require("../../assets/icons_Dai/ic_info_circle.webp");

//Chưa xử lý được:D
// + Kiểm tra không phải số điện thoại việt nam
// + Kiểm tra thông tin người dùng đăng ký
export default function App({ navigation, route }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkPhoneFail, setCheckPhoneFail] = useState(false); // Khi không phải số điện thoại thì trả về true

  const deletePhone = () => {
    setPhoneNumber("");
  };

  const handleTextChange = (text) => {
    setCheckPhoneFail(false);
    const numericText = text.replace(/\D/g, "");
    if (numericText.length === 10) {
      const formattedNumber = numericText.replace(
        /(\d{4})(\d{3})(\d{3})/,
        "$1 $2 $3"
      );
      setPhoneNumber(formattedNumber);
    } else {
      setPhoneNumber(numericText);
    }
  };
  const handleContinue = () => {
    const numericText = phoneNumber.replace(/\D/g, "");
    if (numericText.length !== 10 && numericText[0] == "0") {
      setCheckPhoneFail(true);
      return;
    }
    navigation.navigate("LoginPassword", { phone: numericText });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 20,
            marginTop: 20,
            textAlign: "center"
          }}
        >
          Đăng nhập
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            marginLeft: 5
          }}
        >
          <Text style={{ color: "red", marginRight: 5 }}>*</Text>
          <Text style={{ color: colorGray }}>Nhập số điện thoại</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            placeholder="Số điện thoại của bạn"
            placeholderTextColor={colorGray}
            style={{
              borderWidth: 1,
              width: (screenWidth * 90) / 100,
              padding: 10,
              marginBottom: 5,
              borderRadius: 10,
              borderColor: checkPhoneFail ? colorRed : colorGray,
              fontSize: 18,
              color: checkPhoneFail ? colorRed : colorGray
            }}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={handleTextChange}
            value={phoneNumber}
          ></TextInput>
          {phoneNumber.length != 0 ? (
            <TouchableOpacity onPress={deletePhone}>
              <Image
                source={removeIcon}
                style={{
                  resizeMode: "contain",
                  width: 20,
                  height: 20,
                  position: "absolute",
                  right: 15,
                  top: 13,
                  tintColor: checkPhoneFail ? colorRed : colorGray
                }}
              />
            </TouchableOpacity>
          ) : (
            ""
          )}
        </View>

        {checkPhoneFail ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Image
              source={iIcon}
              style={{
                resizeMode: "contain",
                width: 15,
                height: 15,
                tintColor: colorRed,
                marginRight: 7
              }}
            />
            <Text style={{ color: colorRed }}>
              Số điện thoại không đúng. Bạn vui lòng nhập lại.
            </Text>
          </View>
        ) : (
          ""
        )}
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: colorYellow,
            padding: 15,
            borderRadius: 10,
            flex: 1,
            width: (screenWidth * 90) / 100
          }}
          onPress={handleContinue}
        >
          <Text
            style={{
              color: "black",
              fontSize: 14,
              textAlign: "center",
              fontWeight: 700
            }}
          >
            Tiếp tục
          </Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
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
