import React, {Component, useContext} from 'react';
import {Alert, StatusBar, Text, View} from 'react-native';
import Navigation from './src/components/Navigation';
import {AuthProvider} from './src/context/AuthContext';
import {AuthContext} from './src/context/AuthContext';

import {BASE_URL} from './src/config';

import Token from './src/screens/Token';


const App = () => {


  return (
      <AuthProvider>
          <Token/>
        <StatusBar backgroundColor="#06bcee" />
        <Navigation />
      </AuthProvider>
  );
};
export default App;


// const {userInfo, isLoading, logout} = useContext(AuthContext);

// export default class App extends Component {
//
//     // static contextType = AuthContext
//     static contextType = AuthProvider
//     constructor(props) {
//         super(props);
//         this.state = {};
//
//         this.notif = new NotifService(
//             this.onRegister.bind(this),
//             this.onNotif.bind(this),
//         );
//
//         this.notif.requestPermissions();
//         // console.log(userInfo.name)
//         console.log('test');
//         console.log(this.state.registerToken);
//     }
//
//     componentDidMount() {
//         // const data = this.context;
//         const {userInfo, isLoading, logout} = this.context;
//         // Changing the state after 2 sec
//         // from the time when the component
//         // is rendered
//         setTimeout(() => {
//
//
//             console.log(userInfo);
//
//
//
//         }, 2000);
//         // console.log(this.state.registerToken);
//     }
//
//     // const user = useContext(AuthContext)
//     render() {
//         const {userInfo, isLoading, logout} = this.context;
//         return (
//
//             <AuthProvider>
//                 <StatusBar backgroundColor="#06bcee" />
//                 {/*<AuthProvider>*/}
//                 {/*    {(props) => {*/}
//                 {/*        return <View><Text>{props.userInfo.name}</Text></View>*/}
//                 {/*    }}*/}
//                 {/*</AuthProvider>*/}
//                 {/*<View><Text>{userInfo.name}</Text></View>*/}
//                 <View><Text>{this.state.registerToken}</Text></View>
//                 <Navigation />
//             </AuthProvider>
//         );
//     }
//
//     onRegister(token) {
//         this.setState({registerToken: token.token, fcmRegistered: true});
//     }
//
//     onNotif(notif) {
//         Alert.alert(notif.title, notif.message);
//     }
//
//     handlePerm(perms) {
//         Alert.alert('Permissions', JSON.stringify(perms));
//     }
// }


