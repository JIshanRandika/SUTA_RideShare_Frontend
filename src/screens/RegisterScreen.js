import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView, Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import {BASE_URL} from '../config';




const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {isLoading, register, userInfo} = useContext(AuthContext);

  const [group, setGroup] =useState(false)

  const [groupID,setGroupID] = useState(null)

  const [data,setData] = useState(null)

  const [loading,setLoading] = useState(false)

  const [regLoading,setRegLoading] = useState(false)


  const addData = () =>{
    fetch(`${BASE_URL}/addAGroup`,{
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        groupID: groupID,

      }),
    })
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }


  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />



      <View style={styles.wrapper}>
<SafeAreaView>
  <ScrollView>

      {group && (
<>
          <TextInput
              style={styles.input}
              value={groupID}
              placeholderTextColor='gray'
              placeholder="Group ID"
              onChangeText={text => setGroupID(text)}
          />

  <View style={{marginBottom:10}}>
    {/*<Button*/}
    {/*    title="Create the group"*/}
    {/*    onPress={() => {*/}
    {/*      setLoading(true)*/}
    {/*      // setGroup(false)*/}
    {/*      addData()*/}
    {/*      // setTimeout(() => {alert(data.message)}, 5000)*/}
    {/*      // setTimeout(alert(data.message), 5000);*/}

    {/*    }}*/}
    {/*/>*/}

    <TouchableOpacity
        style={{
          height:42,
          backgroundColor: "#2b1153",
          borderRadius:20,
          padding:10
        }}
        onPress={() => {
          setLoading(true)
          // setGroup(false)
          addData()
          // setTimeout(() => {alert(data.message)}, 5000)
          // setTimeout(alert(data.message), 5000);

        }}
    >
      <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Create the group</Text>
    </TouchableOpacity>


  </View>

          {loading && (
              <Text style={{color:'black'}}>Loading..</Text>

          )}

  {!loading && data && (
      <Text style={{color:'black'}}>{data.message}</Text>

  )}


          <View style={{marginTop:10}}>
  {/*<Button*/}
  {/*    color='orange'*/}
  {/*    title="Back"*/}
  {/*    onPress={() => {*/}
  {/*      // setLoading(true)*/}
  {/*      setGroup(false)*/}
  {/*      // addData()*/}
  {/*      // setTimeout(() => {alert(data.message)}, 5000)*/}
  {/*      // setTimeout(alert(data.message), 5000);*/}

  {/*    }}*/}
  {/*/>*/}
            <TouchableOpacity
                style={{
                  height:42,
                  backgroundColor: "#114953",
                  borderRadius:20,
                  padding:10
                }}
                onPress={() => {
                  setGroup(false)

                }}
            >
              <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Back</Text>
            </TouchableOpacity>
          </View>

</>
      )}

      {!group && (
          <>
      {/*<Button*/}
      {/*    color='green'*/}
      {/*    title="New Group"*/}
      {/*    onPress={() => {*/}
      {/*        setGroup(true)*/}

      {/*    }}*/}
      {/*/>*/}
            <TouchableOpacity
                style={{
                  height:42,
                  backgroundColor: "#114953",
                  borderRadius:20,
                  padding:10
                }}
                onPress={() => {
                  setGroup(true)

                }}
            >
              <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Create a new group</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row', justifyContent:'center'}}>


              <View style={{flex:6}}>
                <TextInput
                    style={{
                      color:'black',
                      marginBottom: 12,
                      marginTop: 12,
                      borderWidth: 1,
                      borderColor: '#bbb',
                      borderRadius: 5,
                      paddingHorizontal: 14
                    }}
                    value={groupID}
                    placeholderTextColor='gray'
                    placeholder="Group ID"
                    onChangeText={text => setGroupID(text)}
                />
              </View>
              <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{fontWeight:"bold", color:'black'}}>OR</Text>
              </View>
              <View style={{flex:5 ,justifyContent:'center'}}>
                <TouchableOpacity
                    style={{
                      alignContent:'center',
                      // height:'80%',
                      backgroundColor: "#39747f",
                      borderRadius:10,
                      padding:10
                    }}
                    onPress={() => setGroupID('PUBLIC')}
                    // onPress={logout}
                >
                  <Text style={{ fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Select Public Group</Text>
                </TouchableOpacity>
              </View>






            </View>



        <TextInput
          style={styles.input}
          value={name}
          placeholderTextColor='gray'
          placeholder="Enter name"
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholderTextColor='gray'
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholderTextColor='gray'
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        {/*<Button*/}
        {/*  title="Register"*/}
        {/*  onPress={() => {*/}
        {/*    register(name, email, password, groupID, 'new');*/}
        {/*    setRegLoading(true)*/}
        {/*    // alert(userInfo.message)*/}
        {/*    // myalert();*/}
        {/*    //   setTimeout(() => {alert(userInfo.message)}, 5000)*/}

        {/*  }}*/}
        {/*/>*/}
            <TouchableOpacity
                style={{
                  height:42,
                  backgroundColor: "#2b1153",
                  borderRadius:20,
                  padding:10
                }}
                onPress={() => {
                  register(name, email, password, groupID, 'new');
                  setRegLoading(true)

                }}
            >
              <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Register</Text>
            </TouchableOpacity>
            {isLoading && (
                <Text style={{marginTop:10, color:'black'}}>Loading..</Text>
            )}
            {regLoading && (
            <Text style={{marginTop:10, color:'red'}}>{userInfo.message}</Text>
            )}

        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{color:'black'}}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop:40, color:'black'}}>Your password need: </Text>
        <Text style={{marginLeft:10, color:'black'}}>Minimum 8 characters</Text>
        <Text style={{marginLeft:10, color:'black'}}>Maximum 26 characters</Text>
        <Text style={{marginLeft:10, color:'black'}}>At least 1 lowe case letter</Text>
        <Text style={{marginLeft:10, color:'black'}}>At least 1 upper case letter</Text>
        <Text style={{marginLeft:10, color:'black'}}>At least 1 numerical value</Text>
        <Text style={{marginLeft:10, color:'black'}}>At least 1 symbol</Text>
          </>
          )}
  </ScrollView>
</SafeAreaView>

      </View>

    </View>
  );
};

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
    color:'black',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: 'blue',
  },
});

export default RegisterScreen;
