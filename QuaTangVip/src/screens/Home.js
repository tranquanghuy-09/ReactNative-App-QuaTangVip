import { StatusBar } from 'expo-status-bar';
import {Platform,} from 'react-native';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ImageBackground, Image, ScrollView} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import {ipv4} from '../global';
import axios from 'axios';

export default function App({navigation, route}) {
  const isIPhone = Platform.OS === 'ios';
  const [diemTichLuy, setDiemTichLuy] = useState(0);
  const [user, setUser] = useState({});
  useEffect(() => {
    loadDiem();
    loadProfileUser();
  }, []);
  //Load point of user from server
  const loadDiem = async () => {
    try {
      const result = await axios.get("http://"+ipv4+"/diem?user_id=1");
      setDiemTichLuy(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error loading point:", error);
    }
  };
  //Load profile of user from server
  const loadProfileUser = async () => {
    try {
      const result = await axios.get("http://"+ipv4+"/user?user_id=1");
      setUser(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error loading user:", error);
    }
  };
  console.log(parseFloat(diemTichLuy.toLocaleString('en-US', { style: 'decimal' }).replace(',','.')));
  console.log(user);
  return (
    <View style={[styles.container]}>
      <ImageBackground
        source={require("../../assets/images/img1.png")}
        style={{
          width: "100%",
          height: Platform.OS === 'ios' ? 260 : 260,
          alignItems: 'center',
          
        }}
      >
        <SafeAreaView style={{
                alignItems: 'center',
                width: "100%",
                marginTop: 0,
                paddingHorizontal: 10,
                height: 100,
                position: 'fixed',
                zIndex: 1,
                alignItems: 'center',
                marginTop: Platform.OS === 'android' ? 40 : 0,
            }}>
          <View style={{borderWidth: 0, width: "100%", height: 214, paddingHorizontal: 12, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <View style={{flexDirection: 'row'}}>
                <Image source={user.urlImage==null?require('../../assets/images/user2.jpeg'):user.urlImage} style={{width: 50, height: 50, borderRadius: 25}}/>
                <View style={{justifyContent: 'space-between', marginLeft: 10}}>
                  <Text style={{color: '#224682', fontWeight: '600', fontSize: 22}}>{user.name}</Text>
                  <Text style={{color: 'rgb(93, 94, 95)', fontSize: 18}}>{user.phone}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', backgroundColor: '#F6C850', width: 130, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 11}}>
                <Text style={{fontSize: 18, }}>Điểm: </Text>
                <Text style={{fontSize: 18, fontWeight: 600}}>{parseFloat(diemTichLuy.toLocaleString('en-US', { style: 'decimal' }).replace(',','.'))}</Text>
              </View>
            </View>
            <View style={{backgroundColor: 'white', width: '100%', height: 130, borderWidth: 0, marginTop: 15, borderRadius: 17, justifyContent: 'center', alignItems: 'center'}}>
              <Text>Đưa mã cho nhân viên để tích, sử dụng điểm</Text>
              <Image source={require('../../assets/images/qr-Group.png')} style={{width: 320, height: 85, marginTop: 5}} resizeMode='contain'/>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <ScrollView style={{width: '100%'}}>
      <View style={{backgroundColor: 'white', borderWidth: 0, width: '100%', paddingTop: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 13}}>
          <Text style={{fontSize: Platform.OS==='ios'?20:20, fontWeight: '600', color: '#605F5F'}}>Tiện ích hỗ trợ nhanh</Text>
          <TouchableOpacity>
            <Text style={{fontSize: 16, color: '#123979'}}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
        <View style={{borderWidth: 0, width: '100%', padding: 30}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}}>
              <View style={{backgroundColor: '#F1FCF6', width: 70, height: 70, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/purchase-order.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{width: 63, height: 34, justifyContent:'center', alignItems: 'center', marginTop: 9}}>
                <Text style={{fontSize: 14, color: '#605F5F', color: '#7B7B7B', textAlign: 'center'}}>Theo dõi đơn hàng</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}}>
              <View style={{backgroundColor: '#EFFCFB', width: 70, height: 70, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/tools.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{width: 110, height: 34, justifyContent:'center', alignItems: 'center',marginTop: 9}}>
                <Text style={{fontSize: 14, color: '#605F5F', color: '#7B7B7B', textAlign: 'center'}}>Hỗ trợ bảo hành, sửa chữa</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}}>
              <View style={{backgroundColor: '#F9EFF0', width: 70, height: 70, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/chat.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{width: 63, height: 34, justifyContent:'center', alignItems: 'center',marginTop: 9}}>
                <Text style={{fontSize: 14, color: '#605F5F', color: '#7B7B7B', textAlign: 'center'}}>Góp ý, khiếu nại</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 37}}>
            <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress={()=>{navigation.navigate('HomeNavigation', {
              screen: 'Quà của tôi',
              params: {},
            });}}>
              <View style={{backgroundColor: '#FFF1BE', width: 70, height: 70, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/gift.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{width: 45, height: 34, justifyContent:'center', alignItems: 'center',marginTop: 9}}>
                <Text style={{fontSize: 14, color: '#605F5F', color: '#7B7B7B', textAlign: 'center'}}>Quà của tôi</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress={()=>{navigation.navigate('Hỗ trợ trực tuyến')}}>
              <View style={{backgroundColor: '#F6F5FE', width: 70, height: 70, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/headphones.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{width: 110, height: 34, justifyContent:'center', alignItems: 'center',marginTop: 9}}>
                <Text style={{fontSize: 14, color: '#605F5F', color: '#7B7B7B', textAlign: 'center'}}>Hỗ trợ kỹ thuật trực truyến</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:'center', alignItems: 'center'}} onPress={()=>{navigation.navigate('Đặt lịch vệ sinh thiết bị')}}>
              <View style={{backgroundColor: '#E7F7FE', width: 70, height: 70, borderRadius: 25, justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../assets/images/air-conditioner.png')} style={{width: 30, height: 30}} />
              </View>
              <View style={{width: 63, height: 34, justifyContent:'center', alignItems: 'center',marginTop: 9}}>
                <Text style={{fontSize: 14, color: '#605F5F', color: '#7B7B7B', textAlign: 'center', width: 100}}>Đặt lịch vệ sinh thiết bị</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 0 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flexDirection: 'row', }}
            horizontal={true}>
              <Image
                source={require('../../assets/images/banner3.png')}
                style={{width: isIPhone?350:385, height: isIPhone?110:130, borderRadius: 18, marginHorizontal: Platform.OS==='ios'?13:13, overflow: 'hidden' }}
              />
            <Image
              source={require('../../assets/images/banner1.png')}
              style={{width: isIPhone?350:385, height: isIPhone?110:130, borderRadius: 18, marginHorizontal: 20 }}
            />
            <Image
              source={require('../../assets/images/banner2.png')}
              style={{width: isIPhone?350:385, height: isIPhone?110:130, borderRadius: 18, marginHorizontal: 20 }}
            />
          </ScrollView>
        </ScrollView>
        </View>
        <View style={{marginVertical: 20, marginLeft: 13, paddingBottom: 180}}>
          <Text style={{fontSize: 20, textTransform: 'uppercase', fontWeight: 500}}>Giá quá rẻ</Text>
          <View style={{flexDirection: 'row', marginTop: 10, justifyContent: 'space-between'}}>
            <Image source={require('../../assets/images/banner4.png')} style={{width: isIPhone?170:190, height: isIPhone?170:190}} resizeMode='contain'/>
            <View style={{justifyContent: 'space-between', marginRight: 20}}>
              <Image source={require('../../assets/images/banner5.png')} style={{width: isIPhone?160:180, height:isIPhone?90:100}} resizeMode='contain'/>
              <Image source={require('../../assets/images/banner6.png')} style={{width: isIPhone?160:180, height:isIPhone?90:100}} resizeMode='contain'/>
            </View>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: -13, marginTop: 5}}>
          <Image
                source={require('../../assets/images/banner7.png')}
                style={{width: isIPhone?340:385, height: isIPhone?110:130, borderRadius: 18,}}
          />
          <Image
                source={require('../../assets/images/banner8.png')}
                style={{width: isIPhone?340:385, height: isIPhone?110:130, borderRadius: 18, marginTop: 15}}
          />
          </View>
        </View>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginTop: {
    
  },
});
