import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {HomeScreen} from '../screens/HomeScreen';
const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    barStyle= {{
        height: 40,
        backgroundColor: '#',
        shadowOffset: {width: 0, height: 5},
        elevation: 13,
        shadowColor: '#000000',
        shadowOpacity: 3,
        shadowRadius: 1,
    }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={HomeScreen} />
    </Tab.Navigator>
  );
}