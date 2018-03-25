import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,

} from 'react-native';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { SignupNow } from '../store/actions'
import CustomHeader from './header';
import { Content, Input, Item, } from 'native-base';
import Spinner from './spinner';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
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
            return <Button color="#1ad1ff" title="Singup" onPress={this.signup} />            
        };
    };
    signup = () => {
        const { email, password, userName } = this.state;
        if(email.trim(), password.trim(), userName.trim()){
            const obj = {
                userName,
                email,
                password,
                accountType: 'user',
            };
            this.props.SignupNow(obj)
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
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 175
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
        borderColor: '#1ad1ff',
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