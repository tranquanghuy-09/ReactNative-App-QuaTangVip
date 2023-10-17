import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
const colorBlack = "#000000";
const colorGray = "#A59464";
const colorGrayLight = "#F7F7F7";
const colorWhite = "#FFF";
const colorRed = "red";
const colorYellow = "#FFEEC0";
const colorBlue = "#105989";

const fontSizeTitle = 16;
const fontSizeContent = 16;
const fontSizeLogout = 16;

const Account = () => {
  const avatar = require("../../assets/icons_Dai/ic_account_logo.webp");
  const rightArrowIcon = require("../../assets/icons_Dai/ic_right.webp");
  const logoutIcon = require("../../assets/icons_Dai/ic_logout.webp");
  const version = "1.1.10 v246";
  const brachImage = require("../../assets/icons_Dai/img_branchname.webp");
  const cameraIcon = require("../../assets/icons_Dai/ic_camera.webp");
  const txtBrach =
    " Ứng dụng tích điểm và sử dụng điểm dành cho Khách hàng của Tập đoàn Thế Giới Di Động (MWG)";
  const data = [
    {
      name: "Tài khoản",
      child: [
        {
          name: "Thông tin cá nhân",
          link: "",
          img: require("../../assets/icons_Dai/user.webp")
        }
      ]
    },
    {
      name: "Khác",
      child: [
        {
          name: "Cửa hàng gần bạn",
          link: "",
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

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colorWhite }}>
      <View
        accessible={true}
        accessibilityLabel="User info section"
        accessibilityRole="header"
        style={{
          paddingHorizontal: 16,
          paddingTop: 10,
          backgroundColor: colorWhite
        }}
      >
        <View
          accessible={true}
          accessibilityLabel="User profile picture and info"
          style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
        >
          <TouchableOpacity>
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
            <Text style={{ fontWeight: "bold", fontSize: fontSizeTitle }}>
              Đại
            </Text>
            <Text
              style={{
                color: colorBlack,
                fontSize: fontSizeTitle,
                marginTop: 5
              }}
            >
              0382890389
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
                fontSize: fontSizeTitle,
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
                          fontSize: fontSizeContent
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
            fontSize: fontSizeLogout,
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
              fontSize: 10,
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
            fontSize: 12,
            textAlign: "center",
            marginTop: 10,
            marginBottom: 75,
            fontWeight: 500
          }}
        >
          Phiên bản: {version}
        </Text>
      </View>
    </ScrollView>
  );
};

export default Account;
