import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';

var width = Dimensions.get('window').width;
var  height = Dimensions.get('window').height;

import Slider from "react-native-slider";
import Wave from "./Wave";


export default class MusicPlayer extends React.Component {

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

                <View style={{height: 102.17, width: width, flexDirection: 'row', backgroundColor: '#524FA1', alignItems: 'center'}}>

                    <TouchableOpacity style={{width: 32.63, height: 18.77, marginLeft: 11.7}}>
                        <Image style={{width: 19, height: 19}} source={require('../assets/close.png')}></Image>
                    </TouchableOpacity>

                    <View style={{width: width - 32.63 - 11.7 - 26.67 - 16.3, height: 102.17, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 25, fontFamily: 'montserrat'}}>

                        </Text>
                    </View>
                    <View style={{width: 26.7, height: 26.7, borderRadius: 100/2, backgroundColor: this.state.status.color, alignItems:'center', justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'montserrat', color: 'white'}}>
                            {this.state.status.value}
                        </Text>
                    </View>
                </View>

                <Image source={{uri: 'http://cdn-images.deezer.com/images/cover/2e018122cb56986277102d2041a592c8/120x120-000000-80-0-0.jpg'}} style={styles.albumCover}/>


                <Slider trackStyle={{backgroundColor: '#EEAA04'}} thumbStyle={{backgroundColor: '#0087DC'}} style={styles.slider}/>

                <View style={{flexDirection: 'row',  alignSelf: 'center', width: width - 45*2}}>

                    <Text style={{fontSize: 13, fontFamily: 'montserrat'}}>
                        0:00
                    </Text>

                    <View style={{alignSelf: 'flex-end'}}>
                        <Text style={{fontSize: 13,  fontFamily: 'montserrat', marginLeft: width - 45*2 - 27*2 }}>
                            3:57
                        </Text>
                    </View>
                </View>

                <View style={{alignSelf: 'center'}}>

                    <Text style={{fontSize: 34, marginTop: 10, fontFamily: 'montserrat', color: '#707070'}}>
                        Ime pjesme
                    </Text>

                    <Text style={{fontSize: 12, marginTop: 10, fontFamily: 'montserrat', textAlign: 'center', color: '#0087DC'}}>
                        Izvodjac
                    </Text>

                </View>


                <View style={{width: 165, height: 65, marginTop: 32, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                    <TouchableOpacity>
                        <Image style={{width: 33, height: 22}} source={require('../assets/previousIco.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginLeft: 18, marginRight: 18}}>
                        <Image style={{width: 60, height: 60,}} source={require('../assets/playIco.png')}/>
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <Image style={{width: 33, height: 22}} source={require('../assets/nextIco.png')}/>
                    </TouchableOpacity>

                </View>

                <View style={{flexDirection: 'row', width: width}}>

                    <TouchableOpacity style={{width: 23, height: 17, position: 'absolute', left: 33}}>
                        <Image style={{width: 23, height: 17}} source={require('../assets/list.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={{width: 33, height: 22, position: 'absolute', right: 33}}>
                        <Image style={{width: 33, height: 22}} source={require('../assets/brain.png')}/>
                    </TouchableOpacity>

                </View>


                <Wave
                    ref={ref=>this._waveRect = ref}
                    style={styles.wave}
                    H={150}
                    waveParams={[

                        //{A: 105, T: width -5, fill: 'rgba(253, 185, 19, 0.5)'},
                        {P: width +50, A: 60, T: width +10, fill: 'rgba(253, 185, 19, 0.5)'},
                        {A: 80, T: width +100, fill: 'rgba(0, 135, 220, 0.5)'},
                        {P: width -50, A: 100, T: width -20, fill: 'rgba(82, 79, 161, 0.68)'},
                        //{A: 30, T: width, fill: 'rgba(255, 255, 255, 1)'},

                    ]}
                    animated={true}/>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    albumCover: {
        position: 'absolute',
        top: 80,
        width: 274,
        height: 274,
        zIndex: 50,
        borderRadius: 17,
        left: width/2 - 274/2
    },

    slider: {
        alignSelf: 'center',
        marginTop: 241 + 35,
        width: width - 45*2
    },

    wave: {
        position: 'absolute',
        bottom: -100,
        width: width,
        zIndex: -50,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },

    waveTop: {
        position: 'absolute',
        top: 80,
        width: width,
        zIndex: -50,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },


});
