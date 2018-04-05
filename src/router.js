import React,{ Component } from 'react';
// import { Nav } from './nav';
import { Router, Scene } from 'react-native-router-flux';
import Signup from './Components/signup';
import Login from './Components/login';
import Home from './Components/home';
import Posts from './Components/posts';
import NGOHome from './Components/ngoHome';
import Messages from './Components/comments';
import CustomHeader from './Components/header';
import Splash from './Components/Splash';

export default class Routers extends Component{
    render(){
        return(
            <Router>
            <Scene key="root">
              <Scene 
                key='splash'
                component={Splash}
                title='Splash'
                initial                  
                />
              <Scene
                key="login"
                component={Login}
                title="Login"
                />
              <Scene key="home"
                component={Home}
                title="Home"
                />
              <Scene key="message"
                component={Messages}
                title="Messages"
              />
              <Scene key="NGOHome"
                component={NGOHome}
                title='NGOHOME'
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