import React, { Component } from 'react';
import { StyleSheet, View, Keyboard, BackHandler } from 'react-native';
import CustomHeader from './header';
import { connect } from 'react-redux';
import * as firebase from 'firebase';
import { SendMessage, GetMessages } from '../store/actions';
import { Actions } from 'react-native-router-flux';
import {
    Container, Header, Content, List, ListItem, Left, Body, Right,
    Thumbnail, Text, Icon, Button, Footer, FooterTab, Item, Input
} from 'native-base';

class Message extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
        };
    };
    static navigationOptions = {
        CustomHeader: null,
        header: null,
        Footer: null,
        FooterTab: null,
    };
    sendMessage = () => {
        // firebase.auth().onAuthStateChanged((user) => {
        //     if(user){
                let key = this.props.object.key;
                console.log(key);
                let msg = this.state.message;
                if (msg.trim()) {
                    let obj = { key, msg };
                    this.props.SendMessage(obj);
                    this.setState({ message: '' });
                    Keyboard.dismiss();
                } else {
                    alert('Please Write somthing!');
                }
            // }else{
        //         Keyboard.dismiss();
        //         this.setState({message: ''});
        //         alert('Please Login First');
        //     }
        // })
    };
    componentWillMount() {
        this.props.GetMessages(this.props.object.key);
    };
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', () => {
            Actions.pop();
        });
    };
    render() {
        console.log(this.props.messages);
        return (
            <Container>
                <Header style={{ height: 60, width: '100%', backgroundColor: 'white' }}>
                    <Left>
                        <Body>
                            <Text style={styles.Text}>Comments </Text>
                        </Body>
                    </Left>
                    <Right>
                        <Text onPress={() => Actions.pop()} style={styles.close}>x</Text>
                    </Right>
                </Header>
                <Content>
                <Content>
                    <Text style={styles.BodyText}>{this.props.object.requirement}
                        , it will be cost around PKR: {this.props.object.rupees}/-</Text>
                </Content>
                    {
                        this.props.messages ? this.props.messages.map((msg, index) => {
                            return <Content key={index.toString()}>
                                <List>
                                    <ListItem avatar>
                                        <Icon style={{ fontSize: 40, color: '#4A86C5' }} name='contact' name='contact' />
                                        <Body style={{ minHeight: 70, height: 'auto' }}>
                                            <Text>{msg.message}</Text>
                                            {/* <Text note>user.number</Text> */}
                                        </Body>
                                        <Right>
                                            {/* <Button> */}
                                            <Text style={{ marginTop: 10 }} note>{msg.name} - a few seconds</Text>
                                            {/* </Button> */}
                                        </Right>
                                    </ListItem>
                                </List>
                            </Content>
                        }) : <Text>No msg</Text>
                    }
                </Content>
                {/* <Footer style={{backgroundColor: 'white'}}> */}
                {/* <FooterTab style={{backgroundColor: 'white'}}> */}
                <Item style={{ width: '100%', height: 70 }} regular>
                    <Input
                        onChangeText={message => this.setState({ message })}
                        placeholder='please comment...'
                        value={this.state.message}
                    />
                    <Text onPress={this.sendMessage} style={{ marginRight: 10 }}>
                        SEND
                            <Icon name='paper-plane' />
                    </Text>
                </Item>
                {/* </FooterTab> */}
                {/* </Footer> */}
            </Container>
        );
    };
};
function mapStateToProp(state) {
    return ({
        // messages: state.root.messages,
        object: state.root.currentRequiremnet,
        messages: state.root.messages,
    });
};
function mapDispatchToProp(dispatch) {
    return {
        SendMessage: (obj) => {
            dispatch(SendMessage(obj))
        },
        GetMessages: (key) => {
            dispatch(GetMessages(key))
        },
    };
};
const styles = StyleSheet.create({
    Text: {
        color: "black",
        fontSize: 20,
        margin: 5,
        marginLeft: 2,
        marginTop: 15,
        alignSelf: 'flex-start',
    },
    close: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginBottom: 10,
        fontSize: 50,
        color: 'rgba(0,0,0,0.5)',
    },
    BodyText: {
        color: 'rgba(0,0,0,0.5)',
        margin: 12,
    },
});
export default connect(mapStateToProp, mapDispatchToProp)(Message);