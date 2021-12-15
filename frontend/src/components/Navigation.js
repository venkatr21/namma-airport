import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faMapMarkedAlt, faMapMarked, faComment, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import {HomeScreen} from '../screens/HomeScreen';
const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor="#e91e63"
    inactiveColor="#4B494A"
    barStyle={{
      backgroundColor:'#efefef',
      shadowOffset: {width: 1, height: 5},
      shadowColor: '#000',
      shadowOpacity: 1,
      shadowRadius: 7,
      elevation: 3
    }}
    shifting={true}>
      <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <FontAwesomeIcon icon={ faHome } size={24} color={color} />
              ),
          }}
      />
      <Tab.Screen
          name="Maps"
          component={HomeScreen}
          options={{
              tabBarLabel: 'Maps',
              tabBarIcon: ({color, focused}) => (
                <FontAwesomeIcon icon={ focused?faMapMarkedAlt:faMapMarked } size={24} color={color} />
              ),
          }}
      />
      <Tab.Screen
          name="Chat"
          component={HomeScreen}
          options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({ color, focused }) => (
                <FontAwesomeIcon icon={ focused?faCommentDots:faComment } size={24} color={color} />
              ),
          }}
      />
      <Tab.Screen
          name="Menu"
          component={HomeScreen}
          options={{
              tabBarLabel: 'Menu',
              tabBarIcon: ({color, focused}) => (
                <FontAwesomeIcon icon={ faBars } size={24} color={color} />
              ),
          }}
      />
    </Tab.Navigator>
  );
}