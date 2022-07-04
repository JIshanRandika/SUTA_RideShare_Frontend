import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      {/*<Spinner visible={isLoading} />*/}
      <View style={styles.wrapper}>
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
        <View style={{flexDirection: 'row', width:'100%',marginBottom:10,marginTop:-10}}>
          <View style={{flex:6}}></View>
          <View>
            <TouchableOpacity onPress={() => navigation.navigate('Forgot Password')}>
              <Text style={{color: 'blue'}}>Forgot your password?</Text>
            </TouchableOpacity>
          </View>

        </View>
        {/*<Button*/}
        {/*  title="Login"*/}
        {/*  onPress={() => {*/}
        {/*    login(email, password);*/}
        {/*  }}*/}
        {/*/>*/}

        <TouchableOpacity
            style={{
              height:42,
              backgroundColor: "#114953",
              borderRadius:20,
              padding:10
            }}
            onPress={() => {
              login(email, password);
            }}
        >
          <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Login</Text>
        </TouchableOpacity>

        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Register</Text>
          </TouchableOpacity>
        </View>

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

export default LoginScreen;
