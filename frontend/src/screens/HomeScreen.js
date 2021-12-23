import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import Theme from '../constants/Theme';
export function HomeScreen({userInfo}) {
  return (
    <View style={[styles.container]}>
        <StatusBar showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
        {/* <ActivityIndicator color={Theme.activityIndicatorColour} size={"large"} /> */}
        <Text style={{color: '#000'}}>Hello {userInfo.user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: "center",
      alignItems: 'center'
    }
});