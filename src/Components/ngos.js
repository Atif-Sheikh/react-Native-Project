import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { getNGOs } from '../store/actions';
import { Container, Header, Content, List, ListItem, Left, Card, Body, Right, Thumbnail, Text, Icon, Button } from 'native-base';

class NGOs extends Component {
    componentWillMount(){
        this.props.getNGOs();
    };
    render() {
        console.log(this.props.ngos, 'sdf');
        return (
            <Container>
            <Content>
                {/* <Text>NGOs List</Text> */}
                {
                    this.props.ngos.map((ngo, index) => {
                        return <Card key={index}>
                        <List>
                          <ListItem avatar>
                            {/* <Left> */}
                                <Icon style={{ fontSize: 80, color: '#4A86C5' }} name='contact' />
                            {/* </Left> */}
                            <Body>
                              <Text>{ngo.name}</Text>
                              <Text note>{ngo.number}</Text>
                            </Body>
                            <Right>
                                {/* <Button> */}
                                    <Text style={{fontWeight: 'bold'}} note>View</Text>
                                {/* </Button> */}
                            </Right>
                          </ListItem>
                        </List>
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