import React from 'react';
import {ActivityIndicator, Button, Text, View, TouchableOpacity, Image} from 'react-native';

function RiderScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/*<Text>Rider screen</Text>*/}
            <View style={{flex:1, width:'100%'}}>
                <TouchableOpacity
                    style={{
                        height:'80%',
                        marginTop:"3%",
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent:'center',
                        width: "90%",
                        // height: 37,
                        paddingLeft:10,
                        paddingRight:10,
                        paddingTop:10,
                        paddingBottom:10,
                        backgroundColor: "#114953",

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
                    onPress={() => navigation.navigate('Available Vehicles')}
                >
                    {/*<Text style={{fontSize: 22, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Available Vehicles</Text>*/}
                    {/*<Text style={{fontSize: 22, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>(Details View)</Text>*/}
                    <View style={{flexDirection:'row'}}>
                        <View style={{
                            flexDirection:'column',
                            paddingLeft:10,
                            paddingRight:10,
                            paddingTop:10,
                            paddingBottom:10,
                        }}>
                            <Text style={{fontSize: 20, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Available Vehicles</Text>
                            <Text style={{fontSize: 18, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>[Details View]</Text>
                        </View>
                        <View style={{
                            flexDirection:'column',
                            paddingLeft:10,
                            paddingRight:10,}}>
                            <Image source={require('../assets/vehicle.png')} style={{height: 80, width:80 }} />

                        </View>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{flex:1, width:'100%'}}>
            <TouchableOpacity
                style={{
                    height:'80%',
                    marginTop:"3%",
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent:'center',
                    width: "90%",
                    // height: 37,
                    paddingLeft:10,
                    paddingRight:10,
                    paddingTop:10,
                    paddingBottom:10,
                    backgroundColor: "#114953",

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
                onPress={() => navigation.navigate('Available Vehicles - Map')}
            >
                <View style={{flexDirection:'row'}}>
                    <View style={{
                        flexDirection:'column',
                        paddingLeft:10,
                        paddingRight:10,
                        paddingTop:10,
                        paddingBottom:10,
                    }}>
                        <Text style={{fontSize: 20, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>Available Vehicles</Text>
                        <Text style={{fontSize: 18, fontWeight:"bold", textAlign:"left",color:"#ffffff"}}>[Map View]</Text>
                    </View>
                    <View style={{
                        flexDirection:'column',
                        paddingLeft:10,
                        paddingRight:10,}}>
                        <Image source={require('../assets/googleMap.png')} style={{height: 80, width:80 }} />

                    </View>
                </View>

            </TouchableOpacity>
        </View>

            <View style={{flex:1,flexDirection:'row',
                paddingLeft:18,
                paddingRight:18,
                paddingTop:10,
                paddingBottom:10,}}>
                <View style={{flex:1, width:'100%'}}>
                    <TouchableOpacity
                        style={{
                            height:'80%',
                            marginTop:"3%",
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent:'center',
                            width: "90%",
                            // height: 37,
                            paddingLeft:10,
                            paddingRight:10,
                            paddingTop:10,
                            paddingBottom:10,
                            backgroundColor: "rgb(62,112,121)",

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
                        onPress={() => navigation.navigate('Your Rides')}
                    >
                        <Text style={{fontSize: 22, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Your Rides</Text>
                        <Image source={require('../assets/rider.png')} style={{height: 80, width:40,marginTop:10 }} />

                    </TouchableOpacity>
                </View>

                <View style={{flex:1, width:'100%'}}>
                    <TouchableOpacity
                        style={{
                            height:'80%',
                            marginTop:"3%",
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent:'center',
                            width: "90%",
                            // height: 37,
                            paddingLeft:10,
                            paddingRight:10,
                            paddingTop:10,
                            paddingBottom:10,
                            backgroundColor: "rgb(100,144,154)",

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
                        onPress={() => navigation.navigate('Your Request To Drivers')}
                    >
                        <Text style={{fontSize: 20, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Your Requests</Text>
                        <Image source={require('../assets/requests.png')} style={{height: 80, width:80 ,marginTop:10}} />

                    </TouchableOpacity>

                </View>
            </View>


        </View>
    );
}
export default RiderScreen;
