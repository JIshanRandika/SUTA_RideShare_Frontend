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
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

function FavoriteRoutesScreen({ navigation }) {

    const {userInfo, logout} = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);
    console.log(data);


    useEffect(() => {



        fetch(`${BASE_URL}/yourFavoriteRoutes`,{
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
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));



    }, []);







    const [originLongitude,setOriginLongitude] = useState(6.586622);
    const [originLatitude,setOriginLatitude] = useState(6.586622);
    const [destinationLongitude,setDestinationLongitude] = useState(6.586622);
    const [destinationLatitude,setDestinationLatitude] = useState(6.586622);

    const [screen,setScreen] = useState('1');


    // ================================
    const reloadRoute = () => {
        fetch(`${BASE_URL}/yourFavoriteRoutes`,{
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
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));



    }
    // ===========
    const deleteRoute = (id) => {
        console.log(id)
        fetch(`${BASE_URL}/deleteRoute/${id}`, {
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

        }).finally(() => reloadRoute());

    }

    // =====================

    const [selectedId, setSelectedId] = useState(null);

    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);

    const Item = ({ item }) => (



        <TouchableOpacity
            onPress={()=>{{
                setStartLocation(item.startLocation)
                setEndLocation(item.endLocation);

                setOriginLatitude(item.originLatitude);
                setOriginLongitude(item.originLongitude);
                setDestinationLatitude(item.destinationLatitude)
                setDestinationLongitude(item.destinationLongitude)
                setScreen('2');
                // setUserToken(item.userToken);

            }}
            }
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
                backgroundColor: "#6ac131",
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


            {/*<Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>{item.originDateTime}</Text>*/}
            <View style={{flexDirection:'row'}}>
                <TouchableOpacity
                    style={{
                        justifyContent:'center',
                        // height:20,
                        marginRight:20,
                        backgroundColor: "#e00000",
                        borderRadius:20,
                        paddingLeft:10,
                        paddingRight:10
                    }}
                    onPress={()=>{deleteRoute(item._id);}}
                >
                    <Text style={{fontSize: 10, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Delete</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>{item.routeName}</Text>

            </View>
            {/*<Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>{item.routeName}</Text>*/}
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

    // ==========request=======


    const updateStatus = (status,_id,userToken) => {




        fetch(`${BASE_URL}/updateRiderToDriverRequests`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                status: status,
                _id:_id

            }),
        }).then(alert('Successfully Updated'));


        // ==========


    }

    // =====================
    return (

        <View style={{
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            // width:'100%'
        }}>

            {/*<Spinner visible={isLoading} />*/}
            {/*<Text style={styles.welcome}>Your Drives Screen</Text>*/}
            {screen === '1' && (
                <>
                    <View style={{flex:1, margin:10}}>
                        {/*<Button*/}
                        {/*    color='orange'*/}
                        {/*    title="Add a Favorite"*/}
                        {/*    onPress={() => navigation.navigate('Add A Favorite Routes Screen')}*/}
                        {/*/>*/}

                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#114953",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={() => navigation.navigate('Add A Favorite Routes')}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Add a favorite</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:11}}>
                        {/*<Spinner visible={isLoading} />*/}


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
                                        {data.length === 0 && (
                                            <Text style={{color:'black',margin:50}}>No previously saved routes</Text>

                                        )}
                                        <FlatList
                                            style={{height:"90%", width:'100%'}}
                                            data={data.reverse()}
                                            renderItem={renderItem}
                                            keyExtractor={(data) => data._id}
                                            extraData={selectedId}
                                        />

                                    </SafeAreaView>
                                </View>
                            </View>
                        )}

                    </View>
                </>
            )}
            {screen === '2' && (
                <>

                    <MapView
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}

                        initialRegion={{
                            latitude: originLatitude,
                            longitude: originLongitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}

                    >



                        <Marker coordinate={{latitude: originLatitude, longitude: originLongitude}}
                                title="Origin"
                                description={startLocation}
                        />

                        <Circle center={{
                            latitude: originLatitude,
                            longitude: originLongitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421}} radius={500} />

                        <Marker coordinate={{latitude: destinationLatitude, longitude: destinationLongitude}}
                                title="Destination"
                                description={endLocation}
                        />
                        <Circle center={{
                            latitude: destinationLatitude,
                            longitude: destinationLongitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421}} radius={500} />
                        <MapViewDirections
                            origin={{latitude: originLatitude, longitude: originLongitude}}
                            destination={{latitude: destinationLatitude, longitude: destinationLongitude}}
                            apikey={'AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8'}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />

                    </MapView>
                    <View style={{flex: 2,margin:10}}>
                        {/*<Button title='Back' onPress={()=>{setScreen('1')}}/>*/}
                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#114953",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{setScreen('1')}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Back</Text>
                        </TouchableOpacity>
                    </View>

                </>
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
    map: {
        // height:'50%',
        ...StyleSheet.absoluteFillObject,
    },
    welcome: {
        fontSize: 18,
        marginBottom: 0,
    },
});

export default FavoriteRoutesScreen;




// import React, {useContext} from 'react';
// import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
// import {AuthContext} from '../context/AuthContext';
// // import Token from './Token';
//
// function FavoriteRoutesScreen({ navigation }) {
//     const {userInfo, isLoading, logout} = useContext(AuthContext);
//
//     return (
//         <View style={{ flex: 1,width:'100%' }}>
//             {/*<Token/>*/}
//             {/*<Spinner visible={isLoading} />*/}
//             {/*<Text style={styles.welcome}>Welcome {userInfo.message}</Text>*/}
//
//             <View style={{margin:10}}>
//                 <Button
//                     title="Logout"
//                     color="red"
//                     onPress={logout}
//                 />
//             </View>
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//
//     welcome: {
//         fontSize: 18,
//         marginBottom: 0,
//     },
// });
//
// export default FavoriteRoutesScreen;
