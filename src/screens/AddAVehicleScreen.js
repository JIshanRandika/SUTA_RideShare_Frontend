import React, {useContext, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    StyleSheet,
    Text,
    TextInput,
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
// import Token from './Token';

function SettingsScreen({ navigation }) {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    const [title, setTitle] = useState(null);
    const [type, setType] = useState(null);
    const [vehicleNumber, setVehicleNumber] = useState(null);
    const [availableSeats, setAvailableSeats] = useState(null);
    const [contactNumber, setContactNumber] = useState(null);


    const addAVehicle = () => {

        fetch(`${BASE_URL}/addAVehicle`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title: title,
                type: type,
                vehicleNumber: vehicleNumber,
                availableSeats: availableSeats,
                contactNumber: contactNumber,
                email:userInfo.email,
                groupID: userInfo.groupID,

            }),
        }).then(alert('Successfully Completed'));

    }

    return (
        <View style={{ flex: 1,width:'100%' }}>

            <SafeAreaView style={{width:'100%',flex:1}}>
                <ScrollView>
            {/*<Token/>*/}
            {/*<Spinner visible={isLoading} />*/}
            {/*<Text style={styles.welcome}>Welcome {userInfo.message}</Text>*/}
                    <TextInput
                        style={styles.input}
                        value={title}
                        placeholder="Title for vehicle"
                        onChangeText={text => setTitle(text)}
                    />
                    <TextInput
                        style={styles.input}
                        value={type}
                        placeholder="Type for vehicle"
                        onChangeText={text => setType(text)}
                    />
                    <TextInput
                        style={styles.input}
                        value={vehicleNumber}
                        placeholder="Vehicle Number"
                        onChangeText={text => setVehicleNumber(text)}
                    />
                    <TextInput
                        style={styles.input}
                        value={availableSeats}
                        placeholder="Available Seats"
                        keyboardType="numeric"
                        onChangeText={text => setAvailableSeats(text)}
                    />
                    <TextInput
                        style={styles.input}
                        value={contactNumber}
                        placeholder="Contact Number"
                        keyboardType="numeric"
                        onChangeText={text => setContactNumber(text)}
                    />

                </ScrollView>
            </SafeAreaView>

            <View style={{margin:10}}>
                {/*<Button color='green' title='Submit' onPress={()=>{navigation.navigate('Settings Screen');addAVehicle()}}/>*/}

                <TouchableOpacity
                    style={{
                        height:42,
                        backgroundColor: "#2b1153",
                        borderRadius:20,
                        padding:10
                    }}
                    onPress={()=>{navigation.navigate('Settings Screen');addAVehicle()}}
                >
                    <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Submit</Text>
                </TouchableOpacity>
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

    wrapper: {
        width: '80%',
    },
    input: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
    },
    welcome: {
        fontSize: 18,
        marginBottom: 0,
    },
});

export default SettingsScreen;
