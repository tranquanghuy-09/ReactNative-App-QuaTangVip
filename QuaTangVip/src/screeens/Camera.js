// =============================================================================================================================================================================
// =============================================================================================================================================================================
// INSTALL
// expo install expo-camera
// expo install expo-sharing
// expo install expo-media-library

// =============================================================================================================================================================================
// =============================================================================================================================================================================
// app.json
// "plugins": [
//     [
//       "expo-media-library",
//       {
//         "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
//         "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos.",
//         "isAccessMediaLocationEnabled": "true"
//       }
//     ]
//   ],

// =============================================================================================================================================================================
// =============================================================================================================================================================================
// app.json/
// {
//   "expo": {
//     "android": {
//       "permissions": ["CAMERA", "READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"]
//     },
//     "ios": {
//       "infoPlist": {
//         "NSCameraUsageDescription": "We need access to your camera",
//         "NSPhotoLibraryUsageDescription": "We need access to your photo library"
//       }
//     }
//   }
// }

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from "react-native";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = ({ navigation, route }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef();
  const pageOld = route.params.pageOld;

  useEffect(() => {
    // Kiểm tra và yêu cầu quyền truy cập camera khi màn hình được tải lần đầu
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");

      // Hiển thị thông báo nếu quyền truy cập camera bị từ chối
      if (status !== "granted") {
        Alert.alert(
          "Yêu cầu quyền",
          "Vui lòng cấp quyền cho máy ảnh để sử dụng tính năng này.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              }
            }
          ]
        );
      }
    })();
  }, []);

  const takePicture = async () => {
    // Chụp ảnh nếu cameraRef tồn tại
    if (cameraRef.current) {
      const { uri } = await cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true,
        exif: false
      });

      // Chuyển tiếp về trang cũ và gửi hình ảnh
      
      console.log("uri"+uri);
      try {
        navigation.navigate(pageOld, { imgNew: uri });
      } catch (error) {
        console.error("Lỗi khi chuyển đến màn hình Camera:", error);
      }
    }
  };

  // Xử lý trạng thái quyền truy cập camera
  if (hasCameraPermission === null) {
    return <Text>Requesting permissions...</Text>;
  }

  if (hasCameraPermission === false) {
    return (
      <View style={styles.permissionDeniedContainer}>
        <Text style={styles.permissionDeniedText}>
          Camera permission denied. Please grant permission in device settings.
        </Text>
      </View>
    );
  }

  // Giao diện chụp ảnh
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} ref={cameraRef}>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
          />
        </Camera>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  cameraContainer: {
    flex: 1
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  captureButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    height: 70,
    width: 70,
    alignSelf: "center",
    marginBottom: 20
  },
  permissionDeniedContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  permissionDeniedText: {
    fontSize: 18,
    textAlign: "center"
  }
};

export default CameraScreen;
