import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";

const MapScreen = ({ navigation, route }) => {
  const goBackImage = require("../../assets/icons_Dai/node_modules_reactnavigation_stack_src_views_assets_backicon.png");
  const myLocationImage = require("../../assets/icons_Dai/ic_my_location.webp");
  const colorYellow = "#FFC62E";

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

  const [location, setLocation] = useState(null);
  const mapViewRef = useRef(null);
  const [stores, setStores] = useState([
    { id: 1, name: "Store 1", latitude: 10.82213, longitude: 106.68683 },
    { id: 2, name: "Store 2", latitude: 10.82418, longitude: 106.68677 },
    { id: 3, name: "Store 3", latitude: 10.82313, longitude: 106.68783 }
  ]);

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
            title="You are here"
            description="Your current location"
          />

          {stores.map((store) => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude
              }}
              title={store.name}
              description={`Location of ${store.name}`}
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

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
        <TouchableOpacity
          onPress={handleGoBack}
          style={{
            backgroundColor: colorYellow,
            borderRadius: 25,
            width: 40,
            height: 40,
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
            width: 40,
            height: 40,
            borderColor: colorYellow,
            justifyContent: "center",
            alignItems: "center"
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

export default MapScreen;
