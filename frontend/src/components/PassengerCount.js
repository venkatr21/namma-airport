import React,{useEffect, useState} from 'react'
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Theme from '../constants/Theme';
import {NAMMA_AIRPORT_SERVER} from '@env';
import axios from 'axios';
function SearchBarWithAutocomplete() {
    const [passengers, setPassengers] = useState(0);
    const updatePassengers= ()=>{
        var config = {
            method: 'get',
            url: NAMMA_AIRPORT_SERVER+'search/crowd',
        };
        axios(config)
        .then(response=>{
            setPassengers(response.data.crowd);
        })
        .catch(err=>{
            setPassengers(0);
        })
    }
    useEffect(() => {
        updatePassengers();
        let timer = setInterval(updatePassengers, 1800000);
        return () => {
            clearInterval(timer);
        }
    }, []);
    return (
        <View style={styles.crowdView}>
            <Text style={styles.crowdViewText}> Airport Live Passenger Count: {passengers}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    crowdView: {
        backgroundColor: Theme.navigationBarBackground,
        marginLeft: 10,
        bottom: 5,
        position: 'absolute',
        borderRadius: 3,
        elevation: 2,
        padding: 5
    },
    crowdViewText:{
        fontSize: 15,
        color: 'black',
        fontWeight: "500"
    }
})
export default SearchBarWithAutocomplete