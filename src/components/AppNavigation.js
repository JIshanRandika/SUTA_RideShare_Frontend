import React, {useContext, useEffect, useState} from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

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
import FavoriteRoutesScreen from '../screens/FavoriteRoutesScreen';
import AddAFavoriteRouteScreen from '../screens/AddAFavoriteRouteScreen';
import YourVehiclesScreen from '../screens/YourVehiclesScreen';
import AddAVehicleScreen from '../screens/AddAVehicleScreen';
import AboutScreen from '../screens/AboutScreen';

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
            <HomeStack.Screen name="Settings" component={SettingsScreen} />
            <HomeStack.Screen name="About" component={AboutScreen} />
            <HomeStack.Screen name="Favorite Routes" component={FavoriteRoutesScreen} />
            <HomeStack.Screen name="Add A Favorite Routes" component={AddAFavoriteRouteScreen} />
            <HomeStack.Screen name="Your Vehicles" component={YourVehiclesScreen} />
            <HomeStack.Screen name="Add A Vehicle" component={AddAVehicleScreen} />
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
        // <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3 }} />
            <Tab.Navigator initialRouteName="Home"
                           // screenOptions={({ route }) => ({
                           //     tabBarIcon: ({ focused, color, size }) => {
                           //         let iconName = "rocket";
                           //
                           //         if (route.name === 'Rider') {
                           //             iconName = focused
                           //                 ? 'ios-information-circle'
                           //                 : 'ios-information-circle-outline';
                           //         } else if (route.name === 'Settings') {
                           //             iconName = focused ? 'ios-list-box' : 'ios-list';
                           //         }

                                   // You can return any component that you like here!
                                   // return <Ionicons name="rocket" size={size} color={color} />;
                               // },
                               // tabBarActiveTintColor: 'tomato',
                               // tabBarInactiveTintColor: 'gray',
                           // })}
            >
                <Tab.Screen name="Rider"
                            component={RiderStackScreen}
                            options={{
                                tabBarIcon:() =>(
                                    <Ionicons name="directions-walk" size={30} color="#114953" />
                                ),


                            }}
                />
                <Tab.Screen name="Home" component={HomeStackScreen}
                            options={{
                                tabBarIcon:() =>(
                                    <Ionicons name="home" size={30} color="#2b1153"/>
                                ),}}
                />
                <Tab.Screen name="Driver" component={DriverStackScreen}
                            options={{
                                tabBarIcon:() =>(
                                    <Ionicons name="directions-car" size={30} color="#114953" />
                                ),


                            }}
                />
            </Tab.Navigator>
    );
}

