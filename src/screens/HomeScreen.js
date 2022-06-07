import React, {useContext, useEffect, useState} from 'react';
import {Button, Platform, StyleSheet, Text, TextInput, View, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';
import {BASE_URL} from '../config';

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



function AddADriveScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    const [count, setCount] = useState(0);

    const [next, setNext] = useState(false);

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




            {!next && (
            <View style={{backgroundColor:'#87e7fa', width:"100%"}}>

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
                    <Button color='blue' title='Next' onPress={()=>{setNext(true)}}/>
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
            {next && (
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
                        <Button color='blue' title='Back' onPress={()=>{setNext(false)}}/>
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





// ===========================================================================











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
    const {userInfo, logout} = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);
    console.log(data);


    useEffect(() => {
        fetch(`${BASE_URL}/getDrives`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // useEffect(() => {
    //     // declare the async data fetching function
    //     const fetchData = async () => {
    //         // get the data from the api
    //         const data = await fetch(`${BASE_URL}/getDrives`);
    //         // convert the data to json
    //         const json = await data.json();
    //         // set state with the result
    //         setDrivesData(json);
    //         // console.log(json)
    //     }
    //
    //     // call the function
    //     fetchData()
    //         // make sure to catch any error
    //         .catch(console.error);
    //
    //     setInterval(function(){
    //         console.log(drivesData)
    //     },3000);
    //
    //     console.log('asd')
    // },[]);

    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item }) => (


        <TouchableOpacity
            // onPress={onPress}
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
                backgroundColor: "#e3b505",
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


            <Text style={{fontSize: 20, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.contactNumber}</Text>
            <Text style={{fontSize: 20, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.contactNumber}</Text>


        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
            />
        );
    };
    return (
        <View style={styles.container}>
            {/*<Spinner visible={isLoading} />*/}


            {isLoading ? <Text>Loading...</Text> :(
                <View>
                    <Text style={styles.welcome}>Loaded</Text>
                    <View style={{flex:7}}>
                        <SafeAreaView>

                            <FlatList
                                style={{height:"47%"}}
                                data={data}
                                renderItem={renderItem}
                                keyExtractor={(data) => data._id}
                                extraData={selectedId}
                            />

                        </SafeAreaView>
                    </View>
                </View>
                )}

        </View>
    );
};

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
    const {userInfo, isLoading, logout} = useContext(AuthContext);




    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome {userInfo.name} </Text>
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
