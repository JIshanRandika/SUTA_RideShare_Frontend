import React, {useContext, useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Button,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

var FCM = require('fcm-node');


function AvailableRidesScreen({ navigation }) {
    const {userInfo, logout} = useContext(AuthContext);

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);
    const [fullData, setFullData] = useState([]);
    console.log(data);

    const [userData, setUserData] = useState(null);

    const set = () => {
        userData.map((items)=>{
            console.log('Ishan')
            console.log(items.deviseToken)

            setUserToken(items.deviseToken)
        })
    }

    useEffect(() => {

        // ==========
        fetch(`${BASE_URL}/userToken`,{
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
            .then((json) => setUserData(json))
            .catch((error) => console.error(error))


        // fetch(`${BASE_URL}/getRides`)
        //     .then((response) => response.json())
        //     .then((json) => setData(json))
        //     .catch((error) => console.error(error))
        //     .finally(() => setLoading(false));


        fetch(`${BASE_URL}/ridesInGroup`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                groupID: userInfo.groupID,

            }),
        })
            .then((response) => response.json())
            .then((json) => {
                setData(json);
                setFullData(json)
            })
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

    const addARide = (navigation) => {
        fetch(`${BASE_URL}/addADriverToRiderRequest`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                riderEmail: userInfo.email,
                riderName: userInfo.name,
                driverEmail: itemEmail,
                driverName: driverName,
                originDateTime: itemOriginDateTime,
                status: 'Pending Request',
                groupID: userInfo.groupID,
                userToken:userToken

            }),
        });


        fetch(`${BASE_URL}/notification/send`, {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                to: riderToken,
                notificationTitle: 'SUTA RideShare',
                notificationBody: `From ${userInfo.name} you have a new request for your Ride`,

            }),
        });

        // if(contactNumber.length>0){
        //     alert('Successfully Completed')
        // }else {
        //     alert('Error')
        // }


    }

    const [originLongitude,setOriginLongitude] = useState(6.586622);
    const [originLatitude,setOriginLatitude] = useState(6.586622);
    const [destinationLongitude,setDestinationLongitude] = useState(6.586622);
    const [destinationLatitude,setDestinationLatitude] = useState(6.586622);

    const [driverName, setDriverName] = useState('null');
    const [vehicleNumber,setVehicleNumber] = useState('null')

    const [itemEmail, setItemEmail] = useState('email');
    const [itemOriginDateTime, setItemOriginDateTime] = useState('null')

    const [screen,setScreen] = useState('1');

    const [userToken,setUserToken] = useState('');

    const [neededSeats, setNeededSeats] = useState(0)

    const [selectedId, setSelectedId] = useState(null);

    const [riderToken, setRiderToken] = useState(null);

    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);

    const Item = ({ item }) => (




        <TouchableOpacity
            onPress={()=>{{
                setStartLocation(item.startLocation)
                setEndLocation(item.endLocation);

                setOriginLatitude(item.originLatitude);
                setOriginLongitude(item.originLongitude);
                setDestinationLatitude(item.destinationLatitude);
                setDestinationLongitude(item.destinationLongitude);
                setItemEmail(item.email);
                setItemOriginDateTime(item.originDateTime);
                setScreen('2');
                setDriverName(item.username);
                setVehicleNumber(item.VehicleNumber);
                set()
                setRiderToken(item.userToken);

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


            {/*<Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.originDateTime}</Text>*/}
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Name: {item.username}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Start From: {item.startLocation}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Destination: {item.endLocation}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Needed Seats: {item.neededSeats}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>Contact Number: {item.contactNumber}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>{item.originDateTime}</Text>
            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"left",color:"#2b1153"}}>{item.destinationDateTime}</Text>


        </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
        return (
            <Item
                item={item}
            />
        );
    };
    const [query, setQuery] = useState('');
    // ==========================
    const handleSearch = text => {
        console.log('handle')
        const formattedQuery = text.toLowerCase();
        console.log(text)
        // const filteredData = filter(fullData, user => {
        //     console.log('filter')
        //     return contains(user, formattedQuery);
        // });
        // const filteredDatabyContact = fullData.filter(x=>x.contactNumber.includes(text));
        // const filteredDatabyGroupID = fullData.filter(x=>x.groupID.includes(text));
        // const filteredDatabyVehicleNumber = fullData.filter(x=>x.VehicleNumber.includes(text));
        const filteredDatabyStartLocation = fullData.filter(x=>x.startLocation.toLowerCase().includes(formattedQuery));
        const filteredDatabyDestination = fullData.filter(x=>x.endLocation.toLowerCase().includes(formattedQuery));

        // if(filteredDatabyContact.length>0){
        //     setData(filteredDatabyContact);
        // }
        // if
        // (filteredDatabyGroupID.length>0){
        //     setData(filteredDatabyGroupID);
        // }
        // else if
        // (filteredDatabyVehicleNumber.length>0){
        // setData(filteredDatabyVehicleNumber);
        // }
        if
        (filteredDatabyStartLocation.length>0){
            setData(filteredDatabyStartLocation);
        }
        else if
        (filteredDatabyDestination.length>0){
            setData(filteredDatabyDestination);
        }




        // setData(filteredData);
        setQuery(text);
    };
    // ========================
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


                    <View style={styles.container}>
                        {/*<Spinner visible={isLoading} />*/}


                        {isLoading ? <Text>Loading...</Text> :(

                            <>
                            <View
                                style={{
                                    width:'90%',
                                    backgroundColor: '#fff',
                                    padding: 5,
                                    // marginLeft:20,
                                    // marginRight:20,
                                    marginVertical: 10,
                                    borderRadius: 20
                                }}
                            >
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    clearButtonMode="always"
                                    value={query}
                                    onChangeText={queryText => handleSearch(queryText)}

                                    placeholderTextColor='black'
                                    placeholder="Search"
                                    style={{ backgroundColor: '#fff', paddingHorizontal: 20,color:'black' }}
                                />
                            </View>

                            <View style={{
                                flex: 12,
                                height:'100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width:'100%'
                            }}>
                                {/*<Text style={{justifyContent:'center'}}>Loaded</Text>*/}
                                <View style={{width:'100%'}}>
                                    <SafeAreaView style={{width:'100%'}}>

                                        <FlatList
                                            style={{height:"100%", width:'100%'}}
                                            data={data.reverse()}
                                            renderItem={renderItem}
                                            keyExtractor={(data) => data._id}
                                            extraData={selectedId}
                                        />

                                    </SafeAreaView>
                                </View>
                            </View>
                            </>
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



                        <Marker coordinate={{latitude: originLatitude, longitude: originLongitude}}
                                title="Origin"
                                description={startLocation}
                        />

                        <Circle center={{
                            latitude: originLatitude,
                            longitude: originLongitude,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421}} radius={500} />

                        <Marker coordinate={{latitude: destinationLatitude, longitude: destinationLongitude}}
                                title="Destination"
                                description={endLocation}
                        />
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
                        {/*<Button title='Back' onPress={()=>{setScreen('1')}}/>*/}
                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#2b1153",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{setScreen('1')}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Back</Text>
                        </TouchableOpacity>
                    </View>
                    {/*<TextInput*/}
                    {/*    style={{margin:10,backgroundColor:'yellow'}}*/}
                    {/*    value={neededSeats}*/}
                    {/*    placeholder="Number of Seats"*/}
                    {/*    onChangeText={text => setNeededSeats(text)}*/}
                    {/*/>*/}
                    <View style={{margin:10}}>
                        {/*<Button color={'green'} title='Send the Request' onPress={()=>{navigation.navigate('Driver');addARide();}}/>*/}

                        <TouchableOpacity
                            style={{
                                height:42,
                                backgroundColor: "#114953",
                                borderRadius:20,
                                padding:10
                            }}
                            onPress={()=>{navigation.navigate('Driver');addARide();}}
                        >
                            <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Send the Request</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );

};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:'100%',
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

export default AvailableRidesScreen;
