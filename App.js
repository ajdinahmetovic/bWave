import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation'

import { Font } from 'expo';
import DrawerContainer from "./DrawerContainer";
import MusicPlayer from "./components/MusicPlayer";
import Chart from "./components/Chart";
import WaveCatch from "./components/WaveCatch";
import MusicPlayer1 from "./components/MusicPlayer1";


var width = Dimensions.get('window').width;
var  height = Dimensions.get('window').height;


const Routes = createStackNavigator ({

    DrawerContainer: {
        screen: DrawerContainer
    },
    MusicPlayer: {
        screen: MusicPlayer
    },

    Chart: {
        screen: Chart
    },

    WaveCatch: {
        screen: WaveCatch
    },

    MusicPlayer1: {
        screen: MusicPlayer1
    },








});

 class App extends React.Component {

    constructor(props) {
        super(props);

        this.state={

        };

    }





  render() {

    return (
        <DrawerContainer/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },

});


export default createAppContainer(Routes);
