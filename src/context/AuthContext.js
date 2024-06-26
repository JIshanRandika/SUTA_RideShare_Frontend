import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AsyncStorage } from 'react-native';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

// export const AuthContext = createContext();

export const AuthContext = React.createContext()

// export const AuthProvider = AuthContext.Provider
// export const UserConsumer = AuthContext.Consumer

// export default AuthContext


export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);


    const registerbygoogle = (name, email,groupID, deviseToken) => {
        setIsLoading(true);

        axios
            .post(`${BASE_URL}/googleUsers`, {
                name,
                email,
                groupID,
                deviseToken
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                console.log('Testing');
                console.log(userInfo);
            })
            .catch(
                res => {
                    let userInfo = res.data;
                    // setUserInfo(userInfo);
                    AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                    console.log(userInfo);
                    console.log(`register error0000 ${res}`);
                    setIsLoading(false);
                }
            );
    };


  const register = (name, email, password,groupID, deviseToken) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/users`, {
        name,
        email,
        password,
        groupID,
        deviseToken
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        console.log('Testing');
        console.log(userInfo);
      })
      .catch(
          res => {
            let userInfo = res.data;
            // setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log(userInfo);
        console.log(`register error0000 ${res}`);
        setIsLoading(false);
      }
      );
  };

  const login = (email, password) => {
    setIsLoading(true);

    axios
      .post(`${BASE_URL}/auth`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`login error ${e}`);
        setIsLoading(false);
      });
  };

    const googleLogin = (email,picture) => {
        setIsLoading(true);

        axios
            .post(`${BASE_URL}/googleAuth`, {
                email,
                picture,
            })
            .then(res => {
                let userInfo = res.data;
                console.log(userInfo);
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`login error ${e}`);
                setIsLoading(false);
            });
    };

  const logout = () => {
    setIsLoading(true);

    axios
      .post(
        `${BASE_URL}/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.message}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
          registerbygoogle,
        login,
          googleLogin,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
