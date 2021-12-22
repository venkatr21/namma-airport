import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
export function HomeScreen() {
  return (
    <View style={[styles.container]}>
        <StatusBar showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
        <ActivityIndicator color="#538ae4" size={"large"} />
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