/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-extend-native */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
  TextInput, Keyboard, SafeAreaView, 
} from 'react-native';
// import { Input } from 'react-native-elements';
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
import * as actions from './actions';
import { styles } from './styles';


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
      eventTitle: '',
      fontLoaded: false,
      date: new Date(),
      time: new Date(),
      mode: 'date',
      show: false,
      locationVisible: false,
      loading: true,
      region: {
        latitude: 43.704205,
        longitude: -72.288465,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Item 1',
          text: 'Text 1',
        },
        {
          title: 'Item 2',
          text: 'Text 2',
        },
        {
          title: 'Item 3',
          text: 'Text 3',
        },
        {
          title: 'Item 4',
          text: 'Text 4',
        },
        {
          title: 'Item 5',
          text: 'Text 5',
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
  }

  // Update local state to reflect modified title 
  handleTitleChange = (event) => {
    // console.log('entering handleTitleChange() method');
    // console.log(event.nativeEvent.text);
    this.setState({eventTitle: event.nativeEvent.text});
    // console.log(this.state.eventTitle);
  }

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

  renderConfirmation = () => {
    console.log(typeof (this.props.newEvent.eventTitle));
    if (typeof (this.props.newEvent.eventTitle) !== 'undefined') {
      return (
        <Text> {this.props.newEvent.eventTitle} has been created!!</Text>
      );
    }
  }
  

  showMode = (newMode) => {
    this.setState({show: true});
    this.setState({mode: newMode});
  }

  showDatePicker = () => {
    this.showMode('date');
  }
  
  showTimePicker = () => {
    this.showMode('time');
  }

   onChange = (event, selectedDateOrTime) => {
     if (this.state.mode === 'date') {
       //  this.setState({show: Platform.OS === 'ios'});
       this.setState({show: false});
       this.setState(
         (prevState) => (
           {date: selectedDateOrTime || prevState.date}
         ),
       );
       console.log(selectedDateOrTime);
       console.log(this.state.mode === 'date');
     }
     else {
       //  this.setState({show: Platform.OS === 'ios'});
       this.setState({show: false});
       this.setState(
         (prevState) => (
           {time: selectedDateOrTime || prevState.time}
         ),
       );
       console.log(selectedDateOrTime);
       console.log(this.state.mode === 'date');
     }
   };

   handleLocationTouch = () => {
     this.setState({locationVisible: true});
   }

   renderItem = ({item, index}) => {
     return (
       <View style={{
         backgroundColor: 'floralwhite',
         borderRadius: 5,
         height: 250,
         padding: 50,
         marginLeft: 25,
         marginRight: 25, 
       }}
       >
         <Text style={{fontSize: 30}}>{item.title}</Text>
         <Text>{item.text}</Text>
       </View>

     );
   }

   render() {
     if (!this.state.fontLoaded) {
       return (<AppLoading />);
     }

     return (
       <View style={styles.container}>
         <View style={styles.row0}>
           <Text>Row 0: Blank</Text>
         </View>
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
         <View style={styles.row2}>
           <Item>
             <Input placeholder="Add Title!"
               style={styles.titleField} 
               onChange={this.handleTitleChange} 
               value={this.state.eventTitle}
             />
           </Item>
           {/* <TextInput 
             style={styles.titleField}
             onChangeText={(newText) => this.setState({ eventTitle: newText })}
             value={this.state.eventTitle}
             placeholder="Add Title"
           /> */}
         </View>
         <View style={styles.row3}>
           <Icon type="MaterialIcons" name="schedule" style={styles.timeIcon} />
           <DateFieldBox onTouchStart={this.showDatePicker}>
             <Text style={styles.dateFieldText}>{customFormatDate(this.state.date)}</Text>
           </DateFieldBox>
           <TimeFieldBox onTouchStart={this.showTimePicker}>
             <Text style={styles.dateFieldText}>{customFormatTime(this.state.time)}</Text>
           </TimeFieldBox>
           {this.state.show && (
             <DateTimePicker
               testID="dateTimePicker"
               timeZoneOffsetInMinutes={0}
               value={this.state.date}
               mode={this.state.mode}
               display="default"
               onChange={this.onChange}
             />
           )}
         </View>
         <View style={styles.row4}>
           <Icon type="MaterialIcons" 
             name="place"
             style={styles.timeIcon} 
             onTouchStart={this.handleLocationTouch}
           />
           
           {/* {this.state.locationVisible && (
             <LocationView style={styles.location}
               apiKey="AIzaSyCkF0co2lCm52v6lv8Rnv6FcTaNV5VrW0wEY"
               initialLocation={{
                 latitude: 37.78825,
                 longitude: -122.4324,
               }}
             />
           )}
            */}
           
           
           <Modal style={styles.mapModal}
             isVisible={this.state.locationVisible}
             onBackdropPress={() => this.setState({locationVisible: false})}
             //  onSwipeComplete={() => this.setState({locationVisible: false})}
             //  swipeDirection="left"
           >
             <MapView
               style={styles.map}
               //  initialRegion={this.state.region}
               showsUserLocation
             >
               <MapView.Marker
                 coordinate={{
                   latitude: this.state.region.latitude,   
                   longitude: this.state.region.longitude, 
                 }}
                 title="Your LocAation"
                 draggable
               />
             </MapView>
           </Modal>
           
           
         </View>
         <View style={styles.row}> 
           <Text>Row 5: Category</Text>
           <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
             <Carousel
               layout="default"
               ref={(ref) => this.carousel = ref}
               data={this.state.carouselItems}
               sliderWidth={300}
               itemWidth={300}
               renderItem={this.renderItem}
               onSnapToItem={(index) => this.setState({activeIndex: index})}
             />
           </View>
         </View>
         <View style={styles.row}> 
           <Text>Row 6: Skill</Text>
           <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
             <Carousel
               layout="default"
               ref={(ref) => this.carousel = ref}
               data={this.state.carouselItems}
               sliderWidth={300}
               itemWidth={300}
               renderItem={this.renderItem}
               onSnapToItem={(index) => this.setState({activeIndex: index})}
             />
           </View>
         </View>
         <View style={styles.row}>
           <Text>Row 7: Description</Text>
         </View>
       </View>
     );
   }
}

const DateFieldBox = styled.View`
  height: 45px;
  width: 90px;
  background-color: white;
  border-radius: 16px;
  border: gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

const TimeFieldBox = styled.View`
  height: 45px;
  width: 70px;
  background-color: white;
  border-radius: 16px;
  border: gray;
  display: flex;
  align-items: center;
  justify-content: center;
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
