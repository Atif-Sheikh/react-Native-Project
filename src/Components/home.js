import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';
import { logOutNow, GetData } from '../store/actions';
import Posts from './posts';
import NGOs from './ngos';
import About from './about';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            title: 'Home',
            posts: true,
            ngos: false,
            about: false,
            contact: false,
        };
    };
    static navigationOptions = {
        header: null,
    };
    logOut = () => {
        this.props.logOutNow();
    };
    componentDidMount(){
        this.props.GetData();
    };
    render() {
        // const title = this.props.user.userName;
        // console.log(this.props.postKeys);
        return (
            <Container>
            <CustomHeader title={this.state.title} />
            <Content>
                {
                    this.state.posts ? <Content>
                        {
                            this.props.allPosts ? this.props.allPosts.map((post, index) => {
                                return <Posts postsKey={this.props.postKeys[index]} post={post} key={index} />
                            }) : ''
                        }
                    </Content> : null
                }
                {
                    this.state.ngos ? <NGOs /> : null
                }
                {
                    this.state.about ? <About /> : null                    
                }
                {
                    this.state.contact ? <Text>under Construction</Text> : null                    
                }
            </Content>
            <Footer>
              <FooterTab style={{backgroundColor: 'white'}}>
                <Button onPress={()=> this.setState({posts: true, ngos: false, about: false, contact: false, title: 'Home'})} vertical>
                  <Icon style={this.state.posts ? {color:'#4A86C5'} : '#ACACAC'} name="home" />
                  <Text>Home</Text>
                </Button>
                <Button onPress={()=> this.setState({posts: false, ngos: true, about: false, contact: false, title: 'NGOs'})} vertical>
                  <Icon style={this.state.ngos ? {color:'#4A86C5'} : '#ACACAC'} name="people" />
                  <Text>NGOs</Text>
                </Button>
                <Button onPress={()=> this.setState({posts: false, ngos: false, about: true, contact: false, title: 'About'})} vertical>
                  <Icon style={this.state.about ? {color:'#4A86C5'} : '#ACACAC'} name="settings" />
                  <Text>About</Text>
                </Button>
                <Button onPress={this.props.logOutNow} vertical>
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
        marginLeft: 10
    },
    footer: {
        // backgroundColor: 'white',
    },
});

function mapStateToProp(state) {
    return ({
        user: state.root.user,
        allPosts: state.root.allPosts,
        postKeys: state.root.keys, 
    });
};
function mapDispatchToProp(dispatch) {
    return {
        logOutNow: () => {
            dispatch(logOutNow())
        },
        GetData: () => {
            dispatch(GetData())
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);