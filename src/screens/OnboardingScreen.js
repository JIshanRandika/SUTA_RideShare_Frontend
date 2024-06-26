import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgb(43,17,83)' : 'rgb(17,73,83)';

    return (
        <View
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                {
                    backgroundColor: '#ffffff',
                    image: <Image  source={require('../assets/logo.png')} />,
                    title: 'Welcome To SL RideShare',
                    subtitle: 'Share your rides with others',
                },
                {
                    backgroundColor: '#9cf3ff',
                    image: <Image source={require('../assets/fuel.png')} />,
                    title: 'Reduce Fuel Consumption',
                    // subtitle: 'Share Your Thoughts With Similar Kind of People',
                },
                {
                    backgroundColor: '#b1b1b1',
                    image: <Image source={require('../assets/traffic.png')} />,
                    title: 'Let\'s reduce the traffic',
                    // subtitle: "Let The Spot Light Capture You",
                },
            ]}
        />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
