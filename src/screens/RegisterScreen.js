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
              placeholder="Group ID"
              onChangeText={text => setGroupID(text)}
          />

  <View style={{marginBottom:10}}>
    <Button
        title="Create the group"
        onPress={() => {
          setLoading(true)
          // setGroup(false)
          addData()
          // setTimeout(() => {alert(data.message)}, 5000)
          // setTimeout(alert(data.message), 5000);

        }}
    />
  </View>

          {loading && (
              <Text>Loading..</Text>
          )}

  {!loading && data && (
      <Text>{data.message}</Text>
  )}
          <View style={{marginTop:10}}>
  <Button
      color='orange'
      title="Back"
      onPress={() => {
        // setLoading(true)
        setGroup(false)
        // addData()
        // setTimeout(() => {alert(data.message)}, 5000)
        // setTimeout(alert(data.message), 5000);

      }}
  />
          </View>

</>
      )}

      {!group && (
          <>
      <Button
          color='green'
          title="New Group"
          onPress={() => {
              setGroup(true)

          }}
      />

            <TextInput
                style={{
                  marginBottom: 12,
                  marginTop: 12,
                  borderWidth: 1,
                  borderColor: '#bbb',
                  borderRadius: 5,
                  paddingHorizontal: 14
                }}
                value={groupID}
                placeholder="Group ID"
                onChangeText={text => setGroupID(text)}
            />

        <TextInput
          style={styles.input}
          value={name}
          placeholder="Enter name"
          onChangeText={text => setName(text)}
        />

        <TextInput
          style={styles.input}
          value={email}
          placeholder="Enter email"
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          style={styles.input}
          value={password}
          placeholder="Enter password"
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />

        <Button
          title="Register"
          onPress={() => {
            register(name, email, password, groupID, 'new');
            // alert(userInfo.message)
            // myalert();
            //   setTimeout(() => {alert(userInfo.message)}, 5000)

          }}
        />



        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </View>
        <Text style={{marginTop:40}}>Your password need: </Text>
        <Text style={{marginLeft:10}}>Minimum 8 characters</Text>
        <Text style={{marginLeft:10}}>Maximum 26 characters</Text>
        <Text style={{marginLeft:10}}>At least 1 lowe case letter</Text>
        <Text style={{marginLeft:10}}>At least 1 upper case letter</Text>
        <Text style={{marginLeft:10}}>At least 1 numerical value</Text>
        <Text style={{marginLeft:10}}>At least 1 symbol</Text>
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
