import React from 'react';
import {Text, View, StyleSheet, StatusBar, ScrollView, SafeAreaView} from 'react-native';
import { TabBar } from '../components/TabBar';
import { KioskView } from '../components/KioskView';
import HomePageCarousel from '../components/HomePageCarousel';
import Dim from '../constants/Dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Theme from '../constants/Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
          <View style={styles.kioskContainer}>
            <Text style={styles.homepageSectionText}>Services for you</Text>
            <View style={styles.homeScreenServices}>
              <View style={styles.serviceViewRow}>
                <View style={styles.serviceViewColumn}>
                  <TouchableOpacity style={styles.serviceIcon} onPress={()=>{navigation.navigation.navigate('Flights')}}>
                    <Icon color={Theme.mainColour} name={'flight'} size={35} />
                  </TouchableOpacity>
                  <Text style={styles.serviceTitle}>Flights</Text>
                </View>
                <View style={styles.serviceViewColumn}>
                  <TouchableOpacity style={styles.serviceIcon}>
                    <Icon color={Theme.mainColour} name={'remove-shopping-cart'} size={35} />
                  </TouchableOpacity>
                  <Text style={styles.serviceTitle}>Dutifree Retail</Text>
                </View>
                <View style={styles.serviceViewColumn}>
                  <TouchableOpacity style={styles.serviceIcon}>
                    <Icon color={Theme.mainColour} name={'fastfood'} size={35} />
                  </TouchableOpacity>
                  <Text style={styles.serviceTitle}>Culinary</Text>
                </View>
              </View>

              <View style={styles.serviceViewRow}>
                <View style={styles.serviceViewColumn}>
                  <TouchableOpacity style={styles.serviceIcon}>
                    <Icon color={Theme.mainColour} name={'explore'} size={35} />
                  </TouchableOpacity>
                  <Text style={styles.serviceTitle}>Explore BLR</Text>
                </View>
                <View style={styles.serviceViewColumn}>
                  <TouchableOpacity style={styles.serviceIcon}>
                    <Icon color={Theme.mainColour} name={'wifi'} size={35} />
                  </TouchableOpacity>
                  <Text style={styles.serviceTitle}>Airport Wifi</Text>
                </View>
                <View style={styles.serviceViewColumn}>
                  <TouchableOpacity style={styles.serviceIcon}>
                    <Icon color={Theme.mainColour} name={'wheelchair-pickup'} size={35} />
                  </TouchableOpacity>
                  <Text style={styles.serviceTitle}>Assistance</Text>
                </View>
              </View>
            </View>
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
    homeScreenServices:{
      width: Dim.WindowWidth-20,
      marginLeft: 10,
    },
    serviceViewRow:{
      marginVertical: 10,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    serviceTitle:{
      color: 'black',
      marginTop: 5,
      fontFamily: 'Lato-Italic',
      fontSize: 13,
    },
    serviceViewColumn: {
      alignItems: 'center',
    },
    serviceIcon:{
      alignSelf: 'center',
      borderRadius: 100,
      padding: 10,
      backgroundColor: '#ddd',
      color: Theme.mainColour
    }
});