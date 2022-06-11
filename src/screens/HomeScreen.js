import React, {useContext} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

    function HomeScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{fontSize:20}}>Hi {userInfo.name}</Text>
                <Text style={{fontSize:15}}>Welcome to SUTA RideShare</Text>
                <Text>Sabaragamuwa University Of Sri Lanka</Text>
            </View>
            <View style={{ flex: 1,width:'100%' }}>

                <View style={{margin:10, flex:1}}>
                    <Button
                        title="Settings"
                        onPress={() => navigation.navigate('Settings Screen')}
                    />
                </View>


            </View>

        </View>
    );
}

export default HomeScreen;
