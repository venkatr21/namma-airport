import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
import { TabBar } from '../components/TabBar';
import {FLIGHT_RADAR_API} from '@env';

export function FlightScreen({navigation, route}){
    console.log(FLIGHT_RADAR_API);
    return (
        <View style={styles.container}>
        <TabBar displayText={"View Flight Status"} />
        <ScrollView style={styles.flightView}>
            <View style={styles.subView}>
            </View>
            <View style={styles.subView}>

            </View>
        </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flightView:{
        flex: 1,
    },
    subView:{
        flex: 0.6,
        backgroundColor: 'grey',
        height: 600,
        marginVertical: 50,
        marginHorizontal: 30,
    },
})
