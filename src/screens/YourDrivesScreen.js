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

function YourDrivesScreen({ navigation }) {

    const {userInfo, logout} = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);
    console.log(data);


    useEffect(() => {
        fetch(`${BASE_URL}/getDrives`)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    // useEffect(() => {
    //     // declare the async data fetching function
    //     const fetchData = async () => {
    //         // get the data from the api
    //         const data = await fetch(`${BASE_URL}/getDrives`);
    //         // convert the data to json
    //         const json = await data.json();
    //         // set state with the result
    //         setDrivesData(json);
    //         // console.log(json)
    //     }
    //
    //     // call the function
    //     fetchData()
    //         // make sure to catch any error
    //         .catch(console.error);
    //
    //     setInterval(function(){
    //         console.log(drivesData)
    //     },3000);
    //
    //     console.log('asd')
    // },[]);



    const [originLongitude,setOriginLongitude] = useState(6.586622);
    const [originLatitude,setOriginLatitude] = useState(6.586622);
    const [destinationLongitude,setDestinationLongitude] = useState(6.586622);
    const [destinationLatitude,setDestinationLatitude] = useState(6.586622);

    const [screen,setScreen] = useState('1');


    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item }) => (



        <TouchableOpacity
            onPress={()=>{{
                setOriginLatitude(item.originLatitude);
                setOriginLongitude(item.originLongitude);
                setDestinationLatitude(item.destinationLatitude)
                setDestinationLongitude(item.destinationLongitude)
                setScreen('2');
            }}
            }
            style={{
                // flex: 1,
                marginTop:"3%",
                alignSelf: 'center',
                width: "47%",
                // height: 37,
                paddingLeft:10,
                paddingRight:10,
                paddingTop:10,
                paddingBottom:10,
                backgroundColor: "#e3b505",
                borderRadius:10,
                shadowColor: "#0090ff",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,

                elevation: 10,
            }}

        >


            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.originDateTime}</Text>
            {/*<Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.contactNumber}</Text>*/}


        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
            />
        );
    };
    return (

        <View style={{
            flex: 1,
            // alignItems: 'center',
            // justifyContent: 'center',
            // width:'100%'
        }}>

            {/*<Spinner visible={isLoading} />*/}
            {/*<Text style={styles.welcome}>Your Drives Screen</Text>*/}
            {screen === '1' && (
                <>
            <View style={{margin:10}}>
                <Button

                    color='green'
                    title="Add a Drive"
                    onPress={() => navigation.navigate('Add a Drive')}
                />
            </View>

            <View style={styles.container}>
                {/*<Spinner visible={isLoading} />*/}


                {isLoading ? <Text>Loading...</Text> :(
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width:'100%'
                    }}>
                        <Text style={{justifyContent:'center'}}>Loaded</Text>
                        <View style={{width:'100%'}}>
                            <SafeAreaView style={{width:'100%'}}>

                                <FlatList
                                    style={{height:"90%", width:'100%'}}
                                    data={data}
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
                )}
            {screen === '2' && (
                <>

                <MapView
              // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}

              initialRegion={{
                  latitude: originLatitude,
                  longitude: originLongitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
              }}

          >


              <Marker coordinate={{latitude: originLatitude, longitude: originLongitude}}/>

                    <Circle center={{
                        latitude: originLatitude,
                        longitude: originLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421}} radius={500} />

                    <Marker coordinate={{latitude: destinationLatitude, longitude: destinationLongitude}}/>
                    <Circle center={{
                        latitude: destinationLatitude,
                        longitude: destinationLongitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421}} radius={500} />
              <MapViewDirections
                  origin={{latitude: originLatitude, longitude: originLongitude}}
                  destination={{latitude: destinationLatitude, longitude: destinationLongitude}}
                  apikey={'AIzaSyCT1sEzJHHoRDcScafHAebRp7tP_ZYc6p8'}
                  strokeWidth={3}
                  strokeColor="hotpink"
              />

          </MapView>
                <View style={{flex: 2,margin:10}}>
                    <Button title='Back' onPress={()=>{setScreen('1')}}/>
                </View>
                </>
            )}
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

export default YourDrivesScreen;
