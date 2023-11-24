import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, FlatList, TextInput, KeyboardAvoidingView} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons, Entypo, AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import moment from 'moment';

const OrderEquipmentCleaning = ({ navigation }) => {
    const isIPhone = Platform.OS === 'ios';
    const isFocused = useIsFocused();

    const [chinhToi, setChinhToi] = useState(false);
    const [nguoiThan, setNguoiThan] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGio, setSelectedGio] = useState(null);
    const [dateArray, setDateArray] = useState([]);

    useEffect(() => {
        const currentDate = moment();
        // Tạo mảng với ngày hiện tại và 10 ngày tiếp theo
        const newArray = Array.from({ length: 10 }, (_, index) => {
            const newDate = currentDate.clone().add(index, 'days');
            return {
                label: `Ngày ${newDate.format('DD/MM')}`,
                value: newDate.format('DD/MM'),
            };
        });
        setDateArray(newArray);
    }, []);

    // const months = [
    //     { label: 'Tháng 1', value: '1' },
    //     { label: 'Tháng 2', value: '2' },
    //     { label: 'Tháng 3', value: '3' },
    //     { label: 'Tháng 4', value: '4' },
    //     { label: 'Tháng 5', value: '5' },
    // ];
    const gio = [
        { label: 'Trước 18h', value: 'Trước 18h' },
        { label: 'Sau 18h', value: 'Sau 18h' },
    ];

    const pickerSelectStyles = {
        inputIOS: {
            marginHorizontal: 10,
            borderRadius: 10,
            borderColor: 'rgb(149, 159, 166)',
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            color: 'black',
            paddingRight: 30, 
        },
        inputAndroid: {
            marginHorizontal: 10,
            borderRadius: 10,
            borderColor: 'rgb(149, 159, 166)',
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            color: 'black',
            paddingRight: 30,
        },
        iconContainer: {
            top: 15,
            right: 20,
        },
    };    

    const handleChinhToiPress = () => {
        setChinhToi(!chinhToi);
        setNguoiThan(false);
    };
    
    const handleNguoiThanPress = () => {
        setNguoiThan(!nguoiThan);
        setChinhToi(false);
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20, }} >
                    <TouchableOpacity onPress={() => navigation.navigate("Đặt lịch vệ sinh thiết bị")} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../../assets/icons/arrow-left.png')} style={{ width: 13, height: 15 }} />
                        <Text style={{ marginLeft: 10, fontSize: isIPhone ? 15 : 17, fontWeight: 400, color: '#1A93D4' }}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, []); 

    useEffect(() => {
    }, [isFocused]);
    
    const numberToCurrency = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };


    const [temp, setTemp] = useState({
        id: 1,
        name: 'Vệ sinh máy lạnh từ 1 HP - 2.5 HP',
        image: require('../../../assets/images/airconditioner1.png'),
        price: 120000,
        cost: 199000,
        discount: 79000,
        promotion_apply_at: "Khuyến mãi áp dụng tại Hồ Chí Minh",
        qty: 0,
    });

    return (
        
        <View style={styles.container}>
            <View style={{borderWidth: 0, paddingBottom: 10}}>
                <Text style={{fontSize: isIPhone?29:32, marginLeft: 20, fontWeight: 700}}>Đặt lịch vệ sinh thiết bị</Text>
            </View>
            <ScrollView style={{flex: 1,}}>
                <View style={{backgroundColor: '#FFF', paddingHorizontal: isIPhone?5:10, paddingVertical: 10, marginTop: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(101, 101, 101)', fontSize: isIPhone?16:18, fontWeight: 500, paddingBottom: 10}}>Danh sách dịch vụ đã chọn</Text>
                    </View> 
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <View style={{width: '95%', height: 130, borderRadius: 20, backgroundColor: 'rgb(244, 244, 244)'}}>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 10, marginTop: 10, gap: 10}}>
                                <View style={{ marginTop: -10}}>
                                    <Image source={temp.image}  resizeMode='contain' style={{width: 60, }}/>
                                </View>
                                <View style={{justifyContent: 'space-between', height: 105, width: '75%'}}>
                                    <View>
                                        <Text style={{fontSize: isIPhone?14:16, fontWeight: 500, color: '#104887',}}>{temp.name}</Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: 10}}>
                                            <Image source={require('../../../assets/icons/gift-solid.png')} style={{width: 15, height: 15, }}/>
                                            <Text style={{marginLeft: 5, fontSize: isIPhone?13:13, fontWeight: 500, color: '#616161'}}>Giảm {numberToCurrency(temp.discount)}₫</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                                        <View style={{justifyContent: 'flex-end'}}>
                                            <Text style={{fontSize: 14, color: '#616161',}}><Text style={{fontSize: 10}}>X</Text>{temp.qty}</Text>
                                        </View>
                                        <View>
                                            <Text style={{fontSize: isIPhone?15:15, textAlign: 'right',fontWeight: 400, color: '#CFCFCF', textDecorationLine: 'line-through', textDecorationStyle: 'solid', marginTop: 3}}>{numberToCurrency(temp.cost)}₫</Text>
                                            <Text style={{fontSize: isIPhone?18:19, fontWeight: 500, color: 'rgb(255, 97, 37)'}}>{numberToCurrency(temp.price)}₫</Text>
                                        </View>
                                    </View>
                                </View>
                                

                            </View>
                        </View>
                    </View>
                    
                </View>

                <View style={{backgroundColor: '#FFF', paddingHorizontal: isIPhone?5:10, paddingVertical: 10, marginTop: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingHorizontal: isIPhone?10:10}}>
                        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 10}}>
                            <View style={{width: 35, height: 35, backgroundColor: 'rgb(255, 240, 200)', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}}>
                                <MaterialCommunityIcons name="ticket-percent-outline" size={24} color="rgb(255, 191, 63)" />
                            </View>
                            <Text style={{color: 'rgb(139, 139, 139)', fontSize: isIPhone?16:18, fontWeight: 500,}}>Phiếu mua hàng</Text>
                        </View>
                        <Entypo name="chevron-small-right" size={24} color="rgb(109, 110, 120)" />
                    </View>                     
                </View>

                <View style={{backgroundColor: '#FFF', paddingHorizontal: isIPhone?5:10, paddingVertical: 10, marginTop: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(59, 59, 59)', fontSize: isIPhone?17:19, fontWeight: 600, paddingBottom: 10}}>Thanh toán</Text>
                    </View> 
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?15:17,}}>Tổng tiền :</Text>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?18:20,}}>199.000₫</Text>
                    </View>       
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?15:17,}}>Khuyến mãi :</Text>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?18:20,}}>-100.000₫</Text>
                    </View>         
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?15:17,}}>Tạm tính :</Text>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?18:20, fontWeight: 600, color: 'rgb(255, 97, 37)'}}>99.000₫</Text>
                    </View>
                    <View style={{borderColor: 'rgb(230, 230, 230)', width: '50%', borderTopWidth: 1, marginLeft: 10, marginTop: 10}}>
                    </View>      
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?15:17,}}>Tổng điểm tạm tính :</Text>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?18:20, fontWeight: 500, color: 'rgb(0, 137, 105)'}}>+990</Text>
                    </View>   
                </View>

                <View style={{backgroundColor: '#FFF', paddingHorizontal: isIPhone?5:10, paddingVertical: 10, marginTop: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(59, 59, 59)', fontSize: isIPhone?17:19, fontWeight: 600, paddingBottom: 10}}>Thông tin liên hệ</Text>
                    </View> 
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10, paddingHorizontal: isIPhone?10:10}}>
                        <TouchableOpacity onPress={handleChinhToiPress} style={{width: 18, height: 18, borderWidth: 2, borderColor: 'rgb(200, 200, 200)', alignItems: 'center', justifyContent: 'center'}}>
                            {chinhToi ? <AntDesign name="check" size={16} color="black" /> : ""}
                        </TouchableOpacity>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?15:17, marginLeft: 10}}>Chính tôi (Trần Quang Huy - 0357391270)</Text>
                    </View>       
                    <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 10, paddingHorizontal: isIPhone?10:10}}>
                        <TouchableOpacity onPress={handleNguoiThanPress} style={{width: 18, height: 18, borderWidth: 2, borderColor: 'rgb(200, 200, 200)', alignItems: 'center', justifyContent: 'center'}}>
                            {nguoiThan ? <AntDesign name="check" size={16} color="black" /> : ""}
                        </TouchableOpacity>
                        <Text style={{color: 'rgb(62, 62, 62)', fontSize: isIPhone?15:17, marginLeft: 10}}>Người thân</Text>
                    </View>
                    <View style={{height: 15}}>
                    </View>        
                </View>

                <View style={{backgroundColor: '#FFF', paddingHorizontal: isIPhone?5:10, paddingTop: 10, marginTop: 10, gap: 15}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(59, 59, 59)', fontSize: isIPhone?17:19, fontWeight: 600, paddingBottom: 5}}>Chọn thời gian thợ đến</Text>
                    </View> 
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedDate(value)}
                        items={dateArray}
                        placeholder={{ label: 'Chọn ngày', value: null }}
                        value={selectedDate}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <MaterialIcons name="expand-more" size={24} color="gray" />;
                        }}
                        style={pickerSelectStyles}
                    />
                    <RNPickerSelect
                        onValueChange={(value) => setSelectedGio(value)}
                        items={gio}
                        placeholder={{ label: 'Chọn giờ', value: null }}
                        value={selectedGio}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => {
                            return <MaterialIcons name="expand-more" size={24} color="gray" />;
                        }}
                        style={pickerSelectStyles}
                    />
                    <View style={{height: 1}}>
                    </View>        
                </View>

                <View style={{backgroundColor: '#FFF', paddingHorizontal: isIPhone?5:10, paddingVertical: 10, marginTop: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6, paddingHorizontal: isIPhone?10:10}}>
                        <Text style={{color: 'rgb(59, 59, 59)', fontSize: isIPhone?17:19, fontWeight: 500, paddingBottom: 10}}>Lưu ý từ Tận Tâm</Text>
                    </View> 
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={{color: 'rgb(129, 129, 129)', fontSize: 14}}>1. Giá đã bao gồm thuế VAT.</Text>
                        <Text style={{color: 'rgb(129, 129, 129)', fontSize: 14}}>2. Các trường hợp vệ sinh máy lạnh, lắp đặt có chiều cao cách vị trí đang đứng của nhân viên trên 4m: thì khách hàng hỗ trợ thuê thang leo hoặc dàn giáo nếu có phát sinh.</Text>
                        <Text style={{color: 'rgb(129, 129, 129)', fontSize: 14}}>3. Không áp dụng vệ sinh máy lạnh cho máy lạnh NỘI ĐỊA.</Text>
                        <Text style={{color: 'rgb(129, 129, 129)', fontSize: 14}}>4. Những phát sinh ngoài quy trình vệ sinh sẽ được báo giá chi phí: thay thế, sửa chữa, di dời, tháo lắp.</Text>
                    </View>
                    
                    <View style={{height: 15}}>
                    </View>        
                </View>

                <View style={{paddingBottom: 80, alignItems: 'center', justifyContent: 'center', paddingTop: 50}}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Đặt lịch vệ sinh thiết bị")}} style={{borderWidth: 1, borderRadius: 10, borderColor: 'rgb(227, 72, 87)', width: '40%'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, gap: 10}}>
                            <FontAwesome name="trash-o" size={20} color="rgb(227, 72, 87)" />
                            <Text style={{color: 'rgb(227, 72, 87)', fontSize: 12, fontWeight: 500, textTransform: 'uppercase'}}>Xoá dịch vụ</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={{width: '100%', paddingVertical: 20, backgroundColor: 'white', marginBottom: 10, gap: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center'}}>
                    <Text style={{fontSize: 16, color: 'rgb(48, 60, 70)'}}>Tổng giá tiền dịch vụ</Text>
                    <Text style={{fontSize: 24, color: 'rgb(48, 60, 70)', fontWeight: 700}}>99.000₫</Text>
                </View>
                <View style={{width: '100%', alignItems: 'center', }}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15}}>
                        <TouchableOpacity onPress={() => {}} style={{width: '48%', height: 55, borderColor: 'rgb(255, 191, 63)', borderWidth:1, alignItems: 'center', justifyContent: 'center', borderRadius: 17}}> 
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5}}>
                                <Ionicons name="ios-add" size={26} color="rgb(255, 191, 63)" />
                                <Text style={{fontSize: isIPhone?18:20, color: 'rgb(255, 191, 63)', fontWeight: 600}}>Đặt thêm</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {}} style={{width: '48%', height: 55, backgroundColor: 'rgb(255, 191, 63)', alignItems: 'center', justifyContent: 'center', borderRadius: 17}}> 
                            <Text style={{fontSize: isIPhone?18:20, color: '#000', fontWeight: 600}}>Đặt lịch</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </View>
    );
}

export default OrderEquipmentCleaning;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 245, 245, 1)',
    },
});
