import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Animated,
  Easing,
  ActivityIndicator,
  Modal
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Picker } from "@react-native-picker/picker";

// Icon
const theGioiDiDongImage = require("../../../assets/icons_Dai/logo_branch_tgdd.webp");
const dienMayXanhIcon = require("../../../assets/icons_Dai/phat-trien-website-dien-may-xanh-16233.jpeg");
const emptyIcon = require("../../../assets/icons_Dai/ic_empty.webp");

// Color
const colorRed = "red";
const colorWhite = "#FFFFFF";
const colorGray = "#DCDCDC";
const colorYellow = "#FFC62E";
const colorBlue = "#0866FF";
const Tab = createMaterialTopTabNavigator();

// Bảo dưỡng thiết bị
function EquipmentMaintenance() {
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newData = [];
        setData(newData);
        resolve();
      }, 2000);
    });
  };

  const reload = () => {
    setRefreshing(true);
    // Gọi hàm fetchData để lấy dữ liệu mới
    fetchData().then(() => {
      setRefreshing(false);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {data.length === 0 && (
        // Hiển thị khi không có dữ liệu
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
                  fontWeight: "bold",
                  textAlign: "center"
                }}
              >
                Anh/Chị không có sản phẩm cần thay đổi lõi lọc
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
      )}
    </View>
  );
}

// Danh sách sản phẩm
const ListOfProducts = () => {
  const data = []; // Điền dữ liệu sản phẩm của bạn vào đây
  const [loading, setLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading((prevLoading) => !prevLoading);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start(() => {
      spinValue.setValue(0);
    });
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  const [selectedValue, setSelectedValue] = useState("Tất cả");
  const [modalVisible, setModalVisible] = useState(false);

  const options = [
    { label: "Tất cả", value: "Tất cả" },
    { label: "Còn bảo hành", value: "Còn bảo hành" },
    { label: "Hết bảp hành", value: "Hết bảo hành" }
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Ô option box nhỏ nằm góc trái màn hình */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          height: 30,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 4,
          padding: 5,
          backgroundColor: colorWhite
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 18 }}>{selectedValue} ↓ </Text>
      </TouchableOpacity>

      {/* Modal hiển thị danh sách lựa chọn */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              backgroundColor: colorWhite,
              padding: 20,
              borderRadius: 10
            }}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={{ padding: 10 }}
                onPress={() => {
                  setSelectedValue(option.value);
                  setModalVisible(false);
                }}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      {/* Hiển thị danh sách sản phẩm hoặc loading */}
      {data.length === 0 ? (
        <View>
          <Animated.View
            style={{ transform: [{ rotate: spin }], marginBottom: 16 }}
            key="spinner"
          >
            <ActivityIndicator
              size="large"
              color="blue" // Thay đổi màu sắc theo ý của bạn
              animating={loading}
            />
          </Animated.View>
          <View
            style={{
              width: "80%",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{ fontSize: 16, color: "black", textAlign: "center" }}>
              Dữ liệu đang được đồng bộ. Qúa trình này có thể diễn ra trong ít
              phút. Sẽ thông báo tới anh/chị khi hoàn thành.
            </Text>
          </View>
        </View>
      ) : (
        <ScrollView>
          {/* Nội dung sản phẩm của bạn điều nằm ở đây */}
        </ScrollView>
      )}
    </View>
  );
};
// Lịch sử bảo hành
function WarrantyHistory() {
  const [loading, setLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading((prevLoading) => !prevLoading);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start(() => {
      spinValue.setValue(0);
    });
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <ActivityIndicator size="large" color={colorBlue} animating={loading} />
      </Animated.View>
      <View
        style={{
          marginTop: 16,
          width: "80%",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            marginTop: 16,
            fontSize: 16,
            color: "black",
            textAlign: "center"
          }}
        >
          Dữ liệu đang được đồng bộ. Qúa trình này có thể diễn ra trong ít phút.
          Sẽ thông báo tới anh/chị khi hoàn thành.
        </Text>
      </View>
    </View>
  );
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
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

function WarrantyAndMaintenance() {
  return (
    <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <Tab.Screen name="Bảo dưỡng thiết bị" component={EquipmentMaintenance} />
      <Tab.Screen name="Danh sách sản phẩm" component={ListOfProducts} />
      <Tab.Screen name="Lịch sử bảo hành" component={WarrantyHistory} />
    </Tab.Navigator>
  );
}

export default WarrantyAndMaintenance;
