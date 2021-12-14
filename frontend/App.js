import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/Navigation';
import React,{Component} from 'react';
import AnimatedSplash from "react-native-animated-splash-screen";
import {
  View,
  StyleSheet,
} from 'react-native';

import Dim from './src/constants/Dimensions';
export default class App extends Component{
  state = {
    isLoaded: false,
  }
  componentDidMount = async ()=>{
    setTimeout(()=>{
      this.setState({isLoaded: true})
    },1000)
  }
  render(){
    return(
      <AnimatedSplash
        translucent={true}
        isLoaded={this.state.isLoaded}
        logoImage={require("./assets/splash.png")}
        backgroundColor={"black"}
        logoHeight={Dim.WindowHeight}
        logoWidth={Dim.WindowWidth}
      >
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </AnimatedSplash>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dim.WindowWidth,
  }
});
