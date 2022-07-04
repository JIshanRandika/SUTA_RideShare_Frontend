import React, {useContext, useState} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
// import Token from './Token';

function GroupsManageScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    const [groupID,setGroupID] = useState(null);

    const updateGroupID = () => {

        fetch(`${BASE_URL}/updateUserGroup`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                email: userInfo.email,
                groupID:groupID

            }),
        }).finally(logout);
    }
    return (
        <View style={{ flex: 1,width:'100%',justifyContent:'center' }}>
            <View style={{margin:10,flexDirection:'row'}}>


                <View style={{flex:6}}>
                    <TextInput
                        style={{
                            // margin: 10,
                            borderWidth: 1,
                            borderColor: '#bbb',
                            borderRadius: 5,
                            paddingHorizontal: 14,}}
                        value={groupID}
                        placeholder="Enter Custom Group ID"
                        onChangeText={text => setGroupID(text)}
                    />
                </View>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontWeight:"bold"}}>OR</Text>
                </View>
                <View style={{flex:5}}>
                    <TouchableOpacity
                        style={{
                            alignContent:'center',
                            // height:'80%',
                            backgroundColor: "#114953",
                            borderRadius:10,
                            padding:10
                        }}
                        onPress={() => setGroupID('PUBLIC')}
                        // onPress={logout}
                    >
                        <Text style={{ fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Select Public Group</Text>
                    </TouchableOpacity>
                </View>






            </View>



            <View style={{margin:10}}>

                <TouchableOpacity
                    style={{
                        height:50,
                        backgroundColor: "#e00000",
                        borderRadius:20,
                        padding:10
                    }}
                    onPress={() => updateGroupID()}
                    // onPress={logout}
                >
                    <Text style={{fontSize: 18, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Change and Restart</Text>
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
    input: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    welcome: {
        fontSize: 18,
        marginBottom: 0,
    },
});

export default GroupsManageScreen;
