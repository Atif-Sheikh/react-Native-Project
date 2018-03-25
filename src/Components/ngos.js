import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { getNGOs } from '../store/actions';
import { Container, Card, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';

class NGOs extends Component {
    componentWillMount(){
        this.props.getNGOs();
    };
    render() {
        console.log(this.props.ngos, 'sdf');
        return (
            <Container>
            <Content>
                <Text>NGOs List</Text>
                {
                    this.props.ngos.map((ngo, index) => {
                        return <Card key={index.toString()}>
                            <Text>{ ngo.name }</Text>
                            <Text>{ ngo.email }</Text>                            
                        </Card>
                    })
                }
            </Content>
          </Container>
        );
    };
};
function mapStateToProp(state) {
    return ({
        ngos: state.root.ngos,             
    });
};
function mapDispatchToProp(dispatch) {
    return {
        getNGOs: () => {
            dispatch(getNGOs())
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(NGOs);