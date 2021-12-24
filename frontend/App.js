import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/components/Navigation';
import React,{Component} from 'react';
import AnimatedSplash from "react-native-animated-splash-screen";
import { View, StyleSheet} from 'react-native';
import {GoogleSignin,statusCodes, GoogleSigninButton} from '@react-native-google-signin/google-signin';
import Dim from './src/constants/Dimensions';
import {NAMMA_AIRPORT_SERVER, GOOGLE_AUTH_CLIENT_ID} from '@env';
import LoginForm from './src/components/LoginForm';
import axios from 'axios';

GoogleSignin.configure({
  androidClientId: GOOGLE_AUTH_CLIENT_ID
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
      var userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      this.setState({isSigninInProgress: true});
      axios.post(NAMMA_AIRPORT_SERVER+'users/', this.state.userInfo.user)
        .then(response => {
          this.setState({isGoogleSignedIn: true});
          this.setState({isSigninInProgress: false});
        })
        .catch(err =>{
          this.setState({isGoogleSignedIn: true});
          this.setState({isSigninInProgress: false});
        });
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
            <Navigation userInfo={this.state.userInfo} />
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
