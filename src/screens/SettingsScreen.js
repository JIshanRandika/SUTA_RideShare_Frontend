import React, {useContext} from 'react';
import {ActivityIndicator, Button, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';
// import Token from './Token';

function SettingsScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={{ flex: 1,width:'100%' }}>
            {/*<Token/>*/}
            {/*<Spinner visible={isLoading} />*/}
            {/*<Text style={styles.welcome}>Welcome {userInfo.message}</Text>*/}

            <View style={{margin:10}}>
                <Button
                    title="Logout"
                    color="red"
                    onPress={logout}
                />
            </View>
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

export default SettingsScreen;
