import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { logOutNow, GetNGOData } from '../store/actions';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Spinner } from 'native-base';
import Post from './post';
import Users from './users';
import NGOSPosts from './ngosPosts';

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
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress',  function(){
            BackHandler.exitApp()
        });
    };
    componentDidMount(){
        this.props.GetNGOData();
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
                    this.state.about ? <Content style={{margin: 5}}>
                        {
                            this.props.allPosts ? this.props.allPosts.map((post, index) => {
                                return <NGOSPosts showPopup={this.showPopup} postsKey={this.props.postKeys[index]} post={post} key={index} />
                            }) : <Spinner />
                        }
                    </Content> : null                     
                }
                {
                    this.state.contact ? <Text>under Construction</Text> : null                    
                }
            </Content>
            <Footer>
              <FooterTab style={styles.footer}>
                <Button onPress={()=> this.setState({post: true, ngos: false, about: false, contact: false, title: 'Post'})} vertical>
                  <Icon style={this.state.post ? {color:'#4A86C5'} : {color:'#AAAAAA'}} name="home" />
                  <Text style={this.state.post ? {color:'#4A86C5'} : {color:'#AAAAAA'}}>Home</Text>
                </Button>
                <Button onPress={()=> this.setState({post: false, ngos: true, about: false, contact: false, title: 'Users'})} vertical>
                  <Icon style={this.state.ngos ? {color:'#4A86C5'} : {color:'#AAAAAA'}} name="contacts" />
                  <Text style={this.state.ngos ? {color:'#4A86C5'} : {color:'#AAAAAA'}}>Users</Text>
                </Button>
                <Button onPress={()=> this.setState({post: false, ngos: false, about: true, contact: false, title: 'About'})} vertical>
                  <Icon style={this.state.about ? {color:'#4A86C5'} : {color:'#AAAAAA'}} name="settings" />
                  <Text style={this.state.about ? {color:'#4A86C5'} : {color:'#AAAAAA'}}>About</Text>
                </Button>
                <Button onPress={this.props.logOutNow} vertical>
                  <Icon style={{color: '#AAAAAA'}} name="ionic" />
                  <Text style={{color: '#AAAAAA'}}>Logout</Text>
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
        allPosts: state.root.ngosPosts,
        postKeys: state.root.ngosPostsKeys, 
    });
};
function mapDispatchToProp(dispatch) {
    return {
        logOutNow: () => {
            dispatch(logOutNow())
        },
        GetNGOData: () => {
            dispatch(GetNGOData())
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(NGOHome);