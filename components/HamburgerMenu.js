import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Font} from "expo";
import Wave from "../components/Wave";

var width = Dimensions.get('window').width;
var  height = Dimensions.get('window').height;

export default class HamburgerMenu extends React.Component {

   async componentDidMount() {
        await Font.loadAsync({
            'montserrat': require('../assets/Montserrat-Regular.ttf'),
            'montserrat-bold': require('../assets/Montserrat-Bold.ttf'),
            'montserrat-thin': require('../assets/Montserrat-Thin.ttf'),
        });
    }



    render() {
        return (
            <View style={styles.container}>


                <View style={{height: 102.17, justifyContent: 'center',  alignItems: 'flex-end', alignSelf: 'flex-end', width: width-100}}>

                    <View style={{width: width - 100, alignItems: 'flex-end', alignSelf: 'flex-end',}}>

                        <TouchableOpacity style={{height: 19, width: 19}} onPress={() => this.props.closeNav()}>
                            <Image style={{height: 19, width: 19}} source={require('../assets/close.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>



                <View style={styles.containerW}>

                    <TouchableOpacity  onPress={() =>  this.props.openCatch()}>
                    <Text style={styles.txtStyle}>
                        Wave Catch
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>  this.props.openFav()}>

                    <Text style={styles.txtStyle}>
                        Favorite
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>

                    <Text style={styles.txtStyle}>
                        Playlists
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>

                    <Text style={styles.txtStyle}>
                        About
                    </Text>
                    </TouchableOpacity>
                </View>


                <Wave ref={ref=>this._waveRect = ref}
                      style={styles.wave}
                      H={150}
                      waveParams={[

                          //{A: 105, T: width -5, fill: 'rgba(253, 185, 19, 0.5)'},
                          //{A: 140, T: width +100, fill: 'rgba(0, 135, 220, 0.5)'},
                          //{P: width -100, A: 110, T: width +20, fill: 'rgba(82, 79, 161, 0.5)'},

                          {P: width -50, A: 125, T: width -10, fill: 'rgba(0, 135, 220, 0.8)'},
                          {P: width +40, A: 105, T: width +10, fill: 'rgba(253, 185, 19, 0.8)'},
                          {P: width +100, A: 105, T: width -20, fill: 'rgba(82, 79, 161, 0.8)'},

                          {A: 30, T: width, fill: 'rgba(255, 255, 255, 1)'},

                      ]}
                      animated={true}
                    //speed={5000}

                />



            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#524FA1',
    },
    containerW:{
        width: width - 30 - 100,
        height: height - 59*2,
        borderRadius: 44,
        backgroundColor: 'transparent'
    },

    txtStyle: {
        margin: 5,
        color: 'white',
        textAlign: 'right',
        fontSize: 30,
        fontFamily: 'montserrat-bold'
    },

    wave: {
        position: 'absolute',
        bottom: 0,
        width: width,
        zIndex: -50,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: '#524FA1',
    },
});
