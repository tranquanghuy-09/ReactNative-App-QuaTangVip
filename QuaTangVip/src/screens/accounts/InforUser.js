import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { RadioButton } from "react-native-paper";
import React, { useState, useEffect } from 'react';

export default function App() {
  const [gender, setGender] = useState("male"); 
  return (
    <View style={styles.container}>
      <Text>Thông tin cá nhân</Text>
      <StatusBar style="auto" />

      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <TouchableOpacity>
            <Image accessible={true} accessibilityLabel="Profile Image" source={require('../../../assets/images/user2.jpeg')}
              style={{ width: 70, height: 70, borderRadius: 35 }}/>
            <Image accessible={true} accessibilityLabel="Camera Icon" source={require("../../../assets/icons_Dai/ic_camera.webp")}
              style={{
                width: 20, height: 20, 
                resizeMode: "contain",
                position: "absolute",
                right: 0,
                tintColor: "#105989",
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 2,
                borderColor: 'white'
              }}
            />
          </TouchableOpacity>
        </View>
        <View>
      <RadioButton.Group onValueChange={(newValue) => setGender(newValue)} value={gender}>
        <View style={{flexDirection: 'row'}}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton value="male" />
            <Text>Anh</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* <TouchableOpacity  style={{borderWidth: 1, borderColor: 'rgb(255, 151, 43)', width: 26, height: 26, borderRadius: 13}}> */}
              <RadioButton value="female"/>
            {/* </TouchableOpacity> */}
            <Text>Chị</Text>
          </View>
        </View>
      </RadioButton.Group>

      <Text>Giới tính đã chọn: {gender}</Text>
    </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
