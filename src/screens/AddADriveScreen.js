import React, {useContext, useState} from 'react';
import {ActivityIndicator, Button, Platform, StyleSheet, Text, TextInput, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Dialog, {DialogButton, DialogContent, DialogFooter} from 'react-native-popup-dialog';


function AddADriveScreen({ navigation }) {
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
        setDestinationText('Origin Date : '+fDate + '\nOrigin Time :'+fTime);

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
    });

    const [destinationLocation, setDestinationLocation] = useState({
        latitude: 6.586622,
        longitude: 79.975817,
    });

    const addADrive = () => {
        fetch(`${BASE_URL}/drive`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                originDateTime: originText,
                originLongitude: originLocation.longitude,
                originLatitude: originLocation.latitude,

                destinationDateTime: destinationText,
                destinationLongitude: destinationLocation.longitude,
                destinationLatitude: destinationLocation.latitude,

                availableSeats: availableSeats,
                VehicleNumber: vehicleNumber,
                contactNumber: contactNumber,
                username: userInfo.name

            }),
        }).then(alert('Successfully Completed'));
        // if(contactNumber.length>0){
        //     alert('Successfully Completed')
        // }else {
        //     alert('Error')
        // }
    }
    return (
        <View style={styles.addADriveContainer}>
            {/*<Spinner visible={isLoading} />*/}




            {screen === '1' && (
                <View style={{width:"100%"}}>

                    <Text style={styles.welcome}>{originText}</Text>
                    <View style={{margin:5}}>
                        <Button color='#96d600' title='Origin Date' onPress={()=>showOriginMode('date')}/>
                    </View>
                    <View style={{margin:5}}>
                        <Button color='#96d600' title='Origin Time' onPress={()=>showOriginMode('time')}/>
                    </View>
                    <Text style={styles.welcome}>{destinationText}</Text>
                    <View style={{margin:5}}>
                        <Button color='#f2d307' title='Destination Date' onPress={()=>showDestinationMode('date')}/>
                    </View>
                    <View style={{margin:5}}>
                        <Button color='#f2d307' title='Destination Time' onPress={()=>showDestinationMode('time')}/>
                    </View>



                    <TextInput
                        style={styles.input}
                        value={availableSeats}
                        placeholder="Number of Seats"
                        onChangeText={text => setAvailableSeats(text)}
                    />

                    <TextInput
                        style={styles.input}
                        value={vehicleNumber}
                        placeholder="Vehicle Number"
                        onChangeText={text => setVehicleNumber(text)}
                    />
                    <TextInput
                        style={styles.input}
                        value={contactNumber}
                        placeholder="Your contact Number"
                        onChangeText={text => setContactNumber(text)}
                    />


                    <View style={{margin:5}}>
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

                    </MapView>
                    <View style={{margin:5}}>
                        <Button title='Back' onPress={()=>{setScreen('1')}}/>
                    </View>

                    <View style={{margin:5}}>
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

                        <Marker
                            coordinate={{
                                latitude: destinationLocation.latitude,
                                longitude: destinationLocation.longitude,
                            }}
                            title="Destination"
                            description="Destination location"
                        />

                        <MapViewDirections
                            origin={{latitude: originLocation.latitude, longitude: originLocation.longitude}}
                            destination={{latitude: destinationLocation.latitude, longitude: destinationLocation.longitude}}
                            apikey={'AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8'}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />

                    </MapView>
                    <View style={{margin:5}}>
                        <Button color='blue' title='Back' onPress={()=>{setScreen('2')}}/>
                    </View>
                    <View style={{margin:5}}>
                        <Button
                            title="Change Origin Location"
                            onPress={() => {
                                setOriginVisible(true);
                            }}
                        />
                    </View>
                    <View style={{margin:5}}>
                        <Button color='green' title='Submit' onPress={()=>{navigation.navigate('Your Drives'); addADrive();}}/>
                    </View>
                    <Dialog
                        width={400}
                        height={400}
                        visible={originVisible}
                        onTouchOutside={() => {
                            setOriginVisible(false);
                        }}
                    >
                        <DialogFooter>
                            <DialogButton
                                text="OK"
                                onPress={() => {
                                    setOriginVisible(false);
                                }}
                            />
                        </DialogFooter>
                        <DialogContent>
                            <MapView
                                // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                style={{width:"100%",height:'100%'}}

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

                            </MapView>
                        </DialogContent>
                    </Dialog>


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
        marginBottom: 12,
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

export default AddADriveScreen;
