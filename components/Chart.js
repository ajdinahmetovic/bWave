import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { AreaChart, Path } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import Wave from "./Wave";
import * as firebase from "firebase"


var width = Dimensions.get('window').width;
var  height = Dimensions.get('window').height;


const names = ['INTEREST', 'STRESS', 'RELAXATION', 'EXCITEMENT', 'ENGAGEMENT', 'LONG TERM EXCITEMENT', 'FOCUS'];
const nms = ['int', 'str', 'rel', 'exc', 'eng', 'lex', 'foc']


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
            curr: 0,
            data: [ 0, 0, 0, 0, 0, 0, 0, 0]
        }
        this.back = this.back.bind(this);
        this.forward = this.forward.bind(this);

        firebase.database().ref("met").on("value", result => {
            if (result.val() != null) {
                let data = this.state.data

                for (let i = 0; i < 7; i++) {
                    data[i] = data[i + 1]    
                }

                data[7] = result.val()[nms[this.state.curr]]

                this.setState({data: data})
            }
        })

        firebase.database().ref("dev").on("value", result => {
            if (result.val() != null) {
                console.log(result.val())

                let sum = result.val().iee_chan_af3 + result.val().iee_chan_af4 + result.val().iee_chan_pz + result.val().iee_chan_t7 + result.val().iee_chan_t8;

                let value = Math.round(100 * (sum / 20))

                this.setState({status: {
                    value: value,
                    color: (value >= 80 ? "green" : (value >= 50 ? "orange" : "red"))
                }})
            }
        })
    }


    render() {
        const Line = ({ line }) => (
            <Path
                key={ 'line ' }
                d={ line }
                strokeWidth={5}
                stroke={ 'rgba(238, 170, 4, 1)' }
                fill={ 'none' }
            />
        );


        return (


            <View style={styles.container}>


                <View style={{height: 102.17, width: width, flexDirection: 'row', backgroundColor: '#524FA1', alignItems: 'center'}}>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{width: 32.63, height: 18.77, marginLeft: 11.7}}>
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

                <View>
                    <AreaChart
                        style={{ height: 261 }}
                        data={ this.state.data }
                        svg={{ fill: 'rgba(238, 170, 4, 0.1)' }}
                        curve={ shape.curveNatural }
                        gridMax={ 1 }
                        gridMin={ 0 }>
                        <Line/>
                    </AreaChart>

                    <View style={{width: width, height: 90, backgroundColor: 'rgba(238, 170, 4, 0.1)', alignItems: 'center', justifyContent: 'center'}}>

                        <View style={{flexDirection: 'row'}}>

                            <TouchableOpacity onPress={() => this.back()}>
                                <Image style={{height: 40, width: 25}} source={require('../assets/left.png')}/>
                            </TouchableOpacity>


                            <Text style={{fontSize: 20, fontFamily: 'montserrat', alignSelf: 'center', marginRight: 5, marginLeft: 5}}>
                                {names[this.state.curr]}
                            </Text>


                            <TouchableOpacity onPress={() => this.forward()}>
                                <Image style={{height: 40, width: 25}} source={require('../assets/right.png')}/>
                            </TouchableOpacity>



                        </View>

                    </View>

                </View>


                <View style={{alignSelf: 'center', marginTop: 20}}>

                    <Text style={{fontSize: 34, marginTop: 10, fontFamily: 'montserrat', color: '#707070'}}>
                        {this.props.navigation.getParam("title")}
                    </Text>

                    <Text style={{fontSize: 12, marginTop: 10, fontFamily: 'montserrat', textAlign: 'center', color: '#0087DC'}}>
                        {this.props.navigation.getParam("artist")}
                    </Text>

                </View>

                <View style={{flexDirection: 'row', width: width, marginTop: 25}}>

                    <TouchableOpacity style={{width: 23, height: 17, position: 'absolute', left: 33}}>
                        <Image style={{width: 23, height: 17}} source={require('../assets/list.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{width: 38, height: 38, position: 'absolute', right: 33}}>
                        <Image style={{width: 38, height: 38}} source={require('../assets/clicked_brain.png')}/>
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

    back(){
        this.setState({data: [ 0, 0, 0, 0, 0, 0, 0, 0]})

        if(this.state.curr === 0){
            this.setState({curr: 6})
        } if (this.state.curr > 0){
            let a = this.state.curr-1;
            this.setState({curr: a})
        }
        //console.log('cur', this.state.curr)
    }

    forward(){
        this.setState({data: [ 0, 0, 0, 0, 0, 0, 0, 0]})

        if(this.state.curr === 6){
            this.setState({curr: 0})
        } else if (this.state.curr >= 0){
            let a = this.state.curr+1;

            //console.log('cur', a)
            this.setState({curr: a})
        }


    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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



});