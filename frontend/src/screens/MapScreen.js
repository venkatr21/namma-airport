import React, { useState } from 'react';
import {View, StyleSheet, StatusBar, ActivityIndicator, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapConstants from '../constants/MapConstants';
import Theme from '../constants/Theme';
import { TabBar } from '../components/TabBar';
import Dim from '../constants/Dimensions'
import SearchBarWithAutocomplete from '../components/SearchBar';
import {NAMMA_AIRPORT_SERVER} from '@env';
import PassengerCount from '../components/PassengerCount';
import axios from 'axios';
export function MapScreen({navigation, userInfo}) {
    const [mapCoordinates, setMapCoordinates] = useState(MapConstants);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState({ term: '' });
    const [searchResult, setSearchResult] = useState([])
    const onSubmitEditing = ()=>{
      if(search.term.length>0){
        var config = {
          method: 'post',
          url: NAMMA_AIRPORT_SERVER+'search/',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : JSON.stringify({search: search.term, email: userInfo.user.email})
        };

        axios(config)
        .then(response=>{
          if(response.status==200)
          setSearchResult(response.data);
        })
        .catch(err=>{
          console.log(err)
        })
      }else{
        setSearchResult([]);
      }
      
    }
    
    React.useEffect(() => {
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
                onChangeText={(text) => setSearch({ term: text })}
                onSubmitEditing = {()=> onSubmitEditing()}/>
          </View>

          <PassengerCount />
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