import * as React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import { TabBar } from '../components/TabBar';
export function HomeScreen({userInfo}) {
  return (
    <View style={styles.container}>
        <StatusBar showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
        <TabBar displayText={"Home"} />
        <View style={{flex: 0.9}}>
        <Text style={{color: '#000'}}>Hello {userInfo.user.name}</Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    }
});