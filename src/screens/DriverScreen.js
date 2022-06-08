import React from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';

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

export default DriverScreen;
