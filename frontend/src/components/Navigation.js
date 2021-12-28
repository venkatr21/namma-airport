import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {HomeScreen, MapScreen, ChatScreen, OnBoardScreen, DetailScreen} from '../screens';
import Theme from '../constants/Theme';
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
function DisplayTabs({props, navigation}) {
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
          options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color, focused }) => (
                <FontAwesomeIcon icon={ focused?Theme.homeActiveIcon:Theme.homeInactiveIcon} size={Theme.navigationIconSize} color={color} />
              ),
          }}>
          {() => <HomeScreen navigation={navigation} userInfo = {props.userInfo}/>}
        </Tab.Screen>
        <Tab.Screen
          name="Maps"
          options={{
              tabBarLabel: 'Maps',
              tabBarIcon: ({color, focused}) => (
                <FontAwesomeIcon icon={ focused?Theme.mapsActiveIcon:Theme.mapsInactiveIcon} size={Theme.navigationIconSize} color={color} />
              ),
          }}>
          {() => <MapScreen userInfo = {props.userInfo}/>}
        </Tab.Screen>
        <Tab.Screen
          name="Chat"
          options={{
              tabBarLabel: 'Chat',
              tabBarIcon: ({ color, focused }) => (
                <FontAwesomeIcon icon={ focused?Theme.chatActiveIcon:Theme.chatInactiveIcon} size={Theme.navigationIconSize} color={color} />
              ),
          }}>
          {() => <ChatScreen userInfo = {props.userInfo}/>}
        </Tab.Screen>
        <Tab.Screen
          name="Menu"
          options={{
              tabBarLabel: 'Menu',
              tabBarIcon: ({color, focused}) => (
                <FontAwesomeIcon icon={ focused?Theme.menuActiveIcon:Theme.menuInactiveIcon} size={Theme.navigationIconSize} color={color} />
              ),
          }}>
          {(navigation) => <HomeScreen navigation={navigation} userInfo = {props.userInfo}/>}
        </Tab.Screen>
      </Tab.Navigator>
  );
}
export default function Navigation(props) {
  return (
    <Stack.Navigator
    initialRouteName="GetStarted"
    screenOptions={{headerShown: false}}>
      <Stack.Screen name="GetStarted" >
        {(navigation) => <OnBoardScreen navigation={navigation.navigation} userInfo={props.userInfo}/>}
      </Stack.Screen>
      <Stack.Screen name="TabScreens">
        {(navigation) => <DisplayTabs navigation={navigation} props={props}/>}
      </Stack.Screen>
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}