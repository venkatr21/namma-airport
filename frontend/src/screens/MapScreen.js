import React, { useState } from 'react';
import {View, StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
import MapView from 'react-native-maps';
import MapConstants from '../constants/MapConstants';
import Theme from '../constants/Theme';
import { TabBar } from '../components/TabBar';
import Dim from '../constants/Dimensions'
import SearchBarWithAutocomplete from '../components/SearchBar';
export function MapScreen({navigation}) {
    const [mapCoordinates, setMapCoordinates] = useState(MapConstants);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({ term: '' })
    React.useEffect(() => {
      console.log(search);
        setIsLoading(true);
        setMapCoordinates(MapConstants);
        setIsLoading(false);
    });
    return (
    <View style={styles.container}>
        <StatusBar showHideTransition='slide' barStyle='default' backgroundColor="#e91e63"/>
        <TabBar displayText={"Map & Explore"} />
        <View style={{flexGrow: 1}}>
          {isLoading ? (<ActivityIndicator color={Theme.activityIndicatorColour} size={"large"} />):(
          <MapView
            style={{flex: 1,width: '100%'}}
            initialRegion={{
              latitude: mapCoordinates.Latitude,
              longitude: mapCoordinates.Longitude,
              latitudeDelta: mapCoordinates.LatitudeDelta,
              longitudeDelta: mapCoordinates.LongitudeDelta,
            }}
          />
          )}
          <View style={styles.searchView}>
            <SearchBarWithAutocomplete
                value={search.term}
                onChangeText={(text) => setSearch({ term: text })}/>
          </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchView: {
      width: Dim.WindowWidth-20,
      margin: 10,
      position: 'absolute'
    }
});