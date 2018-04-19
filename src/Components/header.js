import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { logOutNow } from '../store/actions';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

logoutFunc = () => {
    firebase.auth().signOut().then(() => {
        Actions.login();
    });
};
toggleButton = (text) => {
    if(text === 'Login'){
        return <Button onPress={() => Actions.login()} style={styles.Text1} transparent>
            <Text>{text}</Text>
        </Button>
    }else if(text === 'Logout'){
        return <Button onPress={this.logoutFunc} style={styles.Text1} transparent>
            <Text>{text}</Text>
        </Button>
    }
};
const CustomHeader = ({ title, title2 }) => (
    <View style={{height: 60, width: '100%', flexDirection: 'row', backgroundColor: '#F9F9FB',justifyContent: 'space-between'}}>
        <Text style={styles.Text}> {title} </Text>
        {this.toggleButton(title2)}
    </View>
);

CustomHeader.propTypes = {
    title: PropTypes.string
};

function mapStateToProp(state) {
    return ({
        // users: state.root.users,             
    });
};
function mapDispatchToProp(dispatch) {
    return {
        logOutNow: () => {
            dispatch(logOutNow())
        },
    };
};
export default connect(mapStateToProp, mapDispatchToProp)(CustomHeader);

const styles = StyleSheet.create({
    Text: {
        color: "black",
        fontSize: 24,
        margin: 12,
        alignSelf: 'flex-start',  
    },
    Text1: {
        color: "#fff",
        fontSize: 24,
        // margin: 12,
        alignSelf: 'center',  
        marginRight: 10,
    },
});