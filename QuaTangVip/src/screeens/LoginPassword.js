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
const colorBlack = "black";
const colorRed = "red";
const colorYellow = "#FFC62E";
const colorBlue = "#0E86C6";
const screenWidth = Dimensions.get("window").width;
const clockIcon = require("../../assets/icons_Dai/assets_images_ic_light_lock.webp");
const iIcon = require("../../assets/icons_Dai/ic_info_circle.webp");
const showIcon = require("../../assets/icons_Dai/design_ic_visibility.png");
const hideIcon = require("../../assets/icons_Dai/design_ic_visibility_off.png");
const fingerprintIon = require("../../assets/icons_Dai/ic_fingerprint.webp");

//Chưa xử lý được:
// + Kiểm tra không phải số điện thoại việt nam
// + Chưa xử lý được nút Quét mã QR
// + Thông báo sai mật khẩu còn xấu, chưa giống app thật

export default function App({ navigation, route }) {
  const user = route.params.user;
  const sex = user.sex ? "Anh" : "Chị";
  const [displayPass, setdisplayPass] = useState(false);
  const [password, setPassword] = useState("");

  const checkPassword = () => {
    if (password == user.password) {
      navigation.navigate("Home", { user: user });
    } else {
      alert("Sai mật khẩu");
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 20,
            marginBottom: 5,
            textAlign: "center"
          }}
        >
          Xin chào {sex}!
        </Text>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            marginBottom: 30,
            textAlign: "center"
          }}
        >
          01234567899
        </Text>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            marginLeft: 5,
            alignItems: "center"
          }}
        >
          <Text style={{ color: "red", marginRight: 5, fontWeight: 700 }}>
            *
          </Text>
          <Text style={{ color: colorBlack, fontSize: 16 }}>Mật khẩu</Text>
          <Image
            source={iIcon}
            style={{
              resizeMode: "contain",
              width: 18,
              height: 18,
              marginLeft: 5,
              top: 3
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: (screenWidth * 90) / 100,
            borderWidth: 1,
            borderColor: colorGray,
            borderRadius: 10
          }}
        >
          <Image
            source={clockIcon}
            style={{
              flex: 1,
              resizeMode: "contain",
              width: 20,
              height: 20,
              top: 13
            }}
          />
          <TextInput
            placeholder="Nhập mật khẩu"
            placeholderTextColor={colorGray}
            secureTextEntry={!displayPass}
            style={{
              flex: 6,
              padding: 10,
              marginBottom: 5,
              fontSize: 16,
              color: colorGray
            }}
            onChangeText={setPassword}
          ></TextInput>
          <TouchableOpacity
            style={{
              top: 13,
              flex: 1
            }}
            onPress={() => setdisplayPass(!displayPass)}
          >
            <Image
              source={displayPass ? showIcon : hideIcon}
              style={{
                resizeMode: "contain",
                width: 20,
                height: 20,
                left: 5,
                tintColor: colorGray
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View
          style={{
            width: (screenWidth * 90) / 100,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colorYellow,
              height: 45,
              borderRadius: 10,
              width: (screenWidth * 90) / 100 - 65,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={checkPassword}
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
          <TouchableOpacity
            style={{
              backgroundColor: colorYellow,
              borderRadius: 10,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={fingerprintIon}
              style={{
                resizeMode: "contain",
                width: 30,
                height: 30
              }}
            />
          </TouchableOpacity>
        </View>{" "}
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => navigation.navigate("LoginPhone")}
        >
          <Text
            style={{
              color: colorBlue,
              fontSize: 16,
              borderBottomWidth: 1,
              borderColor: colorBlue,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 10,
              marginTop: 15,
              width: "fit-content"
            }}
          >
            Đăng nhập bằng số điện thoại khác
          </Text>
        </TouchableOpacity>
      </View>
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
