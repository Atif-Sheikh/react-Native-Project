import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';

class About extends Component {
    render() {
        return (
            <Container>
            <Content>
                <Text onPress={this.props.logOutNow}>Hello</Text>                
                <Button title='Logout' onPress={this.props.logOutNow}></Button>
            </Content>
          </Container>
        );
    };
};
function mapStateToProp(state) {
    return ({
        user: state.root.user,
        email: state.root.email,
    });
};
function mapDispatchToProp(dispatch) {
    return {
        logOutNow: () => {
            dispatch(logOutNow())
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(About);