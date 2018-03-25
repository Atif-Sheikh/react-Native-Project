import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeader = ({ title,title2 }) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'white'}}>
        <Text style={styles.Text}> {title} </Text>
        <Text style={styles.Text1}> {title2} </Text>
    </View>
)

CustomHeader.propTypes = {
    title: PropTypes.string
}

export default CustomHeader;

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
        margin: 12,
        alignSelf: 'flex-end',  
        // alignItems: "right"
    },
});