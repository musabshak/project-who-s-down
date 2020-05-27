/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
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
          title: 'title 1', level: 'pro', category: 'nightlife', startTime: '20:04', latitude: 35.77, longitude: -78.89,
        }, {
          title: 'title 2!', level: 'amateur', category: 'sports', startTime: '23:06', latitude: 35.775, longitude: -78.895, 
        }, {
          title: 'title3!!', level: 'casual', category: 'educational', startTime: '13:20', latitude: 35.773, longitude: -78.894,
        },
      ],
    };
  }


  componentDidMount() {
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

  // this function takes the current time, takes an event time, and returns a value 0 through 1 where bigger numbers are further away
  createTransparencyFromStartTime = (time) => {
    const hours = new Date().getHours(); // To get the Current Hours
    const min = new Date().getMinutes(); // To get the Current Minutes
    inputTime = time.split(':');
    const temporalDistanceHours = (inputTime[0] - hours) + ((inputTime[1] - min) / 60);
    if (temporalDistanceHours < 0) {
      return (1.5 - (24 - temporalDistanceHours) / 24);
    }
    return 1.5 - (temporalDistanceHours / 24);
  }

  // this function creates the events, and is called by createMap (this is b/c markers must be children of MapView)
  createMarkers = () => {
    // so at some point the event_list would be coming from props

    const eventCategoryToIcon = new Map([
      ['nightlife', require('../../../assets/nightlife.png')],
      ['culture', require('../../../assets/culture.png')],
      ['educational', require('../../../assets/educational.png')],
      ['sports', require('../../../assets/sports.png')],
      ['boardgame', require('../../../assets/boardgames.png')],
    ]);

    const eventLevelToIcon = new Map([ // might not use this one
      ['pro', '#F44336'],
      ['amateur', '#0000FF'],
      ['casual', '#008000'], 
    ]);

    return this.state.eventList.map((obj) => {
      // so this Image line just takes away the markers entirely. tried changing image location in case it was just an error getting to the image
      // tried an image prop in Marker itself, and I tried putting Image inside the callout (doesn't show up here either)
      // also tried with .png and .svg

      const eventOpacity = this.createTransparencyFromStartTime(obj.startTime);

      return (
        <Marker coordinate={{ latitude: obj.latitude, longitude: obj.longitude}}>
          <Image source={eventCategoryToIcon.get(obj.category)}
            style={{
              height: 35, width: 35, borderWidth: 4, borderColor: eventLevelToIcon.get(obj.level), opacity: eventOpacity,
            }}
          />
          <Callout>
            <Text>INSERT EVENT PREVIEW COMPONENT HERE</Text>

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
      <View style={{flex: 1}}>
        <Text>This is the mapview component</Text>
        <Text>I think youre at {JSON.stringify(this.state.location)}</Text>

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