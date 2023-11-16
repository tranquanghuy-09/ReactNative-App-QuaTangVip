import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ActivityIndicator} from 'react-native'
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Gift = ({ navigation }) => {
    const isIPhone = Platform.OS === 'ios';
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }} >
                    <TouchableOpacity onPress={() => navigation.navigate("Trang chủ")} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../assets/icons/arrow-left.png')} style={{ width: 13, height: 15 }} />
                        <Text style={{ marginLeft: 10, fontSize: isIPhone ? 15 : 17, fontWeight: 400, color: '#1A93D4' }}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, []); 
    const reloadPage = () => {
        //Công việc giả định là tải lại trang
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 2000); 
      };
    return (
        <View style={styles.container}>
            <View style={{borderWidth: 0, }}>
                <Text style={{fontSize: 30, marginLeft: 20, fontWeight: 700}}>Quà của tôi</Text>
                    <View style={{flexDirection: 'row', backgroundColor: 'rgba(217, 217, 217, 1)', height: 48, marginTop: 17, justifyContent: 'space-between',
                                    borderWidth: 0, paddingHorizontal: 20, }}>
                        <TouchableOpacity style={{width:isIPhone?165: 180, height: 39, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 9,
                            borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
                            <Text style={{fontSize: 15, fontWeight: 600}}>Quà đang có</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width:isIPhone?165: 180, height: 39, alignItems: 'center', justifyContent: 'center', marginTop: 8}}>
                            <Text style={{fontSize: 15, fontWeight: 600}}>Quà hết hiệu lực</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            <ScrollView style={{flex: 1,}}>
                <View style={{alignItems: 'center',marginTop: 17 }}>
                    <Image source={require('../../assets/images/quacuatoitrong.png')} style={{width: 133, height:186,}}/>
                    <Text style={{color: '#0366D6', fontSize: 24, marginTop: 30, fontWeight: 400}}>Danh sách trống</Text>
                    <Text style={{color: '#67707B', fontSize: 15, marginTop: 14, fontWeight: 300}}>Danh sách quà tặng của anh đang trống</Text>
                </View>
                <View style={{alignItems: 'center',marginTop: 41}}>
                    <TouchableOpacity style={{backgroundColor: '#FFC62D', borderRadius: 15, width: isIPhone?310: 340, height: 47, alignItems: 'center', justifyContent: 'center'}}
                        onPress={reloadPage}>
                        <Text style={{color: '#023D80', fontSize: 16, fontWeight: 500, textTransform: 'uppercase'}}>TẢI LẠI TRANG</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView> 
            {isIPhone?
                <View style={{position: 'fixed', alignItems: 'center', width: '100%', bottom: '50%', justifyContent: 'center',}}>
                    {loading && <ActivityIndicator size="large" color="#023D80" style={{ marginTop: 10 }} />}
                </View>
            :
                <View style={{position: 'absolute', alignItems: 'center', width: '100%', bottom: 0, justifyContent: 'center', left: 0, right: 0, top: 0}}>
                    {loading && <ActivityIndicator size='large' color="#023D80" style={{ marginTop: 10 }} />}
                </View>
            }
        </View>
    );
}

export default Gift;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 245, 245, 1)',
    },
});
