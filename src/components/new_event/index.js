/* eslint-disable no-nested-ternary */
/* eslint-disable no-extend-native */
import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
  TextInput, Keyboard,
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
    this.setState({eventTitle: event.target.value});
  }

  handleCreateBtnPress = () => {
    const event = {
      eventTitle: this.state.eventTitle,
    };
    this.props.createEvent(event);
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
       this.setState({show: Platform.OS === 'ios'});
       this.setState(
         (prevState) => (
           {date: selectedDateOrTime || prevState.date}
         ),
       );
       console.log(selectedDateOrTime);
       console.log(this.state.mode === 'date');
     }
     else {
       this.setState({show: Platform.OS === 'ios'});
       this.setState(
         (prevState) => (
           {time: selectedDateOrTime || prevState.time}
         ),
       );
       console.log(selectedDateOrTime);
       console.log(this.state.mode === 'date');
     }
   };

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
           <Button transparent style={styles.IconBtn}>
             <Icon type="MaterialIcons" name="close" style={styles.closeIcon} />
           </Button>
           <Button style={styles.createBtn}>
             <Text style={styles.buttonText}> SAVE! </Text>
           </Button>
         </View>
         <View style={styles.row2}>
           <Item>
             <Input placeholder="Add Title!" style={styles.titleField} />
           </Item>
         </View>
         <View style={styles.row3}>
           <Icon type="MaterialIcons" name="schedule" style={styles.timeIcon} />
           <Item rounded style={styles.dateField}>
             <Input onTouchStart={this.showDatePicker} 
               placeholder={customFormatDate(this.state.date)}
               caretHidden
             />
           </Item>
           <Item rounded style={styles.timeField}>
             <Input onTouchStart={this.showTimePicker} 
               placeholder={customFormatTime(this.state.time)}
               caretHidden
             />
           </Item>
           
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
         <View style={styles.row}>
           <Text>Row 4: Location</Text>
          
         </View>
         <View style={styles.row}> 
           <Text>Row 5: Category</Text>
         </View>
         <View style={styles.row}> 
           <Text>Row 6: Skill</Text>
         </View>
         <View style={styles.row}>
           <Text>Row 7: Description</Text>
         </View>
       </View>
     );
   }
}


const CrtButton = styled.TouchableOpacity`
  flex: 1;
  height: 50px;
  width:150px;
  background-color: blue;
  position: absolute;
  right: 0;
  top: 5;
`;


const mapStateToProps = (state) => ({
  newEvent: state.events.newEvent,
});

export default connect(mapStateToProps, 
  {createEvent: actions.createEvent})(NewEventPage);
