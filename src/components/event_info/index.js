/* eslint-disable react/no-did-update-set-state */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  View, Text, Image, ActivityIndicator, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
// TD: replace the icons w/ static images
import Ionicons from 'react-native-vector-icons/FontAwesome';
import * as Font from 'expo-font';
import SvgUri from 'react-native-svg-uri';
import MapView, { Marker, Callout } from 'react-native-maps';
// import { customFormatTime } from '../new_event';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import { styles } from '../../../assets/styles/event_info';
import { fetchEvents } from './actions';

class EventInfo extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      region: { // default just set it to NC b/c my event markers were located here; feel free to change for your testing purposes
        latitude: this.props.route.params.event.latitude,
        longitude: this.props.route.params.event.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      title: this.props.route.params.event.eventTitle,
      skillLevel: this.props.route.params.event.skillLevel,
      startTime: this.props.route.params.event.startTime,
      description: this.props.route.params.event.description,
      category: this.props.route.params.event.category,
      // eventId: this.props.route.params.eventId,
      eventList: [],
    };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        'pacifico-regular': require('../../../assets/fonts/Pacifico-Regular.ttf'),
        'TitilliumWeb-SemiBold': require('../../../assets/fonts/TitilliumWeb-SemiBold.ttf'),
        'ReenieBeanie-Regular': require('../../../assets/fonts/ReenieBeanie-Regular.ttf'),
        'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
        'OpenSans-Regular': require('../../../assets/fonts/OpenSans-Regular.ttf'),
      });
      this.setState({ fontLoaded: true });
      console.log('fonts are loaded');
    } catch (error) {
      console.log(error);
    }

    // console.log(customFormatTime(this.state.startTime));
    // // fetching events for testing
    // try {
    //   await this.props.fetchEvents();
    // } catch (error) {
    //   console.log(error);
    // }
    // this._getLocation();
  }

  componentDidUpdate(prevProps) {
    // if (this.props.events[0] && !this.state.eventLoaded) {
    //   const tmpe = this.props.events[0];
    //   this.setState({
    //     region: { // default just set it to NC b/c my event markers were located here; feel free to change for your testing purposes
    //       latitude: tmpe.latitude,
    //       longitude: tmpe.longitude,
    //       latitudeDelta: 0.0922,
    //       longitudeDelta: 0.0421,
    //     },
    //     title: tmpe.eventTitle,
    //     skillLevel: tmpe.skillLevel,
    //     startTime: tmpe.startTime,
    //     description: tmpe.description,
    //     category: tmpe.category,
    //     eventLoaded: true,
    //   });
    //   // console.log('event is loaded');  
    // }
    // console.log('event is loaded');  
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
    }, () => {
      console.log('location set.');
    });
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
            {/* <EventPreview /> */}
            <Text>Yo</Text>
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
            {/* <EventPreview /> */}
            <Text>Yo</Text>
          </Callout>


        </Marker>
      ); }
  });
}

  createMap = () => {
    return (
      <View>
        <MapView
          style={styles.mapCard}
          region={this.state.region}
          onLayout={this.onMapLayout}
          onRegionChangeComplete={this.handleRegionChange}
          // showsUserLocation
          // followsUserLocation
        > 
          {this.createMarkers()}
        </MapView>
      </View>
    );
  }

  handleRegionChange = (e) => {
    this.setState({region: e});
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

  onPressOut = () => {
    this.setState({ pressed: false });
  }

  onPressIn = () => {
    this.setState({ pressed: true });
  }

  // onSwipeLeft(gestureState) {
  //   this.props.navigation.pop();
  // }

  // onSwipe(gestureName, gestureState) {
  //   const {
  //     SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT,
  //   } = swipeDirections;
  //   this.setState({gestureName});
  //   switch (gestureName) {
  //   case SWIPE_UP:
  //     break;
  //   case SWIPE_DOWN:
  //     break;
  //   case SWIPE_LEFT:
  //     break;
  //   case SWIPE_RIGHT:
  //     break;
  //   default:
  //     break;
  //   }
  // }

  render() {
    if (this.state.fontLoaded) {
      return (
        <View style={styles.container}>
          <SvgUri
            width="1000"
            height="1000"
            // source={{uri:'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg'}}
            source={require('../../../assets/images/bg-shapes-0.svg')}
            style={{ position: 'absolute', top: 0, zIndex: -1 }}
          />
          <View style={styles.headerCont}>
            <View style={styles.headerIcon} name="" size={45} color="#FF5722" />
            <Text style={styles.header}>Details</Text>
            <Ionicons style={styles.headerIcon} name="user-circle" size={45} color="#FF5722" />
          </View>
          <View style={styles.mapCardCont}>
            <View style={styles.mapCardInfo}>
              <Text style={{ color: '#fff', fontSize: 24, fontFamily: 'TitilliumWeb-SemiBold' }}>{this.state.title}</Text>
            </View>
            {this.createMap()}
            {/* <Image
              style={styles.mapCardImage}
              source={{ uri: 'https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png' }}
            /> */}
          </View>
          <View style={styles.contentCont}>
            <Text style={styles.addrCat}>On-campus</Text>
            <View style={styles.catTagCont}>
              <View style={styles.catTag}>
                <SvgUri
                  width="20"
                  height="20"
                  fill="#fff"
                  source={require('../../../assets/images/icn-smile.svg')}
                  style={styles.catTagImg}
                />
                <Text style={styles.catTagText}>Casual Game</Text>
              </View>
            </View>
            <Text style={styles.addr}>20 E Wheelock St, Apt B</Text>
            <Text style={styles.timeLabel}>5:40PM EST</Text>
            <View style={styles.btnGroup}>
              {/* Distance Estimate */}
              <View style={styles.btnDist}>
                <SvgUri
                  width="50"
                  height="50"
                  fill="#fff"
                  source={require('../../../assets/images/icn-car.svg')}
                  style={styles.btnDistImg}
                />
                <Text style={styles.btnDistText}>15 min</Text>
              </View>
              {/* Time Left */}
              <View style={styles.btnTime}>
                <SvgUri
                  width="50"
                  height="50"
                  fill="#fff"
                  source={require('../../../assets/images/icn-stopwatch.svg')}
                  style={styles.btnTimeImg}
                />
                <Text style={styles.btnTimeText}>{this.state.startTime}</Text>
              </View>
              {/* Chat room */}
              {/* this.props.route.params.eventId */}
              <TouchableOpacity style={styles.btnChat} onPress={() => { this.props.navigation.navigate('Chat', {eventId: '5ede403b87d3d0003875cd97' }); console.log('passedIn: 5ede6f2087d3d0003875cdb0'); }}>
                <SvgUri
                  width="50"
                  height="50"
                  fill="#FF5722"
                  source={require('../../../assets/images/icn-chat.svg')}
                  style={styles.btnChatImg}

                />
                <Text style={styles.btnChatText}>Chat Board</Text>
              </TouchableOpacity>
              {/* Subscribe */}
              <TouchableOpacity style={styles.btnSubs}>
                <SvgUri
                  width="50"
                  height="50"
                  fill="#FF5722"
                  source={require('../../../assets/images/icn-bell-filled.svg')}
                  style={styles.btnSubsImg}
                />
                <Text style={styles.btnSubsText}>Subscribed</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.desc}>{this.state.description}</Text>
          </View>
          
          <View style={styles.tabBarCont}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.pop()}
              // onPress={() => this.props.navigation.navigate('Main', {})}
              style={{ width: '50%' }}
              // onPressOut={this.onPressOut}
              // onPressIn={this.onPressIn}
            >
              <View style={styles.btnCont}>
                <Ionicons name="undo" size={45} color="#FF5722" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnContWithBackground}
              activeOpacity={0.8}
              onPress={() => this.props.navigation.pop()}
            >
              <Ionicons name="thumbs-up" size={45} color="#FFF" />
            </TouchableOpacity>
          </View>
          
        </View>
      );
    } else {
      return (
        <View style={[styles.loading]}>
          <ActivityIndicator size="large" color="#FF5722" />
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return ({
    events: state.eventsSh.all,
  });
};
export default connect(mapStateToProps, { fetchEvents })(EventInfo);
// export default connect(null, { fetchEvents })(EventInfo);