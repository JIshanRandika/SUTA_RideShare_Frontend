import React, {useContext} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';

function YourRidesScreen() {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            {/*<Spinner visible={isLoading} />*/}
            <Text style={styles.welcome}>Your Rides Screen</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    welcome: {
        fontSize: 18,
        marginBottom: 0,
    },
});

export default YourRidesScreen;
