import React, { Component } from 'react';
import { StyleSheet, BackHandler, Keyboard, AppState } from 'react-native';
import CustomHeader from './header';
import { Actions } from 'react-native-router-flux'; // New code
import { connect } from 'react-redux';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Right,
    Item, Input, Label, Fab, Card, Form } from 'native-base';
import { logOutNow, GetData, Donate, Requirement } from '../store/actions';
import Posts from './posts';
import NGOs from './ngos';
import About from './about';
import Spinner from './spinner';
import PopupDialog from 'react-native-popup-dialog';
import PushNotification from 'react-native-push-notification';
import * as firebase from 'firebase';

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
            active: false,
            requirement: '',
            rupees: '',
        };
    };
    static navigationOptions = {
        header: null,
    };
    componentWillMount(){
        this.props.GetData();
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp()
        });
    };
    logOut = () => {
        this.props.logOutNow();
    };
    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        PushNotification.configure({
            onNotification: function (notification) {
                console.log('NOTIFICATION:', notification);
            }
        })
    }
    showPopup = () => {
        this.popupDialog.show();
    };
    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange)
        
    }
    handleAppStateChange = (AppState) => {
        if (AppState === 'background') {
            console.log('background')

            firebase.database().ref(`/notifications/`).on('value', data => {
                let dbdata = data.val()
                for (let key in dbdata) {
                    let notifications = dbdata[key]
                    // console.log(notifications)
                    if (notifications) {
                        PushNotification.localNotificationSchedule({
                            message: `${notifications.name} Posted in Money Donor`,
                            date: new Date(Date.now() + (1 * 1000))
                        });
                    }
                }
            })
        }
    }
    cancelButton = () => {
        Keyboard.dismiss();                        
        this.popupDialog.dismiss();                     
    };
    donateRupees = () => {
        const { number } = this.state;
        Keyboard.dismiss();                
        if(number){
            let key = this.props.popupdata.key;
            let obj = { key, number };
            this.props.Donate(obj);
            this.popupDialog.dismiss(() => {
                alert('Successfully Donate:', number); 
            });        
            this.setState({number: ''});    
        }else{
            alert('Please enter amount!');
        }
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
            this.popupDialog1.dismiss();
            Keyboard.dismiss();                                    
            this.props.Requirement(data);
        }else{
            alert('Please Enter all fields!');
        }
    };
    render() {
        // const title = this.props.user.userName;
        console.log(this.props.allPosts);
        return (
            <Container>
                <CustomHeader title={this.state.title} title2='Logout' />
                <PopupDialog
                    dialogStyle={{ borderRadius: -10, marginBottom: 220 }}
                    width={'70%'}
                    height={'35%'}
                    dialogTitle={<Text style={styles.dialogTitle}>Selected Cash Option</Text>}
                    ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                >
                    <Content style={{ padding: 20 }}>
                        <Text style={{ color: 'rgba(0,0,0,0.3)' }}>estimated cost {this.props.popupdata.rupees}, please enter your donation amount</Text>
                        <Item style={{ width: '95%', color: 'rgba(0,0,0,0.3)' }} floatingLabel>
                            <Label style={{ color: 'rgba(0,0,0,0.3)', marginBottom: 8 }}>Please enter the amount</Label>
                            <Input style={{ height: 40 }} value={this.state.number} keyboardType='numeric' onChangeText={(text) => this.setState({ number: text.trim() })} />
                        </Item>
                    </Content>
                    <Right style={{ marginRight: -100, flexDirection: 'row' }}>
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
                        this.state.posts ? <Content style={{ margin: 5 }}>
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
                <PopupDialog
                    dialogStyle={{ borderRadius: -10, marginBottom: 220 }}
                    width={'70%'}
                    height={'35%'}
                    // dialogTitle={<Text>Post</Text>}
                    ref={(popupDialog1) => { this.popupDialog1 = popupDialog1; }}
                >
                    {/* <Card style={{ height: 'auto', padding: 5 }}> */}
                        <Form>
                            <Item>
                                {/* <Label>Post Your requirement...</Label> */}
                                <Input value={this.state.requirement} placeholder='Post Your requirement...' onChangeText={(text) => this.setState({ requirement: text })} />
                            </Item>
                            <Item>
                                {/* <Label>Enter Rupees...</Label> */}
                                <Input placeholder='Enter Rupees...' value={this.state.rupees} keyboardType='numeric' onChangeText={(text) => this.setState({ rupees: text })} />
                            </Item>
                            <Button onPress={this.submit} style={{ margin: 10 }} full>
                                <Text>Post</Text>
                            </Button>
                        </Form>
                    {/* </Card> */}
                </PopupDialog>
                {
                    this.props.ngo === 'NGO' ? <Fab
                        active={this.state.active}
                        containerStyle={{ marginBottom: '12%' }}
                        style={{ backgroundColor: '#673bb7' }}
                        position="bottomRight"
                        onPress={() => this.popupDialog1.show()}>
                        <Icon name="add" />
                    </Fab>
                        : null
                }
                <Footer>
                    <FooterTab style={{ backgroundColor: 'white' }}>
                        <Button onPress={() => this.setState({active: true, posts: true, ngos: false, about: false, contact: false, title: 'Home' })} vertical>
                            <Icon style={this.state.posts ? { color: '#4A86C5' } : { color: '#AAAAAA' }} name="home" />
                            <Text style={this.state.posts ? { color: '#4A86C5' } : { color: '#AAAAAA' }}>Home</Text>
                        </Button>
                        <Button onPress={() => this.setState({active: false, posts: false, ngos: true, about: false, contact: false, title: 'NGOs' })} vertical>
                            <Icon style={this.state.ngos ? { color: '#4A86C5' } : { color: '#AAAAAA' }} name="contacts" />
                            <Text style={this.state.ngos ? { color: '#4A86C5' } : { color: '#AAAAAA' }}>NGOs</Text>
                        </Button>
                        <Button onPress={() => this.setState({active: false, posts: false, ngos: false, about: true, contact: false, title: 'About' })} vertical>
                            <Icon style={this.state.about ? { color: '#4A86C5' } : { color: '#AAAAAA' }} name="settings" />
                            <Text style={this.state.about ? { color: '#4A86C5' } : { color: '#AAAAAA' }}>About</Text>
                        </Button>
                        <Button onPress={() => this.setState({active: false,  posts: false, ngos: false, about: false, contact: true, title: 'Contacts' })} vertical>
                            <Icon style={this.state.contact ? { color: '#4A86C5' } : { color: '#AAAAAA' }} name="people" />
                            <Text style={this.state.contact ? { color: '#4A86C5' } : { color: '#AAAAAA' }}>Contact</Text>
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
        ngo: state.root.NGO,
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
        Requirement: (data) => {
            dispatch(Requirement(data))
        },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Home);