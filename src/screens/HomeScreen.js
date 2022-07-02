import React, {useContext} from 'react';
import {ActivityIndicator, Button, Text, View,TouchableOpacity,SafeAreaView,ScrollView} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

    function HomeScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        // <SafeAreaView style={{flex:1, justifyContent: 'center'}}>
        //     <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Ionicons name="person" size={100}  />
                <Text style={{fontSize:20}}>Hi {userInfo.name}</Text>
                <Text style={{fontSize:15}}>Welcome to SL RideShare</Text>
                <Text style={{fontSize:12}}>Powered by JSE Labs</Text>

            </View>
            <View style={{ flex: 2,width:'100%' }}>

                <View style={{margin:10, flex:1}}>

                    <TouchableOpacity
                    style={{
                        height:50,
                        backgroundColor: "#114953",
                        borderRadius:20,
                        padding:10
                    }}
                    onPress={() => navigation.navigate('Settings Screen')}
                    >
                        <Text style={{fontSize: 18, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Settings</Text>
                    </TouchableOpacity>
                    {/*<Button*/}
                    {/*    title="Settings"*/}
                    {/*    onPress={() => navigation.navigate('Settings Screen')}*/}
                    {/*/>*/}
                </View>


            </View>

        </View>
             // </ScrollView>
         // </SafeAreaView>
    );
}

export default HomeScreen;
