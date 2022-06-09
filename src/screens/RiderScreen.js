import React from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';

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

            <Button
                color='green'
                title="Your Request To Drivers"
                onPress={() => navigation.navigate('Your Request To Drivers')}
            />
        </View>
    );
}
export default RiderScreen;
