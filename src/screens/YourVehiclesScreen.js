import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

function YourVehiclesScreen({ navigation }) {

    const {userInfo, logout} = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);
    console.log(data);

    useEffect(() => {



        fetch(`${BASE_URL}/yourVehicles`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                username: userInfo.name,
                email:userInfo.email

            }),
        })
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));



    }, []);







    const [originLongitude,setOriginLongitude] = useState(6.586622);
    const [originLatitude,setOriginLatitude] = useState(6.586622);
    const [destinationLongitude,setDestinationLongitude] = useState(6.586622);
    const [destinationLatitude,setDestinationLatitude] = useState(6.586622);

    const [screen,setScreen] = useState('1');


    // ================================

    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item }) => (



        <TouchableOpacity

            style={{
                // flex: 1,
                marginTop:"3%",
                alignSelf: 'center',
                width: "90%",
                // height: 37,
                paddingLeft:10,
                paddingRight:10,
                paddingTop:10,
                paddingBottom:10,
                backgroundColor: "#ffffff",
                borderWidth:10,
                borderColor:"#2b1153",

                borderRadius:10,
                // shadowColor: "#0090ff",
                // shadowOffset: {
                //     width: 0,
                //     height: 5,
                // },
                // shadowOpacity: 0.34,
                // shadowRadius: 6.27,
                //
                // elevation: 10,
            }}

        >


            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Title : {item.title}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Type : {item.type}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Vehicle Number : {item.vehicleNumber}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Available Seats : {item.availableSeats}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Contact Number : {item.contactNumber}</Text>


        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
            />
        );
    };


    // ================================

    // ==========request=======


    const updateStatus = (status,_id,userToken) => {




        fetch(`${BASE_URL}/updateRiderToDriverRequests`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                status: status,
                _id:_id

            }),
        }).then(alert('Successfully Updated'));


        // ==========


    }

    // =====================
    return (

        <View style={{
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            // width:'100%'
        }}>

            {/*<Spinner visible={isLoading} />*/}
            {/*<Text style={styles.welcome}>Your Drives Screen</Text>*/}

                <>
                    <View style={{flex:1, margin:10}}>
                        {/*<Button*/}
                        {/*    color='orange'*/}
                        {/*    title="Add a Vehicle"*/}
                        {/*    onPress={() => navigation.navigate('Add A Vehicle Screen')}*/}
                        {/*/>*/}

                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#2b1153",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={() => navigation.navigate('Add A Vehicle Screen')}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Add a vehicle</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:11}}>
                        {/*<Spinner visible={isLoading} />*/}


                        {isLoading ? <Text>Loading...</Text> :(
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width:'100%'
                            }}>

                                {/*<Text style={{justifyContent:'center'}}>Loaded</Text>*/}
                                <View style={{width:'100%'}}>
                                    <SafeAreaView style={{width:'100%'}}>

                                        <FlatList
                                            style={{height:"90%", width:'100%'}}
                                            data={data.reverse()}
                                            renderItem={renderItem}
                                            keyExtractor={(data) => data._id}
                                            extraData={selectedId}
                                        />

                                    </SafeAreaView>
                                </View>
                            </View>
                        )}

                    </View>
                </>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        // height:'50%',
        ...StyleSheet.absoluteFillObject,
    },
    welcome: {
        fontSize: 18,
        marginBottom: 0,
    },
});

export default YourVehiclesScreen;



