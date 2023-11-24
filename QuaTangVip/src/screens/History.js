import { StatusBar } from 'expo-status-bar';
import {Platform,} from 'react-native';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, SectionList} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ipv4} from '../global';
import { format } from 'date-fns';

export default function App({navigation}) {
  // const DATA = [
  //   {
  //     id: 1,
  //     month: 9,
  //     data: 
  //     [
  //       {
  //         id: 1,
  //         stote: 'Bách Hoá Xanh',
  //         status: 'Giao thành công',
  //         orderDate: '18:35 - 30/09/2023',
  //         diemTichLuy: '1.300',
  //       },
  //       {
  //         id: 2,
  //         stote: 'Bách Hoá Xanh',
  //         status: 'Giao thành công',
  //         orderDate: '18:35 - 30/09/2023',
  //         diemTichLuy: '1.300',
  //       },
  //       {
  //         id: 3,
  //         stote: 'Bách Hoá Xanh',
  //         status: 'Giao thành công',
  //         orderDate: '18:35 - 30/09/2023',
  //         diemTichLuy: '1.300',
  //       },
  //       {
  //         id: 4,
  //         stote: 'Bách Hoá Xanh',
  //         status: 'Giao thành công',
  //         orderDate: '18:35 - 30/09/2023',
  //         diemTichLuy: '1.300',
  //       },
  //       {
  //         id: 5,
  //         stote: 'Bách Hoá Xanh',
  //         status: 'Giao thành công',
  //         orderDate: '18:35 - 30/09/2023',
  //         diemTichLuy: '1.300',
  //       },
  //       {
  //         id: 6,
  //         stote: 'Bách Hoá Xanh',
  //         status: 'Giao thành công',
  //         orderDate: '18:35 - 30/09/2023',
  //         diemTichLuy: '1.300',
  //       },
  //       {
  //         id: 7,
  //         stote: 'Bách Hoá Xanh',
  //         status: 'Giao thành công',
  //         orderDate: '18:35 - 30/09/2023',
  //         diemTichLuy: '1.300',
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     month: 8,
  //     data: 
  //     [
  //       {
  //         id: 1,
  //         stote: 'Bách Hoá Xanh',
  //         status: 'Giao thành công',
  //         orderDate: '18:35 - 30/09/2023',
  //         diemTichLuy: '1.300',
  //       },
  //       {
  //         id: 2,
  //         stote: 'Bách Hoá Xanh',
  //         status: 'Giao thành công',
  //         orderDate: '18:35 - 30/09/2023',
  //         diemTichLuy: '1.300',
  //       },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     month: 7,
  //     data: [],
  //   },
  //   {
  //     id: 4,
  //     month: 6,
  //     data: [],
  //   },
  // ];
  
  const [page, setPage] = useState(0);
  const [lsdh, setLsdh] = useState(Math.random());

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    loadOrders();
    console.log(page);
  }, [lsdh]);

  const loadOrders = async () => {
    try {
      const result = await axios.get("http://"+ipv4+"/orders?user_id=1&page="+page+"&size=5");
      setOrders(result.data.content);
      console.log(result.data.content);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  // Nhóm dữ liệu theo tháng
  const groupDataByMonth = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const month = parseInt(item.orderDate.split('-')[1], 10);
      if (!groupedData[month]) {
        groupedData[month] = {
          id: month,
          month: month,
          data: [],
        };
      }
      groupedData[month].data.push({
        id: item.id,
        store: item.storeName,
        status: item.status,
        orderDate: item.orderDate,
        diemTichLuy: parseFloat(item.diemTichLuy).toLocaleString('en-US', { style: 'decimal' }).replace(',','.'),
        // diemTichLuy: parseFloat(item.diemTichLuy).toLocaleString('en-US', { minimumFractionDigits: 3 }),
      });
    });
    const sortedGroupedOrders = Object.values(groupedData).sort((a, b) => b.month - a.month);
    return sortedGroupedOrders;
  };
  const groupedOrders = groupDataByMonth(orders);
  
  // In ra kết quả
  console.log(groupedOrders);
  
  // Load thêm dữ liệu
  const loadMoreData = async () => {
    try {
      setPage(page + 1);
  
      // Fetch dữ liệu
      const loadUsers = await axios.get("http://"+ipv4+"/orders?user_id=1&page="+page+"&size=5");
      console.log(loadUsers);
      const results = loadUsers.data.content;

      const sumArray = [...orders, ...results]
  
      const uniqueArray = sumArray.reduce((accumulator, currentValue) => {
        const existingItem = accumulator.find(item => item.id === currentValue.id);
        if (!existingItem) {
          accumulator.push(currentValue);
        }
        return accumulator;
      }, []);
      
      setOrders(uniqueArray);
    } catch (error) {
      console.error("Error loading orders:", error);
    } 
  };
  // Định dạng ngày tháng
  const formattedDate = (date) => {
    return format(new Date(date), "HH:mm - dd/MM/yyyy");
  };

  return (
    <View style={styles.container}>
      <View style={styles.style1}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: Platform.OS==='ios'?15:20, height: 45, alignItems: 'center',
                      backgroundColor: 'rgba(202, 222, 230, 1)'}}>
          <TouchableOpacity style={{}}>
            <Text style={{fontSize: 18, color: '#7C91A2', fontWeight: 400}}>Tích điểm / Dùng điểm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor: 'white', width: Platform.OS==='ios'?140:150, paddingVertical: 9, borderRadius: 13, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontSize: 18, color: '#7C91A2', fontWeight: 400}}>Đơn hàng</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.style2}>
          <View style={{width: '100%', flexDirection: 'row', paddingHorizontal: 12, paddingVertical: 17, justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={()=>{setLsdh(Math.random ,setPage(0))}} style={{flexDirection: 'row', backgroundColor: 'white', width: Platform.OS==='ios'?165:185, height: Platform.OS==='ios'?50:55, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{width: 28, height: 28, backgroundColor: 'rgba(242, 231, 231, 1)', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: Platform.OS==='ios'?8:10}}>
                <Image source={require('../../assets/icons/bag.png')} style={{width: 22, height: 22,}}/>
              </View>
              <Text style={{fontSize: Platform.OS==='ios'?14:15, color: '#000', fontWeight: 400, height: 55, width: Platform.OS==='ios'?120:130, paddingTop: Platform.OS==='ios'?19:17,}}>Lịch sử đơn hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection: 'row', backgroundColor: 'white', width: Platform.OS==='ios'?175:185, height: Platform.OS==='ios'?50:55, borderRadius: 15, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{width: 28, height: 28, backgroundColor: 'rgba(243, 234, 200, 0.8)', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: Platform.OS==='ios'?8:10}}>
                <Image source={require('../../assets/icons/air-conditioner.png')} style={{width: 22, height: 22,}}/>
              </View>
              <Text style={{fontSize: Platform.OS==='ios'?14:15, color: '#000', fontWeight: 400, height: 55, width: 130, paddingTop: 9,}}>Đơn hành dịch vụ tận tâm</Text>
            </TouchableOpacity>
          </View>
          <SectionList
            style={{width: '100%', paddingHorizontal: 12, marginTop: -10, }}
            sections={groupedOrders}
            keyExtractor={(item, index) => item + index}
            renderItem={({item}) => (
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={{justifyContent: 'space-between', paddingVertical: 15, paddingHorizontal: 7, flexDirection: 'row',width: Platform.OS==='ios'?345:375, height: 120, borderRadius: 13, backgroundColor: '#FFFFFF', marginTop: 15, alignContent: 'center', }}>
                  <Image source={item.store==='Bách Hoá Xanh'?require('../../assets/icons/bachhoaxanh.png'):null} style={{width: 38, height: 38, }}/>
                  <View style={{width: Platform.OS==='ios'?280:310, paddingTop: 5, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{color: 'rgba(30, 66, 127, 1)', fontSize: 16, fontWeight: 400}}>{item.store}</Text>
                      <View style={{width: 120, height: 20, backgroundColor: "rgba(225, 244, 228, 1)", borderRadius: 6, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'rgba(115, 183, 115, 1)'}}>{item.status}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>
                      <Text style={{color: 'rgba(152, 152, 152, 1)', fontSize: 15, fontWeight: 400}}>Thời gian đặt hàng</Text>
                      <Text style={{color: 'rgba(142, 142, 142, 1)', fontSize: 14, fontWeight: 400}}>{formattedDate(item.orderDate)}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                      <Text style={{color: 'rgba(43, 100, 206, 1)', fontSize: 16, fontWeight: 400}}>Điểm tích luỹ:</Text>
                      <Text style={{color: 'rgba(90, 168, 89, 1)', fontSize: 20, fontWeight: 400}}>+{item.diemTichLuy}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            renderSectionHeader={({section: {month}}) => (
              <Text style={{fontSize: 22, color: 'rgba(42, 97, 199, 1)', marginTop: 25}}>Tháng {month}</Text>
            )}
            onEndReached={loadMoreData} 
            onEndReachedThreshold={0.05}
          />
        
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
  style1: {
    backgroundColor: '#C3E8F6',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: Platform.OS === 'ios' ? 140 : 150,

  },
  style2: {
    flex: 5,
    backgroundColor: 'rgba(235, 235, 235, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderWidth: 0,
  },
});
