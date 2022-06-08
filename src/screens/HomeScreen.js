import React, {useContext} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import Spinner from 'react-native-loading-spinner-overlay';

function HomeScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome {userInfo.name} </Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
}

export default HomeScreen;
