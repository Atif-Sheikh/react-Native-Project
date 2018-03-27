import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { logOutNow } from '../store/actions';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';
import Post from './post';
import Users from './users';

class NGOHome extends Component {
    constructor(){
        super();
        this.state = {
            title: 'Post',
            post: true,
            ngos: false,
            about: false,
            contact: false,
        };
    };
    logOut = () => {
        this.props.logOutNow();
    };
    static navigationOptions = {
        header: null,
    };
    render() {
        return (
            <Container>
            <CustomHeader title={this.state.title} />
            <Content>
                {
                    this.state.post ? <Post /> : null
                }
                {
                    this.state.ngos ? <Users /> : null
                }
                {
                    this.state.about ? <Text>About</Text> : null                    
                }
                {
                    this.state.contact ? <Text>under Construction</Text> : null                    
                }
            </Content>
            <Footer>
              <FooterTab style={styles.footer}>
                <Button active={this.state.post} onPress={()=> this.setState({post: true, ngos: false, about: false, contact: false, title: 'Post'})} vertical>
                  <Icon name="home" />
                  <Text>Home</Text>
                </Button>
                <Button active={this.state.ngos} onPress={()=> this.setState({post: false, ngos: true, about: false, contact: false, title: 'NGOs'})} vertical>
                  <Icon name="contacts" />
                  <Text>Users</Text>
                </Button>
                <Button active={this.state.about} onPress={()=> this.setState({post: false, ngos: false, about: true, contact: false, title: 'About'})} vertical>
                  <Icon name="settings" />
                  <Text>About</Text>
                </Button>
                <Button active={this.state.contact} onPress={this.props.logOutNow} vertical>
                  <Icon name="ionic" />
                  <Text>Logout</Text>
                </Button>
              </FooterTab>
            </Footer>
          </Container>
        );
    };
};
const styles = StyleSheet.create({
    container: {
        flex: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    wellcome: {
        fontSize: 18,
        marginLeft: 10,
    },
    footer: {
        backgroundColor: 'white',
    },
});
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

export default connect(mapStateToProp, mapDispatchToProp)(NGOHome);