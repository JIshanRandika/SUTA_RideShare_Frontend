import React, {useContext} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
// import Token from './Token';

function SettingsScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={{ flex: 1,width:'100%',justifyContent:'center' }}>
            {/*<Token/>*/}
            {/*<Spinner visible={isLoading} />*/}
            {/*<Text style={styles.welcome}>Welcome {userInfo.message}</Text>*/}

            <View style={{margin:10}}>

                <TouchableOpacity
                    style={{
                        height:50,
                        backgroundColor: "#114953",
                        borderRadius:20,
                        padding:10
                    }}
                    onPress={() => navigation.navigate('Favorite Routes Screen')}
                >
                    <Text style={{fontSize: 18, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Favorite Routes</Text>
                </TouchableOpacity>

                {/*<Button*/}
                {/*    title="Favorite Routes"*/}
                {/*    color="orange"*/}
                {/*    onPress={() => navigation.navigate('Favorite Routes Screen')}*/}
                {/*/>*/}
            </View>

            <View style={{margin:10}}>
                <TouchableOpacity
                    style={{
                        height:50,
                        backgroundColor: "#2b1153",
                        borderRadius:20,
                        padding:10
                    }}
                    onPress={() => navigation.navigate('Your Vehicles Screen')}
                >
                    <Text style={{fontSize: 18, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Your Vehicles</Text>
                </TouchableOpacity>

                {/*<Button*/}
                {/*    title="Your Vehicles"*/}
                {/*    color="green"*/}
                {/*    onPress={() => navigation.navigate('Your Vehicles Screen')}*/}
                {/*/>*/}
            </View>

            <View style={{margin:10}}>

                <TouchableOpacity
                    style={{
                        height:50,
                        backgroundColor: "#e00000",
                        borderRadius:20,
                        padding:10
                    }}
                    onPress={logout}
                >
                    <Text style={{fontSize: 18, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Logout</Text>
                </TouchableOpacity>

                {/*<Button*/}
                {/*    title="Logout"*/}
                {/*    color="red"*/}
                {/*    onPress={logout}*/}
                {/*/>*/}
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

export default SettingsScreen;
