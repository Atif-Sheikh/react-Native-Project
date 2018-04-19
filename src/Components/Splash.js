import React, { Component } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native';
import donate from '../img/donate.jpg';
import { Actions } from 'react-native-router-flux'; 
import Spinner from './spinner';
import { CheckLogin } from '../store/actions';
import { connect } from 'react-redux';

class Splash extends Component {
    static navigationOptions = {
        header: null,
    };
    componentWillMount(){
        setTimeout(() => {
            // Actions.withoutAuth();
            this.props.CheckLogin();
        }, 1000);
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ImageBackground
                    style={{width: '100%', height: '100%'}}
                    source={donate}
                >
                <View style={{marginTop: '110%'}}>
                    <Spinner size='large' style={styles.spinner} />
                    <Text style={{color: 'white', alignSelf: 'center', margin: 30, fontSize: 20, fontWeight: 'bold'}}>
                        Please wait...
                    </Text>
                </View>
           </ImageBackground>
            </View>
        );
    };
};
function mapStateToProp(state) {
    return ({
        // users: state.root.users,             
    });
};
function mapDispatchToProp(dispatch) {
    return {
        CheckLogin: () => {
            dispatch(CheckLogin())
        },
    };
};
const styles = StyleSheet.create({
    spinner: {
        // marginTop: '50%',
        // flex: 1,
        // flexDirection: 'center',
    },
});

export default connect(mapStateToProp, mapDispatchToProp)(Splash);