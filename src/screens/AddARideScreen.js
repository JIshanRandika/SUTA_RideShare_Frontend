import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
    ScrollView,
    FlatList, TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import MapView, {Circle, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Dialog, {DialogButton, DialogContent, DialogFooter} from 'react-native-popup-dialog';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import Geolocation from '@react-native-community/geolocation';

function AddARideScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    const [count, setCount] = useState(0);

    const [screen, setScreen] = useState('1');

    const [originDate, setOriginDate] = useState(new Date());
    const [originMode, setOriginMode] = useState('date');
    const [originShow, setOriginShow] = useState('F');
    const [originText, setOriginText] = useState(null);

    const [originVisible, setOriginVisible] = useState(false);

    const [destinationDate, setDestinationDate] = useState(new Date());
    const [destinationMode, setDestinationMode] = useState('date');
    const [destinationShow, setDestinationShow] = useState('F');
    const [destinationText, setDestinationText] = useState(null);

    const [neededSeats, setNeededSeats] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);

    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);

    const onOriginChange = (event, selectedDate) => {
        const currentOriginDate = selectedDate || originDate;
        setOriginShow(Platform.OS ==='android');
        setOriginDate(currentOriginDate);


        let tempOriginDate = new Date (currentOriginDate);
        let fDate = tempOriginDate.getDate()+'/'+(tempOriginDate.getMonth()+ 1)+'/'+tempOriginDate.getFullYear();
        let fTime = 'Hours :'+tempOriginDate.getHours()+'| Minutes' + tempOriginDate.getMinutes();
        setOriginShow('F');
        setOriginText('Origin Date : '+fDate + '\nOrigin Time : '+fTime);

    }

    const onDestinationChange = (event, selectedDate) => {
        const currentDestinationDate = selectedDate || originDate;
        setDestinationShow(Platform.OS ==='android');
        setDestinationDate(currentDestinationDate);


        let tempDestinationDate = new Date (currentDestinationDate);
        let fDate = tempDestinationDate.getDate()+'/'+(tempDestinationDate.getMonth()+ 1)+'/'+tempDestinationDate.getFullYear();
        let fTime = 'Hours :'+tempDestinationDate.getHours()+'| Minutes' + tempDestinationDate.getMinutes();
        setDestinationShow('F');
        setDestinationText('Destination Date : '+fDate + '\nDestination Time :'+fTime);

    }

    const showOriginMode = (currentMode) => {
        setOriginShow('T');
        setOriginMode(currentMode);
    }

    const showDestinationMode = (currentMode) => {
        setDestinationShow('T');
        setDestinationMode(currentMode);
    }


    // const [position, setPosition] = useState({
    //     latitude: 10,
    //     longitude: 10,
    //     latitudeDelta: 0.001,
    //     longitudeDelta: 0.001,
    // });
    //
    // useEffect(() => {
    //     Geolocation.getCurrentPosition((pos) => {
    //         const crd = pos.coords;
    //         setPosition({
    //             latitude: crd.latitude,
    //             longitude: crd.longitude,
    //             latitudeDelta: 0.0421,
    //             longitudeDelta: 0.0421,
    //         });
    //     })
    // }, []);


    const [originLocation, setOriginLocation] = useState({
        latitude: 6.586622,
        longitude: 79.975817,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    const [destinationLocation, setDestinationLocation] = useState({
        latitude: 6.586622,
        longitude: 79.975817,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    const set = () => {
        userData.map((item)=>{

            console.log(item.deviseToken)

            addADrive(item.deviseToken);
        })
    }

    const addADrive = (userToken) => {
        fetch(`${BASE_URL}/ride`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                originDateTime: originText,
                originLongitude: originLocation.longitude,
                originLatitude: originLocation.latitude,

                // destinationDateTime: destinationText,
                destinationLongitude: destinationLocation.longitude,
                destinationLatitude: destinationLocation.latitude,

                neededSeats: neededSeats,
                contactNumber: contactNumber,
                username: userInfo.name,
                email:userInfo.email,
                groupID: userInfo.groupID,
                startLocation:startLocation,
                endLocation:endLocation,
                userToken:userToken

            }),
        }).then(alert('Successfully Completed'));
        // if(contactNumber.length>0){
        //     alert('Successfully Completed')
        // }else {
        //     alert('Error')
        // }
    }




    // ===============================
    const [
        currentLongitude,
        setCurrentLongitude
    ] = useState('...');
    const [
        currentLatitude,
        setCurrentLatitude
    ] = useState('...');
    const [
        locationStatus,
        setLocationStatus
    ] = useState('');


    const [userData, setUserData] = useState(null);

    const [data, setData] = useState([]);

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
            .then((json) => setUserData(json))
            .catch((error) => console.error(error))







        const requestLocationPermission = async () => {
            if (Platform.OS === 'android') {
                getOneTimeLocation();
                subscribeLocationLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        //To Check, If Permission is granted
                        getOneTimeLocation();
                        subscribeLocationLocation();
                    } else {
                        setLocationStatus('Permission Denied');
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };
        requestLocationPermission();
        return () => {
            Geolocation.clearWatch(watchID);
        };
    }, []);

    const getOneTimeLocation = () => {
        setLocationStatus('Getting Location ...');
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                setLocationStatus('You are Here');

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);



                setOriginLocation({
                    latitude: parseFloat(currentLatitude),
                    longitude: parseFloat(currentLongitude),
                });
                setDestinationLocation({
                    latitude: parseFloat(currentLatitude),
                    longitude: parseFloat(currentLongitude),
                });


                //Setting Longitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    const subscribeLocationLocation = () => {
        watchID = Geolocation.watchPosition(
            (position) => {
                //Will give you the location on location change

                setLocationStatus('You are Here');
                console.log(position);

                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                //Setting Longitude state
                setCurrentLongitude(currentLongitude);



                //Setting Latitude state
                setCurrentLatitude(currentLatitude);
            },
            (error) => {
                setLocationStatus(error.message);
            },
            {
                enableHighAccuracy: false,
                maximumAge: 1000
            },
        );
    };
    // =========
    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item }) => (



        <TouchableOpacity
            onPress={()=>{{
                setOriginLocation({
                    latitude: item.originLatitude,
                    longitude: item.originLongitude,
                });
                setDestinationLocation({
                    latitude: item.destinationLatitude,
                    longitude: item.destinationLongitude,
                })

                setStartLocation(item.startLocation);
                setEndLocation(item.endLocation);

                setScreen('5');
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
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Route Name : {item.routeName}</Text>
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


    const [show, setShow] = useState('0')


    return (
        <View style={styles.addADriveContainer}>
            {/*<Spinner visible={isLoading} />*/}





            {screen === '1' && (
                <SafeAreaView style={{width:'100%',flex:1}}>
                    <ScrollView>
                        <View style={{width:"100%", flex:1}}>

                            <View style={{margin:10, flex:1}}>
                                {/*<Button color='#f781d8' title='Origin Date' onPress={()=>showOriginMode('date')}/>*/}

                                <TouchableOpacity
                                    style={{
                                        height:42,
                                        backgroundColor: "#114953",
                                        borderRadius:20,
                                        padding:10
                                    }}
                                    onPress={()=>showOriginMode('date')}
                                >
                                    <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Select Origin Date</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{margin:10, flex:1}}>
                                {/*<Button color='#f781d8' title='Origin Time' onPress={()=>showOriginMode('time')}/>*/}

                                <TouchableOpacity
                                    style={{
                                        height:42,
                                        backgroundColor: "#114953",
                                        borderRadius:20,
                                        padding:10
                                    }}
                                    onPress={()=>showOriginMode('time')}
                                >
                                    <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Select Origin Time</Text>
                                </TouchableOpacity>

                            </View>
                            <View style={{margin:20, flex:1}}>
                                <Text style={{fontSize:15, color:'black'}}>{originText}</Text>
                            </View>

                            {/*<View style={{margin:10, flex:1}}>*/}
                            {/*    <Button color='#81b8f7' title='Destination Date' onPress={()=>showDestinationMode('date')}/>*/}
                            {/*</View>*/}
                            {/*<View style={{margin:10, flex:1}}>*/}
                            {/*    <Button color='#81b8f7' title='Destination Time' onPress={()=>showDestinationMode('time')}/>*/}
                            {/*</View>*/}
                            {/*<View style={{margin:10, flex:1}}>*/}
                            {/*    <Text style={{fontSize:15}}>{destinationText}</Text>*/}
                            {/*</View>*/}

                            <View style={{margin:10, flex:1}}>
                                <TextInput
                                    style={styles.input}
                                    value={neededSeats}
                                    placeholderTextColor='gray'
                                    placeholder="Number of Seats"
                                    keyboardType="numeric"
                                    onChangeText={text => setNeededSeats(text)}
                                />
                            </View>
                            {/*<View style={{margin:10, flex:1}}>*/}
                            {/*    <TextInput*/}
                            {/*        style={styles.input}*/}
                            {/*        value={vehicleNumber}*/}
                            {/*        placeholder="Vehicle Number"*/}
                            {/*        onChangeText={text => setVehicleNumber(text)}*/}
                            {/*    />*/}
                            {/*</View>*/}
                            <View style={{margin:10, flex:1}}>
                                <TextInput
                                    style={styles.input}
                                    value={contactNumber}
                                    keyboardType="numeric"
                                    placeholderTextColor='gray'
                                    placeholder="Your contact Number"
                                    onChangeText={text => setContactNumber(text)}
                                />
                            </View>

                            {/*{show !== '0' && (*/}
                            <View style={{margin:10, flex:1}}>
                                {/*<Button color='blue' title='Next' onPress={()=>{setScreen('2')}}/>*/}

                                <TouchableOpacity
                                    style={{
                                        height:42,
                                        backgroundColor: "#2b1153",
                                        borderRadius:20,
                                        padding:10
                                    }}
                                    onPress={()=>{setScreen('2');setShow('0');}}
                                >
                                    <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Next</Text>
                                </TouchableOpacity>

                            </View>
                            {/*)}*/}



                            {originShow ==='T' && (
                                <RNDateTimePicker
                                    testID = 'dateTimePicker'
                                    value = {originDate}
                                    mode = {originMode}
                                    in24Hour={false}
                                    display='default'
                                    onChange = {onOriginChange}
                                />
                            )}

                            {destinationShow ==='T' && (
                                <RNDateTimePicker
                                    testID = 'dateTimePicker'
                                    value = {destinationDate}
                                    mode = {destinationMode}
                                    in24Hour={false}
                                    display='default'
                                    onChange = {onDestinationChange}
                                />
                            )}
                        </View>
                    </ScrollView>
                </SafeAreaView>
            )}
            {screen === '2' && (

                <>
                    <MapView
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}

                        initialRegion={{
                            latitude: originLocation.latitude,
                            longitude: originLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onRegionChange={region => {
                            setOriginLocation({
                                latitude: region.latitude,
                                longitude: region.longitude,
                            });
                        }}
                        onRegionChangeComplete={region => {
                            setOriginLocation({
                                latitude: region.latitude,
                                longitude: region.longitude,
                            });
                        }}
                    >


                        <Marker
                            coordinate={{
                                latitude: originLocation.latitude,
                                longitude: originLocation.longitude,
                            }}
                            title="Origin"
                            description="Origin location"
                        />
                        <Circle center={originLocation} radius={1000} />
                    </MapView>
                    <View style={{flex: 2,margin:10 }}>
                        {/*<Button title='Back' onPress={()=>{setScreen('1')}}/>*/}
                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#114953",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{setScreen('1');setShow('0');}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    {show === '2' && (
                        <View
                            style={{
                                // width:'90%',
                                backgroundColor: '#fff',
                                padding: 5,
                                // marginLeft:20,
                                // marginRight:20,
                                marginHorizontal:10,
                                marginVertical: 10,
                                borderRadius: 20
                            }}
                        >
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={startLocation}
                                onChangeText={text => setStartLocation(text)}
                                placeholderTextColor='gray'
                                placeholder="Start Location Name"
                                style={{ backgroundColor: '#fff', paddingHorizontal: 20 ,color:'black'}}
                            />
                        </View>
                    )}

                    {show === '1' && (
                    <GooglePlacesAutocomplete

                        placeholder="Search"
                        fetchDetails={true}
                        textInputProps={{
                            placeholderTextColor: 'gray',
                        }}
                        GooglePlacesSearchQuery={{
                            rankby: "distance"
                        }}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details)
                            console.log(data.description)
                            setStartLocation(data.description)
                            setOriginLocation({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            })
                        }}
                        query={{
                            key: "AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8",
                            language: "en",
                            components: "country:lk",
                            types: "establishment",
                            radius: 30000,
                            location: `${originLocation.latitude}, ${originLocation.longitude}`
                        }}
                        styles={{
                            container: { flex: 0, position: "absolute", width: "95%", zIndex: 1,margin:10, marginTop:55, color:'black',textColor: 'black' },
                            listView: { backgroundColor: "black",textColor:'black',color: '#5d5d5d'},
                            separator: {
                                height: 0.5,
                                backgroundColor: 'black',textColor:'black',color: '#5d5d5d'
                            },
                            textInput: {
                                height: 38,
                                color: '#5d5d5d',
                                fontSize: 16,
                            },
                            textInputContainer: {
                                flexDirection: 'row',textColor:'black',color: '#5d5d5d'
                            },


                            poweredContainer: {
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                                borderColor: '#c8c7cc',
                                borderTopWidth: 0.5,
                            },
                            powered: {textColor:'black',color: '#5d5d5d'},

                            row: {
                                backgroundColor: '#FFFFFF',
                                padding: 13,
                                height: 44,
                                flexDirection: 'row',textColor:'black',color: '#5d5d5d'
                            },

                            description: {textColor:'black',color: '#5d5d5d'},
                            loader: {
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                height: 20,
                            },
                        }}
                    />
                    )}



                    {show === '0' && (

                        <View style={{margin:10,backgroundColor:'gray',padding:10,borderRadius:10}}>
                            <Text style={{color:'white',fontWeight:'bold'}}>Start Location:</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:6, marginRight:5}}>

                                    <TouchableOpacity
                                        style={{
                                            height:42,
                                            backgroundColor: "#05afa1",
                                            borderRadius:20,
                                            padding:10
                                        }}
                                        onPress={()=>{setShow('1')}}
                                    >
                                        <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Search</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1,justifyContent:'center'}}>
                                    <Text style={{fontWeight:"bold", color:'black'}}>OR</Text>
                                </View>
                                <View style={{flex:6,marginLeft:5}}>

                                    <TouchableOpacity
                                        style={{
                                            height:42,
                                            backgroundColor: "#7736d9",
                                            borderRadius:20,
                                            padding:10
                                        }}
                                        onPress={()=>{setShow('2')}}
                                    >
                                        <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Custom</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}


                    <View style={{margin:10}}>
                        {/*<Button color='orange' title='Select favorite route' onPress={()=>{setScreen('4')}}/>*/}
                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: '#7a5da7',
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{setScreen('4')}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Select favorite route</Text>
                        </TouchableOpacity>
                    </View>
                    {show !== '0' && (
                    <View style={{margin:10}}>
                        {/*<Button color='blue' title='Next' onPress={()=>{setScreen('3')}}/>*/}
                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: '#2b1153',
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{setScreen('3');setShow('0');}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Next</Text>
                        </TouchableOpacity>
                    </View>
                    )}


                </>
            )}
            {screen === '3' && (
                <>
                    <MapView
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        initialRegion={{
                            latitude: destinationLocation.latitude,
                            longitude: destinationLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        onRegionChange={region => {
                            setDestinationLocation({
                                latitude: region.latitude,
                                longitude: region.longitude,
                            });
                        }}
                        onRegionChangeComplete={region => {
                            setDestinationLocation({
                                latitude: region.latitude,
                                longitude: region.longitude,
                            });
                        }}
                        // showsUserLocation={true}
                    >

                        <Marker
                            coordinate={{
                                latitude: originLocation.latitude,
                                longitude: originLocation.longitude,
                            }}
                            title="Origin"
                            description="Origin location"
                        />
                        <Circle center={originLocation} radius={1000} />
                        <Marker
                            coordinate={{
                                latitude: destinationLocation.latitude,
                                longitude: destinationLocation.longitude,
                            }}
                            title="Destination"
                            description="Destination location"
                        />
                        <Circle center={destinationLocation} radius={1000} />
                        <MapViewDirections
                            origin={{latitude: originLocation.latitude, longitude: originLocation.longitude}}
                            destination={{latitude: destinationLocation.latitude, longitude: destinationLocation.longitude}}
                            apikey={'AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8'}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />

                    </MapView>
                    <View style={{flex: 2,margin:10}}>
                        {/*<Button title='Back' onPress={()=>{setScreen('2')}}/>*/}
                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#114953",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{setScreen('2');setShow('0');}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    {show === '2' && (
                        <View
                            style={{
                                // width:'90%',
                                backgroundColor: '#fff',
                                padding: 5,
                                // marginLeft:20,
                                // marginRight:20,
                                marginHorizontal:10,
                                marginVertical: 10,
                                borderRadius: 20
                            }}
                        >
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={endLocation}
                                onChangeText={text => setEndLocation(text)}
                                placeholderTextColor='gray'
                                placeholder="Destination Location Name"
                                style={{ backgroundColor: '#fff', paddingHorizontal: 20 ,color:'black'}}
                            />
                        </View>
                    )}

                    {show === '1' && (
                    <GooglePlacesAutocomplete

                        placeholder="Search"
                        fetchDetails={true}
                        textInputProps={{
                            placeholderTextColor: 'gray',
                        }}
                        GooglePlacesSearchQuery={{
                            rankby: "distance"
                        }}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details)
                            console.log(data.description)
                            setEndLocation(data.description)

                            setDestinationLocation({
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421
                            })
                        }}
                        query={{
                            key: "AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8",
                            language: "en",
                            components: "country:lk",
                            types: "establishment",
                            radius: 30000,
                            location: `${destinationLocation.latitude}, ${destinationLocation.longitude}`
                        }}
                        styles={{
                            container: { flex: 0, position: "absolute", width: "95%", zIndex: 1,margin:10, marginTop:55, color:'black',textColor: 'black' },
                            listView: { backgroundColor: "black",textColor:'black',color: '#5d5d5d'},
                            separator: {
                                height: 0.5,
                                backgroundColor: 'black',textColor:'black',color: '#5d5d5d'
                            },
                            textInput: {
                                height: 38,
                                color: '#5d5d5d',
                                fontSize: 16,
                            },
                            textInputContainer: {
                                flexDirection: 'row',textColor:'black',color: '#5d5d5d'
                            },


                            poweredContainer: {
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                borderBottomRightRadius: 5,
                                borderBottomLeftRadius: 5,
                                borderColor: '#c8c7cc',
                                borderTopWidth: 0.5,
                            },
                            powered: {textColor:'black',color: '#5d5d5d'},

                            row: {
                                backgroundColor: '#FFFFFF',
                                padding: 13,
                                height: 44,
                                flexDirection: 'row',textColor:'black',color: '#5d5d5d'
                            },

                            description: {textColor:'black',color: '#5d5d5d'},
                            loader: {
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                height: 20,
                            },
                        }}
                    />

                    )}

                    {/*<View style={{margin:5}}>*/}
                    {/*    <Button*/}
                    {/*        title="Change Origin Location"*/}
                    {/*        onPress={() => {*/}
                    {/*            setOriginVisible(true);*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</View>*/}


                    {show === '0' && (

                        <View style={{margin:10,backgroundColor:'gray',padding:10,borderRadius:10}}>
                            <Text style={{color:'white',fontWeight:'bold'}}>Destination Location:</Text>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flex:6, marginRight:5}}>

                                    <TouchableOpacity
                                        style={{
                                            height:42,
                                            backgroundColor: "#05afa1",
                                            borderRadius:20,
                                            padding:10
                                        }}
                                        onPress={()=>{setShow('1')}}
                                    >
                                        <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Search</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{flex:1,justifyContent:'center'}}>
                                    <Text style={{fontWeight:"bold"}}>OR</Text>
                                </View>
                                <View style={{flex:6,marginLeft:5}}>

                                    <TouchableOpacity
                                        style={{
                                            height:42,
                                            backgroundColor: "#7736d9",
                                            borderRadius:20,
                                            padding:10
                                        }}
                                        onPress={()=>{setShow('2')}}
                                    >
                                        <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Custom</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}

                    {show !== '0' && (
                    <View style={{margin:10}}>
                        {/*<Button color='green' title='Submit' onPress={()=>{navigation.navigate('Rider'); set();}}/>*/}

                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#2b1153",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{
                                if(originText && neededSeats && contactNumber && startLocation && endLocation){
                                    navigation.navigate('Rider'); set();
                                }else {
                                    if(!originText){
                                        alert('Please input origin date and time')
                                    }else if(!neededSeats){
                                        alert('Please input needed seats')
                                    }else if(!contactNumber){
                                        alert('Please input contact number')
                                    }else if(!startLocation){
                                        alert('Please input start location')
                                    }else if(!endLocation){
                                        alert('Please input destination')
                                    }
                                    // alert('Please input the all details')
                                }

                            }}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                    )}

                </>

            )}

            {screen === '4' && (
                <>
                    <View style={{flex:11}}>
                        {/*<Spinner visible={isLoading} />*/}


                        {isLoading ? <Text style={{color:'black'}}>Loading...</Text> :(
                            <>
                                <View style={{margin:10 }}>
                                    {/*<Button title='Back' onPress={()=>{setScreen('1')}}/>*/}
                                    <TouchableOpacity
                                        style={{
                                            height:42,
                                            backgroundColor: "#114953",
                                            borderRadius:20,
                                            padding:10
                                        }}
                                        onPress={()=>{setScreen('1');setShow('0');}}
                                    >
                                        <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Back</Text>
                                    </TouchableOpacity>
                                </View>
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

                            </>
                        )}

                    </View>
                </>
            )}
            {screen === '5' && (
                <>
                    <MapView
                        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        initialRegion={{
                            latitude: destinationLocation.latitude,
                            longitude: destinationLocation.longitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}

                        // showsUserLocation={true}
                    >

                        <Marker
                            coordinate={{
                                latitude: originLocation.latitude,
                                longitude: originLocation.longitude,
                            }}
                            title="Origin"
                            description="Origin location"
                        />
                        <Circle center={originLocation} radius={1000} />
                        <Marker
                            coordinate={{
                                latitude: destinationLocation.latitude,
                                longitude: destinationLocation.longitude,
                            }}
                            title="Destination"
                            description="Destination location"
                        />
                        <Circle center={destinationLocation} radius={1000} />
                        <MapViewDirections
                            origin={{latitude: originLocation.latitude, longitude: originLocation.longitude}}
                            destination={{latitude: destinationLocation.latitude, longitude: destinationLocation.longitude}}
                            apikey={'AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8'}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />

                    </MapView>


                    <View style={{flex: 2,margin:10}}>
                        {/*<Button title='Back' onPress={()=>{setScreen('4')}}/>*/}
                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#114953",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{setScreen('4');setShow('0');}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    {/*<View style={{margin:5}}>*/}
                    {/*    <Button*/}
                    {/*        title="Change Origin Location"*/}
                    {/*        onPress={() => {*/}
                    {/*            setOriginVisible(true);*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</View>*/}

                    {/*{show !== '0' && (*/}
                    <View style={{margin:10}}>
                        {/*<Button color='green' title='Submit' onPress={()=>{navigation.navigate('Rider'); set();}}/>*/}

                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#2b1153",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{
                                if(originText && neededSeats && contactNumber && startLocation && endLocation){
                                    navigation.navigate('Rider'); set();
                                }else {
                                    if(!originText){
                                        alert('Please input origin date and time')
                                    }else if(!neededSeats){
                                        alert('Please input needed seats')
                                    }else if(!contactNumber){
                                        alert('Please input contact number')
                                    }else if(!startLocation){
                                        alert('Please input start location')
                                    }else if(!endLocation){
                                        alert('Please input destination')
                                    }
                                    // alert('Please input the all details')
                                }

                            }}
                            // onPress={()=>{navigation.navigate('Rider'); set();}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    {/*)}*/}

                </>

            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addADriveContainer: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    input: {
        color:'black',
        // margin: 10,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
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

export default AddARideScreen;
