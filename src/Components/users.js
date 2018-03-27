import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { getUsers } from '../store/actions';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Icon, Button } from 'native-base';

class Users extends Component {
    componentWillMount(){
        this.props.getUsers();
    };
    render() {
        // console.log(this.props.users, 'sdf');
        return (
            <Container>
            <Content>
                {/* <Text>NGOs List</Text> */}
                {
                    this.props.users.map((user, index) => {
                        return <Content key={index}>
                        <List>
                          <ListItem avatar>
                            {/* <Left> */}
                                <Icon style={{ fontSize: 50 }} name='person' />
                            {/* </Left> */}
                            <Body>
                              <Text>{user.name}</Text>
                              <Text note>{user.number}</Text>
                            </Body>
                            <Right>
                                {/* <Button> */}
                                    <Text style={{fontWeight: 'bold', marginTop: 10}} note>View</Text>
                                {/* </Button> */}
                            </Right>
                          </ListItem>
                        </List>
                      </Content>
                    })
                }
            </Content>
          </Container>
        );
    };
};
function mapStateToProp(state) {
    return ({
        users: state.root.users,             
    });
};
function mapDispatchToProp(dispatch) {
    return {
        getUsers: () => {
            dispatch(getUsers())
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Users);