import React,{ Component } from 'react';
// import { Nav } from './nav';
import { Router, Scene } from 'react-native-router-flux';
import Signup from './Components/signup';
import Login from './Components/login';
import Home from './Components/home';
import Posts from './Components/posts';
import NGOHome from './Components/ngoHome';
import CustomHeader from './Components/header';

export default class Routers extends Component{
    render(){
        return(
            <Router>
            <Scene key="root">
              <Scene
                key="login"
                component={Login}
                title="Login"
                />
              <Scene key="home"
                component={Home}
                title="Home"
                initial                 
              />
              <Scene key="NGOHome"
                component={NGOHome}
                title=''
              />
              <Scene
                key="signup"
                component={Signup}
                title="Signup"
              />
            </Scene>
          </Router>
        );
    };
};