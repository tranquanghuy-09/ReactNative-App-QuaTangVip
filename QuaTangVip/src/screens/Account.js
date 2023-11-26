import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import {ipv4} from '../global';
import axios from 'axios';
import { useUser } from '../UserContext';
import { useIsFocused } from '@react-navigation/native';

const colorBlack = "#000000";
const colorGray = "#A59464";
const colorGrayLight = "#F7F7F7";
const colorWhite = "#FFF";
const colorRed = "red";
const colorYellow = "#FFEEC0";
const colorYellow2 = "#FFC62E";
const colorBlue = "#105989";

const fontSize1 = 16;
const fontSize2 = 14;
const fontSize3 = 12;
const fontSize4 = 10;

//Chưa xử lý được:

const Account = ({ navigation, route }) => {
  const {userGL} = useUser();
  const [newUserId, setNewUserId] = React.useState(userGL.user_id);
  const [user, setUser] = useState({});
  useEffect(() => {
    loadProfileUser();
  }, []);
  const loadProfileUser = async () => {
    try {
      const result = await axios.get("http://"+ipv4+"/user?user_id="+newUserId);
      setUser(result.data);
      // console.log(result.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };
  const name = user.name;
  const phone = user.phone;

  const avatar = {uri: user.urlImage};
  const rightArrowIcon = require("../../assets/icons_Dai/ic_right.webp");
  const logoutIcon = require("../../assets/icons_Dai/ic_logout.webp");
  const version = "1.1.10 v246";
  const brachImage = require("../../assets/icons_Dai/img_branchname.webp");
  const cameraIcon = require("../../assets/icons_Dai/ic_camera.webp");
  const developmentIcon = require("../../assets/icons_Dai/ic_development.webp");
  const txtBrach =
    " Ứng dụng tích điểm và sử dụng điểm dành cho Khách hàng của Tập đoàn Thế Giới Di Động (MWG)";
  const data = [
    {
      name: "Tài khoản",
      child: [
        {
          name: "Thông tin cá nhân",
          link: "Thông tin cá nhân",
          img: require("../../assets/icons_Dai/user.webp")
        }
      ]
    },
    {
      name: "Khác",
      child: [
        {
          name: "Cửa hàng gần bạn",
          link: "Cửa hàng gần bạn",
          img: require("../../assets/icons_Dai/maps.webp")
        },
        {
          name: "Điều khoản Quà Tặng VIP",
          link: "",
          img: require("../../assets/icons_Dai/2490657-200.png")
        },
        {
          name: "Quản lý ứng dụng",
          link: "",
          img: require("../../assets/icons_Dai/ics_setting.webp")
        }
      ]
    },
    {
      name: "Đối tác",
      child: [
        {
          name: "Liên kết nhãn hàng",
          link: "",
          img: require("../../assets/icons_Dai/brand_affiliate.webp")
        }
      ]
    }
  ];
  //Xử lý sự kiện

  const [isModalVisible, setModalVisible] = React.useState(false);

  const onClick = (link) => {
    if (link === "") {
      toggleModal();
      return;
    }
    navigation.navigate(link);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colorWhite, paddingVertical: 50}}>
      <View style={{borderWidth: 0, paddingBottom: 5, backgroundColor: 'white', paddingTop: 10}}>
          <Text style={{fontSize: 30, marginLeft: 20, fontWeight: 700}}>Cá nhân</Text>
        </View>
      {/* Thông f khi chưa có link*/}
      <Modal
        animationType="fade" // hiệu ứng khi mở modal
        transparent={true} // màn hình nền có trong suốt hay không
        visible={isModalVisible}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          {/* khi click ra ngoài thì modal sẽ tắt */}
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
                  source={developmentIcon}
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                    alignSelf: "center",
                    marginBottom: 10
                  }}
                />
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={{ fontSize: fontSize1 }}>X</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: fontSize1,
                  fontWeight: "bold"
                }}
              >
                Tính năng được phát triển
              </Text>
              <Text style={{ fontSize: fontSize2, marginBottom: 30, textAlign: 'justify', marginTop: 8}}>
                Ứng dụng Quà tặng VIP sẽ mang tính năng này đến anh trong thời
                gian sớm nhất. Mong anh thông cảm nhé!
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colorYellow2,
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
      {/* End thông f */}

      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 10,
          backgroundColor: colorWhite
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          {/* Ảnh đại diện */}
          <TouchableOpacity onPress={()=>{navigation.navigate("Thông tin cá nhân")}}>
            {/* avatar */}
            <Image
              accessible={true}
              accessibilityLabel="Profile Image"
              source={avatar}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            {/* Ảnh biểu tượng nhỏ góc phải của avatar */}
            <Image
              accessible={true}
              accessibilityLabel="Camera Icon"
              source={cameraIcon}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                position: "absolute",
                bottom: -2,
                right: 0,
                tintColor: colorBlue,
                backgroundColor: colorWhite,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: colorWhite
              }}
            />
          </TouchableOpacity>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ fontWeight: "bold", fontSize: fontSize1 }}>
              {name}
            </Text>
            <Text
              style={{
                color: colorBlack,
                fontSize: fontSize1,
                marginTop: 5
              }}
            >
              {phone}
            </Text>
          </View>
        </View>
      </View>

      <View
        accessible={true}
        accessibilityLabel="Options"
        style={{ marginTop: 10, backgroundColor: colorWhite }}
      >
        {data.map((item, index) => (
          <View
            accessible={true}
            accessibilityLabel={item.name}
            key={index}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 16
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: fontSize1,
                color: colorBlack,
                marginBottom: 15
              }}
            >
              {item.name}
            </Text>
            <View style={{ backgroundColor: colorGrayLight, borderRadius: 20 }}>
              {item.child.map((child, childIndex) => (
                <React.Fragment key={childIndex}>
                  {/* Chức năng con */}
                  <TouchableOpacity
                    key={childIndex}
                    style={{
                      paddingVertical: 10,
                      paddingHorizontal: 16,
                      marginBottom: 0,
                      width: (Dimensions.get("window").width * 90) / 100
                    }}
                    onPress={() => onClick(child.link)}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 40
                      }}
                    >
                      <Image
                        source={child.img}
                        style={{
                          flex: 1,
                          width: 22,
                          height: 22,
                          resizeMode: "contain",
                          tintColor: "#F2C069"
                        }}
                      />
                      <Text
                        style={{
                          flex: 5,
                          color: colorBlack,
                          fontSize: fontSize1
                        }}
                      >
                        {child.name}
                      </Text>
                      <Image
                        accessible={true}
                        accessibilityLabel="Arrow Icon"
                        source={rightArrowIcon}
                        style={{
                          flex: 0.5,
                          width: 100,
                          height: 100,
                          tintColor: colorBlack,
                          resizeMode: "contain"
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                  {/* Gạch chân    */}
                  {childIndex === item.child.length - 1 ? null : (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <View style={{ flex: 1 }}></View>
                      <View
                        style={{
                          flex: 5,
                          borderBottomWidth: 2,
                          borderColor: "#EAEAEA"
                        }}
                      ></View>
                      <View style={{ flex: 1 }}></View>
                    </View>
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          marginTop: 15,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
        onPress={() => {navigation.navigate('LoginPhone')}}
      >
        <Image
          source={logoutIcon}
          style={{
            width: 20,
            height: 20,
            resizeMode: "contain",
            tintColor: colorRed
          }}
        />
        <Text
          style={{
            color: colorRed,
            fontSize: fontSize1,
            marginLeft: 5,
            fontWeight: 500
          }}
        >
          Thoát tài khoản
        </Text>
      </TouchableOpacity>
      {/* Giới thiệu */}
      <View
        style={{
          flexDirection: "column",
          marginTop: 25,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: colorYellow,
            width: (Dimensions.get("window").width * 85) / 100,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            padding: 10
          }}
        >
          <Image
            source={brachImage}
            style={{ flex: 3, width: 50, height: 50, resizeMode: "contain" }}
          ></Image>
          <Text
            style={{
              flex: 5,
              fontSize: fontSize4,
              color: colorGray,
              fontWeight: 500,
              marginLeft: 10
            }}
          >
            {txtBrach}
          </Text>
        </View>
        <Text
          style={{
            color: "#B49D5C",
            fontSize: fontSize3,
            textAlign: "center",
            marginTop: 10,
            marginBottom: 75,
            fontWeight: 500
          }}
        >
          Phiên bản: {version}
        </Text>
      </View>
      <View style={{height: 60}}>
      </View>
    </ScrollView>
  );
};

export default Account;
