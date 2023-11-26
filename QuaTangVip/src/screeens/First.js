import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import ic_app from "../../assets/icons_Dai/ic_app.webp";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TransitionPresets } from "@react-navigation/stack";

// Color
const colorRed = "red";
const colorWhite = "#FFFFFF";
const colorGray = "#66583C";
const colorGrayLight = "#8B8B8B";
const colorYellow = "#FFC62E";
const colorBlue = "#6181A1";

const FirstScreen = () => {
  const navigation = useNavigation();

  const own = " CÔNG TY TNHH MTV CÔNG NGHỆ THÔNG TIN THẾ GIỚI DI ĐỘNG";
  //Chuyển trang luôn sau 3s,
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("LoginPhone");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <Image
          source={ic_app}
          style={{ width: 100, height: 100, borderRadius: 50 }}
        />
        <Text style={{ fontSize: 35, fontWeight: "bold", color: colorGray }}>
          Quà Tặng VIP
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          marginBottom: 45
        }}
      >
        <Text style={{ fontSize: 12, color: colorGrayLight }}>
          Sản phẩm của
        </Text>
        <Text style={{ fontSize: 12, color: colorGrayLight }}>{own}</Text>
      </View>
    </View>
  );
};

export default FirstScreen;
