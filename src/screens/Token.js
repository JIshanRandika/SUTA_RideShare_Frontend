import React, {Component, useContext} from 'react';
import {Alert, StatusBar, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';

import NotifService from '../NotifService';
import {BASE_URL} from '../config';

export default class Token extends Component {

    static contextType = AuthContext
    // static contextType = AuthProvider
    constructor(props) {
        super(props);
        this.state = {};

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );

        this.notif.requestPermissions();
        // console.log(userInfo.name)
        console.log('test');
        console.log(this.state.registerToken);
    }

    componentDidUpdate() {
        const {userInfo, isLoading, logout} = this.context;
        // Changing the state after 2 sec
        // from the time when the component
        // is rendered


        console.log(userInfo.email)
        setTimeout(() => {


            fetch(`${BASE_URL}/updateUserToken`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    email: userInfo.email,
                    deviseToken:this.state.registerToken

                }),
            })

            console.log(this.state.registerToken);

        }, 2000);
        // console.log(this.state.registerToken);
    }

    // const user = useContext(AuthContext)
    render() {
        const {userInfo, isLoading, logout} = this.context;
        return (

            <>

                {/*<View>*/}
                    {/*<Text>{userInfo.email}</Text>*/}

                {/*    <Text>{this.state.registerToken}</Text>*/}
                {/*</View>*/}
            </>


        );
    }

    onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
    }

    onNotif(notif) {
        Alert.alert(notif.title, notif.message);
    }

    handlePerm(perms) {
        Alert.alert('Permissions', JSON.stringify(perms));
    }
}


