/* eslint-disable no-unreachable */
import React, { Component } from 'react';
import Search from 'react-native-search-box';
import {
  Button,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { Fab, Icon } from 'native-base';
/* eslint-disable global-require */
import { connect } from 'react-redux';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import FilterMenu from './FilterMenu';
import EventPreview from '../event_preview';
import { fetchEvents, initializeFilters } from './actions';

const YOUR_API_KEY = 'YOUR_API_KEY';

class GeographicDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      isMapReady: false,
      location: {},
      region: { // default set to NC
        latitude: 35.78825,
        longitude: -78.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };

    this.masterDebug = false;

    if (this.masterDebug) { console.log('about to initialize filtrs!'); }
    this.props.initializeFilters();
  }


  componentDidMount() {
    if (this.masterDebug) { console.log('component mounted!'); }
    this._getLocation();
    this.props.fetchEvents();
  }

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);


    if (status !== 'granted') {
      console.log('location permission not granted');
      this.setState({
        errorMessage: 'PERMISSION NOT GRANTED',
      });
    }

    if (this.masterDebug) { console.log('about to set location!'); }
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
    this.setState({ region: e });
  }

  debugHelper = () => { // button for this has been removed
    console.log('\n\n\nstate = ', this.state);
    console.log('props=', this.props);
  }

  handleFetchClick = () => {
    if (this.masterDebug) {
      console.log('handle fetch click called!');
    }
    this.props.fetchEvents();
  }

  // this function takes the current time, takes an event time, and returns a value 0 through 1 where bigger numbers are further away
  // comment this back in when aarish changes the server to only send events 24 hours in advance
  createTransparencyFromStartTime = (time) => {
    // const currTime = new Date().getTime(); // To get the current ms
    // const eventTime = Date.parse(time); // gives event time in ms

    // let val = eventTime - currTime
    // if (val <= 0){
    // return 1
    // }
    // else {
    // val = val/(1000*60*60) // now val is number of hours in advance
    // if (val > 24) {
    // console.log('server sent an event > 24 hours in advance, not going to show this event)
    // return 0
    // }
    // else {
    // return (1 - val/24)
    // }
    // }
    return 0.9; // just because we need some value
  }

  onMapLayout = () => {
    if (this.masterDebug) {
      console.log('Map has been laid! That makes one of us :P');
    }
    this.setState({ isMapReady: true });
    this._getLocation();
  }

  // this function creates the events, and is called by createMap (this is b/c markers must be children of MapView)
  createMarkers = () => {
    const MIN_ZOOM_FOR_MARKER_CHANGE = 0.02; // this constant decides at what point the view of the event switches from icon to text

    // these maps are used to give meaning to the icons
    const eventCategoryToIcon = new Map([
      ['nightlife', require('../../../assets/nightlife.png')],
      ['culture', require('../../../assets/culture.png')],
      ['educational', require('../../../assets/educational.png')],
      ['sport', require('../../../assets/sports.png')],
      ['game', require('../../../assets/boardgames.png')],
      ['food', require('../../../assets/food.png')],
    ]);

    const eventLevelToIcon = new Map([
      ['pro', '#F44336'],
      ['amateur', '#0000FF'],
      ['casual', '#008000'],
    ]);

    if (this.props.eventList) {
      return this.props.eventList.map((obj) => {
        const eventOpacity = this.createTransparencyFromStartTime(obj.startTime);
        // if we're zoomed in a lot
        // waiting on April to merge pull request to 
        if (this.state.region.longitudeDelta < MIN_ZOOM_FOR_MARKER_CHANGE) {
          return (
            <Marker key={obj.id} coordinate={{ latitude: obj.latitude, longitude: obj.longitude }}>
              <View style={{ backgroundColor:'#ffffff', borderRadius: 5, padding: 5, flexDirection: 'row', alignItems: 'center' }}>
              <Icon type="MaterialCommunityIcons" name='calendar' style={{ fontSize: 15, color: '#FF5722', margin: 5 }}/>
                <Text style={{ fontFamily:'OpenSans-Regular' }}> {obj.eventTitle} </Text>
              </View>
              {/* <Callout>
                <EventPreview />
              </Callout> */}


            </Marker>
          );
        }

        // show event Icon 
        else {
          return (
            <Marker key={obj.id} coordinate={{ latitude: obj.latitude, longitude: obj.longitude }}>
              <Image source={eventCategoryToIcon.get(obj.category)}
                style={{
                  height: 35, width: 35, borderWidth: 4, borderColor: eventLevelToIcon.get(obj.level), opacity: eventOpacity,
                }}
              />
              <Callout>
                <EventPreview title={obj.eventTitle} skillLevel={obj.skillLevel} startTime={obj.startTime} description={obj.description} id={obj.id} />
              </Callout>


            </Marker>
          );
        }
      });
    }

    else {
      // console.log('this.props.eventlist does not exist');
      // if (this.masterDebug) { console.log('this is this.props:', this.props); }
      // console.log('attempting to fix automatically by calling fetchevents!');
      // this.props.fetchEvents();
    }
  }

  callInitializeFilters = () => {
    if (this.masterDebug) {
      console.log('in geo views initialize filters method!');
    }
    this.props.initializeFilters();
  }

  // this function creates the map, and is to be called by render
  createMap = () => {
    return (
      <View>
        {this.masterDebug && (<Text>This should be the map view!</Text>)}
        <MapView
          style={{
            height: '100%',
            minHeight: 500, // may need to change based on device, maybe we take device dimensions in App and put it in the store?
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
    if (this.masterDebug) { console.log('just rerendered!'); }
    return (
      <View style={{ flex: 1 }}>
        {/* <Search
          backgroundColor="#c4302b"
          showsCancelButton={false}
          textFieldBackgroundColor="#c4302b"
          onChangeText={(query) => {
            this.setState({ query });
          }}
        /> */}
        {/* <Button
          onPress={() => this.props.navigation.navigate('EventList')}
          title="Event List View"
          color="#841584"
          accessibilityLabel="Event List view"
        /> */}
        {/* <Text>This is WHERE the mapview will go</Text>

        <Text>This is the mapview component</Text>
        <Text>I think youre at {JSON.stringify(this.state.location)}</Text> */}
        {this.createMap()}
        <Fab
          onPress={this.handleFetchClick}
          position="bottomLeft"
          style={{ }}
        >
          <Icon name="ios-refresh" />
        </Fab>
        <FilterMenu />
        {this.masterDebug && (<Button title="show geographic display state" onPress={this.debugHelper}> show GeographicDisplay state</Button>)}

        {/* <Button title="call initialize filters" onPress={this.callInitializeFilters}> call get events</Button> */}

      </View>
    );
  }
}

const mapStateToProps = (reduxState) => (
  {
    filteredOut: reduxState.geoViewEvents.filteredOut,
    eventList: reduxState.geoViewEvents.eventList,
  }
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


export default connect(mapStateToProps, { fetchEvents, initializeFilters })(GeographicDisplay);
