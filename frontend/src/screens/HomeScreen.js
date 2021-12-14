import * as React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
export function HomeScreen() {
  return (
    <View style={styles.container}>
        <StatusBar showHideTransition='fade' barStyle='default' backgroundColor="#000000"/>
        <Text>Hellooo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
});