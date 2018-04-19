import React,{ Component } from 'react';
// import { Nav } from './nav';
import { Router, Scene } from 'react-native-router-flux';
import Signup from './Components/signup';
import Login from './Components/login';
import Home from './Components/home';
import Posts from './Components/posts';
import WithoutAuth from './Components/withoutAuth';
import Messages from './Components/comments';
import CustomHeader from './Components/header';
import Splash from './Components/Splash';
import NGOsPosts from './Components/ngosPosts';

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
              <Scene key='ngosPosts'
                component={NGOsPosts}
                title='Your Posts'
              />
              <Scene key="message"
                component={Messages}
                title="Messages"
                />
              <Scene key="withoutAuth"
                component={WithoutAuth}
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