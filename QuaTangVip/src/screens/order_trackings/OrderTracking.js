import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Easing
} from "react-native";

// Color
const colorGray = "#8D8D8D";
const colorBlack = "black";
const colorYellow = "#FFC62E";
const colorBlue = "#0E86C6";

const ContinuousReload = () => {
  const [loading, setLoading] = useState(true);
  const spinValue = useRef(new Animated.Value(0)).current; // useRef để lưu giá trị của Animated.Value(0) sau mỗi lần render

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading((prevLoading) => !prevLoading);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        // Đặt giá trị Animated.Value(0) vào spinValue
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true
      })
    ).start(() => {
      spinValue.setValue(0); // Đặt giá trị về 0 sau khi hoàn thành hoạt ảnh
    });
  }, [loading, spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });

  return (
    (
      <View style={styles.container}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <ActivityIndicator
            size="large"
            color={colorBlue}
            animating={loading}
          />
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
            Dữ liệu đang được đồng bộ. Qúa trình này có thể diễn ra trong ít
            phút. Sẽ thông báo tới anh/chị khi hoàn thành.
          </Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ContinuousReload;
