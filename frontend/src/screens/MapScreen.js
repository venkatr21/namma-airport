import React, { useState } from 'react';
import {Text, View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps';
import MapConstants from '../constants/MapConstants'
export function MapScreen({navigation}) {
    const [mapCoordinates, setMapCoordinates] = useState(MapConstants);
    const [isLoading, setIsLoading] = useState(true);
    React.useEffect(() => {
        setIsLoading(true);
        setMapCoordinates(MapConstants);
        setIsLoading(false);
    });
    return (
    <View style={styles.container}>
        <StatusBar showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
        {isLoading ? (<ActivityIndicator color="#538ae4" size={"large"} />):(
        <MapView
          style={{flex: 1,width: '100%'}}
          initialRegion={{
            latitude: mapCoordinates.Latitude,
            longitude: mapCoordinates.Longitude,
            latitudeDelta: mapCoordinates.LatitudeDelta,
            longitudeDelta: mapCoordinates.LongitudeDelta,
          }}
        />)}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: "center"
    }
});