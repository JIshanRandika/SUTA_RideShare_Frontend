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
    const [isRequestLoading, setRequestLoading] = useState(true);

    const [data, setData] = useState([]);
    const [requestData, setRequestData] = useState([]);
    console.log(data);

    useEffect(() => {

        // fetch(`${BASE_URL}/getRiderToDriverRequests`)
        //     .then((response) => response.json())
        //     .then((json) => setRequestData(json))
        //     .catch((error) => console.error(error))
        //     .finally(() => setRequestLoading(false));


        // fetch(`${BASE_URL}/driverReceivedRequestsForEach`,{
        //     method:'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         username: userInfo.name,
        //         email:userInfo.email,
        //         originDateTime:originDateTime
        //
        //     }),
        // })
        //     .then((response) => response.json())
        //     .then((json) => setRequestData(json))
        //     .catch((error) => console.error(error))
        //     .finally(() => setRequestLoading(false));



        // fetch(`${BASE_URL}/getDrives`)
        //     .then((response) => response.json())
        //     .then((json) => setData(json))
        //     .catch((error) => console.error(error))
        //     .finally(() => setLoading(false));




        fetch(`${BASE_URL}/yourDrives`,{
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


        // fetch(`${BASE_URL}/yourDrives`,{
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         username: userInfo.name,
        //         email:userInfo.email
        //     })
        // })
        //     .then((response) => response.json())
        //     .then((json) => setData(json))
        //     .catch((error) => console.error(error))
        //     .finally(() => setLoading(false));

        // .then(data => this.setState({orderData: data}))
        // .then(data =>console.log(this.state.orderData))



    }, []);



    // useEffect(() => {
    //     fetch(`${BASE_URL}/yourDrives`,{
    //         method:'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             username: userInfo.name,
    //             email:userInfo.email
    //
    //         }),
    //     })
    //         .then(response => response.json())
    //         .then(data => console.log(data))
    //         .catch((error) => console.error(error))
    //         .finally(() => setLoading(false));
    //
    //
    // }, []);

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


    const getDriverReceivedRequestsForEach = (originDateTime) => {
        fetch(`${BASE_URL}/driverReceivedRequestsForEach`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userInfo.name,
                email:userInfo.email,
                originDateTime:originDateTime

            }),
        })
            .then((response) => response.json())
            .then((json) => setRequestData(json))
            .catch((error) => console.error(error))
            .finally(() => setRequestLoading(false));
    }



    const [originDateTime,setOriginDateTime] = useState('null')

    const [originLongitude,setOriginLongitude] = useState(6.586622);
    const [originLatitude,setOriginLatitude] = useState(6.586622);
    const [destinationLongitude,setDestinationLongitude] = useState(6.586622);
    const [destinationLatitude,setDestinationLatitude] = useState(6.586622);

    const [screen,setScreen] = useState('1');

    const [userToken,setUserToken] = useState('');

    // ================================

    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item }) => (



        <TouchableOpacity
            onPress={()=>{{
                setOriginLatitude(item.originLatitude);
                setOriginLongitude(item.originLongitude);
                setDestinationLatitude(item.destinationLatitude)
                setDestinationLongitude(item.destinationLongitude)
                setOriginDateTime(item.originDateTime);
                setScreen('2');
                // setUserToken(item.userToken);
                getDriverReceivedRequestsForEach(item.originDateTime);

            }}
            }
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
                backgroundColor: "#6ac131",
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


            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>{item.originDateTime}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Available Seats: {item.availableSeats}</Text>
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

        fetch(`${BASE_URL}/notification/send`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                to: userToken,
                notificationTitle: 'SUTA RideShare',
                notificationBody: `Your Request ${status} by ${userInfo.name}`,

            }),
        });




    }
    const [selectedRequestId, setSelectedRequestId] = useState(null);
    const ItemRequest = ({ item }) => (




        <View

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
                backgroundColor: item.status ==="Accepted"? "#107e7d" : item.status ==="Rejected"? "#d5573b" : "#46bd89",
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



            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Rider Name: {item.riderName}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>{item.originDateTime}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Needed Seats: {item.neededSeats}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Status: {item.status}</Text>

            {item.status === 'Pending Request' && (
                <>
                    <View style={{margin:10}}>
                        <Button color='green' title='Accept' onPress={()=>{updateStatus('Accepted',item._id,item.userToken);navigation.navigate('Driver')}}/>
                    </View>
                    <View style={{margin:10}}>
                        <Button color='red' title='Reject' onPress={()=>{updateStatus('Rejected',item._id,item.userToken);navigation.navigate('Driver')}}/>
                    </View>
                </>
            )}
            {/*<View style={{margin:10}}>*/}
            {/*    <Button title='Reject' onPress={()=>{setScreen('2')}}/>*/}
            {/*</View>*/}

            {/*<Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.contactNumber}</Text>*/}


        </View>
    );
    const renderRequestItem = ({ item }) => {
        // setUserToken(item.userToken)
        // console.log('HI')
        // console.log(item.userToken)
        return (
            <ItemRequest
                item={item}
            />
        );
    };

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
            {screen === '1' && (
                <>
            <View style={{flex:1, margin:10}}>
                <Button

                    color='green'
                    title="Add a Drive"
                    onPress={() => navigation.navigate('Add a Drive')}
                />
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
                    <View style={{margin:10}}>
                        <Button color='orange' title='Received Requests' onPress={()=>{setScreen('3')}}/>
                    </View>
                </>
            )}
            {screen === '3' && (
                <>
                    <View style={{margin:10}}>
                        <Button title='Back' onPress={()=>{setScreen('2')}}/>
                    </View>
                    <View style={styles.container}>
                        {/*<Spinner visible={isLoading} />*/}


                        {isRequestLoading ? <Text>Loading Requests...</Text> :(
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
                                            style={{height:"100%", width:'100%'}}
                                            data={requestData}
                                            renderItem={renderRequestItem}
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
