import React from 'react';
import {Text, View, StyleSheet, StatusBar, KeyboardAvoidingView} from 'react-native';
import { TabBar } from '../components/TabBar';
import houses from '../constants/houses';
import HomePageCarousel from '../components/HomePageCarousel';
export function HomeScreen({userInfo}) {
  return (
    <View style={styles.container}>
        <StatusBar  showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
        <TabBar displayText={"Home"} />
        <View style={{flexGrow: 1, alignItems: 'center'}}>
          <View style={styles.homepageCarousel}>
            <Text style={styles.homepageCarouselText}>Your personalized recommendations</Text>
            <HomePageCarousel userInfo={userInfo} />
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    homepageCarousel: {
      marginTop: 10,
      flex: 0.6,
    },
    homepageCarouselText:{
      fontSize: 16,
      marginBottom: 4,
      alignSelf: 'center',
      fontFamily: 'Lato-BoldItalic',
      color: 'black',
    }
});