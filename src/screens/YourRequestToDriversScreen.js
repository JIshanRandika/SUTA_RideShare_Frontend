import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';

function YourRequestToDriversScreen({navigation}) {
    const {userInfo, logout} = useContext(AuthContext);
    const [selectedId, setSelectedId] = useState(null);

    const [isRequestLoading, setRequestLoading] = useState(true);

    const [requestData, setRequestData] = useState([]);

    useEffect(() => {

        // fetch(`${BASE_URL}/getRiderToDriverRequests`)
        //     .then((response) => response.json())
        //     .then((json) => setRequestData(json))
        //     .catch((error) => console.error(error))
        //     .finally(() => setRequestLoading(false));

        fetch(`${BASE_URL}/yourRequestsToDrivers`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userInfo.name,
                email:userInfo.email

            }),
        })
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
                width: "90%",
                // height: 37,
                paddingLeft:10,
                paddingRight:10,
                paddingTop:10,
                paddingBottom:10,
                backgroundColor: item.status ==="Accepted"? "#107e7d" : item.status ==="Rejected"? "#d5573b" : "#46bd89",
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



            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Vehicle Number: {item.vehicleNumber}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Driver Name: {item.driverName}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>{item.originDateTime}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Group ID: {item.groupID}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Status: {item.status}</Text>
            <View style={{margin:10}}>
                {/*<Button color='red' title='Delete' onPress={()=>{deleteARequest(item._id);navigation.navigate('Rider')}}/>*/}

                <TouchableOpacity
                    style={{
                        height:42,
                        backgroundColor: "#e00000",
                        borderRadius:20,
                        padding:10
                    }}
                    onPress={()=>{deleteARequest(item._id);}}
                >
                    <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Delete</Text>
                </TouchableOpacity>
            </View>
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

    const reloadRequests = () => {
        fetch(`${BASE_URL}/yourRequestsToDrivers`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userInfo.name,
                email:userInfo.email

            }),
        })
            .then((response) => response.json())
            .then((json) => setRequestData(json))
            .catch((error) => console.error(error))
            .finally(() => setRequestLoading(false));
    }

// ===========
    const deleteARequest = (id) => {
        console.log(id)
        fetch(`${BASE_URL}/deleteRiderToDriverRequests/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            // this.getOrderDetail
            console.log("Remove Done!");
            // let updatedItems = [...this.state.items].filter(i => i._id !== id);
            // this.setState({items: updatedItems});

        }).finally(() => reloadRequests());
    }
    // =====================

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

                    {/*<Text style={{justifyContent:'center'}}>Loaded</Text>*/}
                    <View style={{width:'100%'}}>
                        <SafeAreaView style={{width:'100%'}}>

                            <FlatList
                                style={{height:"100%", width:'100%'}}
                                data={requestData.reverse()}
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
