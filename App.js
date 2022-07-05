import React, {Component, useContext, useEffect, useState} from 'react';
import {Alert, StatusBar, Text, View, Button, StyleSheet} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import {AuthContext} from './src/context/AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {BASE_URL} from './src/config';

import Token from './src/screens/Token';

import OnboardingScreen from './src/screens/OnboardingScreen';
import OnboardingNavigation from './src/components/OnboardingNavigation';


import AppIntroSlider from 'react-native-app-intro-slider';




const App = () => {

    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then((value) => {
            if (value == null) {
                AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        }); // Add some error handling, also you can simply do setIsFirstLaunch(null)

    }, []);

    if (isFirstLaunch === null) {
        return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
    } else if (isFirstLaunch == true) {
        return (
            <AuthProvider>
                <Token/>
                <StatusBar backgroundColor="#4d4746" />
                <OnboardingNavigation/>
            </AuthProvider>
        )
    } else {
        return (
            <AuthProvider>
                <Token/>
                <StatusBar backgroundColor="#4d4746" />
                <Navigation/>
            </AuthProvider>
        )
    }

    // return (
    //     <AuthProvider>
    //         <Token/>
    //         <StatusBar backgroundColor="#4d4746" />
    //         <Navigation/>
    //     </AuthProvider>
    // );
};
export default App;



