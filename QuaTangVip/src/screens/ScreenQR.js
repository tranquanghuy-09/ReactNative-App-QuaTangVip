import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {Platform, TextInput,} from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SectionList, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {ipv4} from '../global';
import axios from 'axios';


export default function App({navigation}) {
  const isIPhone = Platform.OS === 'ios';
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const [order, setOrder] = useState({
    "status": 1,
    "employee_id": 1,
    "user_id": 1,
  });
  // const convertToOrderObject = (data) => {
  //   const { order_date, employee_id, user_id, order_id } = data;

  //   const orderObject = {
  //     orderId: order_id,
  //     orderDate: new Date(order_date),
  //     orderStatus: "", // You may need to set the order status based on your logic
  //     employee: { employeeId: employee_id }, // Assuming Employee has an employeeId property
  //     user: { userId: user_id }, // Assuming User has a userId property
  //     orderDetails: [], // You may need to handle order details based on your logic
  //   };

  //   return orderObject;
  // };
  // const handleData = () => {
  //   const convertedOrder = convertToOrderObject(order);
  //   setOrder(convertedOrder);
  // };

  console.log(order);

  const [orderDetail, setOrderDetail] = useState([
    {
      "product_id": 1,
      "note": "",
      "price": 14500,
      "quantity": 1.0,
    },
    {
      "product_id": 4,
      "note": "",
      "price": 37500,
      "quantity": 2.0,
    }
  ]);
  console.log(orderDetail);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  };
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  };

  // const onSubmit = async () => {
  //   try {
  //     await axios.post("http://"+ipv4+"/order?user_id="+order.user_id+"&emp_id="+order.employee_id+"&order_detail="+orderDetail);
  //     console.log("Thêm thành công!");
  //   } catch (error) {
  //     console.error("Lỗi khi thêm:", error);
  //   }
  // };

  const onSubmit = async () => {
    try {
      await axios.post("http://"+ipv4+"/order", {
        "user_id": order.user_id,
        "employee_id": order.employee_id,
        "status": order.status,
        "order_detail": orderDetail
      });
      console.log("Thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm:", error);
      console.log({
        "user_id": order.user_id,
        "employee_id": order.employee_id,
        "status": order.status,
        "order_detail": orderDetail
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.style1}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: Platform.OS==='ios'?15:20, height: 45, alignItems: 'center',
                      marginLeft: 10}}>
          <TouchableOpacity onPress={() => navigation.navigate("HomeNavigation")} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../../assets/icons/arrow-left.png')} style={{ width: 13, height: 15 }} />
            <Text style={{ marginLeft: 10, fontSize: isIPhone ? 15 : 17, fontWeight: 400, color: '#1A93D4' }}>Quay lại</Text>
          </TouchableOpacity>
          
        </View>
        
      </View>

      <View style={styles.style2}>
        <ScrollView style={{width: '100%'}}>
        <View style={{alignItems: 'center'}}>
          <View style={{width: '100%'}}>
            <Text style={{fontSize: isIPhone?30:32, marginLeft: 20, fontWeight: 700}}>Quét mã xác thực</Text>
          </View>
          <View style={{marginTop: 32, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18, color: '#0C2A48'}}>Mã QR in trên hoá đơn</Text>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <TextInput style={{width: 50, height: 45, borderWidth: 1, borderRadius: 6, borderColor: '#DDD', marginHorizontal: isIPhone?5:7}}/>
              <TextInput style={{width: 50, height: 45, borderWidth: 1, borderRadius: 6, borderColor: '#DDD', marginHorizontal: isIPhone?5:7}}/>
              <TextInput style={{width: 50, height: 45, borderWidth: 1, borderRadius: 6, borderColor: '#DDD', marginHorizontal: isIPhone?5:7}}/>
              <TextInput style={{width: 50, height: 45, borderWidth: 1, borderRadius: 6, borderColor: '#DDD', marginHorizontal: isIPhone?5:7}}/>
              <TextInput style={{width: 50, height: 45, borderWidth: 1, borderRadius: 6, borderColor: '#DDD', marginHorizontal: isIPhone?5:7}}/>
              <TextInput style={{width: 50, height: 45, borderWidth: 1, borderRadius: 6, borderColor: '#DDD', marginHorizontal: isIPhone?5:7}}/>
            </View>
          </View>
          <View style={{width: '100%', borderWidth: 0, alignItems: 'center', marginTop: isIPhone?20:30}}>
            <View style={styles.barcodebox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }} />
            </View>
            <Text style={styles.maintext}>{text}</Text>

            {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
          </View>
        </View>
        <View style={{flexDirection: 'row', gap: isIPhone?10:15, marginBottom: isIPhone?5:10}}>
          <TouchableOpacity onPress={onSubmit} style={{width:isIPhone?175:180, height: 50, borderWidth: 1, borderColor: 'rgba(174, 178, 184, 1)', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../assets/icons/qrcode-solid.png')} style={{width: 22, height: 24, }}/>
              <Text style={{fontSize: 16, color: '#0C2A48', marginLeft: 10}}>Mã QR</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{width:isIPhone?165:180, height: 50,  backgroundColor: 'rgba(255, 198, 45, 1)', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
              <Image source={require('../../assets/icons/iconscan.png')} style={{width: 20, height: 20, }}/>
              <Text style={{fontSize: 16, color: '#0C2A48', marginLeft: 10}}>QUÉT MÃ</Text>
            </View>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  style1: {
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: Platform.OS === 'ios' ? 80 : 90,

  },
  style2: {
    flex: 5,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 350,
    width: 350,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});
