import React from 'react';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import COLORS from '../constants/Colors';
import Theme from '../constants/Theme';
export function OnBoardScreen({navigation, userInfo}){
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />
      <Image
        source={require('../../assets/imgs/banner.jpg')}
        style={style.image}
      />
      <Text style={style.welcomeText}> Hello {userInfo.user.givenName},</Text>
      <View style={style.indicatorContainer}>
        <View style={style.indicator} />
        <View style={style.indicator} />
        <View style={[style.indicator, style.indicatorActive]} />
      </View>
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View>
          <Text style={style.title}>Explore, Engage</Text>
          <Text style={style.title}>Experience</Text>
        </View>

        <View style={{marginTop: 10}}>
          <Text style={style.textStyle}>Upgrade your airport experience with</Text>
          <Text style={style.textStyle}>the all new Namma Airport Mobile app</Text>
          <Text style={style.textStyle}>featuring AI and recommendation system</Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingBottom: 40,
        }}>
        <Pressable onPress={() => navigation.navigate('TabScreens', { screen: 'Home' })}>
          <View style={style.btn}>
            <Text style={{color: 'white', fontSize: 20}}>Get Started</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  image: {
    height: 420,
    width: '100%',
    borderBottomLeftRadius: 100,
  },
  welcomeText: {
    fontSize: 33,
    fontStyle: 'italic',
    position: 'absolute',
    marginTop: 40,
    marginLeft: 15,
    fontWeight: '700'
  },
  indicatorContainer: {
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  indicator: {
    height: 3,
    width: 30,
    backgroundColor: COLORS.grey,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  indicatorActive: {
    backgroundColor: COLORS.dark,
  },
  btn: {
    height: 60,
    marginHorizontal: 20,
    backgroundColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {fontSize: 32, fontWeight: 'bold', color: COLORS.dark},
  textStyle: {fontSize: 16, color: COLORS.grey},
});
