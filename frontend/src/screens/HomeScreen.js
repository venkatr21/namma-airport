import React from 'react';
import {Text, View, StyleSheet, StatusBar, ScrollView, SafeAreaView} from 'react-native';
import { TabBar } from '../components/TabBar';
import { KioskView } from '../components/KioskView';
import HomePageCarousel from '../components/HomePageCarousel';
export function HomeScreen({userInfo, navigation}) {
  return (
    <SafeAreaView  style={styles.container}>
        <StatusBar  showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
        <TabBar displayText={"Home"} />
        <ScrollView style={{flex: 1, flexGrow: 1}}>
          <View style={styles.homepageCarousel}>
            <Text style={styles.homepageSectionText}>Your personalized recommendations</Text>
            <HomePageCarousel navigation={navigation.navigation} userInfo={userInfo} />
          </View>
          <View style={styles.kioskContainer}>
            <Text style={styles.homepageSectionText}>Self-serve E-Kiosk</Text>
            <KioskView />
          </View>
        </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    homepageCarousel: {
      marginTop: 10,
    },
    homepageSectionText:{
      fontSize: 18,
      marginBottom: 4,
      marginLeft: 10,
      fontFamily: 'Lato-BoldItalic',
      color: 'black',
    },
    kioskContainer:{
      marginTop: 10,
    },
});