import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button, FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
// import Token from './Token';

function GroupsManageScreen({ navigation }) {
    const {userInfo, logout} = useContext(AuthContext);

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
        }).finally(
            fetch(`${BASE_URL}/updateGoogleUserGroup`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                email: userInfo.email,
                groupID:groupID

            }),
        }).finally(logout)
        );
    }

    const [isLoading, setLoading] = useState(true);

    const [dataUser, setUserData] = useState([]);
    const [dataGoogleUser, setGoogleUserData] = useState([]);

    const [data, setData] = useState([]);

    useEffect(() => {



        fetch(`${BASE_URL}/usersInGroup`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                groupID: userInfo.groupID,

            }),
        })
            .then((response) => response.json())
            .then((json) => setUserData(json))
            .catch((error) => console.error(error))
            .finally(() => {

                fetch(`${BASE_URL}/googleUsersInGroup`,{
                    method:'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        groupID: userInfo.groupID,

                    }),
                })
                    .then((response) => response.json())
                    .then((json) => setGoogleUserData(json))
                    // .then(setData(dataUser))
                    .catch((error) => console.error(error))
                    .finally(() => setLoading(false));
            })







    }, []);

    // const [isLoading, setLoading] = useState(true);

    // =====================


    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item }) => (



        <TouchableOpacity

            style={{
                // flex: 1,
                marginTop:"3%",
                alignSelf: 'center',
                width: "90%",
                // height: 37,
                paddingLeft:10,
                paddingRight:10,
                paddingTop:10,
                paddingBottom:10,
                backgroundColor: "#50534e",
                borderRadius:10,
                shadowColor: "#0090ff",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
            }}

        >


            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>{item.name}</Text>
            {/*<Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.contactNumber}</Text>*/}


        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
            />
        );
    };


    // ================================


    return (
        <View style={{ flex: 1,width:'100%',justifyContent:'center' }}>

            <View style={{flex:4,justifyContent:'center'}}>
                <SafeAreaView>
                    <ScrollView>

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
                        placeholderTextColor='gray'
                        placeholder="Enter Custom Group ID"
                        onChangeText={text => setGroupID(text)}
                    />
                </View>
                <View style={{flex:1,justifyContent:'center'}}>
                    <Text style={{fontWeight:"bold", color:'black'}}>OR</Text>
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




            <View style={{margin:9}}>

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

                    </ScrollView>
                </SafeAreaView>
            </View>
            {/*===========================*/}
            <View style={{flex:8}}>
                {/*<Spinner visible={isLoading} />*/}
                <View style={{margin:10}}>
                    <Text style={{fontWeight:'bold', fontSize:15}}>Other members in current group : {userInfo.groupID}</Text>
                </View>

                {isLoading ? <Text style={{color:'black'}}>Loading...</Text> :(
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width:'100%'
                    }}>

                        {/*<Text style={{justifyContent:'center'}}>Loaded</Text>*/}
                        <View style={{width:'100%'}}>
                            <SafeAreaView style={{width:'100%'}}>
                                {(dataUser.length + dataGoogleUser.length) === 0 && (
                                    <Text style={{color:'black',margin:50}}>No group members</Text>

                                )}
                                <FlatList
                                    style={{height:"90%", width:'100%'}}
                                    data={dataUser.concat(dataGoogleUser).reverse()}
                                    renderItem={renderItem}
                                    keyExtractor={(data) => data._id}
                                    extraData={selectedId}
                                />

                            </SafeAreaView>
                        </View>
                    </View>
                )}

            </View>


            {/*==================*/}

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
        color:'black',
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
