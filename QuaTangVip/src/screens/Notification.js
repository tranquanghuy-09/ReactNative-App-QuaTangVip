// npm install @react-navigation/native
// npm install @react-navigation/material-top-tabs
// npm install @react-navigation/native @react-navigation/bottom-tabs
// npm install react-native-paper

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  TextInput,
  RefreshControl,
  Platform,
  ActivityIndicator
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Icon
const theGioiDiDongImage = require("../../assets/icons_Dai/logo_branch_tgdd.webp");
const dienMayXanhIcon = require("../../assets/icons_Dai/phat-trien-website-dien-may-xanh-16233.jpeg");
const emptyIcon = require("../../assets/icons_Dai/ic_empty.webp");
// Color
const colorRed = "red";
const colorWhite = "#FFFFFF";
const colorGray = "#DCDCDC";
const colorYellow = "#FFC62E";
const colorBlue = "#0866FF";
const Tab = createMaterialTopTabNavigator();

//Trang dễ đột tử khi chạy trên ISO khi không được khởi động đúng cách
//Chưa xong:
// 1. Chưa có dữ liệu
// 2. Chưa có chức năng chuyển trạng thái đã đọc thành đã đọc

function AllNotifications() {
  //data ảo
  const dataAll = [
    {
      id: 1,
      title: "Tài khoản của bạn vừa đăng nhâo ở thiết bị khác",
      conntent:
        "Tài khoản của bạn vừa đăng nhâo ở thiết bị khác. Nếu không phảu là bạn thực hiện vui lòng liên hệ đến số 1900 1039 để được hỗ trợ",
      time: "18:35 - 30/09/2023",
      type: 1,
      link: "",
      status: true //trạng thai đã đọc hay chưa
    },
    {
      id: 2,
      title: "Dữ liệu đông bộ thành công",
      conntent: "Dữ liệu đông bộ thành công. Cảm ơn quý khách đã chờ đợi",
      time: "18:35 - 30/09/2023",
      type: 1,
      link: "",
      status: false
    },
    {
      id: 3,
      title: "Tài khoản của bạn vừa đăng nhâo ở thiết bị khác",
      conntent:
        "Tài khoản của bạn vừa đăng nhâo ở thiết bị khác. Nếu không phảu là bạn thực hiện vui lòng liên hệ đến số 1900 1039 để được hỗ trợ",
      time: "18:35 - 30/09/2023",
      type: 1,
      link: "",
      status: true
    },
    {
      id: 4,
      title: "Cập nhập nội dung chính sách tích điểm",
      conntent: "Ap dụng từ ngagy 23/10/2023",
      time: "18:35 - 30/09/2023",
      type: 1,
      link: "",
      status: true
    },
    {
      id: 5,
      title: "Tích điểm thành công",
      conntent: "Bạn vừa tích điểm thành công ở cửa hàng Bách Hoá Xanh",
      time: "18:35 - 30/09/2023",
      type: 2,
      link: "",
      status: false
    },
    {
      id: 6,
      title: "Cảm mơn Anh/Chị đã mua hàng",
      conntent:
        "Bạn vừa tích điểm thành công ở cửa hàng Bách Hoá Xanh đơn hàng 123456789. Vui lòng đánh giá chất lượng dịch vụ",
      time: "18:35 - 30/09/2023",
      type: 3,
      link: "",
      status: false
    },
    {
      id: 7,
      title: "Đơn hàng của bạn đang được giao",
      conntent: "Đơn hàng của bạn đang được giao",
      time: "18:35 - 30/09/2023",
      type: 1,
      link: "",
      status: true
    }
  ];
  function setStatus(index, item) {
    alert(index + " " + item.status);
    //Chuyển trạng thái đã đọc thành đã đọc
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView>
        {dataAll.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#eee"
              }}
              onPress={() => setStatus(index, item)}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  flex: 1
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ flex: 1 }}></Text>
                  <Text
                    style={{
                      flex: 5,
                      fontSize: 10,
                      color: "#888",
                      marginBottom: 10
                    }}
                  >
                    {item.time}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "flex-end",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      source={
                        item.type == 1 ? theGioiDiDongImage : dienMayXanhIcon
                      }
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 20,
                        top: 25
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 8,
                      marginLeft: 10,
                      borderWidth: 1,
                      padding: 15,
                      borderRadius: 10,
                      width: Dimensions.get("window").width * 0.8,
                      borderColor: colorGray,
                      backgroundColor: item.status ? colorWhite : colorGray
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: colorBlue,
                        marginBottom: 10
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail" //  tail:cuối...; head:...đầu; middle:gi...ữa
                      //  numberOfLines={1} là chỉ hiển thị 1 dòng
                    >
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: 14, color: "#888" }}>
                      {item.conntent}
                    </Text>
                    {/* Nếu là thông báo đơn hàng thì hiển thị 2 nút */}
                    {item.type == 2 ? (
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 10,
                          justifyContent: "space-between"
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: colorWhite,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            marginRight: 10,
                            borderColor: colorBlue,
                            borderWidth: 1
                          }}
                        >
                          <Text style={{ color: colorBlue, fontSize: 14 }}>
                            Chi tiết đơn hàng
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: colorBlue,
                            borderRadius: 10,
                            paddingHorizontal: 10,
                            paddingVertical: 5
                          }}
                        >
                          <Text style={{ color: colorWhite, fontSize: 14 }}>
                            Đánh giá dịch vụ
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

function ElectronicInvoices() {
  const [refreshing, setRefreshing] = useState(false);
  const [dataBill, setDataBill] = useState([]);

  const fetchData = () => {
    // Trả về một Promise để có thể sử dụng .then() khi cần thiết
    return new Promise((resolve) => {
      // Giả lập thời gian tải dữ liệu
      setTimeout(() => {
        // Dữ liệu mới
        const newData = [
          // ... Cập nhật dữ liệu mới ở đây ...
        ];
        setDataBill(newData);
        resolve(); // Kết thúc Promise
      }, 2000); // Thời gian giả lập: 2000ms (2 giây)
    });
  };

  const reload = () => {
    setRefreshing(true); // hiệu ứng reload
    // Gọi hàm fetchData để lấy dữ liệu mới
    fetchData().then(() => {
      setRefreshing(false);
    });
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Hoá đơn điện tử */}
      {dataBill.length == 0 ? (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {refreshing ? (
            <ActivityIndicator
              size="large"
              color={colorBlue}
              style={{ marginTop: 150 }}
            />
          ) : (
            <>
              <Image
                source={emptyIcon}
                style={{
                  width: Dimensions.get("window").width * 0.4,
                  height: Dimensions.get("window").height * 0.3
                }}
              ></Image>
              <Text
                style={{
                  fontSize: 22,
                  color: colorBlue,
                  marginTop: 10,
                  fontWeight: "bold"
                }}
              >
                Hiện tại không có thông báo nào
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: colorYellow,
                  borderRadius: 10,
                  width: Dimensions.get("window").width * 0.9,
                  height: 50,
                  marginTop: 35,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                onPress={reload}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "center"
                  }}
                >
                  Tải lại trang
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      ) : (
        // Hiển thị khi có dữ liệu
        ""
      )}
    </View>
  );
}
const CustomTabBar = ({ state, descriptors, navigation }) => {
  //state: trạng thái hiện tại của tab
  //descriptors: mô tả các tab
  //navigation: điều hướng
  return (
    <View style={{ flexDirection: "row", backgroundColor: "#fff" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };
        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              marginTop: 20,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 16,
              borderBottomWidth: isFocused ? 2 : 0,
              borderBottomColor: isFocused ? "#FFC62E" : "transparent"
            }}
          >
            <Text
              style={{
                fontWeight: isFocused ? "bold" : "normal",
                fontSize: 14,
                textTransform: "lowercase"
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

function NotificationScreen() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Tất cả" component={AllNotifications} />
      <Tab.Screen name="Hoá đơn điện tử" component={ElectronicInvoices} />
    </Tab.Navigator>
  );
}

export default NotificationScreen;
