/* eslint-disable react/no-did-update-set-state */
/* eslint-disable global-require */
import React, { Component } from 'react';
import {
  Icon, Fab,
} from 'native-base';
import {
  View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions, Modal,
} from 'react-native';
import { connect } from 'react-redux';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
// import * as Font from 'expo-font';
// import SvgUri from 'react-native-svg-uri';
import MapView, { Marker, Callout } from 'react-native-maps';
import { getDistance } from 'geolib';
import { API_KEY } from '../new_event';
// import { customFormatTime } from '../new_event';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import { styles } from '../../../assets/styles/event_info';
import {
  fetchEvents, fetchSubscribedEvents, subscribeEvent, unsubscribeEvent,
  fetchImdownEvents, imdownEvent, unimdownEvent,
} from './actions';

class EventInfo extends Component {
  constructor(props) {
    super(props);


    this.mapRef = null;
    this.state = { 
      region: { // default just set it to NC b/c my event markers were located here; feel free to change for your testing purposes
        latitude: this.props.route.params.event.latitude,
        longitude: this.props.route.params.event.longitude,
        latitudeDelta: 0.0004,
        longitudeDelta: 0.008,
      },
      id: this.props.route.params.event.id,
      title: this.props.route.params.event.eventTitle,
      skillLevel: this.props.route.params.event.skillLevel,
      startTime: this.props.route.params.event.startTime,
      description: this.props.route.params.event.description,
      hostName: this.props.route.params.event.hostName,
      category: this.props.route.params.event.category,
      eventList: [],
      currentTime: new Date(),
      popupVisible: false,

    };
  }

  async componentDidMount() {
    // try {
      // await Font.loadAsync({
      //   'pacifico-regular': require('../../../assets/fonts/Pacifico-Regular.ttf'),
      //   'TitilliumWeb-SemiBold': require('../../../assets/fonts/TitilliumWeb-SemiBold.ttf'),
      //   'ReenieBeanie-Regular': require('../../../assets/fonts/ReenieBeanie-Regular.ttf'),
      //   'Montserrat-Regular': require('../../../assets/fonts/Montserrat-Regular.ttf'),
      //   'Montserrat-SemiBold': require('../../../assets/fonts/Montserrat-SemiBold.ttf'),
      //   'OpenSans-Regular': require('../../../assets/fonts/OpenSans-Regular.ttf'),
      // });
    //   this.setState({ fontLoaded: true });
    //   console.log('fonts are loaded');
    // } catch (error) {
    //   console.log(error);
    // }
    // console.log(customFormatTime(this.state.startTime));
    // // fetching events for testing
    // try {
    //   await this.props.fetchEvents();
    // } catch (error) {
    //   console.log(error);
    // }
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.route.params.event.latitude},${this.props.route.params.event.longitude}&key=${API_KEY}`)
      .then((response) => response.json())
      .then((responseJson) => {
        const addr = responseJson.results[0].formatted_address;
        this.setState({ addr });
      });
    
    this._getLocation();
    if (this.props.token) {
      this.props.fetchImdownEvents(this.props.token).then((res) => {
        // console.log(res);
        for (let i = 0; i < res.length; i++)
          if (res[i].id === this.props.route.params.event.id) {
            this.setState({ imdown: 1 });
            break;
          }
      });
      this.props.fetchSubscribedEvents(this.props.token).then((res) => {
        // console.log(res);
        for (let i = 0; i < res.length; i++)
          if (res[i].id === this.props.route.params.event.id) {
            this.setState({ subscribed: 1 });
            break;
          }
      });
    }
    
  }

  // componentDidUpdate(prevProps) {
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
  // } 

  customFormatTime = (dateString) => {
    const date = new Date(dateString);
    const tks = date.toDateString().split(' ');
    const hours = date.getHours() === 0 ? '12' : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return `${tks[1]} ${tks[2]}, ${tks[3]}   ${formattedTime}`;
  }

  hourDiff = () => {
    const curr = new Date();
    const sTime = new Date(this.state.startTime);
    if (!this.state.startTime || sTime.getDate() - curr.getDate() < 0 || (sTime.getDate() - curr.getDate() == 0 && sTime.getHours() - curr.getHours() < 0)) return -1;
    let sHour = sTime.getHours();
    sHour += 24 * (sTime.getDate() - curr.getDate());
    return sHour - curr.getHours();
  }
  estimatedTime = (estimatedDist) => {
    if (estimatedDist/80.4 < 5) return {res: '<5min', name: 'walk'};
    else if (estimatedDist/80.4 <= 20) return {res: `${(estimatedDist/80.4).toFixed()}min`, name: 'walk'};
    else if (estimatedDist/1072.88 <= 60) return {res: `${(estimatedDist/1072.88).toFixed()}min`, name: 'car'};
    else if (estimatedDist/1072.88 <= 120) return {res: `1h${(estimatedDist/1072.88).toFixed() - 60}min`, name: 'car'};
    // else if (this.state.estimatedDist/1072.88 > 120) return {res: '>2h', name: 'car'};
    else return {res: '>2h', name: 'car'};
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
    const estimatedDist = getDistance({ latitude: this.props.route.params.event.latitude, longitude: this.props.route.params.event.longitude }, { latitude: location.coords.latitude, longitude: location.coords.longitude });
    this.setState({
      location,
      estimatedDist,
      estimatedTime: this.estimatedTime(estimatedDist),
    }, () => {
      console.log('location set.');
      // console.log()
    });
  }

// this function creates the events, and is called by createMap (this is b/c markers must be children of MapView)
createMarkers = () => {
  const MIN_ZOOM_FOR_MARKER_CHANGE = 0.02;

  // these maps are used to give meaning to the icons
  const eventCategoryToIcon = new Map([
    ['nightlife', require('../../../assets/images/nightlife.png')],
    ['culture', require('../../../assets/images/culture.png')],
    ['educational', require('../../../assets/images/educational.png')],
    ['sport', require('../../../assets/images/sport.png')],
    ['game', require('../../../assets/images/game.png')],
    ['food', require('../../../assets/images/food.png')],
  ]);

  const eventLevelToIcon = new Map([ 
    ['pro', '#F44336'],
    ['amateur', '#0000FF'],
    ['casual', '#008000'], 
  ]);
  if (this.state.location) return (
    <>
    <Marker key={this.state.id} coordinate={{ latitude: this.props.route.params.event.latitude, longitude: this.props.route.params.event.longitude}}>
      <Icon type="MaterialCommunityIcons" name="map-marker" style={styles.eventInfoMarker} />
      {/* <Callout>
        <Text style={{width: '100%'}}>It&#39;s you</Text>
      </Callout> */}
    </Marker>
    
    <Marker key='user_location' coordinate={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude}}>
      <Icon type="MaterialCommunityIcons" name="human-handsup" style={styles.eventInfoUserMarker} />
      <Callout>
        <Text style={{width: 100, fontFamily: 'OpenSans-Regular'}}>feeling cute might delete later</Text>
      </Callout>
  </Marker>
  </>
  );
  else return null;
  
  // return this.state.eventList.map((obj) => {
  //   const eventOpacity = this.createTransparencyFromStartTime(obj.startTime);


  //   // this first part handles what happens if you zoom super far in on a marker (we decided we want it to show more information)
  //   if (this.state.region.longitudeDelta < MIN_ZOOM_FOR_MARKER_CHANGE) { 
  //     return (
  //       <Marker key={obj.latitude} coordinate={{ latitude: obj.latitude, longitude: obj.longitude}}>
  //         <Text> {obj.title} </Text>
  //         <Callout>
  //           {/* <EventPreview /> */}
  //           <Text>Yo</Text>
  //         </Callout>


  //       </Marker>
  //     ); 
  //   }

  //   // this second part handles what happens normally, and shows just the event icon etc
  //   else {
  //     return (
  //       <Marker key={obj.latitude} coordinate={{ latitude: obj.latitude, longitude: obj.longitude}}>
  //         <Image source={eventCategoryToIcon.get(obj.category)}
  //           style={{
  //             height: 35, width: 35, borderWidth: 4, borderColor: eventLevelToIcon.get(obj.level), opacity: eventOpacity,
  //           }}
  //         />
  //         <Callout>
  //           {/* <EventPreview /> */}
  //           <Text>Yo</Text>
  //         </Callout>


  //       </Marker>
  //     ); }
  // });
}

  createMap = () => {
    return (
      <View>
        <MapView
          style={styles.mapCard}
          region={this.state.region}
          ref={(ref) => { this.mapRef = ref }}
          // scrollEnabled={false}
          // onLayout={this.onMapLayout}
          onRegionChangeComplete={this.handleRegionChange}
          // showsUserLocation
          // followsUserLocation
        > 
          {this.createMarkers()}
          {/* {this.state.location ? <MapViewDirections
            origin={{ latitude: this.state.location.latitude, longitude: this.state.location.longitude }}
            destination={{ latitude: this.props.route.params.event.latitude, longitude: this.props.route.params.event.longitude }}
            apikey={DIRECTIONS_API_KEY}
            strokeWidth={3}
            strokeColor="#FF5722"
          /> : null } */}
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
  onSubscribe = () => {
    // console.log('OnSubscribe', this.state.subscribed);
    if (this.state.subscribed) {
      this.props.unsubscribeEvent(this.props.token, this.props.route.params.event.id)
        .then(() => {
          this.setState({ subscribed: 0 });
        });
    } else {
      if (!this.props.token) {
        // popup - go login
        this.props.navigation.push('SignIn', { return: 1 });
      }
      else if (!this.state.imdown) {
        // popup imdown before you can subscribe
      }
      else {
        this.props.subscribeEvent(this.props.token, this.props.route.params.event.id)
        .then(() => {
          this.setState({ subscribed: 1 });
        });
      };
    }
  }

  onImdown = () => {
    if (this.state.imdown) {
      this.props.unimdownEvent(this.props.token, this.props.route.params.event.id)
        .then(() => {
          this.setState({ imdown: 0, subscribed: 0 }, () => {
            this.props.navigation.pop();
          });
        });
    } else {
      if (!this.props.token) {
        // popup - go login
        this.props.navigation.push('SignIn', { return: 1 });
      }
      else {
        this.props.imdownEvent(this.props.token, this.props.route.params.event.id)
        .then(() => {
          this.setState({ imdown: 1, subscribed: 1 }, () => {
            this.props.navigation.pop();
          });
        });
      };
    }
  }

  renderSubscribeBtn = () => {
    if (this.state.subscribed) return (
      <TouchableOpacity style={styles.btnSubs} onPress={this.onSubscribe}>
        {/* <SvgUri
          width="50"
          height="50"
          fill="#FF5722"
          source={require('../../../assets/images/icn-bell-filled.svg')}
          style={styles.btnSubsImg}
        /> */}
        <Icon type="MaterialCommunityIcons" name="bell-ring" style={styles.btnSubsImg} />
        {/* <Icon type="MaterialCommunityIcons" name="bell-outline" style={styles.btnSubsImg} /> */}
        <Text style={styles.btnSubsText}>Subscribed</Text>
      </TouchableOpacity>
    );
    else return (
      <TouchableOpacity style={styles.btnSubs} onPress={this.onSubscribe}>
        {/* <SvgUri
          width="50"
          height="50"
          fill="#FF5722"
          source={require('../../../assets/images/icn-bell-filled.svg')}
          style={styles.btnSubsImg}
        /> */}
        {/* <Icon type="MaterialCommunityIcons" name="bell-ring" style={styles.btnSubsImg} /> */}
        <Icon type="MaterialCommunityIcons" name="bell-outline" style={styles.btnSubsImg} />
        <Text style={styles.btnSubsText}>Subscribe</Text>
      </TouchableOpacity>
    );
  }

  renderImdownBtn = () => {
    if (this.state.imdown) return (
      <TouchableOpacity
        style={styles.btnContWithBackground}
        activeOpacity={0.8}
        onPress={this.onImdown}
      >
        {/* <Ionicons name="thumbs-up" size={45} color="#FFF" /> */}
        <Icon type="MaterialCommunityIcons" name="emoticon-dead-outline" style={{ fontSize: 30, color: '#fff' }} />
        <Text style={styles.tabBarLabel}>Nevermind!</Text>
      </TouchableOpacity>
    );
    else return (
      <TouchableOpacity
        style={styles.btnContWithBackground}
        activeOpacity={0.8}
        onPress={this.onImdown}
      >
        {/* <Ionicons name="thumbs-up" size={45} color="#FFF" /> */}
        <Icon type="MaterialCommunityIcons" name="emoticon-devil-outline" style={{ fontSize: 30, color: '#fff' }} />
        <Text style={styles.tabBarLabel}>I&#39;m down!</Text>
      </TouchableOpacity>
    );
  }

  renderCatTag = () => {
    if (!this.state.category) return null;
    switch (this.state.category) {
      case 'educational':
        return (
          <View style={styles.catTag}>
            <Icon type="MaterialCommunityIcons" name="book-open-page-variant" style={styles.catTagImg} />
            <Text style={styles.catTagText}>{this.state.category}</Text>
          </View>
        );
      case 'culture':
        return (
          <View style={styles.catTag}>
            <Icon type="MaterialCommunityIcons" name="translate" style={styles.catTagImg} />
            <Text style={styles.catTagText}>{this.state.category}</Text>
          </View>
        );
      case 'food':
        return (
          <View style={styles.catTag}>
            <Icon type="MaterialCommunityIcons" name="food" style={styles.catTagImg} />
            <Text style={styles.catTagText}>{this.state.category}</Text>
          </View>
        );
      case 'nightlife':
        return (
          <View style={styles.catTag}>
            <Icon type="MaterialCommunityIcons" name="book-open-page-variant" style={styles.catTagImg} />
            <Text style={styles.catTagText}>{this.state.category}</Text>
          </View>
        );
      case 'sport':
        return (
          <View style={styles.catTag}>
            <Icon type="MaterialCommunityIcons" name="volleyball" style={styles.catTagImg} />
            <Text style={styles.catTagText}>{this.state.category}</Text>
          </View>
        );
      case 'game':
        return (
          <View style={styles.catTag}>
            <Icon type="MaterialCommunityIcons" name="gamepad-variant" style={styles.catTagImg} />
            <Text style={styles.catTagText}>{this.state.category}</Text>
          </View>
        );
      default:
        return (
          <View style={styles.catTag}>
            <Icon type="MaterialCommunityIcons" name="emoticon-cool-outline" style={styles.catTagImg} />
            <Text style={styles.catTagText}>{this.state.category}</Text>
          </View>
        );
    }
  }
  renderPopup() {
    return (
      <Modal
        isVisible={this.state.popupVisible}
        backdropOpacity={0.3}
        onBackdropPress={() => this.setState({ popupVisible: false })}
        style={{
          // borderColor: 'white',
          // borderWidth: 2, 
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
          <View style={{
            // borderColor: 'white',
            // borderWidth: 2, 
            width: 0.9*Dimensions.get('window').width,
            // justifyContent: 'space-around',
            // alignItems: 'center',
            minHeight: 60,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 15,
          }}
          >
            <Text>Yesss</Text>
          </View>
      </Modal>
    );
  }
  render() {
    // if (this.state.fontLoaded && this.state.addr) {
    if (this.state.addr) {
      return (
        <View style={styles.container}>
          {/* <SvgUri
            width="1000"
            height="1000"
            // source={{uri:'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg'}}
            source={require('../../../assets/images/bg-shapes-0.svg')}
            style={{ position: 'absolute', top: 0, zIndex: -1 }}
          /> */}
          <View style={styles.headerCont}>
            <View style={styles.headerIcon} name="" size={45} color="#FF5722" />
            <Text style={styles.header}>Details</Text>
            {/* <Icon type="MaterialCommunityIcons" name='user-circle' style={{ fontSize: 30, color: '#FF5722' }}/> */}
          </View>
          <ScrollView style={styles.contentCont}>
            <View style={styles.titleCardCont}>
              <View style={styles.titleCard}>              
                <View style={styles.title}>
                    <Text style={{ color: '#000', fontSize: 24, fontFamily: 'TitilliumWeb-SemiBold' }}>{this.state.title}</Text>
                </View>
                <View style={styles.addrCont}>
                  <Text style={styles.addr}>{this.state.addr}</Text>
                </View>
                <View style={styles.addrCont}>
                  <Text style={styles.timeLabel}>{this.customFormatTime(this.state.startTime)}</Text>
                </View>
                <View style={styles.TagCont}>
                  <View style={styles.nameTagCont}>
                    <View style={styles.nameTag}>
                      {/* <SvgUri
                        width="20"
                        height="20"
                        fill="#fff"
                        source={require('../../../assets/images/icn-smile.svg')}
                        style={styles.catTagImg}
                      /> */}
                      <Text style={[styles.catTagText, { color: '#757575', fontSize: 12 }]}>Created by </Text>
                      <Text style={[styles.catTagText, { color: '#000', fontSize: 12 }]}>{this.state.hostName}</Text>
                    </View>
                  </View>
                  <View style={styles.catTagCont}>
                    {this.renderCatTag()}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.btnGroupCont}>
              <View style={styles.btnGroup}>
                {/* Distance Estimate */}
                <View style={styles.btnDist}>
                  {/* <SvgUri
                    width="50"
                    height="50"
                    fill="#fff"
                    source={require('../../../assets/images/icn-car.svg')}
                    style={styles.btnDistImg}
                  /> */}
                  <Icon type="MaterialCommunityIcons" name={this.state.estimatedTime?.name} style={styles.btnDistImg} />
                  <Text style={styles.btnDistText}>{this.state.estimatedTime?.res}</Text>
                </View>
                {/* Time Left */}
                <View style={styles.btnTime}>
                  {/* <SvgUri
                    width="50"
                    height="50"
                    fill="#fff"
                    source={require('../../../assets/images/icn-stopwatch.svg')}
                    style={styles.btnTimeImg}
                  /> */}
                  <Icon type="MaterialIcons" name="schedule" style={styles.btnTimeImg} />
                  <Text style={styles.btnTimeText}>{ this.hourDiff() < 0 ? 'Ended' : (this.hourDiff() ? `${this.hourDiff()}h left` : '<1h left') }</Text>
                </View>
                {/* Chat room */}
                <TouchableOpacity style={styles.btnChat} onPress={() => this.props.navigation.push('Chat', { eventId: this.state.id })}>
                  {/* <SvgUri
                    width="50"
                    height="50"
                    fill="#FF5722"
                    source={require('../../../assets/images/icn-chat.svg')}
                    style={styles.btnChatImg}
                  /> */}
                  <Icon type="MaterialCommunityIcons" name="forum" style={styles.btnChatImg} />
                  <Text style={styles.btnChatText}>Chat Board</Text>
                </TouchableOpacity>
                {/* Subscribe */}
                {this.renderSubscribeBtn()}
              </View>
            </View>

            <View style={styles.mapCardContCont}>
              <View style={styles.mapCardCont}>
                {this.createMap()}
                {/* <Fab
                  onPress={() => {
                    console.log('Called');
                    this.mapRef.fitToCoordinates(
                      {latitude: this.props.route.params.event.latitude, longitude: this.props.route.params.event.longitude}
                    );
                    // this.setState({
                    //   region: { // default just set it to NC b/c my event markers were located here; feel free to change for your testing purposes
                    //     latitude: this.props.route.params.event.latitude,
                    //     longitude: this.props.route.params.event.longitude,
                    //     latitudeDelta: 0.0004,
                    //     longitudeDelta: 0.008,
                    //   },
                    // });
                  }}
                  position="bottomRight"
                  style={{ }}
                >
                  <Icon name="ios-refresh" />
                </Fab> */}
                {/* <Image
                  style={styles.mapCardImage}
                  source={{ uri: 'https://www.google.com/maps/about/images/mymaps/mymaps-desktop-16x9.png' }}
                /> */}
              </View>
            </View>

            <View style={styles.titleCardCont}>
              <View style={[styles.titleCard, {minHeight: 150}]}>
                
                <View style={styles.title}>
                  <Text style={{ color: '#000', fontSize: 24, fontFamily: 'TitilliumWeb-SemiBold' }}>Description</Text>
                </View>
                <View style={styles.addrCont}>
                  <Text style={styles.addr}>{this.state.description ? this.state.description : 'The host intentionally left this emtpy :)' }</Text>
                </View>
              </View>
            </View>
            {/* {this.renderPopup()} */}
          </ScrollView>
          
          <View style={styles.tabBarCont}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => this.props.navigation.pop()}
              // onPress={() => this.props.navigation.navigate('Main', {})}
              style={styles.btnContWithoutBackground}
              // onPressOut={this.onPressOut}
              // onPressIn={this.onPressIn}
            >
                <Icon type="MaterialCommunityIcons" name="arrow-left" style={{ fontSize: 30, color: '#FF5722' }} />
            </TouchableOpacity>
            {this.renderImdownBtn()}
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
    subscribeError: state.eventsSh.subscribeError,
    subscribedEvents: state.eventsSh.subscribedEvents,
    token: state.auth.token,
  });
};
export default connect(mapStateToProps, { fetchEvents, fetchSubscribedEvents, subscribeEvent, unsubscribeEvent, fetchImdownEvents, imdownEvent, unimdownEvent, })(EventInfo);
// export default connect(null, { fetchEvents })(EventInfo);