import React, { Component } from 'react';
import { StyleSheet, BackHandler, Keyboard } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Right,
    Item, Input, Label, Fab, Card, Form } from 'native-base';
import { getAllData, GetData } from '../store/actions';
import WithoutAuthPosts from './withoutAuthPosts';

class WithoutAuth extends Component {
    constructor(){
        super();
        this.state = {
            title: 'Home',
            posts: true,
        };
    };
    static navigationOptions = {
        header: null,
    };
    componentWillMount(){
        this.props.GetData();
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        });        
    };
    render() {
        // const title = this.props.user.userName;
        console.log(this.props.allPosts);
        return (
            <Container>
            <CustomHeader title={this.state.title} title2='Login' />
            <Content>
                {
                    this.state.posts ? <Content style={{margin: 5}}>
                        {
                            this.props.allPosts ? this.props.allPosts.map((post, index) => {
                                return <WithoutAuthPosts postsKey={this.props.postKeys[index]} post={post} key={index} />
                            }) : null
                        }
                    </Content> : null
                }
            </Content>
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
        backgroundColor: '#AAAAAA',
    },
    dialogTitle: {
        padding: 20, 
        fontWeight: 'bold', 
        fontSize: 25
    },
});

function mapStateToProp(state) {
    return ({ 
        postKeys: state.root.keys, 
        allPosts: state.root.allPosts,        
    });
};
function mapDispatchToProp(dispatch) {
    return {
        GetData: () => {
            dispatch(GetData())
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(WithoutAuth);