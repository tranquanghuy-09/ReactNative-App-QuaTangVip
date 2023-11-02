import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Picker
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconCamera from "../../assets/icons_Dai/ic_camera.webp";
import IconImage from "../../assets/icons_Dai/ic_photo.webp";
//
const SuggestionsAndFeedback = () => {
  // Color
  const colorRed = "red";
  const colorWhite = "#FFFFFF";
  const colorGray = "#F5F5F5";
  const colorGrayLight = "#8B8B8B";
  const colorYellow = "#FFC62E";
  const colorBlue = "#6181A1";

  // FontSize
  const fontSize1 = 16;
  const fontSize2 = 14;
  const fontSize3 = 12;
  const fontSize4 = 10;

  // Company
  const companyData = [
    "THẾ GIỚI DI ĐỘNG",
    "ĐIỆN MÁY XANH",
    "BÁCH HÓA XANH",
    "AN KHANG",
    "TẬN TÂM",
    "QUÀ TẶNG VIP",
    "AVA KIDS",
    "TOPZONE"
  ];

  const [feedback, setFeedback] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const removeImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  return (
    <ScrollView style={{ backgroundColor: colorGray, padding: 16 }}>
      <TextInput
        multiline
        style={{
          height: 175,
          borderRadius: 8,
          padding: 8,
          marginBottom: 16,
          marginTop: 0,
          backgroundColor: colorWhite,
          fontSize: fontSize1,
          justifyContent: "flex-start"
        }}
        placeholder="Nhập nội dung góp ý, khiếu nại"
        placeholderTextColor={colorGrayLight}
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: colorRed, marginRight: 4, fontSize: fontSize1 }}>
          *
        </Text>
        <Text style={{ flex: 1, fontSize: fontSize1 }}>
          Anh Đại có muốn chọn nhân viên liên hệ hỗ trợ Anh không?
        </Text>
      </View>
      <View flexDirection="rơ">
        <TouchableOpacity
          style={{
            width: "30%",
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            marginRight: 8,
            borderColor: colorGrayLight,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: colorGrayLight, fontSize: fontSize1 }}>Có</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "30%",
            borderWidth: 1,
            borderRadius: 8,
            padding: 8,
            marginRight: 8,
            borderColor: colorGrayLight,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ color: colorGrayLight, fontSize: fontSize1 }}>
            Không
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: colorRed, marginRight: 4, fontSize: fontSize1 }}>
          *
        </Text>
        <Text style={{ flex: 1, fontSize: fontSize1 }}>
          Anh Đại vui lòng chọn công ty
        </Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {companyData.map((company) => (
          <TouchableOpacity
            key={company}
            onPress={() => setSelectedCompany(company)}
            style={{
              width: "30%",
              borderWidth: 1,
              borderRadius: 8,
              padding: 8,
              margin: 4,
              borderColor:
                selectedCompany === company ? colorYellow : colorGrayLight
            }}
          >
            <Text
              style={{
                fontSize: fontSize4,
                textAlign: "center",
                color:
                  selectedCompany === company ? colorYellow : colorGrayLight
              }}
            >
              {company}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: fontSize1 }}>Hình ảnh, video đính kèm</Text>
        <Text
          style={{
            fontSize: fontSize2,
            marginBottom: 8,
            color: colorGrayLight
          }}
        >
          Tối đa 5 ảnh, 1 video
        </Text>
        <View style={{ flexDirection: "row", marginBottom: 20 }}>
          {selectedImages.map((item, index) => (
            <View key={index} style={{ position: "relative", marginRight: 5 }}>
              <View style={{ overflow: "visible", position: "relative" }}>
                <Image
                  source={{ uri: item }}
                  style={{
                    width: 55,
                    height: 55,
                    borderWidth: 1,
                    borderRadius: 5
                  }}
                />
                <View
                  style={{
                    position: "absolute",
                    top: -10,
                    right: -5,
                    borderRadius: 10,
                    overflow: "hidden"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      backgroundColor: "black",
                      padding: 3,
                      borderRadius: 50
                    }}
                    onPress={() => removeImage(index)}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: fontSize4
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {["CHỤP ẢNH", "TẢI ẢNH LÊN"].map((item) => (
            <TouchableOpacity
              style={{
                width: "48%",
                borderWidth: 2,
                borderColor: colorBlue,
                borderRadius: 8,
                padding: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={item == "CHỤP ẢNH" ? IconCamera : IconImage}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  marginRight: 10
                }}
              />
              <Text
                style={{
                  color: colorBlue,
                  textAlign: "center",
                  fontWeight: 700
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={{ backgroundColor: colorYellow, padding: 12, borderRadius: 8 }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: fontSize1,
            fontWeight: 400
          }}
        >
          GỬI
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SuggestionsAndFeedback;
