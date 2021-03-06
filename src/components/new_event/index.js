/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-alert */
/* eslint-disable no-useless-concat */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-extend-native */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image, Platform,
  TextInput, Keyboard, SafeAreaView, Button as OButton,
  ActivityIndicator, Dimensions, ScrollView, FlatList, StatusBar,
} from 'react-native';
import { Input as OInput } from 'react-native-elements';
import Textarea from 'react-native-textarea';
import { connect } from 'react-redux';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  Container, Header, Content, Button, Icon, Input, Item,
} from 'native-base';
import styled from 'styled-components';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
// import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import MapView from 'react-native-maps';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Redirect } from 'react-router-dom';
import AsyncStorage from '@react-native-community/async-storage';
import * as actions from './actions';
import { styles } from './styles';

export const API_KEY = 'AIzaSyAdSZFep0jeNIRNkm8mUfAAoayeTM04INU';

function customFormatDate(date) {
  return date.toDateString().split(' ').slice(1, -1).join(' ');
}

// https://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

// https://stackoverflow.com/questions/4968250/how-to-round-time-to-the-nearest-quarter-hour-in-javascript/4968292
function roundTimeQuarterHour(time) {
  const timeToReturn = new Date(time);

  timeToReturn.setMilliseconds(Math.ceil(timeToReturn.getMilliseconds() / 1000) * 1000);
  timeToReturn.setSeconds(Math.ceil(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / 15) * 15);
  return timeToReturn;
}

// Coped from Stack Overflow
function customFormatTime(date) {
  const hours = date.getHours() === 0 ? '12' : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return formattedTime;
}

const initialState = {
  errorModalVisible: false,
  backendErrorModalVisible: false,
  validationErrors: [],
  fontLoaded: false,
  eventTitle: '',
  /* DateTime Related State */
  startDate: roundTimeQuarterHour(addMinutes(new Date(), 15)),
  endDate: roundTimeQuarterHour(addMinutes(new Date(), 40)),
  mode: 'date',
  startOrEnd: 'start',
  show: false,
  /* Location Related State */
  locationVisible: false,
  loading: true,
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  },
  isMapReady: false,
  marginTop: 1,
  userLocation: '',
  userLocationSelected: false,
  regionChangeProgress: false,
  /* Category Related State */
  categoryActiveIndex: 0,
  categoryCarouselItems: [
    {
      title: 'Sport',
      iconName: 'baseball-ball',
      label: 'sport',
    },
    {
      title: 'Game',
      iconName: 'gamepad',
      label: 'game',
    },
    {
      title: 'Food',
      iconName: 'utensils',
      label: 'food',
    },
    {
      title: 'Educational',
      iconName: 'book-open',
      label: 'educational',
    },
    {
      title: 'Nightlife',
      iconName: 'glass-cheers',
      label: 'nightlife',
    },
    {
      title: 'Culture',
      iconName: null,
      label: 'culture',
    },
    // {
    //   title: 'Music',
    //   iconName: 'music',
    //   label: 'music',
    // },
    // {
    //   title: 'Movie',
    //   iconName: 'film',
    //   label: 'movie',
    // },
    // {
    //   title: 'DINING',
    //   iconName: 'wine-glass-alt',
    //   label: 'dining',
    // },
  ],
  /* Skill Related State */
  skillActiveIndex: 0,
  skillCarouselItems: [
    {
      title: 'Casual',
      label: 'casual',
    },
    {
      title: 'Amateur',
      label: 'amateur',
    },
    {
      title: 'Pro',
      label: 'pro',
    },

  ],
  /* Description Related State */
  description: '',
};

class NewEventPage extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }


  async componentDidMount() {
    this.resetState();


    await Font.loadAsync({
      // eslint-disable-next-line global-require
      'TitilliumWeb-Regular': require('../../../assets/fonts/TitilliumWeb-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });

    const token = await AsyncStorage.getItem('token');

    // console.log('Printing token');
    // console.log(token);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const region = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        // console.log('Found user"s position in location select');
        this.setState({
          region,
          loading: false,
          error: null,
        });
      },
      (error) => {
        this.setState({
          error: error.message,
          loading: false,
        });
      },
      { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
    );
  }

  resetState = () => {
    this.setState(initialState);
  }

  // Update local state to reflect modified title 
  handleTitleChange = (event) => {
    // console.log('entering handleTitleChange() method');
    // console.log(event.nativeEvent.text);
    this.setState({ eventTitle: event.nativeEvent.text });
    // console.log(this.state.eventTitle);
  }


  validateEvent = (event) => {
    let eventValidated = true;
    // Event tile may not be empty
    if (event.eventTitle === '') {
      eventValidated = false;
      const errorMessage = 'Event title is empty';
      console.log(errorMessage);
      this.setState((prevState) => ({
        validationErrors: [...prevState.validationErrors, errorMessage],
      }));
    }

    // Start time cannot be before current time
    if (event.startTime < new Date()) {
      eventValidated = false;
      const errorMessage = 'Event start time cannot be earlier than current time';
      console.log(errorMessage);
      this.setState((prevState) => ({
        validationErrors: [...prevState.validationErrors, errorMessage],
      }));
    }

    // End time cannot be before start time
    if (event.endTime <= event.startTime) {
      eventValidated = false;
      const errorMessage = 'Event end time cannot be earlier than start time';
      console.log(errorMessage);
      this.setState((prevState) => ({
        validationErrors: [...prevState.validationErrors, errorMessage],
      }));
    }

    // Some location must be selected
    if (!this.state.userLocationSelected) {
      eventValidated = false;
      const errorMessage = 'Must choose a location for the event';
      console.log(errorMessage);
      this.setState((prevState) => ({
        validationErrors: [...prevState.validationErrors, errorMessage],
      }));
    }

    return eventValidated;
  }

  /**
   * Save Button
   */
  handleCreateBtnPress = () => {
    // console.log('printing event title');
    // console.log(this.state.eventTitle);
    const event = {
      eventTitle: this.state.eventTitle,
      description: this.state.description,
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      category: this.state.categoryCarouselItems[this.state.categoryActiveIndex].label,
      skillLevel: this.state.skillCarouselItems[this.state.skillActiveIndex].label,
      startTime: this.state.startDate,
      endTime: this.state.endDate,
      formattedAddress: this.state.userLocation,
    };
    // console.log(event);

    const eventValidated = this.validateEvent(event);
    // const eventValidated = true;

    if (!eventValidated) {
      this.setState({ errorModalVisible: true });
    } else {
      this.props.createEvent(event);
    }
  }

  /**
   * Date-Time Picker Methods
   */
  showStartDatePicker = () => {
    this.setState({ show: true });
    this.setState({ mode: 'date' });
    this.setState({ startOrEnd: 'start' });
  };

  showEndDatePicker = () => {
    this.setState({ show: true });
    this.setState({ mode: 'date' });
    this.setState({ startOrEnd: 'end' });
  };

  showStartTimePicker = () => {
    this.setState({ show: true });
    this.setState({ mode: 'time' });
    this.setState({ startOrEnd: 'start' });
  };

  showEndTimePicker = () => {
    this.setState({ show: true });
    this.setState({ mode: 'time' });
    this.setState({ startOrEnd: 'end' });
  };

  handleConfirm = (selectedDate) => {
    if (this.state.startOrEnd === 'start') {
      this.setState({ show: false });
      this.setState({ startDate: selectedDate });
    } else if (this.state.startOrEnd === 'end') {
      this.setState({ show: false });
      this.setState({ endDate: selectedDate });
    }
    // console.log(customFormatDate(this.state.startDate));
    // console.log(customFormatTime(this.state.startDate));
    // console.log(customFormatDate(this.state.endDate));
    // console.log(customFormatTime(this.state.endDate));
  };

  handleCancel = () => {
    this.setState({ show: false });
  }
  /** ************************************************************ */


  /**
   * Location Selection Methods
   */
  handleLocationTouch = () => {
    this.setState({ locationVisible: true });
    //  console.log(this.state);
  }

  onMapReady = () => {
    // console.log('location selection map is now ready');
    this.setState({ isMapReady: true, marginTop: 0 });
    // console.log(this.state);
  }

  fetchAddress = () => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.region.latitude},${this.state.region.longitude}&key=${API_KEY}`)
      .then((response) => response.json())
      .then((responseJson) => {
        const userLocation = responseJson.results[0].formatted_address;
        this.setState({
          userLocation,
          regionChangeProgress: false,
        });
      });
  }

  // Update state on region change
  onRegionChange = (region) => {
    this.setState({
      region,
      regionChangeProgress: true,
    }, () => this.fetchAddress());
  }

  // Action to be taken after select location button click
  onLocationSelect = () => {
    this.closeLocationModal();
    this.setState({ userLocationSelected: true });
  }

  closeLocationModal = () => {
    // console.log('trying to close modal');
    this.setState({ locationVisible: false, marginTop: 1 });
  }
  /** ************************************************************ */


  /**
   * Render functions
   */

  renderBackendSuccessModal = () => {
    return (
      <Modal
        isVisible={this.props.backendSuccess}
        backdropOpacity={0.8}
        onBackdropPress={() => {
          this.props.resetBackEndErrorState();
          // this.props.navigation.navigate('Main');
          this.props.navigation.pop();
        }}
        style={{
          flex: 1,
          // borderColor: 'white',
          // borderWidth: 2, 
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{
          // borderColor: 'white',
          // borderWidth: 2, 
          // display: 'flex',
          width: 0.9 * Dimensions.get('window').width,
          justifyContent: 'space-around',
          alignItems: 'center',
          // backgroundColor: 'floralwhite',
          backgroundColor: '#fff',
          borderRadius: 5,
          minHeight: 60,
          padding: 15,
        }}
        >
          <Icon type="MaterialCommunityIcons" name="emoticon-wink-outline" style={{ fontSize: 30, color: '#FF5722' }} />
          <Text style={{
            color: '#757575',
            fontSize: 16,
            fontFamily: 'OpenSans-Regular',
            // borderColor: 'black',
            // borderWidth: 0,
            // paddingTop: 15,
            textAlign: 'center',
          }}
          >You're all set! The following event has been successfully created: "{this.props.createdEventTitle}"
          </Text>
          {/* <View>
              <Button 
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  height: 40,
                  width: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => { this.props.navigation.pop(); 
                  this.props.resetBackEndErrorState(); }}
              >
                <Text style={{
                  color: 'black',
                  fontFamily: 'TitilliumWeb-Regular',
                  fontSize: 17, 
                }}
                >Okay
                </Text>
              </Button>
            </View> */}

        </View>
      </Modal>
    );
  }

  renderBackendErrorModal = () => {
    return (
      <Modal
        isVisible={this.props.backendError}
        backdropOpacity={0.3}
        onBackdropPress={() => this.props.resetBackEndErrorState()}
      >
        <View style={{
          flex: 1,
          // borderColor: 'white',
          // borderWidth: 2, 
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <View style={{
            // borderColor: 'white',
            // borderWidth: 2, 
            width: Dimensions.get('window').width,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            minHeight: 170,
            backgroundColor: 'floralwhite',
            borderRadius: 10,
            padding: 15,
          }}
          >

            <Text style={{
              color: '#757575',
              fontSize: 20,
              borderColor: 'black',
              borderWidth: 0,
              textAlign: 'center',
            }}
            > Something went wrong at the back-end while creating this event; sorry!
            </Text>
            <View>
              <Button 
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  height: 40,
                  width: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.props.resetBackEndErrorState()}
              >
                <Text style={{
                  color: 'black',
                  fontFamily: 'TitilliumWeb-Regular',
                  fontSize: 17, 
                }}
                >Okay
                </Text>
              </Button>
            </View>

          </View>
        </View>
      </Modal>
    );
  }

  renderErrorModal = () => {
    const errors = this.state.validationErrors.map((errorMessage) => {
      return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Icon type="MaterialCommunityIcons" name="alert-circle-outline" style={{ fontSize: 15, color: '#FF5722' }} />
          <Text style={{
            color: '#757575',
            fontSize: 16,
            // borderColor: 'black',
            // borderWidth: 0,
            fontFamily: 'OpenSans-Regular',
            // alignSelf: 'flex-start',
            textAlign: 'center',
            padding: 5,
          }}
          >
            {/* {'\u2B24'} {errorMessage} */}
            {errorMessage}
          </Text>
        </View>
      );
    });


    return (

      <Modal
        isVisible={this.state.errorModalVisible}
        backdropOpacity={0.3}
        onBackdropPress={() => this.setState({ errorModalVisible: false, validationErrors: [] })}
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
          width: 0.9 * Dimensions.get('window').width,
          // justifyContent: 'space-around',
          // alignItems: 'center',
          minHeight: 60,
          backgroundColor: '#fff',
          borderRadius: 5,
          padding: 15,
        }}
        >
          {/* <Text>
              <Icon type="FontAwesome5" name="exclamation-triangle" style={{ color: 'red', fontSize: 40 }} />
            </Text> */}
          {/* <Text style={{
              // color: 'red',
              fontSize: 20,
              borderColor: 'black',
              borderWidth: 0,
              // flex: 1,
              // alignSelf: 'flex-start',
              // paddingTop: 15,
            }}
            >Please fix the following:
            </Text> */}
          {errors}
          {/* <View>
              <Button 
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  height: 40,
                  width: 150,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => this.setState({errorModalVisible: false})}
              >
                <Text style={{
                  color: 'black',
                  fontFamily: 'TitilliumWeb-Regular',
                  fontSize: 17, 
                }}
                >Okay
                </Text>
              </Button>
            </View> */}

        </View>
      </Modal>
    );
  }


  renderExitSave = () => {
    return (
      <View style={styles.row1}>
        <Button transparent
          style={styles.iconBtn}
          onPress={() => this.props.navigation.navigate('Main')}
        >
          <Icon type="MaterialIcons" name="close" style={styles.closeIcon} />
        </Button>
        <View style={styles.createBtnContainer}>
          <Button style={styles.createBtn} onPress={this.handleCreateBtnPress}>
            <Text style={styles.buttonText}> SAVE! </Text>
          </Button>
        </View>
      </View>
    );
  }

  renderTitle = () => {
    return (
      <View style={styles.row2}>
        <Item>
          <Input placeholder="Add Title"
            style={styles.titleField}
            onChange={this.handleTitleChange}
            value={this.state.eventTitle}
            transparent
            underlineColorAndroid="transparent"
            autoCorrect={false}
            maxLength={40}
          />
        </Item>

      </View>
    );
  }

  renderDateTime = () => {
    return (
      <View style={styles.row3}>
        <Icon type="MaterialIcons" name="schedule" style={styles.timeIcon} />

        {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
        <DateFieldBox onTouchStart={this.showStartDatePicker}>
          <Text style={styles.dateFieldText}>{customFormatDate(this.state.startDate)}</Text>
        </DateFieldBox>
        <TimeFieldBox onTouchStart={this.showStartTimePicker}>
          <Text style={styles.dateFieldText}>{customFormatTime(this.state.startDate)}</Text>
        </TimeFieldBox>


        <Text>to</Text>
        <DateFieldBox onTouchStart={this.showEndDatePicker}>
          <Text style={styles.dateFieldText}>{customFormatDate(this.state.endDate)}</Text>
        </DateFieldBox>
        <TimeFieldBox onTouchStart={this.showEndTimePicker}>
          <Text style={styles.dateFieldText}>{customFormatTime(this.state.endDate)}</Text>
        </TimeFieldBox>
        {/* </View> */}

        {/* {this.state.show && ( */}
        <DateTimePickerModal
          date={(this.state.startOrEnd === 'start') ? this.state.startDate : this.state.endDate}
          mode={this.state.mode}
          isVisible={this.state.show}
          onConfirm={this.handleConfirm}
          onCancel={this.handleCancel}
        />
        {/* )} */}

      </View>
    );
  }

  renderMap = () => {
    if (this.state.loading) {
      return (
        <View style={styles.spinnerView}>
          <ActivityIndicator size="large" color="#FF5722" />
        </View>
      );
    }
    return (
      <View style={styles.mapContainer}>
        <MapView
          style={{ ...styles.map, marginTop: this.state.marginTop }}
          initialRegion={this.state.region}
          showsUserLocation
          onMapReady={this.onMapReady}
          onRegionChangeComplete={this.onRegionChange}
        />
        {/* <MapView.Marker
          coordinate={{
            latitude: this.state.region.latitude,   
            longitude: this.state.region.longitude, 
          }}
          title="Your LocAation"
          draggable
        /> */}


        <View style={styles.mapMarkerContainer}>
          <Icon type="MaterialIcons"
            name="place"
            style={styles.mapMarkerIcon}
          />
        </View>
      </View>

    );
  }

  renderLocationRow = () => {
    return (
      <View style={styles.row4} onTouchStart={this.handleLocationTouch}>
        <Icon type="MaterialIcons"
          name="place"
          style={styles.mapMarkerIcon}
        />
        <Text
          numberOfLines={2}
          style={styles.addLocationField}
        > {this.state.userLocationSelected ? this.state.userLocation : 'Add Location'}
        </Text>
        <Modal style={styles.mapModal}
          isVisible={this.state.locationVisible}
          onBackdropPress={this.closeLocationModal}
        //  onSwipeComplete={() => this.setState({locationVisible: false})}
        //  swipeDirection="left"
        >
          {this.renderMap()}

          <View style={styles.detailSection}>
            <Text style={{
              fontSize: 16, fontWeight: 'bold', marginBottom: 5,
            }}
            >Move map for location
            </Text>
            <Text style={{ fontSize: 10, color: '#999' }}>LOCATION</Text>
            <Text numberOfLines={2}
              style={{
                fontSize: 14,
                borderBottomColor: 'silver',
                borderBottomWidth: 0.5,
                paddingHorizontal: 15,
              }}
            >
              {!this.state.regionChangeProgress ? this.state.userLocation : 'Identifying Location...'}
            </Text>

            <Button
              style={styles.locationBtn}
              disabled={this.state.regionChangeProgress}
              onPress={this.onLocationSelect}
            >
              <Text style={styles.buttonText}>Pick this location!</Text>
            </Button>
          </View>

          <View style={styles.emptyContainer}>
            <Button transparent
              onPress={this.closeLocationModal}
              style={{ flex: 1 }}
            />
          </View>

        </Modal>
      </View>
    );
  }

  renderCategoryItem = ({ item, index }) => {
    return (
      <View style={{
        backgroundColor: 'floralwhite',
        borderRadius: 15,
        height: 180,
        // width: 140,
        flex: 1,
        marginBottom: 10,
        padding: 20,
        marginLeft: 0,
        marginRight: 0,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text>
          {item.iconName && (<Icon type="FontAwesome5" name={item.iconName} style={styles.categoryIcon} />)}
        </Text>
      </View>

    );
  }


  renderCategory = () => {
    return (
      <View style={styles.row5}>
        <Text style={styles.labelText}>Category</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Carousel
            layout="default"
            enableSnap
            // enableMomentum
            swipeThreshold={10}
            lockScrollWhileSnapping
            firstItem={2}
            ref={(ref) => this.carousel = ref}
            data={this.state.categoryCarouselItems}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={180}
            renderItem={this.renderCategoryItem}
            onSnapToItem={(index) => this.setState({ categoryActiveIndex: index })}
          />
        </View>
      </View>
    );
  }

  renderSkillItem = ({ item, index }) => {
    return (
      <View style={{
        backgroundColor: 'floralwhite',
        borderRadius: 15,
        height: 180,
        // width: 140,
        flex: 1,
        marginBottom: 10,
        padding: 20,
        marginLeft: 0,
        marginRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
      >
        <Text style={styles.categoryTitle}>{item.title}</Text>
        {/* <Text>
            <Icon type="FontAwesome5" name={item.iconName} style={styles.categoryIcon} />
          </Text> */}
      </View>

    );
  }

  renderSkill = () => {
    return (
      <View style={styles.row6}>
        <Text style={styles.labelText}>Skill</Text>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <Carousel
            layout="default"
            enableSnap
            swipeThreshold={10}
            lockScrollWhileSnapping
            firstItem={1}
            ref={(ref) => this.carousel = ref}
            data={this.state.skillCarouselItems}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={180}
            renderItem={this.renderSkillItem}
            onSnapToItem={(index) => this.setState({ skillActiveIndex: index })}
          />
        </View>
      </View>
    );
  }

  renderDescription = () => {
    return (
      <View style={styles.row7}>
        <View style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
          <Text style={styles.labelText}>Description</Text>
        </View>
        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          maxLength={500}
          placeholder="Add a description!"
          placeholderTextColor="#c7c7c7"
          autoCorrect={false}
          onChangeText={(value) => this.setState({ description: value })}
        />
      </View>
    );
  }


  /** ************************************************************ */


  render() {
    if (!this.state.fontLoaded) {
      return (<AppLoading />);
    }

    return (
      <SafeAreaView style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 27 : StatusBar.currentHeight + 7, backgroundColor: 'white' }}>
        <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
          {this.renderBackendSuccessModal()}
          {this.renderBackendErrorModal()}
          {this.renderErrorModal()}
          {this.renderExitSave()}
          {this.renderTitle()}
          {this.renderDateTime()}
          {this.renderLocationRow()}
          {this.renderCategory()}
          {this.renderSkill()}
          {this.renderDescription()}


        </ScrollView>
      </SafeAreaView>
    );
  }
}

const DateFieldBox = styled.View`
  height: 45px;
  width: 60px;
  background-color: white;
  border-radius: 16px;
  border: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px;
`;

const TimeFieldBox = styled.View`
  height: 45px;
  width: 65px;
  background-color: white;
  border-radius: 16px;
  border: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const Box = styled.View`
  flex: 1;
  height: 50px;
  width:150px;
  background-color: blue;
  position: absolute;
  right: 0px;
  top: 5px;
`;


const mapStateToProps = (state) => ({
  createdEventTitle: state.newEventStatus.createdEventTitle,
  backendError: state.newEventStatus.error,
  backendSuccess: state.newEventStatus.success,
});

export default connect(mapStateToProps,
  {
    createEvent: actions.createEvent,
    resetBackEndErrorState: actions.resetBackEndErrorState,
  })(NewEventPage);