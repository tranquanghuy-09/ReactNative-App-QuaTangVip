import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator, TextInput} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const OnlineSupport = ({ navigation, route}) => {
    const isIPhone = Platform.OS === 'ios';
    const [loading, setLoading] = useState(false);
    const reloadPage = () => {
        //Công việc giả định là tải lại trang
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000); 
      };
    return (
        <View style={styles.container}>
            <ScrollView style={{borderWidth: 0, flex: 1, paddingBottom: 120}}>
               
            </ScrollView> 

            <View style={{width: '100%',}}>
                <View style={{flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', borderWidth: 1, alignItems: 'center', width: isIPhone?280:315, height: 60, justifyContent: 'center', padding: 15
                        , borderColor: 'rgba(217, 217, 217, 1)', borderRadius: 17, marginVertical: 13,}}>
                        <Image source={require('../../assets/icons/plus-icon.png')} style={{width: 22, height: 25, marginLeft: 20, opacity: 0.8}}/>
                        <TextInput style={{width: '100%', height: 40, borderRadius: 10, paddingLeft: 7, }} placeholder='Nhập nội dung'/>
                    </View>
                    <TouchableOpacity style={{width: 60, height: 60, backgroundColor: '#CECECE', borderRadius: 14, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../assets/icons/sendmessage-icon.png')} style={{width: 28, height: 28, }}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{position: 'absolute', alignItems: 'center', justifyContent: 'center', bottom: 90, alignItems: 'flex-end', width: '100%' }}>
                <View style={{width: 217, height: 71, marginRight:  isIPhone?10:35, marginBottom: isIPhone?5:10}}>
                    <Image source={require('../../assets/icons/messager.png')} style={{width: isIPhone?217: 240, height: isIPhone?71:80,}}/>
                    <Text style={{marginTop: isIPhone?-53:-61, marginLeft: isIPhone?17:20, width: isIPhone?193:210, height: 38, fontSize: isIPhone?14:16}}>Chọn nhóm hàng anh cần hỗ trợ tư vấn</Text>
                </View>

                <TouchableOpacity style={{marginRight: 15, marginBottom: 10}}>
                    <Image source={require('../../assets/icons/plus-cirlce.png')} style={{width: 65, height: 65,}}/>
                </TouchableOpacity>
                
            </View>
        </View>
    );
}

export default OnlineSupport;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 245, 245, 1)',
    },
});
