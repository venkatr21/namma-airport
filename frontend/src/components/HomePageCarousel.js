import React, {Component} from 'react';
import Carousel,{Pagination} from 'react-native-snap-carousel';
import Dim from '../constants/Dimensions';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import Theme from '../constants/Theme';

export const SLIDER_WIDTH = Dim.WindowWidth;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)
export default class HomePageCarousel extends Component {
    state = {
        activeSlide: 0
    }
    _renderItem = ({item, index}) => {
        return (
            <View style={styles.container} key={index}>
                <Image
                    source={item.image}
                    style={styles.image}
                />
                <Text style={styles.header}>{item.title}</Text>
                <Text style={styles.body}>{item.details}</Text>
            </View>
        );
    }
    get pagination () {
        const entries = this.props.houses;
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
                data={this.props.houses}
                renderItem={this._renderItem}
                layout="tinder"
                layoutCardOffset={9}
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