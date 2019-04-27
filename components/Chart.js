import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';

var width = Dimensions.get('window').width;
var  height = Dimensions.get('window').height;

import Slider from "react-native-slider";
import Wave from "./Wave";


export default class Chart extends React.Component {

    static navigationOptions = {
        header: null
    };


    constructor(props){
        super(props);

        this.state={
            status: {
                color: 'red',
                value: 0,
            },
        }
    }


    render() {
        return (
            <View style={styles.container}>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },



});
