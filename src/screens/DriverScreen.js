import React from 'react';
import {ActivityIndicator, Button, Text, View, TouchableOpacity} from 'react-native';

function DriverScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/*<Text>Driver screen</Text>*/}
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
                    backgroundColor: "#137801",

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
                onPress={() => navigation.navigate('Your Drives')}
            >
                <Text style={{fontSize: 22, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Your Drives</Text>
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
                    backgroundColor: "#2b1153",

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
                onPress={() => navigation.navigate('Available Rides')}
            >
                <Text style={{fontSize: 22, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Available Rides</Text>
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
                            onPress={() => navigation.navigate('Your Request To Riders')}
                        >
                                <Text style={{fontSize: 22, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Your Request To Riders</Text>
                        </TouchableOpacity>
                </View>

        </View>
    );
}

export default DriverScreen;
