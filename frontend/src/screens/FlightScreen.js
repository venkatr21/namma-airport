import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  FlatList,
  SafeAreaView
} from 'react-native';
import { TabBar } from '../components/TabBar';
import {FLIGHT_RADAR_API} from '@env';
import axios from 'axios'
import Dim from '../constants/Dimensions';
import Theme from '../constants/Theme';

export function FlightScreen({navigation, route}){
    const [arrivals, setArrivals] = useState([]);
    const [departures, setDepartures] = useState([]);
    const [arrivalsLoaded, setArrivalsLoaded] = useState(false);
    const [departuresLoaded, setDeparturesLoaded] = useState(false);
    const renderArrivals = ({item}) => {
        return (
        <View style={styles.flatListView}>
            <View style={styles.flatListrow}>
                <Text style={styles.cityText}>{item.flight.airport.origin.position.region.city}</Text>
                <Text style={styles.statusText}>{item.flight.status.text}</Text>
            </View>
            
            <View style={styles.flatListrow}>
                
                <Text style={styles.airlineInfo}>{item.flight.airline.name} / {item.flight.identification.callsign}</Text>
            </View>
        </View>);
    };

    const renderDepartures = ({item}) => {
        return (
        <View style={styles.flatListView}>
            <View style={styles.flatListrow}>
                <Text style={styles.cityText}>{item.flight.airport.destination.position.region.city}</Text>
                <Text style={styles.statusText}>{item.flight.status.text}</Text>
            </View>
            
            <View style={styles.flatListrow}>  
                <Text style={styles.airlineInfo}>{item.flight.airline.name}</Text>
                <Text style={styles.terminalInfo}>T/G: {item.flight.airport.destination.info.terminal}/{item.flight.airport.destination.info.gate}</Text>
            </View>
        </View>);
    };
    useEffect(() => {
        var config = {
            method: 'get',
            url: FLIGHT_RADAR_API,
            headers: { 
              'Content-Type': 'application/json'
            },
        };

        axios(config)
        .then(response=>{
            var respObj = response.data.result.response.airport.pluginData.schedule;
            setArrivals(respObj.arrivals.data);
            setDepartures(respObj.departures.data);
            setArrivalsLoaded(true);
            setDeparturesLoaded(true);
        })
        .catch(err=>{

        })
        return () => {
        }
    }, [])
    return (
        <View style={styles.container}>
        <TabBar displayText={"View Flight Status"} />
        <View style={styles.flightView}>
            
            <Text style={styles.homepageSectionText}>Arrivals</Text>
            <View style={styles.subView}>
                {arrivalsLoaded?(
                <SafeAreaView nestedScrollEnabled={true} style={styles.container}>
                <FlatList
                    data={arrivals}
                    renderItem={renderArrivals}
                    keyExtractor={(item,index) => index.toString()}
                />
                </SafeAreaView>
                ):null}
            </View>
            <Text style={styles.homepageSectionText}>Departures</Text>
            <View style={styles.subView}>
                {departuresLoaded?(
                <SafeAreaView nestedScrollEnabled={true} style={styles.container}>
                <FlatList
                    data={departures}
                    renderItem={renderDepartures}
                    keyExtractor={(item,index) => index.toString()}
                />
                </SafeAreaView>
                ):null}
            </View>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flightView:{
        flex: 1,
    },
    subView:{
        borderRadius: 10,
        height: Dim.WindowHeight/2-90,
        backgroundColor: '#eee',
        marginVertical: 10,
        marginHorizontal: 30,
        elevation: 8,
    },
    flatListView:{
        marginHorizontal: 5,
        borderRadius: 5,
        overflow: 'hidden',
        flex: 1,
        marginVertical: 10,
        backgroundColor: '#ccc',
        
    },
    flatListrow:{
        flexDirection: 'row',
        alignContent: 'space-between',
    },
    airlineInfo:{
        flex:1,
        textAlign: 'center',
        fontFamily: 'Lato-Italic',
        fontSize: 17,
        color: 'black',
    },
    cityText:{
        textAlign: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 20,
        color: 'black',
        flex:1
    },
    statusText:{
        textAlign: 'center',
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 15,
        color: Theme.mainColour,
        flex:1
    },
    terminalInfo:{
        textAlign: 'center',
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 15,
        color: 'green',
        flex:1
    }, 
    homepageSectionText:{
        marginTop: 10,
        fontSize: 23,
        textDecorationLine: 'underline',
        fontFamily: 'Lato-BoldItalic',
        color: Theme.mainColour,
        alignSelf: 'center'
    },
})
