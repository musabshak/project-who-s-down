/* eslint-disable no-alert */
/* eslint-disable no-useless-concat */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-extend-native */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
  TextInput, Keyboard, SafeAreaView, Button as OButton,
  ActivityIndicator, Dimensions, ScrollView, FlatList,
} from 'react-native';
import { Input as OInput } from 'react-native-elements';
import { connect } from 'react-redux';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  Container, Header, Content, Button, Icon, Input, Item, Textarea,
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
import * as actions from './actions';
import { styles } from './styles';

const API_KEY = 'AIzaSyAdSZFep0jeNIRNkm8mUfAAoayeTM04INU';

function customFormatDate(date) {
  return date.toDateString().split(' ').slice(0, -1).join(' ');
}

function customFormatTime(date) {
  const hours = date.getHours() === 0 ? '12' : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';
  const formattedTime = `${hours}:${minutes} ${ampm}`;
  return formattedTime;
}

class NewEventPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      eventTitle: '',
      /* DateTime Related State */
      startDate: new Date(),
      endDate: new Date(),
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
        },
        {
          title: 'Music',
          iconName: 'music',
        },
        {
          title: 'Movie',
          iconName: 'film',
        },
        {
          title: 'Dining',
          iconName: 'wine-glass-alt',
        },
      ],
      skillActiveIndex: 0,
      skillCarouselItems: [
        {
          title: 'No Experience',
        },
        {
          title: 'Some Experience',
        },
        {
          title: 'Lots of Experience',
        },
        {
          title: 'LOTS of Experience',
        },
      ],
    };
  }
  

  async componentDidMount() {
    await Font.loadAsync({
      // eslint-disable-next-line global-require
      'TitilliumWeb-Regular': require('../../../assets/fonts/TitilliumWeb-Regular.ttf'),
    });
    this.setState({fontLoaded: true});

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

  // Update local state to reflect modified title 
  handleTitleChange = (event) => {
    // console.log('entering handleTitleChange() method');
    // console.log(event.nativeEvent.text);
    this.setState({eventTitle: event.nativeEvent.text});
    // console.log(this.state.eventTitle);
  }

  /**
   * Save Button
   */
  handleCreateBtnPress = () => {
    // console.log('printing event title');
    // console.log(this.state.eventTitle);
    const event = {
      eventTitle: this.state.eventTitle,
      startTime: '2020-06-04T05:00:00.000Z',
      endTime: '2020-06-04T07:00:00.000Z',
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude,
      category: 'sport',
    };
    this.props.createEvent(event, this.props.nav_return);
  }

  /**
   * Date-Time Picker Methods
   */
  showStartDatePicker = () => {
    this.setState({show: true});
    this.setState({mode: 'date'});
    this.setState({startOrEnd: 'start'});
  };

  showEndDatePicker = () => {
    this.setState({show: true});
    this.setState({mode: 'date'});
    this.setState({startOrEnd: 'end'});
  };
  
  showStartTimePicker = () => {
    this.setState({show: true});
    this.setState({mode: 'time'});
    this.setState({startOrEnd: 'start'});
  };

  showEndTimePicker = () => {
    this.setState({show: true});
    this.setState({mode: 'time'});
    this.setState({startOrEnd: 'end'});
  };

  handleConfirm = (selectedDate) => {
    if (this.state.startOrEnd === 'start') {
      this.setState({show: false});
      this.setState({startDate: selectedDate});
    } else {
      this.setState({show: false});
      this.setState({endDate: selectedDate});
    }
    // console.log(customFormatDate(this.state.startDate));
    // console.log(customFormatTime(this.state.startDate));
    // console.log(customFormatDate(this.state.endDate));
    // console.log(customFormatTime(this.state.endDate));
  };
 
  handleCancel = () => {
    this.setState({show: false});
  }
  /** ************************************************************ */


  /**
   * Location Selection Methods
   */
   handleLocationTouch = () => {
     this.setState({locationVisible: true});
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
    this.setState({userLocationSelected: true});
  }

  closeLocationModal = () => {
    console.log('trying to close modal');
    this.setState({locationVisible: false, marginTop: 1});
  }
  /** ************************************************************ */
   
   
   /**
    * Render functions
    */
   renderExitSave = () => {
     return (
       <View style={styles.row1}>
         <Button transparent
           style={styles.IconBtn}
           onPress={() => this.props.nav_return()}
         >
           <Icon type="MaterialIcons" name="close" style={styles.closeIcon} />
         </Button>
         <Button style={styles.createBtn} onPress={this.handleCreateBtnPress}>
           <Text style={styles.buttonText}> SAVE! </Text>
         </Button>
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
            />
          </Item>
           
        </View>
      );
    }

    renderDateTime = () => {
      return (
        <View style={styles.row3}>
          <Icon type="MaterialIcons" name="schedule" style={styles.timeIcon} />

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
          </View>

          {this.state.show && (
            <DateTimePickerModal
              date={(this.state.startOrEnd === 'start') ? this.state.startDate : this.state.endDate}
              mode={this.state.mode}
              isVisible
              onConfirm={this.handleConfirm}
              onCancel={this.handleCancel}
            />
          )}

        </View>
      );
    }

    renderMap = () => {
      if (this.state.loading) {
        return (
          <View style={styles.spinnerView}>
            <ActivityIndicator size="large" color="#0000ff" />
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
                style={{flex: 1}}
              /> 
            </View>

          </Modal>
        </View>
      );
    }

    renderCategoryItem = ({item, index}) => {
      return (
        <View style={{
          backgroundColor: 'floralwhite',
          borderRadius: 15,
          // height: 140,
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
            <Icon type="FontAwesome5" name={item.iconName} style={styles.categoryIcon} />
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
              firstItem={1}
              ref={(ref) => this.carousel = ref}
              data={this.state.categoryCarouselItems}
              sliderWidth={Dimensions.get('window').width - 60}
              itemWidth={180}
              renderItem={this.renderCategoryItem}
              onSnapToItem={(index) => this.setState({categoryActiveIndex: index})}
            />
          </View>
        </View>
      );
    }

    renderSkillItem = ({item, index}) => {
      return (
        <View style={{
          backgroundColor: 'floralwhite',
          borderRadius: 15,
          // height: 140,
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
              sliderWidth={Dimensions.get('window').width - 60}
              itemWidth={200}
              renderItem={this.renderSkillItem}
              onSnapToItem={(index) => this.setState({skillActiveIndex: index})}
            />
          </View>
        </View>
      );
    }

    renderDescription = () => {
      return (
        <View style={styles.row7}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.labelText}>Description</Text>
          </View>
          <Textarea style={styles.description} rowSpan={10} bordered placeholder="Add a description" />
        </View>
      );
    }


    /** ************************************************************ */


    render() {
      if (!this.state.fontLoaded) {
        return (<AppLoading />);
      }

      return (
        <ScrollView style={styles.container}>
         
          {this.renderExitSave()}
          {this.renderTitle()}
          {this.renderDateTime()}
          {this.renderLocationRow()}
          {this.renderCategory()}
          {this.renderSkill()}
          {this.renderDescription()}
          
         
        </ScrollView>
      );
    }
}

const DateFieldBox = styled.View`
  height: 45px;
  width: 80px;
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
  newEvent: state.events.newEvent,
});

export default connect(mapStateToProps, 
  {createEvent: actions.createEvent})(NewEventPage);
