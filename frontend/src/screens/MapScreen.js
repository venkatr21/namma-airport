import React, { useState } from 'react';
import {View, StyleSheet, StatusBar, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapConstants from '../constants/MapConstants';
import Theme from '../constants/Theme';
import { TabBar } from '../components/TabBar';
import Dim from '../constants/Dimensions'
import SearchBarWithAutocomplete from '../components/SearchBar';
export function MapScreen({navigation}) {
    const [mapCoordinates, setMapCoordinates] = useState(MapConstants);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({ term: '' });
    var searchResult = [{
      name: "too",
      position: {lat: 13.203786 ,lon: 77.70643}
    },
    {
      name: "too1",
      position: {lat: 13.199534,lon: 77.709604}
    }]
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
            showsUserLocation={true}
            initialRegion={{
              latitude: mapCoordinates.Latitude,
              longitude: mapCoordinates.Longitude,
              latitudeDelta: mapCoordinates.LatitudeDelta,
              longitudeDelta: mapCoordinates.LongitudeDelta,
            }}>
            {searchResult.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{latitude: marker.position.lat, longitude: marker.position.lon}}
                title={marker.name}
                description={null}
              />
            ))}
          </MapView>
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