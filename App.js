import React, {Component} from 'react';
import {Alert, StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';

import NotifService from './NotifService';
import {BASE_URL} from './src/config';



// const App = () => {
//
//
//   return (
//       <AuthProvider>
//         <StatusBar backgroundColor="#06bcee" />
//         <Navigation />
//       </AuthProvider>
//   );
// };
// export default App;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this),
        );

        this.notif.requestPermissions();
        console.log('test');
        console.log(this.state.registerToken);
    }

    componentDidMount() {

        // Changing the state after 2 sec
        // from the time when the component
        // is rendered
        setTimeout(() => {


            console.log(this.state.registerToken);



        }, 2000);
        // console.log(this.state.registerToken);
    }

    render() {
        return (
            <AuthProvider>
                <StatusBar backgroundColor="#06bcee" />
                <View><Text>{this.state.registerToken}</Text></View>
                <Navigation />
            </AuthProvider>
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


