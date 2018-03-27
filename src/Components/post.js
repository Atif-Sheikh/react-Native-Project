import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { Requirement } from '../store/actions';
import { Container, Header, Content, Form, Footer, FooterTab, Button, Icon, Text, Spinner,
    Item, Input, Label, Card } from 'native-base';

class Post extends Component {
    constructor(){
    super();
        this.state = {
            requirement: '',
            rupees: '',
            post: false, 
        };
    };
    submit = (e) => {
        e.preventDefault();
        const { requirement, rupees } = this.state;
        if(requirement && rupees){
            let now = new Date();
            let abc = ['Januray', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let month = abc[now.getMonth()];
            let year = now.getFullYear();
            let date = now.getDate();
            let data = { requirement, rupees, month, year, date };
            this.props.Requirement(data);
            this.setState({post: true});
        }else{
            alert('Please Enter all fields!');
        }
    };
    render() {
        return (
        <Container>
            <Content>
                <Card>
                {
                    this.state.post ? <Card>
                        <Text>Successfully Posted</Text>
                        <Button onPress={() => this.setState({post: false})}>
                            <Text>Post another ?</Text>
                        </Button>
                    </Card> : <Form>
                    <Item floatingLabel>
                    <Label>Post Your requirement...</Label>
                    <Input onChangeText={(text)=> this.setState({requirement: text})} />
                    </Item>
                    <Item>
                        <Label>Enter Rupees...</Label>
                        <Input keyboardType='numeric' onChangeText={(text)=> this.setState({rupees: text})} />
                    </Item>
                    {/* <Item> */}
                    <Button onPress={this.submit} style={{margin: 10}} full>
                        <Text>Post</Text>
                    </Button>
                    {/* </Item> */}
                </Form>
                }
                </Card>
            </Content>
        </Container>
        );
    };
};
function mapStateToProp(state) {
    return ({
        user: state.root.user,
    });
};
function mapDispatchToProp(dispatch) {
    return {
        Requirement: (data) => {
            dispatch(Requirement(data))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Post);