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
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  // const {isLoading, login} = useContext(AuthContext);
  const {isLoading, login, googleLogin, userInfo} = useContext(AuthContext);

  const [logLoading,setLogLoading] = useState(false)

  const onGoogleButtonPress  = async () =>{
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in.then(user => {
      // console.log(user);
      console.log(user.additionalUserInfo);
      console.log(user.additionalUserInfo.profile.email);
      googleLogin(

          user.additionalUserInfo.profile.email,
          user.additionalUserInfo.profile.picture,

          );
    });
  }

  return (
    <View style={styles.container}>
      {/*<Spinner visible={isLoading} />*/}
      <View style={styles.wrapper}>
        <TextInput
            style={styles.input}
          placeholderTextColor='gray'
          value={email}
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
              setLogLoading(true);
            }}
        >
          <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={{
              marginTop:10,
              height:42,
              backgroundColor: "#fa5600",
              borderRadius:20,
              padding:10
            }}
            onPress={() => {
              onGoogleButtonPress().then(() => console.log('Sign up with Google!'));
              setLogLoading(true)

            }}
        >
          <Text style={{fontSize: 15, fontWeight:"bold", textAlign:"center",color:"#ffffff"}}>Sign In with Google</Text>
        </TouchableOpacity>

        {isLoading && (
            <Text style={{marginTop:10, color:'black'}}>Loading..</Text>
        )}
        {logLoading && (
            <Text style={{marginTop:10, color:'red'}}>{userInfo.message}</Text>
        )}
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text style={{color:'black'}}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.link}>Sign Up</Text>
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

export default LoginScreen;
