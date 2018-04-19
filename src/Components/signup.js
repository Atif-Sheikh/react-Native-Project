import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Keyboard,
} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { SignupNow } from '../store/actions'
import CustomHeader from './header';
import { Content, Input, Item, CheckBox, Body } from 'native-base';
import Spinner from './spinner';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            password: '',
            loading: false,
            number: '',
            accountType: 'user',
            user: true,
            ngo: false,
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
            return <Button color="#4A86C5" title="Singup" onPress={this.signup} />            
        };
    };
    signup = () => {
        const { email, password, userName, number, accountType } = this.state;
        if(email.trim() && password.trim() && userName.trim() && number.trim()){
            const obj = {
                userName,
                email,
                password,
                accountType,
                number,
            };
            this.props.SignupNow(obj);
            Keyboard.dismiss();        
            this.setState({loading: true});
            setTimeout(() => {
                this.setState({loading: false});
            }, 2000);
        }else{
            alert('Please enter all fields correctly');
        }
    };
    render(){
        const title = '';
        return (
            <View style={styles.container}>
                <CustomHeader title={title} />
                <Text style={styles.welcome}>
                    Signup
                </Text>
                <Item style={styles.item} regular>
                    <Input placeholder='Your name' style={styles.input} onChangeText={name => this.setState({ userName: name.trim() })} />                    
                </Item>
                <Item style={styles.item} regular>
                    <Input placeholder='Email Address' style={styles.input} onChangeText={email => this.setState({ email: email.trim() })} />
                </Item>
                <Item style={styles.item} regular>
                    <Input placeholder='************' style={styles.input} secureTextEntry={true} onChangeText={password => this.setState({ password: password.trim() })} />
                </Item>
                <Item style={styles.item} regular>
                    <Input placeholder='+923********' keyboardType='numeric' onChangeText={(text)=> this.setState({number: text.trim()})} />
                </Item>
                <View style={{flexDirection: 'row'}}>
                <Text>
                    AccountType:
                </Text>
                <Body>
                    <Text>Donator</Text>
                    <CheckBox onPress={() => this.setState({ accountType: 'user', user: true, ngo: false })} checked={this.state.user} />
                </Body>
                <Body>
                    <Text>NGO</Text>
                    <CheckBox onPress={() => this.setState({ accountType: 'ngo', user: false, ngo: true })} checked={this.state.ngo} />
                </Body>
                </View>
                <Text style={{fontSize: 20, color: 'red'}}>{this.props.error}</Text>                
                <View style={styles.btn}>
                    { this.renderFunc() }
                </View>
                <Text onPress={() => Actions.login()} style={{ fontSize: 20 }}>
                    Already have an account ?
                </Text>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 150
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
        margin: 10,
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
        error: state.root.signuperror,
    });
};
function mapDispatchToProp(dispatch) {
    return {
        SignupNow: (obj) => {
            dispatch(SignupNow(obj))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Signup);