import React, {useContext, useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';


import RiderScreen from '../screens/RiderScreen';
import DriverScreen from '../screens/DriverScreen';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import YourRidesScreen from '../screens/YourRidesScreen';
import AvailableRidesScreen from '../screens/AvailableRidesScreen';
import YourDrivesScreen from '../screens/YourDrivesScreen';
import AvailableVehiclesScreen from '../screens/AvailableVehiclesScreen';
import AddADriveScreen from '../screens/AddADriveScreen';
import YourRequestToDriversScreen from '../screens/YourRequestToDriversScreen';
import AddARideScreen from '../screens/AddARideScreen';
import YourRequestToRidersScreen from '../screens/YourRequestToRidersScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const DriverStack = createNativeStackNavigator();

function DriverStackScreen() {
    return (
        <DriverStack.Navigator>
            <DriverStack.Screen name="Driver" component={DriverScreen} options={{headerShown: false}}/>
            <DriverStack.Screen name="Your Drives" component={YourDrivesScreen} />
            <DriverStack.Screen name="Available Rides" component={AvailableRidesScreen} />
            <DriverStack.Screen name="Your Request To Riders" component={YourRequestToRidersScreen} />
            <DriverStack.Screen name="Add a Drive" component={AddADriveScreen} />
        </DriverStack.Navigator>
    );
}




const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <HomeStack.Screen name="Settings Screen" component={SettingsScreen} />
        </HomeStack.Navigator>
    );
}


const RiderStack = createNativeStackNavigator();

function RiderStackScreen() {
    return (
        <RiderStack.Navigator>
            <RiderStack.Screen name="Rider" component={RiderScreen} options={{headerShown: false}}/>
            <RiderStack.Screen name="Available Vehicles" component={AvailableVehiclesScreen} />
            <RiderStack.Screen name="Your Rides" component={YourRidesScreen} />
            <RiderStack.Screen name="Your Request To Drivers" component={YourRequestToDriversScreen} />
            <RiderStack.Screen name="Add a Ride" component={AddARideScreen} />
        </RiderStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
    return (
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen name="Rider" component={RiderStackScreen} />
                <Tab.Screen name="Home" component={HomeStackScreen} />
                <Tab.Screen name="Driver" component={DriverStackScreen} />
            </Tab.Navigator>
    );
}

