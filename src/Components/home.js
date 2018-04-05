import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Right,
    Item, Input, Label } from 'native-base';
import { logOutNow, GetData, Donate } from '../store/actions';
import Posts from './posts';
import NGOs from './ngos';
import About from './about';
import Spinner from './spinner';
import PopupDialog from 'react-native-popup-dialog';

class Home extends Component {
    constructor(){
        super();
        this.state = {
            title: 'Home',
            posts: true,
            ngos: false,
            about: false,
            contact: false,
            number: '',
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
    showPopup = () => {
        this.popupDialog.show();
    };
    cancelButton = () => {
        this.popupDialog.dismiss();                     
    };
    donateRupees = () => {
        const { number } = this.state;
        if(number){
            let key = this.props.popupdata.key;
            let obj = { key, number };
            this.props.Donate(obj);
            this.popupDialog.dismiss(() => {
                alert('Successfully Donate:', number); 
            });            
        }else{
            alert('Please enter amount!');
        }
    };
    render() {
        // const title = this.props.user.userName;
        // console.log(this.props.popupdata);
        return (
            <Container>
            <CustomHeader title={this.state.title} />
                <PopupDialog
                    dialogStyle={{borderRadius: -10, marginBottom: 200}}
                    width={'70%'}
                    height={'35%'}
                    dialogTitle={<Text style={styles.dialogTitle}>Selected Cash Option</Text>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                >
                <Content style={{padding: 20}}>
                    <Text style={{color: 'rgba(0,0,0,0.3)'}}>estimated cost {this.props.popupdata.rupees}, please enter your donation amount</Text>
                    <Item style={{width: '95%', color: 'rgba(0,0,0,0.3)'}} floatingLabel>
                        <Label style={{color: 'rgba(0,0,0,0.3)'}}>Please enter the amount</Label>
                        <Input keyboardType='numeric' onChangeText={(text)=> this.setState({number: text.trim()})} /> 
                    </Item>
                </Content>
                <Right style={{marginRight: -100, flexDirection: 'row'}}>
                    <Button onPress={this.cancelButton} transparent>
                        <Text>Cancel</Text>
                    </Button>
                    <Button onPress={this.donateRupees} transparent>
                        <Text>Save</Text>
                    </Button>
                </Right>
                </PopupDialog>
            <Content>
                {
                    this.state.posts ? <Content style={{margin: 5}}>
                        {
                            this.props.allPosts ? this.props.allPosts.map((post, index) => {
                                return <Posts showPopup={this.showPopup} postsKey={this.props.postKeys[index]} post={post} key={index} />
                            }) : <Spinner />
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
                  <Icon style={this.state.posts ? {color:'#4A86C5'} : {color:'#AAAAAA'}} name="home" />
                  <Text style={this.state.posts ? {color:'#4A86C5'} : {color:'#AAAAAA'}}>Home</Text>
                </Button>
                <Button onPress={()=> this.setState({posts: false, ngos: true, about: false, contact: false, title: 'NGOs'})} vertical>
                  <Icon style={this.state.ngos ? {color:'#4A86C5'} : {color:'#AAAAAA'}} name="people" />
                  <Text style={this.state.ngos ? {color:'#4A86C5'} : {color:'#AAAAAA'}}>NGOs</Text>
                </Button>
                <Button onPress={()=> this.setState({posts: false, ngos: false, about: true, contact: false, title: 'About'})} vertical>
                  <Icon style={this.state.about ? {color:'#4A86C5'} : {color:'#AAAAAA'}} name="settings" />
                  <Text style={this.state.about ? {color:'#4A86C5'} : {color:'#AAAAAA'}}>About</Text>
                </Button>
                <Button onPress={this.props.logOutNow} vertical>
                  <Icon style={{color:'#AAAAAA'}} name="ionic" />
                  <Text style={{color:'#AAAAAA'}}>Logout</Text>
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
        user: state.root.user,
        allPosts: state.root.allPosts,
        postKeys: state.root.keys, 
        popupdata: state.root.popupdata, 
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
        Donate: (obj) => {
            dispatch(Donate(obj))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);