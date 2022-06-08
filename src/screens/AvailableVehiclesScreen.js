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

function AvailableVehiclesScreen() {
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

    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item }) => (


        <TouchableOpacity
            // onPress={onPress}
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


            <Text style={{fontSize: 20, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.contactNumber}</Text>
            <Text style={{fontSize: 20, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>{item.contactNumber}</Text>


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
    );
};

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

export default AvailableVehiclesScreen;
