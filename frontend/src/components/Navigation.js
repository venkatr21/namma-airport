import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {HomeScreen} from '../screens/HomeScreen';
import Theme from '../constants/Theme';
const Tab = createMaterialBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    activeColor= {Theme.activeBackgroundColor}
    inactiveColor={Theme.inactiveBackgroundColor}
    barStyle={{
      backgroundColor: Theme.navigationBarBackground,
      shadowOffset: {width: 1, height: 5},
      shadowColor: '#000',
      shadowOpacity: 1,
      shadowRadius: 7,
      elevation: 3
    }}
    shifting={false}
    >
      <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <FontAwesomeIcon icon={ focused?Theme.homeActiveIcon:Theme.homeInactiveIcon} size={Theme.navigationIconSize} color={color} />
              ),
          }}
      />
      <Tab.Screen
          name="Maps"
          component={HomeScreen}
          options={{
              tabBarLabel: 'Maps',
              tabBarIcon: ({color, focused}) => (
                <FontAwesomeIcon icon={ focused?Theme.mapsActiveIcon:Theme.mapsInactiveIcon} size={Theme.navigationIconSize} color={color} />
              ),
          }}
      />
      <Tab.Screen
          name="Chat"
          component={HomeScreen}
          options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({ color, focused }) => (
                <FontAwesomeIcon icon={ focused?Theme.chatActiveIcon:Theme.chatInactiveIcon} size={Theme.navigationIconSize} color={color} />
              ),
          }}
      />
      <Tab.Screen
          name="Menu"
          component={HomeScreen}
          options={{
              tabBarLabel: 'Menu',
              tabBarIcon: ({color, focused}) => (
                <FontAwesomeIcon icon={ focused?Theme.menuActiveIcon:Theme.menuInactiveIcon} size={Theme.navigationIconSize} color={color} />
              ),
          }}
      />
    </Tab.Navigator>
  );
}