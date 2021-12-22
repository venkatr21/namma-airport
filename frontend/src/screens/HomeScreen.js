import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import Theme from '../constants/Theme';
export function HomeScreen() {
  return (
    <View style={[styles.container]}>
        <StatusBar showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
        {/* <ActivityIndicator color={Theme.activityIndicatorColour} size={"large"} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: "center"
    }
});