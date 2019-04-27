import React from 'react';
import { StyleSheet, Text, View, Animated, Dimensions, TouchableOpacity, Image } from 'react-native';
import {Font} from "expo";
import Wave from "../components/Wave";


var width = Dimensions.get('window').width;
var  height = Dimensions.get('window').height;

export default class MainView extends React.Component {

    constructor(props){
        super(props);
        this.state={
            status: {
                color: 'red',
                value: 0,
            },

            scaleVal: new Animated.Value(1),
        }
    }

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
                <View style={{height: 102.17, width: width, flexDirection: 'row', backgroundColor: '#524FA1', alignItems: 'center'}}>

                       {this.opened()}

                    <View style={{width: width - 32.63 - 11.7 - 26.67 - 16.3, height: 102.17, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{color: 'white', fontSize: 25, fontFamily: 'montserrat'}}>
                            bWave
                        </Text>
                    </View>
                    <View style={{width: 26.7, height: 26.7, borderRadius: 100/2, backgroundColor: this.state.status.color, alignItems:'center', justifyContent: 'center'}}>
                        <Text style={{fontFamily: 'montserrat', color: 'white'}}>
                            {this.state.status.value}
                        </Text>
                    </View>
                </View>

                <Wave ref={ref=>this._waveRect = ref}
                      style={styles.wave}
                      H={150}
                      waveParams={[

                          //{A: 105, T: width -5, fill: 'rgba(253, 185, 19, 0.5)'},
                          //{A: 140, T: width +100, fill: 'rgba(0, 135, 220, 0.5)'},
                          //{P: width -100, A: 110, T: width +20, fill: 'rgba(82, 79, 161, 0.5)'},
                          {P: width -50, A: 125, T: width -10, fill: 'rgba(0, 135, 220, 0.5)'},
                          {P: width +40, A: 105, T: width +10, fill: 'rgba(253, 185, 19, 0.5)'},
                          {P: width +100, A: 105, T: width -20, fill: 'rgba(82, 79, 161, 0.5)'},
                          {A: 30, T: width, fill: 'rgba(255, 255, 255, 1)'},

                      ]}
                      animated={true}
                    //speed={5000}

                />


                <Animated.View style={[styles.buttonBack, {width: 240,height: 240, scaleXY: this.state.scale}]}>
                </Animated.View>


                <TouchableOpacity onPress={() => this.startWave()} style={{width: 174, height: 174, marginTop: height/2 - 174/2 - 102 + 56, marginLeft: width/2 - 174/2}}>
                    <Image style={{width: 174, height: 174}} source={require('../assets/play.png')}/>
                </TouchableOpacity>

            </View>
        );
    }

    startWave = () =>{

        this.props.musicPlay();

        Animated.timing(                  // Animate over time
            this.state.scaleVal,            // The animated value to drive
            {
                toValue: 500,                   // Animate to opacity: 1 (opaque)
                duration: 1000,              // Make it take a while
            }
        ).start();

    };

    opened(){
        if(!this.props.state){
            return(
                <TouchableOpacity onPress={() => this.props.openNav()} style={{width: 32.63, height: 18.77, marginLeft: 11.7}}>
                    <Image style={{width: 32.63, height: 18.77}} source={require('../assets/hamburger.png')}></Image>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },

    wave: {
        position: 'absolute',

        top: -45,
        width: width,
        zIndex: -50,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: '#524FA1',
    },

    buttonBack: {

        position: 'absolute',
        zIndex: -50,
        backgroundColor: 'rgba(109, 200, 191, 0.15)',
        borderRadius: 240/2,
        alignSelf: 'center',
        top: height/2 - 240/2 + 56,
        left: width/2 - 240/2

    }


});
