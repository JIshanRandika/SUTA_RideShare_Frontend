import React, {useContext, useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';


import RiderScreen from '../screens/RiderScreen';
import DriverScreen from '../screens/DriverScreen';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import YourRidesScreen from '../screens/YourRidesScreen';
import AvailableRidesScreen from '../screens/AvailableRidesScreen';
import YourDrivesScreen from '../screens/YourDrivesScreen';
import AvailableVehiclesScreen from '../screens/AvailableVehiclesScreen';
import AddADriveScreen from '../screens/AddADriveScreen';
import YourRequestToDriversScreen from '../screens/YourRequestToDriversScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

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




const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
            <HomeStack.Screen name="Details" component={DetailsScreen} />
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
        </RiderStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
    return (
            <Tab.Navigator>
                <Tab.Screen name="Rider" component={RiderStackScreen} />
                <Tab.Screen name="Home" component={HomeStackScreen} />
                <Tab.Screen name="Driver" component={DriverStackScreen} />
            </Tab.Navigator>
    );
}
