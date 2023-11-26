// Tham khảo: https://docs.expo.io/versions/latest/sdk/map-view/
// Thêm quyền truy cập vị trí vào file app.json
// {
//     "expo": {
//       "android": {
//         "permissions": ["ACCESS_FINE_LOCATION"]
//       },
//       "ios": {
//         "infoPlist": {
//           "NSLocationWhenInUseUsageDescription": "Your message here"
//         }
//       }
//     }
//   }
// Import các thư viện cần thiết
// npx expo install react-native-maps
// expo install expo-location
///expo install react-native-elements

//https://www.latlong.net: lấy địa chỉ
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  PanResponder
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";

//Thử nghiệm tạo button trên map nhưng không được => do sắp xếp thứ tụ sai: button nằm dưới hàm xử lý :(((((

// Chưa làm được:
// Vị trí hiện tại xoay theo vị trí người dùng
// Trang này có cái vui vui là khi render lại thì các cửa hàng cũng thay đổi vị trí :))))
//Chưa sắp xếp thứ tự các cửa hàng theo km
// Chưa hiển thị con đường đến cửa hàng

const NearbyStore = ({ navigation, route }) => {
  const isIPhone = Platform.OS === 'ios';
  //Ảnh
  const goBackImage = require("../../../assets/icons_Dai/node_modules_reactnavigation_stack_src_views_assets_backicon.png");
  const myLocationImage = require("../../../assets/icons_Dai/ic_my_location.webp");
  //Iocn logo 5 loại cửa hàng
  const theGioiDiDongImage = require("../../../assets/icons_Dai/logo_branch_tgdd.webp");
  const dienMayXanhIcon = require("../../../assets/icons_Dai/phat-trien-website-dien-may-xanh-16233.jpeg");
  const anKhangIcon = require("../../../assets/icons_Dai/nha-thuoc-an-khang-tra-cuu-chi-tiet-thong-tin-thuoc-logo-06-07-2021.png");
  const aVAKIDSIcon = require("../../../assets/icons_Dai/file.jpg");
  const aVACareIcon = require("../../../assets/icons_Dai/thumbtopzone2_800x450-600x400.jpg");
  //Màu
  const colorYellow = "#FFC62E";
  const colorGray = "#BDBDBD";
  const colorBlue = "#1892D3";
  //Kích thước màn hình
  const { widthMAX, heightMAX } = Dimensions.get("window");
  //Độ phóng to
  const zoom = 0.002;
  //Icon
  const upIcon = require("../../../assets/icons_Dai/ic_up.webp");
  const downIcon = require("../../../assets/icons_Dai/ic_down.webp");
  const shopIcon = require("../../../assets/icons_Dai/ic_shop.webp");
  const mapIcon = require("../../../assets/icons_Dai/maps.webp");
  const clockIcon = require("../../../assets/icons_Dai/lovepik-clock-icon-png-image_401467032_wh1200.png");
  const closeIcon = require("../../../assets/icons_Dai/ic_close.webp");

  //Height của thanh dưới
  const [lowerBarLength, setlowerBarLength] = useState(false);
  const [upDownIcon, setUpDownIcon] = useState(upIcon);
  //map
  const [location, setLocation] = useState(null);
  const mapViewRef = useRef(null);
  const [infoStore, setinfoStore] = useState(null);

  //data ảo cửa hàng trên gg map
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
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
        },
        {
          id: 3,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
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
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
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
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
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
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
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
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
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
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
        },
        {
          id: 2,
          latitude: 10.82213 + getRandomOffset(),
          longitude: 106.68683 + getRandomOffset(),
          local:
            "12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam"
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

  //Xử lý di chuyển màn hình tới địa chỉ đươc nhận
  const handleMoveToLocation = (latitude, longitude) => {
    mapViewRef.current?.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: zoom,
      longitudeDelta: zoom
    });
  };
  //Xử lý chuyển chuyển màn hình tới địa chỉ bản thân
  const handleLocateMe = async () => {
    try {
      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);
      handleMoveToLocation(
        userLocation.coords.latitude,
        userLocation.coords.longitude
      );
    } catch (error) {
      console.error("Đã xảy ra lỗi khi nhận vị trí", error);
    }
  };

  //Xử lý tính khoảng cách để vị trí của bản thân
  function getKm(latitudeStore, longitudeStore) {
    if (!location || !latitudeStore || !longitudeStore) {
      return null; //không có dữ liệu
    }
    const toRadians = (angle) => {
      return (angle * Math.PI) / 180;
    };
    const R = 6371; //Bán kính trái đất
    const dLat = toRadians(latitudeStore - location.latitude);
    const dLon = toRadians(longitudeStore - location.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(location.latitude)) *
        Math.cos(toRadians(latitudeStore)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); //Tính toán theo công thức haversine
    const distance = R * c; // Khoảng cách tính theo km
    return distance.toFixed(2); // adjust the number of decimal places as needed
  }

  // Xử lý khi người dùng vuốt lên hoặc xuống
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        // Di chuyển lên
        if (gestureState.dy < 0) {
          setUpDownIcon(downIcon);
          setlowerBarLength(true);
          console.log("Moving up", gestureState.dy);
        } else {
          // // Di chuyển xuống
          setUpDownIcon(upIcon);
          setlowerBarLength(false);
          console.log("Moving down", gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Xử lý khi người dùng nhả tay
        console.log("Released", gestureState.dy);
      }
    })
  ).current;

  //Xử lý thay đổi độ dài thanh dưới với 2 kich thước măc định
  const handleScroll = () => {
    lowerBarLength ? setUpDownIcon(upIcon) : setUpDownIcon(downIcon);
    setlowerBarLength(!lowerBarLength);
  };

  //Xử lý hiển thị thông tin cửa hàng
  const handleShowStore = (item, store) => {
    // di chuyển tới vị trí cửa hàng
    handleMoveToLocation(store.latitude, store.longitude);
    //Hiển thị thông tin cửa hàng
    const newStore = {
      name: item.name,
      local: store.local,
      latitude: store.latitude,
      longitude: store.longitude,
      time: "7:30 - 22:00",
      icon: item.icon,
      id: store.id
    };
    setinfoStore(newStore);
  };

  //Các nút trên map
  const button = [
    {
      id: 1,
      name: "Trở về",
      icon: goBackImage,
      backgroundColor: colorYellow,
      color: "black",
      event: handleGoBack
    },
    {
      id: 2,
      name: "Định vị",
      icon: myLocationImage,
      backgroundColor: colorYellow,
      color: "black",
      event: handleLocateMe
    }
  ];

  return (
    <View style={{ flex: 1,}}>
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
          marginTop: isIPhone?60:80,
          padding: 20,
          zIndex: 1,
          flexDirection: "row",
          justifyContent: "space-between"

        }}
      >
        {button.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={item.event}
            style={{
              backgroundColor: item.backgroundColor,
              borderRadius: 25,
              width: 50,
              height: 50,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Image
              source={item.icon}
              style={{ width: 30, height: 30, tintColor: item.color }}
            />
          </TouchableOpacity>
        ))}

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>

      <View
        style={{
          width: widthMAX,
          position: "absolute",
          bottom: 0,
          height: lowerBarLength ? 575 : 215, //215
          backgroundColor: "white",
          flexDirection: "column",
          alignItems: "center"
        }}
        {...panResponder.panHandlers} //Lắng nghe sự kiện vuốt lên hoặc xuống
      >
        <Image
          source={upDownIcon}
          style={{
            width: 150,
            height: 30,
            tintColor: colorGray,
            resizeMode: "stretch"
          }}
        ></Image>
        {/* Nội dung của thanh cuối */}
        {infoStore == null ? (
          <>
            <React.Fragment>
              {/* Danh sách cửa hàng*/}
              <FlatList
                data={dataStore}
                horizontal={false}
                renderItem={({ item }) =>
                  item.lisStore.map((store) => (
                    <View
                      key={store.id}
                      style={{
                        width: "90%",
                        height: 150,
                        flexDirection: "row",
                        padding: 10,
                        borderBottomWidth: 1,
                        borderColor: colorGray
                      }}
                    >
                      <Image
                        source={item.icon}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 25,
                          marginBottom: 10,
                          marginLeft: 20,
                          marginRight: 20,
                          marginTop: 0
                        }}
                      />
                      <View
                        style={{
                          flexDirection: "column"
                        }}
                      >
                        <Text
                          style={{
                            fontWeight: "bold",
                            marginBottom: 5,
                            fontSize: 18
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text style={{ fontSize: 16 }}>
                          {getKm(store.latitude, store.longitude)} km
                        </Text>
                        <Text
                          style={{
                            color: colorGray,
                            fontSize: 16,
                            width: "65%"
                          }}
                        >
                          {store.local}
                        </Text>
                        <TouchableOpacity
                          style={{}}
                          onPress={() => handleShowStore(item, store)}
                        >
                          <Text
                            style={{
                              color: colorBlue,
                              textDecorationLine: "underline",
                              fontSize: 14,
                              marginTop: 10
                            }}
                          >
                            Chi tiết cửa hàng
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                }
                keyExtractor={(item) => item.id.toString()}
              />
              <View
                style={{
                  borderColor: colorYellow,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                  position: "absolute",
                  bottom: 40,
                  right: 40
                }}
              >
                <TouchableOpacity
                  onPress={handleScroll}
                  style={{
                    backgroundColor: colorBlue,
                    width: 50,
                    height: 50,
                    borderColor: colorYellow,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 25,
                    position: "absolute",
                    bottom: isIPhone?7:0,
                  }}
                >
                  <Image
                    source={upDownIcon}
                    style={{ width: 30, height: 30, tintColor: "white" }}
                  />
                </TouchableOpacity>
              </View>
              {/* Kết thúc danh sách */}
            </React.Fragment>
          </>
        ) : (
          //Hiển thị thông tin cửa hàng
          <View
            style={{
              flexDirection: "column",
              width: Dimensions.get("window").width
            }}
          >
            <View
              style={{
                width: Dimensions.get("window").width,
                flexDirection: "row",
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  textAlign: "center",
                  fontWeight: "bold"
                }}
              >
                {infoStore.name}
              </Text>
            </View>
            <View
              style={{
                width: Dimensions.get("window").width,
                flexDirection: "row",
                padding: 10,
                borderRadius: 5,
                paddingBottom: 5
              }}
            >
              <Image
                source={shopIcon}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  marginBottom: 10,
                  marginRight: 20,
                  marginTop: 0
                }}
              />
              <Text style={{ fontSize: 18 }}>
                {getKm(infoStore.latitude, infoStore.longitude)} km
              </Text>
            </View>
            {/* Dòng line phân cách giữa dòng*/}
            <View
              style={{
                width: Dimensions.get("window").width * 0.7,
                borderBottomWidth: 1,
                alignSelf: "center",
                borderColor: colorGray
              }}
            ></View>
            {/* Dòng line phân cách */}
            <View
              style={{
                width: Dimensions.get("window").width,
                flexDirection: "row",
                padding: 10,
                borderRadius: 5
              }}
            >
              <Image
                source={mapIcon}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  marginBottom: 10,
                  marginRight: 20,
                  marginTop: 0
                }}
              />
              <Text style={{ fontSize: 1, marginRight: 20 }}>
                {infoStore.local}
              </Text>
            </View>
            {/* Dòng line phân cách giữa dòng*/}
            <View
              style={{
                width: Dimensions.get("window").width * 0.7,
                borderBottomWidth: 1,
                alignSelf: "center",
                borderColor: colorGray
              }}
            ></View>
            {/* Dòng line phân cách */}
            <View
              style={{
                width: Dimensions.get("window").width,
                flexDirection: "row",
                padding: 10,
                borderRadius: 5
              }}
            >
              <Image
                source={clockIcon}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 25,
                  marginBottom: 10,
                  marginRight: 20,
                  marginTop: 0
                }}
              />
              <Text style={{ marginRight: 80, fontSize: 18 }}>
                {infoStore.time}
              </Text>
            </View>
            {/* Nút đóng màn hinh */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
                position: "absolute",
                top: 10,
                right: 30
              }}
            >
              <TouchableOpacity
                onPress={() => setinfoStore(null)}
                style={{
                  width: 50,
                  height: 50,
                  borderColor: colorYellow,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 25,
                  position: "absolute"
                }}
              >
                <Image source={closeIcon} style={{ width: 20, height: 20 }} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default NearbyStore;
