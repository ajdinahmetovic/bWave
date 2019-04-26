import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Wave from "./components/Wave";

var width = Dimensions.get('window').width;
var  height = Dimensions.get('window').height;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View>
        </View>

        <Wave ref={ref=>this._waveRect = ref}
              style={styles.wave}
              H={100}
              waveParams={[

                {A: 69, T: width, fill: '#62c2ff'},
                {A: 100, T: width + 10, fill: '#0087dc'},
                {A: 130, T: width + 0, fill: '#1aa7ff'},  

              ]}
              animated={true}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  wave: {
    width: width,
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  waveBall: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
  }

});
