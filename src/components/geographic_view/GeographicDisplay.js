/* eslint-disable import/no-absolute-path */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, Text, View, Image,
} from 'react-native';
import WebView from 'react-native-webview';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const YOUR_API_KEY = 'YOUR_API_KEY';

class GeographicDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      location: {},
      region: { // default just set it to NC b/c my event markers were located here; feel free to change for your testing purposes
        latitude: 35.78825,
        longitude: -78.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      eventList: [
        {
          title: 'title 1', level: 'pro', category: 'nightlife', startTime: '', latitude: 35.77, longitude: -78.89,
        }, {
          title: 'title 2!', level: 'amateur', category: 'sports', startTime: '', latitude: 35.775, longitude: -78.895, 
        }, {
          title: 'title3!!', level: 'casual', category: 'educational', startTime: '', latitude: 35.773, longitude: -78.894,
        },
      ],
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this._getLocation();
  }

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
  

    if (status !== 'granted') {
      console.log('permission not granted');
      this.setState({
        errorMessage: 'PERMISSION NOT GRANTED',
      });
    }

    const location = await Location.getCurrentPositionAsync();
    this.setState({
      location,
      region: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  }

  // this function creates the events, and is called by createMap (this is b/c markers must be children of MapView)
  createMarkers = () => {
    // so at some point the event_list would be coming from props

    const eventCategoryToIcon = new Map([
      ['nightlife', 'assets/nightlife_img.svg'],
      ['culture', 'assets/culture_img.svg'],
      ['educational', 'assets/educational_img.svg'],
      ['sports', 'assets/sports_img.svg'],
      ['boardgame', 'assets/boardgame_img.svg'],
    ]);

    const eventLevelToIcon = new Map([ // might not use this one
      ['casual', 'casual style'],
    ]);

    return this.state.eventList.map((obj) => {
      // so this Image line just takes away the markers entirely. tried changing image location in case it was just an error getting to the image
      // tried an image prop in Marker itself, and I tried putting Image inside the callout (doesn't show up here either)
      // also tried with .png and .svg

      return (
        <Marker coordinate={{ latitude: obj.latitude, longitude: obj.longitude}}>
          {/* <Image source={require('./imgs/nightlife_img.svg')} style={{height: 35, width: 35 }} /> */}
          <Callout>
            <Text>INSERT EVENT PREVIEW COMPONENT HERE</Text>
            <Image source={require('./imgs/boardgame_img.svg')} style={{height: 35, width: 35 }} />

          </Callout>


        </Marker>
      );
    });
  }


  // this function creates the map, and is to be called by render
  createMap = () => {
    return (
      <View>
        <Text>This should be the map view!</Text>
        <MapView
          style={{
            flex: 0.7,
          }}
          region={this.state.region}
        > 
          {this.createMarkers()}
        </MapView>
      </View>
    );
  }

  render() {
    // so even this image here is not rendering on Arjun's android, making him wonder if the map marker image issue is just a
    // specific instance of this larger issue

    return (
      <View>
        <Text>This is the mapview component</Text>
        <Text>I think youre at {JSON.stringify(this.state.location)}</Text>
        <Image source={require('./imgs/nightlife_img.svg')} style={{height: 35, width: 35 }} /> 

        {this.createMap()}
      </View>
    );
  }
}

const mapStateToProps = (reduxState) => (
  {

  }
);

const mapDispatchToProps = (reduxState) => (
  {}
);

export default connect(mapStateToProps, mapDispatchToProps)(GeographicDisplay);