import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HomeScreen} from '../screens/HomeScreen';
const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#000"
    inactiveColor="#000"
    barStyle={{ backgroundColor: '#dfdfdf' }}>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Settings" component={HomeScreen} />
        <Tab.Screen name="Chat" component={HomeScreen}/>
        <Tab.Screen name="Maps" component={HomeScreen} />
    </Tab.Navigator>
  );
}