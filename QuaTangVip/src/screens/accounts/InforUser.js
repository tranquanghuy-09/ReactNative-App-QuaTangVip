import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Ionicons from "react-native-vector-icons/Ionicons";
// import DatePicker from "react-native-datepicker";

import DateTimePicker from "@react-native-community/datetimepicker";
// import { SectionList ,MultipleSelectList} from "Reac-native-dropdown-select-list";
// import DropdownSelect from "react-native-dropdown-select-list";
// import RNPickerSelect from "react-native-picker-select";
import { SelectList } from "react-native-dropdown-select-list";
import MultiSelect from "react-native-multiple-select";
import {ipv4} from '../../global';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { useIsFocused } from '@react-navigation/native';


// Color
const colorBlack = "#000000";
const colorGray = "#A59464";
const colorGrayLight = "#F2F2F2";
const colorWhite = "#FFF";
const colorRed = "red";
const colorYellow = "#FFEEC0";
const colorYellow2 = "#FFC62E";
const colorBlue = "#105989";
const colorGreen = "#2CA215";
// FontSize
const fontSize1 = 16;
const fontSize2 = 14;
const fontSize3 = 12;
const fontSize4 = 10;
//Ảnh
const ic_edit_input_new = require("../../../assets/icons_Dai/ic_edit_input_new.png");
const avatar = require("../../../assets/icons_Dai/ic_account_logo.webp");
const cameraIcon = require("../../../assets/icons_Dai/ic_camera.webp");
const ic_warning = require("../../../assets/icons_Dai/ic_warning.webp");

// Thử 3 hàm với 3 thư viện khác nhau mà không được :v said
export default function App({ navigation, route }) {
  const isIPhone = Platform.OS === 'ios';
  const isFocused = useIsFocused();
  useEffect(() => {
    navigation.setOptions({
        headerLeft: () => (
            <View style={{ marginLeft: 20, }} >
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../../assets/icons/arrow-left.png')} style={{ width: 13, height: 15 }} />
                    <Text style={{ marginLeft: 10, fontSize: isIPhone ? 15 : 17, fontWeight: 400, color: '#1A93D4' }}>Quay lại</Text>
                </TouchableOpacity>
            </View>
        ),
    });
}, []); 

const {userGL} = useUser();
  const [newUserId, setNewUserId] = React.useState(userGL.user_id);
  useEffect(() => {
    loadProfileUser();
  }, [isFocused]);
  const loadProfileUser = async () => {
    try {
      const result = await axios.get("http://"+ipv4+"/user?user_id="+newUserId);
      console.log(result.data);
      setUser({
        id: 1,
        name: result.data.name,
        phone: "0000000000",
        password: "123",
        sex: true,
        date: "2023-11-26",
        address: "Gia Lai",
        city: "Gia Lai",
        email: "d@gmail.com",
        // img: "file:///var/mobile/Containers/Data/Application/0997EAF5-2ACD-40A5-AEFD-1F18616E0643/Library/Caches/ExponentExperienceData/%2540anonymous%252FQuaTangVip-47b53549-6ad6-4e91-af41-790549c554bc/ImagePicker/D7E49D2D-A6D2-4F1B-B698-C060337459CE.jpg",
        img: avatar,
        group: [1, 2],
        time: [2, 5]
  });
      
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };
  const [user, setUser] = useState({
        id: 1,
        name: "Không một ai",
        phone: "0000000000",
        password: "123",
        sex: true,
        date: "2023-11-26",
        address: "Gia Lai",
        city: "Gia Lai",
        email: "d@gmail.com",
        // img: "file:///var/mobile/Containers/Data/Application/0997EAF5-2ACD-40A5-AEFD-1F18616E0643/Library/Caches/ExponentExperienceData/%2540anonymous%252FQuaTangVip-47b53549-6ad6-4e91-af41-790549c554bc/ImagePicker/D7E49D2D-A6D2-4F1B-B698-C060337459CE.jpg",
        img: avatar,
        group: [1, 2],
        time: [2, 5]
  });
  
  console.log(user);

  // const user = route.params
  //   ? route.params.user
  //   : {
  //       id: 1,
  //       name: "Không một ai",
  //       phone: "0000000000",
  //       password: "123",
  //       sex: true,
  //       date: "2023-11-26",
  //       address: "Gia Lai",
  //       city: "Gia Lai",
  //       email: "d@gmail.com",
  //       // img: "file:///var/mobile/Containers/Data/Application/0997EAF5-2ACD-40A5-AEFD-1F18616E0643/Library/Caches/ExponentExperienceData/%2540anonymous%252FQuaTangVip-47b53549-6ad6-4e91-af41-790549c554bc/ImagePicker/D7E49D2D-A6D2-4F1B-B698-C060337459CE.jpg",
  //       img: avatar,
  //       group: [1, 2],
  //       time: [2, 5]
  //     };

  //Tên, số điện thoại, ngày sinh, địa chỉ, tỉnh thành sinh sống,email, nhóm sản phẩn ưu đãi,thời gian
  const dataInput = [
    {
      id: 1,
      colum: "Họ và tên",
      value: user.name,
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null,
      question: "Nhập họ và tên"
    },
    {
      id: 2,
      colum: "Số điện thoại",
      value: user.phone,
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null,
      question: "Nhập số điện thoại"
    },
    {
      id: 3,
      colum: "Ngày sinh",
      value: user.date,
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null,
      question: "Chọn ngày sinh"
    },
    {
      id: 4,
      colum: "Địa chỉ",
      value: user.address,
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null,
      question: "Nhập địa chỉ"
    },
    {
      id: 5,
      colum: "Tỉnh thành sinh sống",
      value: user.city,
      icon: ic_edit_input_new,
      listData: [
        { key: "Gia Lai", value: "Gia Lai" },
        { key: "Hà Nội", value: "Hà Nội" },
        { key: "Hồ Chí Minh", value: "Hồ Chí Minh" },
        { key: "Đà Nẵng", value: "Đà Nẵng" },
        { key: "Hải Phòng", value: "Hải Phòng" },
        { key: "Cần Thơ", value: "Cần Thơ" },
        { key: "An Giang", value: "An Giang" },
        { key: "Bà Rịa - Vũng Tàu", value: "Bà Rịa - Vũng Tàu" }
      ],
      question: "Chọn tỉnh thành",
      multiple: false
    },
    {
      id: 6,
      colum: "Email",
      value: user.email,
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null,
      question: "Nhập email"
    },
    {
      id: 7,
      colum: "Bạn muốn nhận ưu đãi nhóm sản phẩm nào?",
      value: user.group,
      icon: ic_edit_input_new,
      listData: [
        { id: 1, name: "Dược phẩm" },
        { id: 2, name: "Sản phẩm mẹ và bé" },
        { id: 3, name: "Thưc phẩm" },
        { id: 4, name: "Thiết bị y tế" },
        { id: 5, name: "Điện thoại" }
      ],
      question: "Chọn nhóm sản phẩm",
      multiple: true
    },
    {
      id: 8,
      colum: "Bạn muốn chọn thời gian nhận ưu đãi nào?",
      value: user.time,
      icon: ic_edit_input_new,
      listData: [
        { id: 1, name: "7:00-09.00" },
        { id: 2, name: "9:00-12.00" },
        { id: 3, name: "12:00-14.00" },
        { id: 4, name: "14:00-17.00" },
        { id: 6, name: "17:00-19.00" }
      ],
      question: "Chọn thời gian",
      multiple: true
    }
  ];
  console.log(dataInput);

  // Thay vào đó, sử dụng useCallback hoặc useMemo
  // const handleTextChange = React.useCallback(
  //   (text) => {
  //     updateData(item.id, text);
  //   },
  //   [item.id, updateData]
  // );
  const [img, setImg] = useState();
  const [data, setData] = useState(dataInput);
  // const [selectedDate, setSelectedDate] = useState(new Date(data[2].value));
  const [selectedDate, setSelectedDate] = useState(new Date(user.date));

  const updateData = (id, text) => {
    //khi dữ liệu thay đổi
    const value = text;
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, value } : item))
    );
    console.log("id: " + id + " + value: " + value);
  };

  //Giới tính
  const [sex, setSex] = React.useState(user.sex);
  // const gioiTinh = ["Anh", "Chị"];

  const handleSex = (option) => {
    setSex(option);
  };

  //Ngày sinh
  const handleDateChange = (event, date, id) => {
    if (date !== undefined && date instanceof Date) {
      setSelectedDate(date);
      updateData(id, date);
    }
  };

  //Modal
  const [modalVisible, setModalVisible] = useState(false);
  const txtModal = 'Bạn muốn "Chụp ảnh/Tải ảnh lên". Vui lòng bên dưới!';

  // Chụp ảnh
  const handleImageUpload = () => {
    navigation.navigate("Camera", { pageOld: "Thông tin cá nhân" });
  };

  // Tải ảnh lên
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
      const uri = Platform.OS === "android" ? result.uri : result.assets[0].uri;
      setImg(uri);
    }
  };

  //Kiểm tra ảnh vào
  useEffect(() => {
    if (route.params) {
      const { imgNew } = route.params;
      if (imgNew) {
        setImg(imgNew);
      }
    }
  }, [route.params]);

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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      // behavior là hành động khi bàn phím hiện lên, padding là di chuyển view lên trên
    >
      <View style={{borderWidth: 0, paddingBottom: 10, backgroundColor: 'white'}}>
          <Text style={{fontSize: 30, marginLeft: 20, fontWeight: 700}}>Thông tin cá nhân</Text>
        </View>
      <ScrollView style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
            padding: 20
          }}
        >
          <Modal animationType="fade" transparent={true} visible={modalVisible}>
            {/* Modal hiển thị thông báo chọn chức năng năng chụp ảnh hay tải ảnh lên, có thông báo, nút chọn chức năng, nút x góc phải để thoát */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colorYellow2,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View
                style={{
                  width: Dimensions.get("window").width * 0.8,
                  height: Dimensions.get("window").height * 0.4,
                  backgroundColor: colorWhite,
                  borderRadius: 1000,
                  padding: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Image
                  source={ic_warning}
                  style={{
                    width: 20,
                    height: 20,
                    marginBottom: 10,
                    right: 100
                  }}
                ></Image>
                <Text
                  style={{
                    fontSize: fontSize1,
                    color: colorBlack,
                    fontWeight: 700,
                    fontSize: 30,
                    marginBottom: 15
                  }}
                >
                  Thông báo
                </Text>
                <Text
                  style={{
                    fontSize: fontSize1,
                    color: colorGray,
                    textAlign: "center",
                    marginBottom: 25
                  }}
                >
                  {txtModal}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20,
                    width: "100%"
                  }}
                >
                  <TouchableOpacity
                    style={{
                      width: "40%",
                      height: 40,
                      backgroundColor: colorWhite,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: colorBlue
                    }}
                    onPress={() => {
                      handleImageUpload();
                      setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSize1,
                        color: colorBlue,
                        fontWeight: 700
                      }}
                    >
                      Chụp ảnh
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: "40%",
                      height: 40,
                      backgroundColor: colorBlue,
                      borderRadius: 10,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => {
                      pickImage(), setModalVisible(false);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: fontSize1,
                        color: colorWhite,
                        fontWeight: 700
                      }}
                    >
                      Tải ảnh lên
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 32,
                    right: 45,
                    padding: 10
                  }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={{
                      fontSize: 22,
                      color: colorRed,
                      fontWeight: 700
                    }}
                  >
                    X
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Ảnh đại diện */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              accessible={true}
              accessibilityLabel="Profile Image"
              source={img ? { uri: img } : avatar}
              style={{ width: 75, height: 75, borderRadius: 50 }}
            />
            {/* Ảnh biểu tượng nhỏ góc phải của avatar */}
            <Image
              accessible={true}
              accessibilityLabel="Camera Icon"
              source={cameraIcon}
              style={{
                width: 25,
                height: 20,
                resizeMode: "contain",
                position: "absolute",
                bottom: 0,
                right: 0,
                tintColor: colorBlue,
                backgroundColor: colorWhite,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: colorWhite
              }}
            />
          </TouchableOpacity>
          {/* Giới tính */}
          <View
            style={{
              left: 10,
              flexDirection: "row",
              marginTop: 10,
              width: "100%"
            }}
          >
            {/* {gioiTinh.map((option) => ( */}
            <TouchableOpacity
              onPress={() => handleSex(true)}
              style={{
                marginRight: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Ionicons
                name={sex ? "ios-radio-button-on" : "ios-radio-button-off"}
                size={24}
                style={{
                  marginRight: 5,
                  color: sex ? "gold" : "black"
                }}
              />
              <Text style={{ marginRight: 16, color: colorBlack }}>Anh</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSex(false)}
              style={{
                marginRight: 8,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Ionicons
                name={!sex ? "ios-radio-button-on" : "ios-radio-button-off"}
                size={24}
                style={{
                  marginRight: 5,
                  color: !sex ? "gold" : "black"
                }}
              />

              <Text style={{ marginRight: 16, color: colorBlack }}>Chị</Text>
            </TouchableOpacity>
            {/* ))} */}
          </View>
          {/* Tên */}

          {data.map((item) => (
            <View
              key={item.id}
              style={{
                flexDirection: "column",
                marginTop: 10,
                width: Dimensions.get("window").width * 0.9
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: colorRed,
                    marginRight: 4,
                    fontSize: fontSize1
                  }}
                >
                  *
                </Text>
                <Text style={{ fontSize: fontSize1, color: colorBlack }}>
                  {item.colum}
                </Text>
              </View>
              {item.multiple === null ? (
                /* Ô input */
                <View
                  style={{
                    width: Dimensions.get("window").width * 0.9,
                    flexDirection: "row",
                    marginTop: 10,
                    height: "auto",
                    borderWidth: 1,
                    borderColor: colorGray,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: item.id == 2 ? colorGrayLight : colorWhite
                  }}
                >
                  {item.id === 3 ? (
                    <DateTimePicker
                      testID="dateTimePicker"
                      // value={new Date(item.value)}
                      value={selectedDate}
                      mode="date"
                      is24Hour={true}
                      style={{
                        flex: 1,
                        borderColor: colorGray,
                        fontSize: fontSize1,
                        color: item.id == 2 ? colorGray : colorBlack,
                        width: "100%",
                        textAlign: "left"
                      }}
                      editable={item.id === 2 ? false : true}
                      placeholder={item.question}
                      onChange={(event, date) =>
                        handleDateChange(event, date, item.id)
                      }
                    />
                  ) : (
                    <TextInput
                      style={{
                        flex: 1,
                        borderColor: colorGray,
                        fontSize: fontSize1,
                        padding: 0,
                        color: item.id == 2 ? colorGray : colorBlack
                      }}
                      editable={item.id === 2 ? false : true}
                      value={item.value}
                      placeholder={item.question}
                      onChangeText={(text) => {
                        updateData(item.id, text);
                      }}
                    />
                  )}

                  {item.id === 2 ? (
                    ""
                  ) : (
                    <TouchableOpacity style={{ padding: 10 }}>
                      <Image
                        source={ic_edit_input_new}
                        style={styles.img}
                      ></Image>
                    </TouchableOpacity>
                  )}
                </View>
              ) : item.multiple === false ? (
                /* Ô select */
                <View
                  style={{
                    marginTop: 10
                  }}
                >
                  <SelectList
                    data={item.listData}
                    setSelected={(val) => {
                      updateData(item.id, val);
                      // console.log(item.value);
                    }}
                    placeholder={item.value == "" ? item.question : item.value}
                    save="value"
                    style={{
                      width: Dimensions.get("window").width * 0.9,
                      marginTop: 20,
                      height: 40,
                      borderWidth: 1,
                      borderColor: colorGray,
                      padding: 10
                    }}
                  />
                </View>
              ) : (
                /* Ô select nhiều */
                <View
                  style={{
                    marginTop: 10,
                    borderWidth: 1,
                    borderColor: colorGray,
                    borderRadius: 20,
                    padding: 10
                  }}
                >
                  <MultiSelect
                    items={item.listData}
                    uniqueKey="id"
                    //gán giá trị mặc định
                    selectedItems={item.value}
                    //các item đã chọn
                    selectedItemTextColor={colorYellow2}
                    selectedItemIconColor={colorYellow2}
                    onSelectedItemsChange={(items) =>
                      updateData(item.id, items)
                    }
                    //ô tìm kiếm
                    searchInputPlaceholderText={item.question}
                    searchInputStyle={{ color: colorBlue }}
                    selectText={item.value == "" ? item.question : "Đã chọn"}
                    onChangeInput={(text) => console.log("Đã tìm" + text)}
                    //nút xác nhận
                    submitButtonText="Xác nhận"
                    submitButtonTextColor={colorWhite}
                    submitButtonTextfontFamily="Arial"
                    submitButtonColor={colorGreen}
                    //Nút hiển thị các item đã chọn
                    tagRemoveIconColor={colorRed} // nút xoá
                    tagBorderColor={colorBlue} // viền
                    tagTextColor={colorBlue}
                    style={{
                      mainWrapper: {
                        width: "80%",
                        marginTop: 20,
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: colorBlack
                      },
                      textInput: {
                        padding: 10,
                        borderColor: "#D3D3D3",
                        borderWidth: 1,
                        borderRadius: 5
                      },
                      item: styles.item
                    }}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      <View>
        {/* nút cập Nhập */}
        <TouchableOpacity
          style={{
            width: Dimensions.get("window").width,
            height: 50,
            backgroundColor: colorBlue,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: colorBlue
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: colorWhite,
              fontWeight: 700
            }}
          >
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite
  },
  img: {
    width: 20,
    height: 20
  }
});
