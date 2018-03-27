import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import { likePost, dislikePost } from '../store/actions';
import PercentageCircle from 'react-native-percentage-circle';

class Posts extends Component {
  constructor(){
    super();
    this.state = {
      like: false,
      comment: false,
    };
  };
  likePost = () => {
    const { like } = this.state;
    this.setState({like: !like});
    let key = this.props.postsKey;
    if(like){
      this.props.dislikePost(key);
    }else{
      this.props.likePost(key);
    }
  };
  render() {
    console.log(this.props.postsKey);
    const { name, requirement, rupees, likes, month, year, date } = this.props.post;
    return (
      <Container style={{display: 'flex', flex: 1, height: 'auto'}}>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Text>
                  <Icon style={{ fontSize: 50 }} name='person' />              
                </Text>
                <Body>
                  <Text>{name}</Text>
                  <Text note>{month } {date}, {year}</Text>
                </Body>
              </Left>
              <Right>
                    <PercentageCircle radius={20} percent={20} color={"#3498db"}></PercentageCircle>
              </Right>
            </CardItem>
            <CardItem cardBody>
                <Text>{requirement}, it will be cost around PKR: {rupees}/-</Text>
            </CardItem>
            <CardItem>
              <Left>
                <Button onPress={this.likePost} transparent>
                  <Icon active={this.state.like} name="thumbs-up" />
                  <Text>{likes}</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active={this.state.comment} name="chatbubbles" /><Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Button transparent>
                  <Text>DONATE</Text>
                </Button>                
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  };
};

function mapStateToProp(state) {
  return ({
    // PostKeys: state.root.postKeys, 
  });
};
function mapDispatchToProp(dispatch) {
  return {
      likePost: (key) => {
          dispatch(likePost(key))
      },
      dislikePost: (key) => {
        dispatch(dislikePost(key))
      },
    };
};

export default connect(mapStateToProp, mapDispatchToProp)(Posts);