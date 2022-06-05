import React, {useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

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

function AddADriveScreen() {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={styles.addADriveContainer}>
            {/*<Spinner visible={isLoading} />*/}
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 6.586622,
                    longitude: 79.975817,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
            <View style={{backgroundColor:'green', width:"100%"}}>
                <Text style={styles.welcome}>Add a Drive Screen</Text>
            </View>

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
