import React from "react";
import {Text, View, Button} from 'react-native'

export function MenuScreen({ navigation }) {
    return (
      <View style={{ flex: 0.6, bottom:0, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 30, color:'black' }}>Model Test</Text>
        <Button onPress={() => navigation.goBack()} title="Dismiss" />
      </View>
    );
  }