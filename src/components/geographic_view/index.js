import React, { Component } from 'react';
import Search from 'react-native-search-box';
import {
  Button,
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';
/* eslint-disable global-require */
import { connect } from 'react-redux';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import FilterMenu from './FilterMenu';
import EventPreview from '../event_preview';
import changeFilters from './actions';


const YOUR_API_KEY = 'YOUR_API_KEY';

class GeographicDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      isMapReady: false,
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
      filteredOut: {
        categories: [],
        skillLevels: [],
        timesAfter: null, // going to need a better way to handle times
        timesBefore: null,
      },
    };
  }


  componentDidMount() {
    console.log('component mounted!');
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

    console.log('about to set location!');
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

  handleRegionChange = (e) => {
    this.setState({region: e});
  }

  debugHelper = () => {
    console.log('geo view filtered out part of state = ', this.state.filteredOut);
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

  onMapLayout = () => {
    console.log('Map has been laid! That makes one of us :P');
    this.setState({ isMapReady: true });
    this._getLocation();
  }

  // this function creates the events, and is called by createMap (this is b/c markers must be children of MapView)
  createMarkers = () => {
    const MIN_ZOOM_FOR_MARKER_CHANGE = 0.02;

    // these maps are used to give meaning to the icons
    const eventCategoryToIcon = new Map([
      ['nightlife', require('../../../assets/nightlife.png')],
      ['culture', require('../../../assets/culture.png')],
      ['educational', require('../../../assets/educational.png')],
      ['sports', require('../../../assets/sports.png')],
      ['boardgame', require('../../../assets/boardgames.png')],
    ]);

    const eventLevelToIcon = new Map([ 
      ['pro', '#F44336'],
      ['amateur', '#0000FF'],
      ['casual', '#008000'], 
    ]);

    return this.state.eventList.map((obj) => {
      const eventOpacity = this.createTransparencyFromStartTime(obj.startTime);


      // this first part handles what happens if you zoom super far in on a marker (we decided we want it to show more information)
      if (this.state.region.longitudeDelta < MIN_ZOOM_FOR_MARKER_CHANGE) { 
        return (
          <Marker key={obj.latitude} coordinate={{ latitude: obj.latitude, longitude: obj.longitude}}>
            <Text> {obj.title} </Text>
            <Callout>
              <EventPreview />
            </Callout>


          </Marker>
        ); 
      }

      // this second part handles what happens normally, and shows just the event icon etc
      else {
        return (
          <Marker key={obj.latitude} coordinate={{ latitude: obj.latitude, longitude: obj.longitude}}>
            <Image source={eventCategoryToIcon.get(obj.category)}
              style={{
                height: 35, width: 35, borderWidth: 4, borderColor: eventLevelToIcon.get(obj.level), opacity: eventOpacity,
              }}
            />
            <Callout>
              <EventPreview />
            </Callout>


          </Marker>
        ); }
    });
  }


  // this function creates the map, and is to be called by render
  createMap = () => {
    return (
      <View>
        <Text>This should be the map view!</Text>
        <MapView
          style={{
            minHeight: 200,
            minWidth: 200,
          }}
          region={this.state.region}
          onLayout={this.onMapLayout}
          onRegionChangeComplete={this.handleRegionChange}
          showsUserLocation
          followsUserLocation
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
        <Search
          backgroundColor="#c4302b"
          showsCancelButton={false}
          textFieldBackgroundColor="#c4302b"
          onChangeText={(query) => {
            this.setState({ query });
          }}
        />
        <Button
          onPress={() => this.props.navigation.navigate('EventList')}
          title="Event List View"
          color="#841584"
          accessibilityLabel="Event List view"
        />
        <Text>This is WHERE the mapview will go</Text>
        <Text>This is the mapview component</Text>
        <Text>I think youre at {JSON.stringify(this.state.location)}</Text>

        {this.createMap()}
        <FilterMenu />
        <Button title="hello" onPress={this.debugHelper}> show GeographicDisplay state</Button>
      </View>
    );
  }
}

const mapStateToProps = (reduxState) => (
  {filteredOut: reduxState.filteredOut}
);

const mapDispatchToProps = (reduxState) => (
  {changeFilters}
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(240,240,240)',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 5,
    backgroundColor: 'black',
  },
  rightContainer: {
    flex: 1,
    padding: 5,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgb(200,200,200)',
  },
  listView: {
    backgroundColor: 'rgb(240,240,240)',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(GeographicDisplay);
