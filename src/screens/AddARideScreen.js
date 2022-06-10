import React, {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Button, Platform, StyleSheet, Text, TextInput, View, SafeAreaView,ScrollView} from 'react-native';
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
    const [originText, setOriginText] = useState('Select The Origin Date and Time');

    const [originVisible, setOriginVisible] = useState(false);

    const [destinationDate, setDestinationDate] = useState(new Date());
    const [destinationMode, setDestinationMode] = useState('date');
    const [destinationShow, setDestinationShow] = useState('F');
    const [destinationText, setDestinationText] = useState('Select The Destination Date and Time');

    const [neededSeats, setNeededSeats] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);


    const onOriginChange = (event, selectedDate) => {
        const currentOriginDate = selectedDate || originDate;
        setOriginShow(Platform.OS ==='android');
        setOriginDate(currentOriginDate);


        let tempOriginDate = new Date (currentOriginDate);
        let fDate = tempOriginDate.getDate()+'/'+(tempOriginDate.getMonth()+ 1)+'/'+tempOriginDate.getFullYear();
        let fTime = 'Hours :'+tempOriginDate.getHours()+'| Minutes' + tempOriginDate.getMinutes();
        setOriginShow('F');
        setOriginText('Origin Date : '+fDate + '\nOrigin Time :'+fTime);

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

    const addADrive = () => {
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
                email:userInfo.email

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

    useEffect(() => {
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

    return (
        <View style={styles.addADriveContainer}>
            {/*<Spinner visible={isLoading} />*/}




            {screen === '1' && (
                <SafeAreaView style={{width:'100%',flex:1}}>
                    <ScrollView>
                        <View style={{width:"100%", flex:1}}>

                            <View style={{margin:10, flex:1}}>
                                <Button color='#f781d8' title='Origin Date' onPress={()=>showOriginMode('date')}/>
                            </View>
                            <View style={{margin:10, flex:1}}>
                                <Button color='#f781d8' title='Origin Time' onPress={()=>showOriginMode('time')}/>
                            </View>
                            <View style={{margin:10, flex:1}}>
                                <Text style={{fontSize:15}}>{originText}</Text>
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
                                    placeholder="Number of Seats"
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
                                    placeholder="Your contact Number"
                                    onChangeText={text => setContactNumber(text)}
                                />
                            </View>


                            <View style={{margin:10, flex:1}}>
                                <Button color='blue' title='Next' onPress={()=>{setScreen('2')}}/>
                            </View>



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

                    <GooglePlacesAutocomplete

                        placeholder="Search"
                        fetchDetails={true}
                        GooglePlacesSearchQuery={{
                            rankby: "distance"
                        }}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details)
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
                            container: { flex: 0, position: "absolute", width: "95%", zIndex: 1,margin:10, marginTop:55 },
                            listView: { backgroundColor: "white" }
                        }}
                    />

                    <View style={{flex: 2,margin:10 }}>
                        <Button title='Back' onPress={()=>{setScreen('1')}}/>
                    </View>

                    <View style={{margin:10}}>
                        <Button color='blue' title='Next' onPress={()=>{setScreen('3')}}/>
                    </View>


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

                    <GooglePlacesAutocomplete

                        placeholder="Search"
                        fetchDetails={true}
                        GooglePlacesSearchQuery={{
                            rankby: "distance"
                        }}
                        onPress={(data, details = null) => {
                            // 'details' is provided when fetchDetails = true
                            console.log(data, details)
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
                            container: { flex: 0, position: "absolute", width: "95%", zIndex: 1,margin:10, marginTop:55 },
                            listView: { backgroundColor: "white" }
                        }}
                    />

                    <View style={{flex: 2,margin:10}}>
                        <Button title='Back' onPress={()=>{setScreen('2')}}/>
                    </View>
                    {/*<View style={{margin:5}}>*/}
                    {/*    <Button*/}
                    {/*        title="Change Origin Location"*/}
                    {/*        onPress={() => {*/}
                    {/*            setOriginVisible(true);*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</View>*/}
                    <View style={{margin:10}}>
                        <Button color='green' title='Submit' onPress={()=>{navigation.navigate('Rider'); addADrive();}}/>
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
    addADriveContainer: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    input: {
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
