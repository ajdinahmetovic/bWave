import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import Wave from "./components/Wave";
import HamburgerMenu from "./components/HamburgerMenu";
import MainView from "./components/MainView";
import Drawer from "react-native-drawer";
import { Font } from 'expo';

var width = Dimensions.get('window').width;
var  height = Dimensions.get('window').height;

export default class DrawerContainer extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state={
            isReady: false,
            icoSrc: require('./assets/hamburger.png'),
            isOpened: false
        };

        this.openControlPanel = this.openControlPanel.bind(this);
        this.closeControlPanel = this.closeControlPanel.bind(this);
        this.playMusic = this.playMusic.bind(this);

    }

    async componentDidMount() {
        await Font.loadAsync({
            'montserrat': require('./assets/Montserrat-Regular.ttf'),
            'montserrat-bold': require('./assets/Montserrat-Bold.ttf'),
            'montserrat-thin': require('./assets/Montserrat-Thin.ttf'),
        });

        this.setState({isReady:true})
    }





    closeControlPanel = () => {
        this._drawer.close();
        this.setState({isOpened: false});
        this.setState({icoSrc: require('./assets/hamburger.png')})

    };
    openControlPanel = () => {
        this._drawer.open();
        this.setState({isOpened: true});
        this.setState({icoSrc: require('./assets/back.png')})
    };

    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }

        return (
            <View style={styles.container}>
                <Drawer
                    onCloseStart={() => this.setState({isOpened: false})}
                    type="static"
                    tweenDuration={400}
                    ref={(ref) => this._drawer = ref}
                    content={<HamburgerMenu closeNav={this.closeControlPanel}/>}
                    openDrawerOffset={100}
                    styles={drawerStyles}>
                    <MainView musicPlay={this.playMusic} state={this.state.isOpened} openNav={this.openControlPanel}/>
                </Drawer>
            </View>
        );
    }


    playMusic(){
        this.props.navigation.replace('MusicPlayer1')
    }


}


const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
    main: {paddingLeft: 0},
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
