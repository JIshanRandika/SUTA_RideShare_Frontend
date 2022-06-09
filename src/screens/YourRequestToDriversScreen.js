import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';

function YourRequestToDriversScreen() {
    const {userInfo, logout} = useContext(AuthContext);
    const [selectedId, setSelectedId] = useState(null);

    const [isRequestLoading, setRequestLoading] = useState(true);

    const [requestData, setRequestData] = useState([]);

    useEffect(() => {
        fetch(`${BASE_URL}/getRiderToDriverRequests`)
            .then((response) => response.json())
            .then((json) => setRequestData(json))
            .catch((error) => console.error(error))
            .finally(() => setRequestLoading(false));



    }, []);


    const ItemRequest = ({ item }) => (




        <View

            style={{
                // flex: 1,
                marginTop:"3%",
                alignSelf: 'center',
                width: "47%",
                // height: 37,
                paddingLeft:10,
                paddingRight:10,
                paddingTop:10,
                paddingBottom:10,
                backgroundColor: item.status ==="accept"? "#107e7d" : item.status ==="reject"? "#d5573b" : "#e3b505",
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



            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.status}</Text>

            {/*<View style={{margin:10}}>*/}
            {/*    <Button title='Reject' onPress={()=>{setScreen('2')}}/>*/}
            {/*</View>*/}

            {/*<Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.contactNumber}</Text>*/}



        </View>
    );
    const renderRequestItem = ({ item }) => {
        return (
            <ItemRequest
                item={item}
            />
        );
    };



    return (
        <View style={styles.container}>
            {/*<Spinner visible={isLoading} />*/}


            {isRequestLoading ? <Text>Loading Requests...</Text> :(
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width:'100%'
                }}>

                    <Text style={{justifyContent:'center'}}>Loaded</Text>
                    <View style={{width:'100%'}}>
                        <SafeAreaView style={{width:'100%'}}>

                            <FlatList
                                style={{height:"90%", width:'100%'}}
                                data={requestData}
                                renderItem={renderRequestItem}
                                keyExtractor={(data) => data._id}
                                extraData={selectedId}
                            />

                        </SafeAreaView>
                    </View>
                </View>
            )}

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

export default YourRequestToDriversScreen;
