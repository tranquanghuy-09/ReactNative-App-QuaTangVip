// Import các thư viện cần thiết
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [stores, setStores] = useState([
    { id: 1, name: 'Store 1', latitude: 37.7749, longitude: -122.4194 },
    { id: 2, name: 'Store 2', latitude: 37.7899, longitude: -122.4354 },
    // Thêm các cửa hàng khác vào đây
  ]);

  useEffect(() => {
    // Hàm lấy vị trí hiện tại
    const getLocation = async () => {
      try {
        // Yêu cầu quyền truy cập vị trí
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        // Lấy thông tin vị trí
        let userLocation = await Location.getCurrentPositionAsync({});
        setLocation(userLocation.coords);
      } catch (error) {
        console.error('An error occurred while getting the location', error);
      }
    };

    // Gọi hàm lấy vị trí khi màn hình được load
    getLocation();
  }, []); // Chạy chỉ một lần khi màn hình được load

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Đánh dấu vị trí hiện tại */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="You are here"
            description="Your current location"
          />

          {/* Đánh dấu các cửa hàng từ dữ liệu */}
          {stores.map(store => (
            <Marker
              key={store.id}
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude,
              }}
              title={store.name}
              description={`Location of ${store.name}`}
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default MapScreen;
