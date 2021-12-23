import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/Navigation';
import React,{Component} from 'react';
import AnimatedSplash from "react-native-animated-splash-screen";
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import {GoogleSignin,statusCodes, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import Dim from './src/constants/Dimensions';
import Config from "react-native-config";
import LoginForm from './src/components/LoginForm';
GoogleSignin.configure({
  androidClientId: Config.GOOGLE_AUTH_CLIENT_ID
});
export default class App extends Component{
  state = {
    isLoaded: false,
    userInfo: null,
    isGoogleSignedIn: false,
    email: null,
    password: null
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      
      this.setState({isGoogleSignedIn: true});
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      } else {
      }
    }
  };
  componentDidMount = async ()=>{
    setTimeout(()=>{
      // this.signIn();
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
          {!this.state.isGoogleSignedIn? (
            <View style={styles.GoogleSigninContainer}>
                <LoginForm />
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.signIn}
                  disabled={this.state.isSigninInProgress} 
                />
            </View>
          ): (
            <Navigation />
          )}
        </NavigationContainer>
      </AnimatedSplash>
    )
  }
}

const styles = StyleSheet.create({
  GoogleSigninContainer: {
    backgroundColor: '#000',
    flex: 1,
    width: Dim.WindowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  }
});
