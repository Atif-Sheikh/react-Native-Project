import { AppRegistry } from 'react-native';
import App from './App';
import * as firebase from 'firebase';

console.disableYellowBox=true;


    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAVrEGWIMxOgTkz8xAvyyK60TklDavNX7s",
        authDomain: "native-project-ssg.firebaseapp.com",
        databaseURL: "https://native-project-ssg.firebaseio.com",
        projectId: "native-project-ssg",
        storageBucket: "native-project-ssg.appspot.com",
        messagingSenderId: "1022802588674"
    };
    firebase.initializeApp(config);

AppRegistry.registerComponent('Donate', () => App);
