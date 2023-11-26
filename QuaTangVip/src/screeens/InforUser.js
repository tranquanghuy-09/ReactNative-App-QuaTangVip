import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import { SectionList } from "Reac-native-dropdown-select-list";
// import DropdownSelect from "react-native-dropdown-select-list";
// import RNPickerSelect from "react-native-picker-select";
import {
  SelectList,
  MultipleSelectList
} from "react-native-dropdown-select-list";

// Color
const colorBlack = "#000000";
const colorGray = "#A59464";
const colorGrayLight = "#F2F2F2";
const colorWhite = "#FFF";
const colorRed = "red";
const colorYellow = "#FFEEC0";
const colorYellow2 = "#FFC62E";
const colorBlue = "#105989";
// FontSize
const fontSize1 = 16;
const fontSize2 = 14;
const fontSize3 = 12;
const fontSize4 = 10;

const ic_edit_input_new = require("../../assets/icons_Dai/ic_edit_input_new.png");
const avatar = require("../../assets/icons_Dai/ic_account_logo.webp");
const cameraIcon = require("../../assets/icons_Dai/ic_camera.webp");

export default function App() {
  //Tên, số điện thoại, ngày sinh, địa chỉ, tỉnh thành sinh sống,email, nhóm sản phẩn ưu đãi,thời gian
  const dataInput = [
    {
      id: 1,
      colum: "Họ và tên",
      value: "Nguyễn Văn A",
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null
    },
    {
      id: 2,
      colum: "Số điện thoại",
      value: "0987654321",
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null
    },
    {
      id: 3,
      colum: "Ngày sinh",
      value: "01/01/1990",
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null
    },
    {
      id: 4,
      colum: "Địa chỉ",
      value: "Hà Nội",
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null
    },
    {
      id: 5,
      colum: "Tỉnh thành sinh sống",
      value: "Hà Nội",
      icon: ic_edit_input_new,
      listData: ["Hà Nội", "Hồ Chí Minh", "Đà Nẵng"],
      question: "Chọn tỉnh thành",
      multiple: false
    },
    {
      id: 6,
      colum: "Email",
      value: " ",
      icon: ic_edit_input_new,
      listData: 0,
      multiple: null
    },
    {
      id: 7,
      colum: "Bạn muốn nhận ưu đãi nhóm sản phẩm nào?",
      value: "",
      icon: ic_edit_input_new,
      listData: [
        { id: 1, value: "Dược phẩm" },
        { id: 2, value: "Sản phẩm mẹ và bé" },
        { id: 3, value: "Thưc phẩm" },
        { id: 4, value: "Thiết bị y tế" },
        { id: 5, value: "Điện thoại" }
      ],
      question: "Chọn nhóm sản phẩm",
      multiple: true
    },
    {
      id: 8,
      colum: "Bạn muốn chọn thời gian nhận ưu đãi nào?",
      value: "",
      icon: ic_edit_input_new,
      listData: [
        { id: 1, value: "7:00-09.00" },
        { id: 2, value: "9:00-12.00" },
        { id: 3, value: "12:00-14.00" },
        { id: 4, value: "14:00-17.00" },
        { id: 6, value: "17:00-19.00" }
      ],
      question: "Chọn thời gian",
      multiple: true
    }
  ];

  const [contactOption, setContactOption] = React.useState(null);
  const contactOptions = ["Anh", "Chị"];
  const handleContactOptionChange = (option) => {
    setContactOption(option);
  };
  const [categories, setCategories] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  const chooseMultipe = () => {};

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // behavior là hành động khi bàn phím hiện lên, padding là di chuyển view lên trên
      >
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            marginTop: 10,
            padding: 20
          }}
        >
          {/* Ảnh đại diện */}
          <TouchableOpacity>
            <Image
              accessible={true}
              accessibilityLabel="Profile Image"
              source={avatar}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            {/* Ảnh biểu tượng nhỏ góc phải của avatar */}
            <Image
              accessible={true}
              accessibilityLabel="Camera Icon"
              source={cameraIcon}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                position: "absolute",
                bottom: -2,
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
                        : colorBlack
                  }}
                />

                <Text
                  key={option}
                  style={{ marginRight: 16, color: colorBlack }}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Tên */}

          {dataInput.map((item) => (
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
                    placeholder="Nhập họ và tên"
                  />
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
                    setSelected={(val) => handleContactOptionChange(val)}
                    data={item.listData}
                    // defaultValue={
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
                    marginTop: 10
                  }}
                >
                  <MultipleSelectList
                    setSelected={(val) => chooseMultipe(val)}
                    uniqueKey="id"
                    data={item.listData}
                    // onSelectedItemsChange={(selectedItems) =>
                    //   handleContactOptionChange(selectedItems)
                    // }
                    // selectedItems={contactOption} // make sure to replace this with the actual state variable
                    // selectText={item.question}
                    // searchInputPlaceholderText={item.question}
                    style={{
                      flex: 1,
                       width: Dimensions.get("window").width * 0.8,
                      height: "auto"
                    }}
                  />
                </View>
              )}
            </View>
          ))}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
