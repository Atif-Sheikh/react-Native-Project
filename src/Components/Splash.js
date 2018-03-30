import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import donate from '../img/donate.jpg';
import { Actions } from 'react-native-router-flux'; 
import Spinner from './spinner';

class Splash extends Component {
    static navigationOptions = {
        header: null,
    };
    componentWillMount(){
        setTimeout(() => {
            Actions.login();
        }, 2000);
    }
    render() {
        return (
            <View>
                <Image
                    style={{width: '100%', height: '100%'}}
                    source={donate}
                />
                <Spinner size='large' style={styles.spinner} />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    spinner: {
        position: 'relative'
    },
});

export default Splash;