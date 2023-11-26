
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView
} from "react-native";
import { Platform } from 'react-native';
import {ipv4, user_id} from '../../global';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { ro } from "date-fns/locale";
import { useUser } from '../../UserContext'

// Color
const colorGray = "#8D8D8D";
const colorBlack = "black";
const colorYellow = "#FFC62E";
const colorBlue = "#0E86C6";
const screenWidth = Dimensions.get("window").width;

// Icon
const clockIcon = require("../../../assets/icons_Dai/assets_images_ic_light_lock.webp");
const iIcon = require("../../../assets/icons_Dai/ic_info_circle.webp");
const showIcon = require("../../../assets/icons_Dai/design_ic_visibility.png");
const hideIcon = require("../../../assets/icons_Dai/design_ic_visibility_off.png");
const fingerprintIcon = require("../../../assets/icons_Dai/ic_fingerprint.webp");
const errorIcon = require("../../../assets/icons_Dai/ic_error.webp");

// Font
const fontSize1 = 16;
const fontSize2 = 14;

//Chưa xong: chưa xử lý được nút vân tay
// Định dùng tooltip nhưng tìm hiểu không thành công
export default function App({ navigation, route }) {
  console.log(route.params.user);
  const { userGL, updateUserId, updateSex } = useUser();
  const [newUserId, setNewUserId] = React.useState(route.params.user.id);
  const [newSex, setNewSex] = React.useState(userGL.sex);
  const isFocused = useIsFocused();
  useEffect(() => {
    setPwdInput("");
  }, [isFocused]);
  // const handleUpdateUser_id = () => {
  //   // Thực hiện bất kỳ logic cập nhật nào bạn muốn
  //   // ...

  //   // Sau đó, cập nhật giá trị user_id bằng cách gọi updateUser_id từ context
  //   updateUser_id(newUser_id);
  // };
  const userpr = route.params
    ? route.params.user
    : {
        id: 1,
        name: "Không một ai",
        phone: "0000000000",
        password: "123",
        sex: true
      };
  // const user = route.params.user
  const sex = userpr.sex ? "Chị" : "Anh";
  
  const [phoneUser, setPhoneUser] = useState(userpr.phone);
  const [pwdInput, setPwdInput] = useState("");


  const checkLogin = async () => {
    try {
      const result = await axios.get("http://"+ipv4+"/login?phone="+phoneUser+"&pwd="+pwdInput);
      // setUser(result.data);
      // console.log(result.data.user_id);
      updateUserId(newUserId);
      if(result.data === null){
        console.log("Sai mật khẩu");
      }else{
        
        navigation.navigate("MainNavigator", { user: result.data });
      }
    } catch (error) {
      console.error("Error check password:", error);
    }
  };
  
  const [displayPass, setDisplayPass] = useState(false);
  // const [password, setPassword] = useState("");
  const [count, setCount] = useState(0);
  const [txtError, setTxtError] = useState(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const requestPassword = "Mật khẩu chứa ít nhất 1 ký tự";
  const toggleModal = () => {
    setTxtError(null);
  };

  //Kiểm tra mật khẩu
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
    navigation.navigate("MainNavigator", { user: user });
  };

  const toggleTooltip = () => {
    setTooltipVisible(!tooltipVisible);
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
          {phoneUser}
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
            <Text
              style={{
                color: "red",
                marginRight: 10,
                fontWeight: "bold"
              }}
            >
              *
            </Text>
            <Text
              style={{
                fontSize: 18
              }}
            >
              Mật khẩu
            </Text>
          </Text>

          {tooltipVisible && (
            <View
              style={{
                position: "absolute",
                backgroundColor: "white",
                borderRadius: 5,
                width: 150,
                justifyContent: "center",
                alignItems: "center",
                top: -60,
                left: 75,
                padding: 10,
                borderWidth: 1
              }}
            >
              <Text style={{ fontSize: 12 }}>{requestPassword}</Text>
            </View>
          )}
          {/* Khi ấn vào biểu tượng sẽ hiện ghi chú nhỏ */}
          <TouchableOpacity onPress={toggleTooltip}>
            <Image
              source={iIcon}
              style={{
                resizeMode: "contain",
                width: 16,
                height: 16,
                left: 5,
                tintColor: colorBlack
              }}
            />
          </TouchableOpacity>
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
              color: colorBlack
            }}
            onChangeText={setPwdInput}
          />
          <TouchableOpacity
            style={{ top: 13, flex: 1 }}
            onPress={() => setDisplayPass(!displayPass)}
          >
            <Image
              source={displayPass ? showIcon : hideIcon}
              style={{
                resizeMode: "contain",
                width: 20,
                height: 20,
                left: 5,
                tintColor: displayPass ? colorBlack : colorGray
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        //di chuyển view khi bàn phím hiện lên
      >
        <View style={{ flexDirection: "column", bottom: 5 }}>
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
              onPress={checkLogin}
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
    paddingBottom: 30
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
