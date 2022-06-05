import React, {useContext, useEffect, useState} from 'react';
import {Button, Platform, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

//
// const HomeScreen = () => {
//     const {userInfo, isLoading, logout} = useContext(AuthContext);
//
//     return (
//         <View style={styles.container}>
//             {/*<Spinner visible={isLoading} />*/}
//             <Text style={styles.welcome}>Welcome {userInfo.message}</Text>
//             <Button title="Logout" color="red" onPress={logout} />
//         </View>
//     );
// };
//

// export default HomeScreen;

// import * as React from 'react';
// import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DatePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Dialog, { DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog';
// import Geolocation from '@react-native-community/geolocation';



function AddADriveScreen() {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    const [count, setCount] = useState(0);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState('F');
    const [text, setText] = useState('Empty');

    const [visible, setVisible] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS ==='android');
        setDate(currentDate);


        let tempDate = new Date (currentDate);
        let fDate = tempDate.getDate()+'/'+(tempDate.getMonth()+ 1)+'/'+tempDate.getFullYear();
        let fTime = 'Hours :'+tempDate.getHours()+'| Minutes' + tempDate.getMinutes();
        setShow('F');
        setText(fDate + '('+fTime+')' + show);

    }

    const showMode = (currentMode) => {
        setShow('T');
        setMode(currentMode);
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


    const [startLocation, setStartLocation] = useState({
        latitude: 6.586622,
        longitude: 79.975817,
    });

    const [destinationLocation, setDestinationLocation] = useState({
        latitude: 6.586622,
        longitude: 79.975817,
    });

    return (
        <View style={styles.addADriveContainer}>
            {/*<Spinner visible={isLoading} />*/}


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
                        latitude: startLocation.latitude,
                        longitude: startLocation.longitude,
                    }}
                    title="Start"
                    description="Start location"
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
                    origin={{latitude: startLocation.latitude, longitude: startLocation.longitude}}
                    destination={{latitude: destinationLocation.latitude, longitude: destinationLocation.longitude}}
                    apikey={'AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8'}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />

            </MapView>


            <View style={{backgroundColor:'green', width:"100%"}}>

                <Text style={styles.welcome}>{text}</Text>
                <View style={{margin:20}}>
                    <Button title='DatePicker' onPress={()=>showMode('date')}/>
                </View>
                <View style={{margin:20}}>
                    <Button title='TimePicker' onPress={()=>showMode('time')}/>
                </View>

                <Button
                    title="Show Dialog"
                    onPress={() => {
                        setVisible(true);
                    }}
                />

                <Dialog
                    width={400}
                    height={400}
                    visible={visible}
                    onTouchOutside={() => {
                        setVisible(false);
                    }}
                >
                    <DialogFooter>
                        <DialogButton
                            text="OK"
                            onPress={() => {
                                setVisible(false);
                            }}
                        />
                    </DialogFooter>
                    <DialogContent>
                        <MapView
                            // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={{width:"100%",height:'100%'}}

                            initialRegion={{
                                latitude: startLocation.latitude,
                                longitude: startLocation.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onRegionChange={region => {
                                setStartLocation({
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                });
                            }}
                            onRegionChangeComplete={region => {
                                setStartLocation({
                                    latitude: region.latitude,
                                    longitude: region.longitude,
                                });
                            }}
                        >
                            <Marker
                                coordinate={{
                                    latitude: startLocation.latitude,
                                    longitude: startLocation.longitude,
                                }}
                                title="Start"
                                description="Start location"
                            />

                        </MapView>
                    </DialogContent>
                </Dialog>

                {show ==='T' && (
                    <RNDateTimePicker
                        testID = 'dateTimePicker'
                        value = {date}
                        mode = {mode}
                        in24Hour={true}
                        display='default'
                        onChange = {onChange}
                    />
                )}
            </View>


        </View>
    );
}


function DetailsScreen() {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {/*<Spinner visible={isLoading} />*/}
            <Text style={styles.welcome}>Welcome {userInfo.message}</Text>
            <Button title="Logout" color="red" onPress={logout} />
        </View>
    );
}

function AvailableVehiclesScreen() {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {/*<Spinner visible={isLoading} />*/}
            <Text style={styles.welcome}>Available Vehicles Screen</Text>
        </View>
    );
}

function YourRidesScreen() {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {/*<Spinner visible={isLoading} />*/}
            <Text style={styles.welcome}>Your Rides Screen</Text>
        </View>
    );
}

function YourDrivesScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {/*<Spinner visible={isLoading} />*/}
            <Text style={styles.welcome}>Your Drives Screen</Text>
            <Button
                color='green'
                title="Add a Drive"
                onPress={() => navigation.navigate('Add a Drive')}
            />
        </View>
    );
}






function AvailableRidesScreen() {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {/*<Spinner visible={isLoading} />*/}
            <Text style={styles.welcome}>Available Rides Screen</Text>
        </View>
    );
}



function DriverScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Driver screen</Text>
            <Button
                color='green'
                title="Your Drives"
                onPress={() => navigation.navigate('Your Drives')}
            />
            <Button
                title="Available Rides"
                onPress={() => navigation.navigate('Available Rides')}
            />

        </View>
    );
}
const DriverStack = createNativeStackNavigator();

function DriverStackScreen() {
    return (
        <DriverStack.Navigator>
            <DriverStack.Screen name="Driver" component={DriverScreen} options={{headerShown: false}}/>
            <DriverStack.Screen name="Your Drives" component={YourDrivesScreen} />
            <DriverStack.Screen name="Available Rides" component={AvailableRidesScreen} />
            <DriverStack.Screen name="Add a Drive" component={AddADriveScreen} />
        </DriverStack.Navigator>
    );
}

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <HomeStack.Screen name="Details" component={DetailsScreen} />
        </HomeStack.Navigator>
    );
}

function RiderScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Rider screen</Text>
            <Button
                title="Available Vehicles"
                onPress={() => navigation.navigate('Available Vehicles')}
            />

            <Button
                color='blue'
                title="Your Rides"
                onPress={() => navigation.navigate('Your Rides')}
            />
        </View>
    );
}



const RiderStack = createNativeStackNavigator();

function RiderStackScreen() {
    return (
        <RiderStack.Navigator>
            <RiderStack.Screen name="Rider" component={RiderScreen} options={{headerShown: false}}/>
            <RiderStack.Screen name="Available Vehicles" component={AvailableVehiclesScreen} />
            <RiderStack.Screen name="Your Rides" component={YourRidesScreen} />
        </RiderStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        // <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Rider" component={RiderStackScreen} />
                <Tab.Screen name="Home" component={HomeStackScreen} />
                <Tab.Screen name="Driver" component={DriverStackScreen} />
            </Tab.Navigator>
        // </NavigationContainer>
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
    map: {
        // height:500,
        ...StyleSheet.absoluteFillObject,
    },
    welcome: {
        fontSize: 18,
        marginBottom: 0,
    },
});
