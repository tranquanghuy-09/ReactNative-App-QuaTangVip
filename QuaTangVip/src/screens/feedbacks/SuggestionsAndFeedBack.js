// npm install react-native-vector-icons @react-navigation/stack expo-image-picker expo-permissions
// npm install react-navigation-stack
// npm install react-native-vector-icons @react-navigation/stack expo-image-picker expo-permissions
// "permissions": ["READ_EXTERNAL_STORAGE"] trong app.json  //Quyền truy cập thư viện ảnh

//npm install react-native-fast-image
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Dimensions
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
//Quyền truy cập thư viện ảnh

import Ionicons from "react-native-vector-icons/Ionicons";
import IconCamera from "../../../assets/icons_Dai/ic_camera.webp";
import IconImage from "../../../assets/icons_Dai/ic_copy_new.webp";
import IconBack from "../../../assets/icons_Dai/node_modules_reactnavigation_stack_src_views_assets_backicon.png";
const Stack = createStackNavigator();

//Chưa xong:
// + Chưa xử lý được nút Gửi
// + Chưa nhận 1 video
const SuggestionsAndFeedback = ({ navigation, route }) => {
  const user = route.params ? route.params.user : null;
  const name = user ? user.name : "";
  const sex = user ? (user.sex == "Nam" ? "Nam" : "Chị") : "";

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
  const contactOptions = ["Có", "Không"];

  const [feedback, setFeedback] = useState(""); //Nội dung góp ý, khiếu nại
  const [contactOption, setContactOption] = useState(null); //Có hoặc không
  const [selectedCompany, setSelectedCompany] = useState(null); //Công ty được chọn
  const [imgList, setImgList] = useState([]); //Danh sách ảnh
  const [selectedImage, setSelectedImage] = useState(null); //Ảnh được chọn để hiển thị trong modal

  const handleContactOptionChange = (option) => {
    setContactOption(option);
  };

  const handleCompanySelection = (company) => {
    setSelectedCompany(company);
  };

  const handleSubmit = () => {
    console.log("Gửi");
  };

  // Kiểm tra và xin quyền truy cập thư viện ảnh
  useEffect(() => {
    (async () => {
      // const { status } =await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status } =
        Platform.OS === "android"
          ? await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
          : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        console.warn("Quyền truy cập thư viện ảnh không được cấp phép.");
      }
    })();
  }, []);

  //Kiểm tra ảnh vào
  useEffect(() => {
    if (route.params) {
      const { imgNew } = route.params;
      if (imgNew) {
        setImgList([...imgList, imgNew]);
      }
    }
  }, [route.params]);

  // Chọn hình ảnh từ thư viện
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    console.log("Trạng thái cấp phép thư viện:", status);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1
    });

    console.log("Kết quả chọn hình ảnh:", result);

    if (!result.cancelled) {
      // {"assets":
      //  [{"assetId": "5070B379-03EF-41DA-8393-794DC9600B8D/L0/001",
      //   "base64": null,
      //   "duration": null,
      //   "exif": null,
      //   "fileName": "IMG_9509.png",
      //    "fileSize": 5068365,
      //    "height": 2208, "
      //  type": "image",
      //   "uri": "file:///var/mobile/Containers/Data/Application/1CAB6ADB-038A-4559-A55E-CB403236A766/Library/Caches/ExponentExperienceData/%2540anonymous%252FQuaTangVip-47b53549-6ad6-4e91-af41-790549c554bc/ImagePicker/BA05B835-5693-49DF-8186-A616437ED835.png",
      //   "width": 1242}],
      //   "canceled": false}

      const uri = Platform.OS === "android" ? result.uri : result.assets[0].uri;
      setImgList([...imgList, uri]);
    }
  };

  //Chụp ảnh
  const handleImageUpload = (option) => {
    if (imgList.length >= 5) {
      alert("Bạn đã chọn đủ 5 ảnh.");
      return;
    }
    if (option === "CHỤP ẢNH") {
      navigation.navigate("Camera", { pageOld: "SuggestionsAndFeedBack" });
    } else if (option === "TẢI ẢNH LÊN") {
      pickImage();
    }
  };

  //Xử lý hiển thị ảnh khi nhấp vào
  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  //Xoá ảnh khỏi danh sách
  const removeImage = (index) => {
    const newImages = [...imgList];
    newImages.splice(index, 1);
    setImgList(newImages);
  };

  //Giao diện
  return (
    <ScrollView style={{ backgroundColor: colorGray, padding: 16 }}>
      {/* Modal hiển thị một bức ảnh khi nhấp vào*/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedImage !== null}
        onRequestClose={() => {
          setSelectedImage(null); //Khi nhấn nút back
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Image
            source={{ uri: selectedImage }}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height
            }}
          />
          {/* Nút đóng modal */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 55,
              left: 30,
              padding: 5,
              backgroundColor: colorYellow,
              borderRadius: 25
            }}
            onPress={() => setSelectedImage(null)}
          >
            <Image source={IconBack} style={{ width: 65, height: 30 }} />
          </TouchableOpacity>
        </View>
      </Modal>

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
          justifyContent: "flex-start",
          //chữ xuất hiện đầu
          textAlignVertical: "top"
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
          {sex} {name} có muốn nhân viên liên hệ hỗ trợ {sex}
        </Text>
      </View>
      <Text style={{ flex: 1, marginBottom: 8, fontSize: fontSize1 }}>
        không?
      </Text>
      <View
        style={{ marginBottom: 8, flexDirection: "row", alignItems: "center" }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {contactOptions.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => handleContactOptionChange(option.toLowerCase())}
              style={{
                marginRight: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Ionicons
                name={
                  contactOption === option.toLowerCase()
                    ? "ios-radio-button-on"
                    : "ios-radio-button-off"
                }
                size={24}
                style={{
                  marginRight: 5,
                  color:
                    contactOption === option.toLowerCase()
                      ? "gold"
                      : colorGrayLight
                }}
              />

              <Text
                key={option}
                style={{ marginRight: 16, color: colorGrayLight }}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ color: colorRed, marginRight: 4, fontSize: fontSize1 }}>
          *
        </Text>
        <Text style={{ flex: 1, fontSize: fontSize1 }}>
          {sex} {name} vui lòng chọn Công ty
        </Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {companyData.map((company) => (
          <TouchableOpacity
            key={company}
            onPress={() => handleCompanySelection(company)}
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
          {imgList.map((item, index) => (
            <View key={index} style={{ position: "relative", marginRight: 5 }}>
              <TouchableOpacity
                style={{ overflow: "visible", position: "relative" }}
                onPress={() => openImageModal(item)}
              >
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
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Chọn ảnh và chụp ảnh */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {["CHỤP ẢNH", "TẢI ẢNH LÊN"].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImageUpload(item)}
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
                source={item === "CHỤP ẢNH" ? IconCamera : IconImage}
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
      {/* Nút gửi */}
      <TouchableOpacity
        onPress={handleSubmit}
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
