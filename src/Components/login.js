import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Button, Keyboard } from 'react-native';
import CustomHeader from './header';
import { Content, Input, Item } from 'native-base';
import { Actions } from 'react-native-router-flux'; // New code
import { SiginNow } from '../store/actions'
import { connect } from 'react-redux';
import Spinner from './spinner';

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            loading: false,
        };
    };
    static navigationOptions = {
        header: null
    };
    renderFunc = () => {
        const { loading } = this.state;
        if(loading){
            return <Spinner size='small' />
        }else{
            return <Button color="#4A86C5" title="Sigin" onPress={this.login} />            
        };
    };
    login = () => {
        const { email, password } = this.state;
        if(email, password){
            this.setState({loading: true});
            const user = {
                email: this.state.email.trim(),
                password: this.state.password.trim(),
            };
            this.props.SiginNow(user);
            Keyboard.dismiss();        
            setTimeout(() => {
                this.setState({loading: false});
            }, 2000);
        }else{
            alert('Please enter all fields!');
        }
    };
    render() {
        const title = '';
        return (
            <View style={styles.container}>
                <CustomHeader title={title}  />
                <Text style={styles.welcome}>
                    Login
                </Text>
                <Item style={styles.item} regular>
                    <Input placeholder='Email Address' onChangeText={email => this.setState({email})} style={styles.input} />
                </Item>

                <Item style={styles.item} regular>
                    <Input placeholder='**********' onChangeText={password => this.setState({password})} style={styles.input} secureTextEntry={true}
                    />
                </Item>
                <Text style={{fontSize: 20, color: 'red'}}>{this.props.error}</Text>
                <View style={styles.btn}>
                    { this.renderFunc() }
                </View>
                <Text onPress={() => Actions.signup()} style={{fontSize: 20}}>
                    Don't have an Account ?
                </Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 255
    },
    body: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 50,
        textAlign: 'center',
        margin: 100,
        fontFamily: "serif",
        marginBottom: 25,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    input: {
        height: 50,
    },
    item: {
        width: "80%",
        marginBottom: 30,
        borderColor: '#4A86C5',
        borderWidth: 5,
        borderRadius: 7,
    },
    btn: {
        width: 200,
        height: 50,
    },
});

function mapStateToProp(state) {
    return ({
        error: state.root.error,
    });
};
function mapDispatchToProp(dispatch) {
    return {
        SiginNow: (name) => {
            dispatch(SiginNow(name))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Login);