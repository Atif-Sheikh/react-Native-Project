import React, { Component } from 'react';
import {
  Container, Header, Content, Card, CardItem,
  Thumbnail, ActionSheet, Text, Button, Icon, Left, Body, Right
} from 'native-base';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { likePost, MessageKey, Popupdata } from '../store/actions';
import { Actions } from 'react-native-router-flux';
import PercentageCircle from 'react-native-percentage-circle';
import Messages from './comments';
// import PopupDialog from 'react-native-popup-dialog';

class WithoutAuthPosts extends Component {
  constructor() {
    super();
    this.state = {
      like: 'active',
      comment: false,
      clicked: false,
    };
  };
  toggleState = () => {
    this.setState({ comment: false });
  };
  renderMessage = (requirement, rupees) => {
    let key = this.props.postsKey;
    let obj = { requirement, key, rupees };
    this.props.MessageKey(obj);
    Actions.message();
  };
  render() {
    console.log(this.props.post);
    const { name, requirement, rupees, likes, month, year, date, comments, donation } = this.props.post;
    var BUTTONS = ['via Product',
      'via Cheque / Cash',
      'via Online Payment',
      'On Donate Page', "Cancel"];
    var DESTRUCTIVE_INDEX = 3;
    var CANCEL_INDEX = 4;
    let donationCircle = Math.floor((donation / rupees) * 100);
    if(donationCircle > 100){
      donationCircle = 100;
    };
    return (
      <Container style={{ display: 'flex', flex: 1, height: 'auto' }}>
        {
          <Content>
            <Card>
              <CardItem>
                <Left>
                  <Icon style={{ fontSize: 50, color: '#4A86C5' }} name='contact' />
                  <Body>
                    <Text>{name}</Text>
                    <Text note>{month} {date}, {year}</Text>
                  </Body>
                </Left>
                <Right>
                  <PercentageCircle radius={20} percent={donationCircle} color={"#3498db"}></PercentageCircle>
                </Right>
              </CardItem>
              <CardItem cardBody>
                <Text style={{ margin: 5 }}>{requirement}, it will be cost around PKR: {rupees}/-</Text>
              </CardItem>
              <CardItem style={{display: 'flex', justifyContent: 'space-between'}}>
                <Left>
                  <Button onPress={() => alert('Please Login')} transparent>
                    <Icon active name="thumbs-up" />
                    <Text>{likes}</Text>
                  </Button>
                </Left>
                <Body>
                  <Button style={{ width: '115%' }} onPress={() => this.renderMessage(requirement, rupees)} transparent>
                    <Icon active={this.state.comment} name="chatboxes" /><Text>{comments} COMMENTS</Text>
                  </Button>
                </Body>
                <Right>
                  <Button onPress={() => alert('Please Login')}transparent>
                    <Text>DONATE</Text>
                  </Button>
                </Right>
              </CardItem>
            </Card>
          </Content>
        }
      </Container>
    );
  };
};

function mapStateToProp(state) {
  return ({
    // length: state.root.length,
    // PostKeys: state.root.postKeys, 
  });
};
function mapDispatchToProp(dispatch) {
  return {
    // likePost: (key) => {
    //   dispatch(likePost(key))
    // },
    MessageKey: (obj) => {
      dispatch(MessageKey(obj))
    },
    // Popupdata: (obj) => {
    //   dispatch(Popupdata(obj))
    // },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(WithoutAuthPosts);