import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, } from 'react';
import {Platform, TextInput,} from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SectionList, Button} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {ipv4} from '../global';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';


export default function App({navigation}) {
  const isIPhone = Platform.OS === 'ios';
  const isFocused = useIsFocused();

  const [ivl1, setIvl1] = useState('');
  const [ivl2, setIvl2] = useState('');
  const [ivl3, setIvl3] = useState('');
  const [ivl4, setIvl4] = useState('');
  const [ivl5, setIvl5] = useState('');
  const [ivl6, setIvl6] = useState('');
  
  const [shouldSubmit, setShouldSubmit] = useState(false);


  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const [order, setOrder] = useState({
    "maQR": "",
    "order_date": "",
    "status": 0,
    "employee_id": 0,
    "user_id": 0,
  });

  console.log(order);

  const [orderDetail, setOrderDetail] = useState([]);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  // useEffect(() => {
  //   askForCameraPermission();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      askForCameraPermission();
    };

    const submitData = async () => {
      if (shouldSubmit) {
        try {
          await axios.post("http://" + ipv4 + "/order", {
            "user_id": order.user_id,
            "employee_id": order.employee_id,
            "status": order.status,
            "order_detail": orderDetail,
            "order_date": order.order_date
          });
          console.log("Thêm thành công!");
          setShouldSubmit(false);
          
          setText("");
        } catch (error) {
          console.error("Lỗi khi thêm:", error);
          console.log({
            "user_id": order.user_id,
            "employee_id": order.employee_id,
            "status": order.status,
            "order_detail": orderDetail,
            "order_date": order.order_date
          });
        }
      }
    };

    fetchData(); 
    submitData(); 

    return () => {
      // Cleanup logic 
    };
  }, [shouldSubmit]); 

  useEffect(() => {
    setScanned(false);
    setIvl1('');
    setIvl2('');
    setIvl3('');
    setIvl4('');
    setIvl5('');
    setIvl6('');
  }, [isFocused]);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    try {
      const scannedData = JSON.parse(data);
      setOrder({
        "order_date": scannedData.order_date,
        "status": scannedData.status,
        "employee_id": scannedData.employee_id,
        "user_id": scannedData.user_id,
        "maQR": scannedData.ma_qr,
      });
      setOrderDetail(scannedData.order_detail);
      setText(data);
      
      setShouldSubmit(true);
      updateDigits(scannedData.ma_qr);
    } catch (error) {
      console.error("Error parsing scanned data:", error);
    }
  
    console.log('Type: ' + type + '\nData: ' + data);
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

  const onSubmit = async () => {
    if (shouldSubmit) {
      try {
        await axios.post("http://"+ipv4+"/order", {
          "user_id": order.user_id,
          "employee_id": order.employee_id,
          "status": order.status,
          "order_detail": orderDetail,
          "order_date": order.order_date
        });
        console.log("Thêm thành công!");
      } catch (error) {
        console.error("Lỗi khi thêm:", error);
        console.log({
          "user_id": order.user_id,
          "employee_id": order.employee_id,
          "status": order.status,
          "order_detail": orderDetail,
          "order_date": order.order_date
        });
        setShouldSubmit(false);
      }
    }
  };

  const updateDigits = (value) => {
    const digits = value.toString().split(''); 
    if (digits.length === 6) {
      setIvl1(digits[0]);
      setIvl2(digits[1]);
      setIvl3(digits[2]);
      setIvl4(digits[3]);
      setIvl5(digits[4]);
      setIvl6(digits[5]);
    } else {
      console.error('Mã QR không hợp lệ');
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
              <TextInput value={ivl1} onChangeText={(text) => setIvl1(text)} 
                          style={{textAlign: 'center', fontSize: 20, width: 50, height: 45, borderWidth: 1, borderRadius: 6, 
                                  borderColor: '#DDD', marginHorizontal: isIPhone?5:7, fontWeight: 500}}/>
              <TextInput value={ivl2} onChangeText={(text) => setIvl2(text)} 
                          style={{textAlign: 'center', fontSize: 20, width: 50, height: 45, borderWidth: 1, borderRadius: 6, 
                                  borderColor: '#DDD', marginHorizontal: isIPhone?5:7, fontWeight: 500}}/>
              <TextInput value={ivl3} onChangeText={(text) => setIvl3(text)} 
                          style={{textAlign: 'center', fontSize: 20, width: 50, height: 45, borderWidth: 1, borderRadius: 6, 
                                  borderColor: '#DDD', marginHorizontal: isIPhone?5:7, fontWeight: 500}}/>
              <TextInput value={ivl4} onChangeText={(text) => setIvl4(text)} 
                          style={{textAlign: 'center', fontSize: 20, width: 50, height: 45, borderWidth: 1, borderRadius: 6, 
                                  borderColor: '#DDD', marginHorizontal: isIPhone?5:7, fontWeight: 500}}/>
              <TextInput value={ivl5} onChangeText={(text) => setIvl5(text)} 
                          style={{textAlign: 'center', fontSize: 20, width: 50, height: 45, borderWidth: 1, borderRadius: 6, 
                                  borderColor: '#DDD', marginHorizontal: isIPhone?5:7, fontWeight: 500}}/>
              <TextInput value={ivl6} onChangeText={(text) => setIvl6(text)} 
                          style={{textAlign: 'center', fontSize: 20, width: 50, height: 45, borderWidth: 1, borderRadius: 6, 
                                  borderColor: '#DDD', marginHorizontal: isIPhone?5:7, fontWeight: 500}}/>
            </View>
          </View>
          <View style={{width: '100%', borderWidth: 0, alignItems: 'center', marginTop: isIPhone?20:30}}>
            <View style={styles.barcodebox}>
              <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ height: 400, width: 400 }} />
            </View>
            {/* <Text style={styles.maintext}>{text}</Text> */}
            {scanned && 
              <View style={{gap: 10, paddingBottom: 10}}>
                <Text style={{fontSize: 18, color: '#0C2A', marginTop: 3}}>Mã QR đã được quét</Text>
                <TouchableOpacity  onPress={() => {
                  setScanned(false);
                  setIvl1(""), setIvl2(""), setIvl3(""), setIvl4(""), setIvl5(""), setIvl6("");
                }} style={{borderWidth: 1, borderColor: 'silver', borderRadius: 5, alignItems: 'center', justifyContent: 'center', padding:5,}}>
                  <Text style={{fontSize: 16, color: '#0C2A48',}}>Chọn để quét lại</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
        <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', borderWidth: 0, }}>
          {!scanned && <View style={{height: 70}}></View>}
          <View style={{flexDirection: 'row', gap: isIPhone?10:15, marginBottom: isIPhone?5:10,}}>
            <TouchableOpacity onPress={onSubmit} style={{width:isIPhone?175:180, height: 50, borderWidth: 1, borderColor: 'rgba(174, 178, 184, 1)', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../assets/icons/qrcode-solid.png')} style={{width: 22, height: 24, }}/>
                <Text style={{fontSize: 16, color: '#0C2A48', marginLeft: 10}}>Mã QR</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              setScanned(false);
              setIvl1(""), setIvl2(""), setIvl3(""), setIvl4(""), setIvl5(""), setIvl6("");
            }} style={{width:isIPhone?165:180, height: 50,  backgroundColor: 'rgba(255, 198, 45, 1)', borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../assets/icons/iconscan.png')} style={{width: 20, height: 20, }}/>
                <Text style={{fontSize: 16, color: '#0C2A48', marginLeft: 10}}>QUÉT MÃ</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
      <Text>Điều khoản</Text>
      <StatusBar style="auto" />
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
