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

function AddAFavoriteRouteScreen({ navigation }) {
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

    const [availableSeats, setAvailableSeats] = useState(null);
    const [vehicleNumber, setVehicleNumber] = useState(null);
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
        fetch(`${BASE_URL}/addAFavoriteRoute`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                originLongitude: originLocation.longitude,
                originLatitude: originLocation.latitude,

                destinationLongitude: destinationLocation.longitude,
                destinationLatitude: destinationLocation.latitude,

                routeName:routeName,
                email:userInfo.email,

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

    const [routeName, setRouteName] = useState(null)
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
                                container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                                listView: { backgroundColor: "white" }
                            }}
                        />
                        {/*<Button title='Back' onPress={()=>{setScreen('1')}}/>*/}
                    </View>

                    <View style={{margin:10}}>
                        <Button color='blue' title='Next' onPress={()=>{setScreen('2')}}/>
                    </View>


                </>
            )}
            {screen === '2' && (
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
                        <Button title='Back' onPress={()=>{setScreen('1')}}/>
                    </View>
                    {/*<View style={{margin:5}}>*/}
                    {/*    <Button*/}
                    {/*        title="Change Origin Location"*/}
                    {/*        onPress={() => {*/}
                    {/*            setOriginVisible(true);*/}
                    {/*        }}*/}
                    {/*    />*/}
                    {/*</View>*/}
                    <TextInput
                        style={{margin:10,backgroundColor:'yellow'}}
                        value={routeName}
                        placeholder="Route Name"
                        onChangeText={text => setRouteName(text)}
                    />
                    <View style={{margin:10}}>
                        <Button color='green' title='Submit' onPress={()=>{navigation.navigate('Settings Screen'); addADrive();}}/>
                    </View>
                    {/*<Dialog*/}
                    {/*    width={400}*/}
                    {/*    height={400}*/}
                    {/*    visible={originVisible}*/}
                    {/*    onTouchOutside={() => {*/}
                    {/*        setOriginVisible(false);*/}
                    {/*    }}*/}
                    {/*>*/}
                    {/*    <DialogFooter>*/}
                    {/*        <DialogButton*/}
                    {/*            text="OK"*/}
                    {/*            onPress={() => {*/}
                    {/*                setOriginVisible(false);*/}
                    {/*            }}*/}
                    {/*        />*/}
                    {/*    </DialogFooter>*/}
                    {/*    <DialogContent>*/}
                    {/*        <MapView*/}
                    {/*            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps*/}
                    {/*            style={{width:"100%",height:'100%'}}*/}

                    {/*            initialRegion={{*/}
                    {/*                latitude: originLocation.latitude,*/}
                    {/*                longitude: originLocation.longitude,*/}
                    {/*                latitudeDelta: 0.0922,*/}
                    {/*                longitudeDelta: 0.0421,*/}
                    {/*            }}*/}
                    {/*            onRegionChange={region => {*/}
                    {/*                setOriginLocation({*/}
                    {/*                    latitude: region.latitude,*/}
                    {/*                    longitude: region.longitude,*/}
                    {/*                });*/}
                    {/*            }}*/}
                    {/*            onRegionChangeComplete={region => {*/}
                    {/*                setOriginLocation({*/}
                    {/*                    latitude: region.latitude,*/}
                    {/*                    longitude: region.longitude,*/}
                    {/*                });*/}
                    {/*            }}*/}
                    {/*        >*/}
                    {/*            <Marker*/}
                    {/*                coordinate={{*/}
                    {/*                    latitude: originLocation.latitude,*/}
                    {/*                    longitude: originLocation.longitude,*/}
                    {/*                }}*/}
                    {/*                title="Origin"*/}
                    {/*                description="Origin location"*/}
                    {/*            />*/}

                    {/*        </MapView>*/}
                    {/*    </DialogContent>*/}
                    {/*</Dialog>*/}


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

export default AddAFavoriteRouteScreen;
