import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import Wave from "./components/Wave";

var width = Dimensions.get('window').width;
var  height = Dimensions.get('window').height;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

          <View style={{height: 102.17, width: width, flexDirection: 'row', backgroundColor: '#524FA1', alignItems: 'center'}}>

              <TouchableOpacity style={{width: 32.63, height: 18.77, marginLeft: 11.7}}>

                  <Image style={{width: 32.63, height: 18.77}} source={require('./assets/hamburger.png')}>

                  </Image>

              </TouchableOpacity>

              <View style={{width: width - 32.63 - 11.7 - 26.67 - 16.3, height: 102.17, alignItems: 'center', justifyContent: 'center'}}>

                  <Text style={{color: 'white', fontSize: 25}}>
                      bWave
                  </Text>

              </View>

          </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

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
