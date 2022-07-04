import React, {useContext, useState} from 'react';
import {Text, View,Button} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AppNavigation from './AppNavigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {userInfo, splashLoading} = useContext(AuthContext);

    // const [show, setShow] = useState(true)
    //
    // if (show){
    //     return (
    //         <Button title='Ishan' onPress={setShow(false)}/>
    //     )
    // }else {


    return (
        <NavigationContainer>
            <Stack.Navigator>
                {splashLoading ? (
                    <Stack.Screen
                        name="Splash Screen"
                        component={SplashScreen}
                        options={{headerShown: false}}
                    />
                ) : userInfo.message ==="User created successfully" || userInfo.message ==="logged in successfully" ? (
                    <Stack.Screen name="AppNavigation" component={AppNavigation} options={{headerShown: false}}/>
                ) : (
                    <>
                        <Stack.Screen
                            name="OnboardingScreen"
                            component={OnboardingScreen}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{headerShown: false}}
                        />


                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                            options={{headerShown: false}}
                        />
                        <Stack.Screen
                            name="Forgot Password"
                            component={ForgotPasswordScreen}
                            options={{headerShown: false}}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
    // }
};

export default Navigation;
