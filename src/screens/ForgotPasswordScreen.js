import React, {useContext} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View,Linking} from 'react-native';
import {AuthContext} from '../context/AuthContext';
// import Token from './Token';

function ForgotPasswordScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);
    return (
        <View style={{ flex: 1,width:'100%',justifyContent:'center' }}>

            <View style={{margin:20}}>
                <TouchableOpacity
                    style={{
                        // height:50,
                        backgroundColor: "green",
                        borderRadius:20,
                        padding:20
                    }}
                    onPress={() => Linking.openURL('https://alvo.chat/475')}
                >
                    <Text style={{fontSize: 18, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Click here to contact customer service</Text>
                </TouchableOpacity>

            </View>
            <View style={{flexDirection: 'row', marginTop: 10,justifyContent:'center'}}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{color:'blue'}}>Login</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    welcome: {
        fontSize: 18,
        marginBottom: 0,
    },
});

export default ForgotPasswordScreen;
