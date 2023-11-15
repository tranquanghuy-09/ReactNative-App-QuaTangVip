import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Color
const colorGray = "#8D8D8D";
const colorBlack = "black";
const colorYellow = "#FFC62E";
const colorBlue = "#0E86C6";
const screenWidth = Dimensions.get("window").width;

// Icon
const clockIcon = require("../../assets/icons_Dai/assets_images_ic_light_lock.webp");
const iIcon = require("../../assets/icons_Dai/ic_info_circle.webp");
const showIcon = require("../../assets/icons_Dai/design_ic_visibility.png");
const hideIcon = require("../../assets/icons_Dai/design_ic_visibility_off.png");
const fingerprintIcon = require("../../assets/icons_Dai/ic_fingerprint.webp");
const errorIcon = require("../../assets/icons_Dai/ic_error.webp");

// Font
const fontSize1 = 16;
const fontSize2 = 14;

const isPhoneNumber = (value) => {
  const phoneNumberRegex = /^[0-9]{10,11}$/;
  return phoneNumberRegex.test(value);
};

export default function App({ navigation, route }) {
  const user = route.params.user;
  const sex = user.sex ? "Anh" : "Chị";
  const [displayPass, setDisplayPass] = useState(false);
  const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);
  const [txtError, setTxtError] = useState(null);

  const toggleModal = () => {
    setTxtError(null);
  };

  const checkPassword = () => {
    if (password === "") {
      toggleModal();
      setTxtError("Không được để trống mật khẩu");
      return;
    }

    if (password !== user.password) {
      setCount((prevCount) => prevCount + 1);
      toggleModal();
      setTxtError("Sai mật khẩu");

      if (count + 1 === 3) {
        navigation.navigate("LoginPhone");
      }

      return;
    }

    navigation.navigate("Home", { user: user });
  };

  return (
    <View style={styles.container}>
      {/* Modal thông báo sai mật khẩu */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={txtError !== null}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)"
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                width: "80%"
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Image
                  source={errorIcon}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                />
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={{ fontSize: fontSize1 }}>X</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: fontSize1,
                  fontWeight: "bold"
                }}
              >
                Kiểm tra mật khẩu
              </Text>
              <Text style={{ fontSize: fontSize2, marginBottom: 30 }}>
                {txtError}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colorYellow,
                  padding: 10,
                  borderRadius: 5,
                  alignItems: "center"
                }}
                onPress={toggleModal}
              >
                <Text
                  style={{
                    color: colorBlack,
                    fontSize: fontSize1,
                    fontWeight: "bold"
                  }}
                >
                  Đồng ý
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Tiêu đề */}
      <View style={{ flexDirection: "column", marginTop: 50 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 35,
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
          <Text style={{ color: colorBlack, fontSize: 16 }}>
            <Text style={{ color: "red", marginRight: 5, fontWeight: "bold" }}>
              *
            </Text>
            Mật khẩu
          </Text>
          <Image source={iIcon} style={styles.icon} />
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
          />
          <TouchableOpacity
            style={{ top: 13, flex: 1 }}
            onPress={() => setDisplayPass(!displayPass)}
          >
            <Image
              source={displayPass ? showIcon : hideIcon}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flexDirection: "column" }}>
        <View style={styles.buttonsContainer}>
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
                color: colorBlack,
                fontSize: 16,
                textAlign: "center",
                fontWeight: "bold"
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
            onPress={checkPassword}
          >
            <Image
              source={fingerprintIcon}
              style={{ resizeMode: "contain", width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
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
  },
  icon: {
    resizeMode: "contain",
    width: 20,
    height: 20,
    left: 5,
    tintColor: colorBlack
  },
  buttonsContainer: {
    width: (screenWidth * 90) / 100,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
