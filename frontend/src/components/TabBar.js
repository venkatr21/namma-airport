import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Theme from '../constants/Theme';
export function TabBar({displayText}) {
    return (
        <View style={styles.tabBar}>
            <Text style={styles.tabBarText}>{displayText}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flex: 0.1,
        backgroundColor: Theme.mainColour,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    tabBarText:{
        fontFamily: 'Arial',
        fontSize: 20,
        marginBottom: 6,
        color: 'black'
    }
});