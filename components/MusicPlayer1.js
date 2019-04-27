import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";
import { Audio } from "expo";
import * as firebase from "firebase";

var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;

import Slider from "react-native-slider";
import Wave from "./Wave";

export default class MusicPlayer extends React.Component {
  static navigationOptions = {
    header: null
  };

  data = null;
  times = [];
  index = 0;
  
  audio = new Audio.Sound();

  constructor(props) {
    super(props);


    this.state = {
      status: {
        color: "red",
        value: 0
      },

      image: null,
      title: null,
      artist: null,
      currentTime: 0
    };

    firebase

    firebase.database().ref("/").once("value", result => {
        if (result.val() != null) {
          this.data = result.val();

          this.data.songs.sort((a, b) => {
            let valA = 0;
            let valB = 0;

            for (let i = 0; i < 7; i++) {
              valA += this.data[a].met[i].str;
              valB += this.data[b].met[i].str;
            }

            return valA < valB;
          });

          for (let i = 0; i < this.data.songs.length; i++) {
            //console.log(this.data[this.data.songs[i]].deezerData.title);
          }

          Audio.setIsEnabledAsync(true);

          this.audio.setOnPlaybackStatusUpdate(update => {
            if (update.didJustFinish && this.index < 22) {
                this.index += 1

                if (this.index < 0) this.index = 0

                this.audio.unloadAsync().then(() => {
                    this.audio.loadAsync({uri: this.data[this.data.songs[this.index]].deezerData.preview}).then(() => {
                        this.audio.playAsync();
                    })
                })

                this.setState({
                    currentTime: 0,
                    image: this.data[this.data.songs[this.index]].deezerData.album.cover,
                    title: this.data[this.data.songs[this.index]].deezerData.title,
                    artist: this.data[this.data.songs[this.index]].deezerData.artist.name
                })
            }

            this.state.currentTime = update.positionMillis
            this.setState({currentTime: update.positionMillis})

            // console.log(this.state.currentTime)
          });


          this.setState({
                currentTime: 0,
                image: this.data[this.data.songs[0]].deezerData.album.cover,
                title: this.data[this.data.songs[0]].deezerData.title,
                artist: this.data[this.data.songs[0]].deezerData.artist.name
            })

          this.audio
            .loadAsync({
              uri: this.data[this.data.songs[0]].deezerData.preview
            })
            .then(() => {
              this.audio.playAsync();
            });

        }
      });

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
    return (
      <View style={styles.container}>
        <View
          style={{
            height: 102.17,
            width: width,
            flexDirection: "row",
            backgroundColor: "#524FA1",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
          onPress={() => this.props.navigation.replace('DrawerContainer')}
            style={{ width: 32.63, height: 18.77, marginLeft: 11.7 }}
          >
            <Image
              style={{ width: 19, height: 19 }}
              source={require("../assets/close.png")}
            />
          </TouchableOpacity>

          <View
            style={{
              width: width - 32.63 - 11.7 - 26.67 - 16.3,
              height: 102.17,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{ color: "white", fontSize: 25, fontFamily: "montserrat" }}
            />
          </View>
          <View
            style={{
              width: 26.7,
              height: 26.7,
              borderRadius: 100 / 2,
              backgroundColor: this.state.status.color,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ fontFamily: "montserrat", color: "white" }}>
              {this.state.status.value}
            </Text>
          </View>
        </View>

        <Image
          source={{uri: this.state.image}}
          style={styles.albumCover}
        />

        <Slider
          thlumbStype={{ backgroundColor: "#EEAA04" }}
          trackStype={{ backgroundColor: "#0087DC" }}
          style={styles.slider}
          minimumValue={0}
          maximumValue={30000}
          value={this.state.currentTime}
          onValueChange={val => {this.audio.setPositionAsync(val)}}
        />

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            width: width - 45 * 2
          }}
        >
          <Text style={{ fontSize: 13, fontFamily: "montserrat" }}>0:{Math.round(this.state.currentTime / 1000)}</Text>

          <View style={{ alignSelf: "flex-end" }}>
            <Text
              style={{
                fontSize: 13,
                fontFamily: "montserrat",
                marginLeft: width - 45 * 2 - 27 * 2
              }}
            >
              0:30
            </Text>
          </View>
        </View>

        <View style={{ alignSelf: "center" }}>
          <Text
            style={{
              fontSize: 30,
              marginTop: 10,
              textAlign: 'center',
              fontFamily: "montserrat",
              color: "#707070"
            }}
          >
            {this.state.title}
          </Text>

          <Text
            style={{
              fontSize: 12,
              marginTop: 10,
              fontFamily: "montserrat",
              textAlign: "center",
              color: "#0087DC"
            }}
          >
            {this.state.artist}
          </Text>
        </View>

        <View
          style={{
            width: 165,
            height: 65,
            marginTop: 32,
            alignSelf: "center",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableOpacity
            onPress={() => {this.audio.setPositionAsync(31000);this.index -= 2}}>
            <Image
              style={{ width: 33, height: 22 }}
              source={require("../assets/previousIco.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ marginLeft: 18, marginRight: 18 }}>
            <Image
              style={{ width: 60, height: 60 }}
              source={require("../assets/playIco.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
          onPress={() => {this.audio.setPositionAsync(31000)}}>
            <Image
              style={{ width: 33, height: 22 }}
              source={require("../assets/nextIco.png")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", width: width }}>
          <TouchableOpacity
            style={{ width: 23, height: 17, position: "absolute", left: 33 }}
          >
            <Image
              style={{ width: 23, height: 17 }}
              source={require("../assets/list.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Chart',{
              title: this.state.title,
              artist: this.state.artist
            })}
            style={{ width: 33, height: 22, position: "absolute", right: 33 }}
          >
            <Image
              style={{ width: 33, height: 22 }}
              source={require("../assets/brain.png")}
            />
          </TouchableOpacity>
        </View>

        <Wave
          ref={ref => (this._waveRect = ref)}
          style={styles.wave}
          H={150}
          waveParams={[
            //{A: 105, T: width -5, fill: 'rgba(253, 185, 19, 0.5)'},
            {
              P: width + 50,
              A: 60,
              T: width + 10,
              fill: "rgba(253, 185, 19, 0.5)"
            },
            { A: 80, T: width + 100, fill: "rgba(0, 135, 220, 0.5)" },
            {
              P: width - 50,
              A: 100,
              T: width - 20,
              fill: "rgba(82, 79, 161, 0.68)"
            }
            //{A: 30, T: width, fill: 'rgba(255, 255, 255, 1)'},
          ]}
          animated={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },

  albumCover: {
    position: "absolute",
    top: 80,
    width: 274,
    height: 274,
    zIndex: 50,
    borderRadius: 17,
    left: width / 2 - 274 / 2
  },

  slider: {
    alignSelf: "center",
    marginTop: 241 + 35,
    width: width - 45 * 2
  },

  wave: {
    position: "absolute",
    bottom: -100,
    width: width,
    zIndex: -50,
    aspectRatio: 1,
    overflow: "hidden",
    backgroundColor: "transparent"
  },

  waveTop: {
    position: "absolute",
    top: 80,
    width: width,
    zIndex: -50,
    aspectRatio: 1,
    overflow: "hidden",
    backgroundColor: "transparent"
  }
});
