import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { connect } from 'react-redux';
import { likePost } from '../store/actions';
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
    this.setState({like: true});
    let key = this.props.postsKey;
    console.log(key);
    this.props.likePost(key);
  };
  render() {
    console.log(this.props.postsKey);
    const { name, requirement, rupees, likes } = this.props.post;
    return (
      <Container style={{display: 'flex', flex: 1, height: 'auto'}}>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Text>
                  <Icon name='contacts' />              
                </Text>
                <Body>
                  <Text>{name}</Text>
                  <Text note>{rupees}</Text>
                </Body>
              </Left>
              <Right>
                    <PercentageCircle radius={20} percent={50} color={"#3498db"}></PercentageCircle>
                {/* <Body>
                  <Text>
                  </Text>
                </Body> */}
              </Right>
            </CardItem>
            <CardItem cardBody>
                <Text>{requirement}</Text>
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
                  <Icon active={this.state.comment} name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right transparent>
                <Text>DONATE</Text>
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
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(Posts);