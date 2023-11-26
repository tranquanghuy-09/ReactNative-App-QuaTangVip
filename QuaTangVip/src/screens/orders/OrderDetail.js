import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, ScrollView} from 'react-native'
import React, {useEffect, useState} from 'react'
import { Platform } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import axios from 'axios';
import {ipv4} from '../../global';
import { set } from 'date-fns';

const OrderDetail = ({navigation, route}) => {
  const [order_id, setOrder_id] = useState(route.params.order_id);
  const [order, setOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  console.log("............................>>>>>>>>>>>>>>"+orderDetails);
  const moment = require('moment');

  const isIPhone = Platform.OS === 'ios';
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
  const numberToCurrency = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  
  useEffect(() => {
    loadOrderDetail();
  }, []);
  const loadOrderDetail = async () => {
    try {
      const result = await axios.get("http://"+ipv4+"/order?order_id="+order_id);
      setOrder(result.data);
      setOrderDetails(result.data.orderDetails);
      // console.log(result.data);
      // if(result.data.content.length===0){
      //   setHsEmpty(true);
      // }
    } catch (error) {
      console.error("Error loading orders detail:", error);
    }
  };
  console.log(orderDetails);

  const [orders, setOrders] = useState([
    {
      product_name: 'MÌ 3 MIỀN GOLD TÔM CHUA CAY GÓI 75GR',
      qty: 4,
      price: 20400
    },
    {
      product_name: 'MÌ 3 MIỀN GOLD TÔM CHUA CAY GÓI 75GR',
      qty: 4,
      price: 20400
    },
    {
      product_name: 'MÌ 3 MIỀN GOLD TÔM CHUA CAY GÓI 75GR',
      qty: 4,
      price: 20400
    },
  ]);
  const calculateTotalPrice = (orderItems) => {
    return orderItems.reduce((total, order) => {
      return total + order.price * order.quantity;
    }, 0);
  };
  return (
    <View style={styles.container}>
      <View style={{borderWidth: 0, paddingBottom: 10}}>
        <Text style={{fontSize: 30, marginLeft: 20, fontWeight: 700}}>Chi tiết đơn hàng</Text>
      </View>
    <ScrollView >
      <View style={{backgroundColor: '#FFF', paddingVertical: 20, marginTop: 10, paddingHorizontal: 10}}>
        <View style={{alignItems: 'flex-start', flexDirection: 'row', paddingHorizontal: 10, gap: 10}}>
          <Image source={require('../../../assets/icons/bachhoaxanh.png')} style={{width: 50, height: 50, }}/>
          <View style={{gap: 6}}>
            <Text style={{color: 'rgb(20, 58, 113)', fontSize: isIPhone?19:21, fontWeight: 500, marginLeft: 10}}>Bách Hoá Xanh</Text>
            <Text style={{color: 'rgb(90, 174, 108)', fontSize: isIPhone?14:16, marginLeft: 10}}>Giao thành công</Text>
          </View>
        </View>
        <View style={{ width: '100%',marginTop: 20, gap: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: isIPhone?10:10, gap: 9}}>
                          <Text style={{color: '#616161', fontSize: isIPhone?14:16,}}>Mã đơn hàng:</Text>
                          <Text style={{color: '#E5732F', fontSize: isIPhone?17:18,}}>{order.orderId}</Text>
                          <TouchableOpacity>
                            <Octicons name="copy" size={16} color="rgb(0, 139, 249)" />
                          </TouchableOpacity>
                      </View>       
                      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: isIPhone?10:10, gap: 13}}>
                        <Text style={{color: '#616161', fontSize: isIPhone?14:16,}}>Thời gian đăt hàng:</Text>
                        <Text style={{color: '#000', fontSize: isIPhone?16:28, fontWeight: 500}}>{moment(order.orderDate).format('HH:mm - DD/MM/YYYY')}</Text>
                      </View>         
                      <View style={{flexDirection: 'row', alignItems: 'center', paddingHorizontal: isIPhone?10:10, gap: 13}}>
                        <Text style={{color: '#616161', fontSize: isIPhone?14:16,}}>Thời gian giao hàng:</Text>
                        <Text style={{color: '#000', fontSize: isIPhone?16:28, fontWeight: 500}}>{moment(order.orderDate).format('HH:mm - DD/MM/YYYY')}</Text>
                      </View>   
        </View>
        
      </View>
      <View style={{alignItems: 'center', width: '100%'}}>
          <FlatList
            data={orderDetails}
            keyExtractor={(item, index) => item + index}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={{backgroundColor: '#fff',flexDirection: 'row', alignItems: 'center', marginTop: 10, borderRadius: 20, gap: 12, width: '100%', padding: 8, paddingVertical: 10}}>
                <Image source={{ uri: "http://"+ipv4+item.product.productImageList[0].path }} style={{ width: 70, height: 70,}} />
                <View style={{justifyContent: 'flex-start',width: 255, gap: 5}}>
                  <Text style={{fontSize: 14, textTransform: 'uppercase'}}>{item.product_name}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 13, fontWeight: 300}}>x{item.quantity}</Text>
                    <Text style={{fontSize: 15, fontWeight: 500}}>{numberToCurrency(item.price)}₫</Text>
                  </View>
                </View>
              </View>
            )}
          />
      </View>

      <View style={{backgroundColor: '#FFF', paddingHorizontal: isIPhone?5:10, paddingVertical: 10, marginTop: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(59, 59, 59)', fontSize: isIPhone?17:19, fontWeight: 700, paddingBottom: 10, textTransform: 'uppercase'}}>Thanh toán</Text>
                    </View> 
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: isIPhone?12:12}}>
                        <Text style={{color: '#676767', fontSize: isIPhone?15:17,}}>Tổng tiền:</Text>
                        <Text style={{color: '#000', fontSize: isIPhone?16:18, fontWeight: 500}}>{numberToCurrency(calculateTotalPrice(orderDetails))}₫</Text>
                    </View>       
      </View>
      
      <View style={{backgroundColor: '#FFF', paddingHorizontal: isIPhone?5:10, paddingVertical: 10, marginTop: 5, gap: 11}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: isIPhone?12:12}}>
                        <Text style={{color: '#676767', fontSize: isIPhone?15:17,}}>Phí giao hàng:</Text>
                        <Text style={{color: '#000', fontSize: isIPhone?16:18, fontWeight: 500}}>{numberToCurrency(0)}₫</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: isIPhone?12:12}}>
                        <Text style={{color: '#5E89DA', fontSize: isIPhone?15:17,}}>Tổng điểm tích luỹ:</Text>
                        <Text style={{color: '#59A857', fontSize: isIPhone?17:19, fontWeight: 500}}>+{numberToCurrency(calculateTotalPrice(orderDetails)/100)}</Text>
                    </View>       
      </View>
      <View style={{backgroundColor: '#FFF', paddingHorizontal: isIPhone?5:10, paddingVertical: 10, marginTop: 5, gap: 11}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: isIPhone?12:12}}>
                        <Text style={{color: '#636363', fontSize: isIPhone?15:17,}}>Tổng đơn hàng:</Text>
                        <Text style={{color: '#E5722F', fontSize: isIPhone?23:24, fontWeight: 600}}>{numberToCurrency(calculateTotalPrice(orderDetails))}₫</Text>
                    </View>       
      </View>
      <View style={{height: 60}}>

      </View>
    </ScrollView>
    </View>
  )
}

export default OrderDetail

const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})