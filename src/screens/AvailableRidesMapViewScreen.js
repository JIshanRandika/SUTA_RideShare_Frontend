import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import filter from 'lodash.filter';
// import SearchableFlatlist from "searchable-flatlist";
var FCM = require('fcm-node');


function AvailableRidesMapViewScreen({ navigation }) {
    const {userInfo, logout} = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    // console.log('data');
    // console.log(data);
    // console.log('fullData');
    // console.log(fullData);

    const [userData, setUserData] = useState(null);

    const set = () => {
        userData.map((items)=>{

            console.log('Ishan')
            console.log(items.deviseToken)

            setUserToken(items.deviseToken)
        })
    }



    useEffect(() => {

        // ==========
        fetch(`${BASE_URL}/userToken`,{
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
            .then((json) => {setUserData(json);

                if(json.length===0){
                    fetch(`${BASE_URL}/googleUserToken`,{
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
                        .then((json) => {setUserData(json);console.log(json)})
                        .catch((error) => console.error(error))
                    // .finally(() => console.log(json));
                }

            })
            .catch((error) => console.error(error))
        // .finally(() => {}
        //
        // );
        // ==========




        // fetch(`${BASE_URL}/getDrives`)
        //     .then((response) => response.json())
        //     .then((json) => setData(json))
        //     .catch((error) => console.error(error))
        //     .finally(() => setLoading(false));

        fetch(`${BASE_URL}/ridesInGroup`,{
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
            .then((json) => {
                setData(json);
                setFullData(json)
            })
            // .then((json) => setData(json))
            // .then((json) => setFullData(json))
            // .then((json) => setData(json.filter(x=>x.VehicleNumber === 'H')))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

    }, []);



    const addADrive = (navigation) => {
        fetch(`${BASE_URL}/addADriverToRiderRequest`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                riderEmail: userInfo.email,
                riderName: userInfo.name,
                driverEmail: itemEmail,
                driverName: driverName,
                neededSeats: neededSeats,
                originDateTime: itemOriginDateTime,
                vehicleNumber:vehicleNumber,
                status: 'Pending Request',
                groupID: userInfo.groupID,
                userToken:userToken

            }),
        });




        fetch(`${BASE_URL}/notification/send`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                to: vehicleToken,
                notificationTitle: 'SUTA RideShare',
                notificationBody: `From ${userInfo.name} you have a new request for your Drive`,

            }),
        });

        // if(contactNumber.length>0){
        //     alert('Successfully Completed')
        // }else {
        //     alert('Error')
        // }


    }

    const [originLongitude,setOriginLongitude] = useState(6.586622);
    const [originLatitude,setOriginLatitude] = useState(6.586622);
    const [destinationLongitude,setDestinationLongitude] = useState(6.586622);
    const [destinationLatitude,setDestinationLatitude] = useState(6.586622);

    const [driverName, setDriverName] = useState('null');
    const [vehicleNumber,setVehicleNumber] = useState('null')

    const [itemEmail, setItemEmail] = useState('email');
    const [itemOriginDateTime, setItemOriginDateTime] = useState('null')

    const [screen,setScreen] = useState('1');

    const [userToken,setUserToken] = useState('');

    const [neededSeats, setNeededSeats] = useState(0);

    const [selectedId, setSelectedId] = useState(null);

    const [vehicleToken, setVehicleToken] = useState(null)

    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);




    const [searchData, setSearchData] = useState('');
    const [query, setQuery] = useState('');
    // const renderHeader = () => {
    //     return (
    //         <View
    //             style={{
    //                 backgroundColor: '#fff',
    //                 padding: 5,
    //                 marginLeft:20,
    //                 marginRight:20,
    //                 marginVertical: 10,
    //                 borderRadius: 20
    //             }}
    //         >
    //             <TextInput
    //                 autoCapitalize="none"
    //                 autoCorrect={false}
    //                 clearButtonMode="always"
    //                 value={query}
    //                 onChangeText={queryText => handleSearch(queryText)}
    //                 placeholder="Search"
    //                 style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
    //             />
    //         </View>
    //     )
    // }

    const randomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const mapMarkers = () => {
        return data.map((item) =>
            <>
                <Marker coordinate={{latitude: item.originLatitude, longitude: item.originLongitude}}
                        title="Origin"
                        description={item.startLocation}
                    // onPress={}
                        onPress={()=>{{
                            setStartLocation(item.startLocation)
                            setEndLocation(item.endLocation);
                            setOriginLatitude(item.originLatitude);
                            setOriginLongitude(item.originLongitude);
                            setDestinationLatitude(item.destinationLatitude);
                            setDestinationLongitude(item.destinationLongitude);
                            setItemEmail(item.email);
                            setItemOriginDateTime(item.originDateTime);
                            setScreen('2');
                            setDriverName(item.username);
                            setVehicleNumber(item.VehicleNumber);
                            set()
                            setVehicleToken(item.userToken);
                        }}
                        }
                >
                    <Image source={require('../assets/start.png')} style={{height: 80, width:40 }} />
                </Marker>

                <Circle center={{
                    latitude: item.originLatitude,
                    longitude: item.originLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421}} radius={500} />


                <Marker coordinate={{latitude: item.destinationLatitude, longitude: item.destinationLongitude}}
                        title="Destination"
                        description={item.endLocation}
                        onPress={()=>{{
                            setStartLocation(item.startLocation)
                            setEndLocation(item.endLocation);
                            setOriginLatitude(item.originLatitude);
                            setOriginLongitude(item.originLongitude);
                            setDestinationLatitude(item.destinationLatitude);
                            setDestinationLongitude(item.destinationLongitude);
                            setItemEmail(item.email);
                            setItemOriginDateTime(item.originDateTime);
                            setScreen('2');
                            setDriverName(item.username);
                            setVehicleNumber(item.VehicleNumber);
                            set()
                            setVehicleToken(item.userToken);
                        }}
                        }
                >
                    <Image source={require('../assets/stop.png')} style={{height: 80, width:40 }} />

                </Marker>
                <Circle center={{
                    latitude: item.destinationLatitude,
                    longitude: item.destinationLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421}} radius={500} />
                <MapViewDirections
                    origin={{latitude: item.originLatitude, longitude: item.originLongitude}}
                    destination={{latitude: item.destinationLatitude, longitude: item.destinationLongitude}}
                    apikey={'AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8'}
                    strokeWidth={3}
                    strokeColor={randomColor()}
                />
            </>

        )
    }
    return (

        <View style={{
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            // width:'100%'
        }}>

            {screen === '1' && (
                <>

                    <MapView
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}

                        initialRegion={{
                            latitude: 7.466860,
                            longitude: 80.695115,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}

                    >
                        {
                            mapMarkers()
                        }

                    </MapView>
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
                                backgroundColor: "#2b1153",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{setScreen('1')}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    {/*<TextInput*/}
                    {/*    style={{margin:10,backgroundColor:'yellow'}}*/}
                    {/*    value={neededSeats}*/}
                    {/*    placeholder="Number of Seats"*/}
                    {/*    onChangeText={text => setNeededSeats(text)}*/}
                    {/*/>*/}
                    <View style={{margin:10}}>
                        {/*<Button color={'green'} title='Send the Request' onPress={()=>{navigation.navigate('Driver');addARide();}}/>*/}

                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#114953",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{navigation.navigate('Driver');addARide();}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Send the Request</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',
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

export default AvailableRidesMapViewScreen;
