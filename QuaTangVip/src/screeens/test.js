import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

//Thử nghiệm tạo button trên map nhưng không được
// Chưa làm được
// Vị trí hiện tại xoay theo vị trí người dùng
// Trang này có cái vui vui là khi render lại thì các cửa hàng cũng thay đổi vị trí :))))

const NearbyStore = ({ navigation, route }) => {
  //Ảnh
  const goBackImage = require("../../assets/icons_Dai/node_modules_reactnavigation_stack_src_views_assets_backicon.png");
  const myLocationImage = require("../../assets/icons_Dai/ic_my_location.webp");
  const theGioiDiDongImage = require("../../assets/icons_Dai/logo_branch_tgdd.webp");
  const dienMayXanhIcon = require("../../assets/icons_Dai/phat-trien-website-dien-may-xanh-16233.jpeg");
  const anKhangIcon = require("../../assets/icons_Dai/nha-thuoc-an-khang-tra-cuu-chi-tiet-thong-tin-thuoc-logo-06-07-2021.png");
  const aVAKIDSIcon = require("../../assets/icons_Dai/file.jpg");
  const aVACareIcon = require("../../assets/icons_Dai/thumbtopzone2_800x450-600x400.jpg");
  //Màu
  const colorYellow = "#FFC62E";

  //   const button = [
  //     {
  //       id: 1,
  //       name: "Trở về",
  //       icon: goBackImage,
  //       backgroundColor: colorYellow,
  //       color: "black",
  //       event: handleGoBack
  //     },
  //     {
  //       id: 2,
  //       name: "Định vị",
  //       icon: myLocationImage,
  //       backgroundColor: colorYellow,
  //       color: "black",
  //       event: handleLocateMe
  //     }
  //   ];

  const [location, setLocation] = useState(null);
  const mapViewRef = useRef(null);

  //data ảo dự trù trên gg map

  const getRandomOffset = () => {
    return (Math.random() - 0.5) * 0.02;
  };

  const dataStore = [
    {
      id: 1,
      name: "Thế giới di động",
      lisStore: [
        {
          id: 1,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        },
        {
          id: 3,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        }
      ],
      icon: theGioiDiDongImage
    },
    {
      id: 2,
      name: "Điện máy xanh",
      lisStore: [
        {
          id: 1,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        }
      ],
      icon: dienMayXanhIcon
    },
    {
      id: 3,
      name: "An Khang",
      lisStore: [
        {
          id: 1,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        }
      ],
      icon: anKhangIcon
    },
    {
      id: 4,
      name: "AVA Kids",
      lisStore: [
        {
          id: 1,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        }
      ],
      icon: aVAKIDSIcon
    },
    {
      id: 5,
      name: "AVA Care",
      lisStore: [
        {
          id: 1,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        }
      ],
      icon: aVACareIcon
    },
    {
      id: 6,
      name: "AVA Care",
      lisStore: [
        {
          id: 1,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local: "Địa chỉ: 123 Nguyễn Thị Minh Khai, Quận 1, TP.HCM"
        }
      ],
      icon: aVACareIcon
    }
  ];

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Quyền truy cập vị trí đã bị từ chối");
          return;
        }
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
      } catch (error) {
        console.error("Đã xảy ra lỗi khi nhận vị trí", error);
      }
    };
    getLocation();
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLocateMe = async () => {
    try {
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      mapViewRef.current?.animateToRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      });
    } catch (error) {
      console.error("Đã xảy ra lỗi khi nhận vị trí", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          ref={mapViewRef}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude
            }}
            title="Địa điểm hiện tại"
            description="Đây là vị trí của bạn"
          />
          {/* Hiển thị cửa hàng */}
          {dataStore.map((item, index) => (
            <React.Fragment key={index}>
              {item.lisStore.map((store) => (
                <Marker
                  key={store.id}
                  coordinate={{
                    latitude: store.latitude,
                    longitude: store.longitude
                  }}
                  title={item.name}
                  description={store.local}
                >
                  <Image
                    source={item.icon}
                    style={{ width: 30, height: 30, borderRadius: 25 }}
                  />
                </Marker>
              ))}
            </React.Fragment>
          ))}

          {/* {stores.map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude
              }}
              title={store.name}
              description={`Location of ${store.name}`}
            />
          ))} */}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      {/* Các nút trên map */}
      <View
        style={{
          width: "100%",
          position: "absolute",
          marginTop: 80,
          padding: 10,
          zIndex: 1,
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        {/* {button.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => item.event}
            style={{
              backgroundColor: item.backgroundColor,
              borderRadius: 25,
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image source={item.icon} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        ))} */}

        <TouchableOpacity
          onPress={handleGoBack}
          style={{
            backgroundColor: colorYellow,
            borderRadius: 25,
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image source={goBackImage} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLocateMe}
          style={{
            backgroundColor: colorYellow,
            width: 50,
            height: 50,
            borderColor: colorYellow,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25
          }}
        >
          <Image
            source={myLocationImage}
            style={{ width: 30, height: 30, tintColor: "black" }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NearbyStore;
