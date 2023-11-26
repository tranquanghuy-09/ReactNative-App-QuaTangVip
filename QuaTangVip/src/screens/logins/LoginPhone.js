import React, { useState, useEffect, useCallback,} from "react";
import { Platform } from 'react-native';
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ipv4} from '../../global';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';


const colorGray = "#8D8D8D";
const colorRed = "red";
const colorYellow = "#FFC62E";
const colorBlack = "black";
const screenWidth = Dimensions.get("window").width;
const removeIcon = require("../../../assets/icons_Dai/ic_clear.webp");
const iIcon = require("../../../assets/icons_Dai/ic_info_circle.webp");
const errorIcon = require("../../../assets/icons_Dai/ic_error.webp");
// Font
const fontSize1 = 16;
const fontSize2 = 14;


//Chưa xử lý được:D
// + Kiểm tra không phải số điện thoại việt nam
// + Kiểm tra data ảo
// + Chưa xử lý đănng ký số điện mới

export default function App({ navigation, route }) {
  const isFocused = useIsFocused();
  useEffect(() => {
    setPhoneInput("");
    setPhoneNumber("");
  }, [isFocused]);
  const [phoneInput, setPhoneInput] = useState("");
  const [txtError, setTxtError] = useState(null);
  const toggleModal = () => {
    setTxtError(null);
  };
  const checkPhoneLogin = async () => {
    try {
      const result = await axios.get("http://"+ipv4+"/login_phone?phone="+phoneInput);
      // setUser(result.data);
      // console.log(result.data);
      if(!(result.data === null)){
        navigation.navigate("LoginPassword", { user:{
                                                    id: result.data.user_id,
                                                    phone: result.data.phone,
                                                    sex: result.data.sex,
                                                    password: result.data.password
                                                    }});

      }else{
        console.log("Không có user này");
        toggleModal();
        setTxtError("Vui lòng kiểm tra lại số điện thoại.");
      }
    } catch (error) {
      console.error("Error check phone:", error);
    }
  };
  //Dữ liệu người dùng tạm thời
  const data = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      phone: "0000000000",
      password: "123",
      sex: true
    },
    {
      id: 2,
      name: "Nguyễn Văn B",
      phone: "1234567899",
      password: "123",
      sex: true
    },
    {
      id: 3,
      name: "Nguyễn Thị Mừng",
      phone: "0111111111",
      password: "123",
      sex: false
    }
  ];

  const [phoneNumber, setPhoneNumber] = useState("");
  const [checkPhoneFail, setCheckPhoneFail] = useState(false); // Khi không phải số điện thoại thì trả về true

  const deletePhone = () => {
    setPhoneNumber("");
    setCheckPhoneFail(false);
  };

  //Định dạng số điện thoại
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

  //Kiểm tra số điện thoại
  const handleContinue = () => {
    const numericText = phoneNumber.replace(/\D/g, "");
    if (numericText.length == 10 && numericText[0] == "0") {
      setCheckPhoneFail(false);
      const user = data.find((item) => item.phone == numericText);
      if (user !== undefined) {
        navigation.navigate("LoginPassword", { user: user });
      } else {
        navigation.navigate("SignUp", { phone: numericText });
      }
      return;
    }
    setCheckPhoneFail(true);
    return;
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
                  fontWeight: "bold",
                  textAlign: "center",
                  paddingTop: 5,
                }}
              >
                Tài khoản này không tồn tại
              </Text>
              <Text style={{ fontSize: fontSize2, marginBottom: 30, textAlign: 'center', marginTop: 10}}>
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
            maxLength={12}
            onChangeText={(text)=>{
              handleTextChange(text);
              setPhoneInput(text);
            }}
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
            onPress={checkPhoneLogin}
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
