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




const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {isLoading, register, userInfo} = useContext(AuthContext);



  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />



      <View style={styles.wrapper}>
<SafeAreaView>
  <ScrollView>
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
            register(name, email, password, 'new');
            alert(userInfo.message)
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
