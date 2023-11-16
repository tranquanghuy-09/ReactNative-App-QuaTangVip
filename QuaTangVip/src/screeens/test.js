//Trang thông báo của ứng dụng Quà Tặng Vip
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  TextInput
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Icon
const theGioiDiDongImage = require("../../assets/icons_Dai/logo_branch_tgdd.webp");
const dienMayXanhIcon = require("../../assets/icons_Dai/phat-trien-website-dien-may-xanh-16233.jpeg");
// Color
const colorRed = "red";
const colorWhite = "#FFFFFF";
const colorGray = "#DCDCDC";
const colorYellow = "#FFC62E";
const colorBlue = "#0866FF";
const Notification = ({ navigation, route }) => {
  
  function setStatus(index, item) {
    alert(index + " " + item.status);
    //Chuyển trạng thái đã đọc thành đã đọc
  }

  const [activeTab, setActiveTab] = useState("all"); // all | bill

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    // Trang thông báo của ứng dụng Quà Tặng Vip bao gồm 2 phần nằm hở header: Tất cả | Hoá đơn điện tử
    // Trang tất cả nằm bên phải, trang hoá đơn điện tử nằm bên trái
    // Chữ tất cả và hoá đơn điện tử nằm trên cùng như 1 tab
    // Khi click vào tab nào thì tab đó được tô màu xanh, vào chuyển đến trang đó
    // Ở trang tất cả vuối sang phải thì chuyển sang trang hoá đơn điện tử
    // Ở trang hoá đơn điện tử vuối sang trái thì chuyển sang trang tất cả

    // Phần Tất cả: Hiển thị các thông báo của ứng dụng Quà Tặng Vip
    // Danh sách theo hàng ngang sắp xếp theo thời gian, từ trên xuống dưới
    // Mỗi thông báo gồm:
    // thời gina
    // Anh icon| Tiêu đề |
    // Nội dung |

    // Phần Hoá đơn điện tử: Ảnh : hIỆN TẠI KHÔNG CÓ THÔNGG BÁO

    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: 50,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#eee"
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => handleTabPress("all")}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10
            }}
          >
            Tất cả
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => handleTabPress("bill")}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}>
            Hoá đơn điện tử
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {data.map((item, index) => {
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
      {/* Hoá đơn điện tử */}
    </View>
  );
};

export default Notification;
