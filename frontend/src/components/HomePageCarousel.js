import React, {Component} from 'react';
import Carousel,{Pagination} from 'react-native-snap-carousel';
import Dim from '../constants/Dimensions';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import Theme from '../constants/Theme';
import {AZURE_STORAGE_BLOB_CONTAINER, NAMMA_AIRPORT_SERVER} from '@env';
import axios from 'axios';
export const SLIDER_WIDTH = Dim.WindowWidth;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)
export default class HomePageCarousel extends Component {
    state = {
        recommendation: [],
        activeSlide: 0,
        renderRecommendation: false
    }

    componentDidMount(){
        var config = {
            method: 'get',
            url: NAMMA_AIRPORT_SERVER+'poi/recommendation/'+this.props.userInfo.user.email,
            headers: { 
              'Content-Type': 'application/json'
            }
        };

        axios(config)
        .then(response=>{
            this.setState({recommendation: response.data, renderRecommendation: true});
        })
        .catch(err=>{

        })
    }
    _renderItem = ({item, index}) => {
        return (
            <View style={styles.container} key={index}>
                <Image
                    source={{uri: AZURE_STORAGE_BLOB_CONTAINER+item.image}}
                    style={styles.image}
                />
                <Text style={styles.header}>{item.name}</Text>
                <Text style={styles.body}>{item.description.slice(0,80)} ...</Text>
            </View>
        );
    }
    get pagination () {
        const entries = this.state.recommendation;
        const { activeSlide } = this.state;
        return (
            <Pagination
              containerStyle={{marginTop: 0, flex: 0.01}}
              dotsLength={entries.length}
              activeDotIndex={activeSlide}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 6,
                  backgroundColor: Theme.mainColour
              }}
              inactiveDotStyle={{
                  backgroundColor: 'grey',
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }
 
    render () {
        return (
            <View>
            <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.recommendation}
                renderItem={this._renderItem}
                layout="tinder"
                layoutCardOffset={8}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                autoplay={true}
                loop={true}
                onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            />
            { this.pagination }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: ITEM_WIDTH,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        maxHeight: 300
      },
      image: {
        width: ITEM_WIDTH,
        height: 150,
      },
      header: {
        color: "#222",
        fontSize: 25,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 10
      },
      body: {
        color: "#222",
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 5,
        paddingRight: 20
      }
});