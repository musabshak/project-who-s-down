/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button} from 'native-base';
import {Card} from '@paraboly/react-native-card'
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';


const eventCategoryToIcon = new Map([
  ['nightlife', require('../../../assets/nightlife.png')],
  ['culture', require('../../../assets/culture.png')],
  ['educational', require('../../../assets/educational.png')],
  ['Sport', require('../../../assets/sports.png')],
  ['Game', require('../../../assets/boardgames.png')],
  ['Food', require('../../../assets/food.png')],
]);

class EventCard extends Component {
  constructor(props) {
    super(props);
  }

    onDown = (event) => {
      if (this.props.event.imdown == true) {
        this.props.event.setState({
          down: false,
        }); }
      else {
        this.props.event.setState({
          down: true,
        });
      }
    }

    // this.props.post.id
    render() {
      if (this.props.authenticated) {
        return (
          <View style={{
            borderRadius: 5,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
          <View style={{
            zIndex: 0,
          }}
          >
            <TouchableOpacity >
            <Card
              title={this.props.event.eventTitle}
              iconComponent={<Image source={eventCategoryToIcon.get(this.props.event.category)}
                style={{ margin: -20, marginTop:-50, alignItems: 'center', justifyContent:'center',
                  height: 40, width: 40,
                }}/>}
              onPress={() => {this.props.navigate('EventInfo', { event: this.props.event });}}
              topRightText={<Text><Ionicons name={'clock'} size={17} color={'#FF5722'} style={{
              justifyContent: 'flex-start'}}/>{this.props.event.startTime.substring(11, 16)}</Text>}
              content={this.props.event.description}
              bottomRightComponent={<View style={{
                alignSelf:'flex-end',

              }}
              >
               <TouchableOpacity onPress={() => e.stopPropogation()}>
                 <Button onPress={() => e.stopPropogation()} style={{backgroundColor:'#fff', borderColor:'#FF5722',}}><Ionicons name={'thumbs-up'} size={30} color={'#FF5722'} style={{paddingLeft: 20}}/>
                 </Button>
               </TouchableOpacity>
               </View >}
              defaultContent="Click on the event to learn more!"
            />
            </TouchableOpacity>
            </View>
          </View>
        );  
      }
      else {
        return (
          <View style={{
            borderRadius: 5,
            padding: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Card
              title={this.props.event.eventTitle}
              iconComponent={<Image source={eventCategoryToIcon.get(this.props.event.category)}
                style={{ margin: -20, marginTop:30, alignItems: 'center', justifyContent:'center',
                  height: 40, width: 40,
                }}/>}
              onPress={() => {this.props.navigate('EventInfo', { event: this.props.event });}}
              topRightText={<Text><Ionicons name={'clock'} size={17} color={'#FF5722'} style={{
              justifyContent: 'flex-start', paddingRight: 20, paddingLeft: 20}}/>{this.props.event.startTime.substring(11, 16)}</Text>}
              content={this.props.event.description}
              bottomRightText={this.props.event.skillLevel}
            />
          </View>
        );  
      }
    }
}


export default EventCard;


/* <Card

<Button
                color= "#FF5722" 
                onPress={() => this.onDown()}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Down?' />

            
            {this.props.event.category}


  title='HELLO WORLD'
  image={require('../images/pic2.jpg')}>
  <Text style={{marginBottom: 10}}>
    The idea with React Native Elements is more about component structure than actual design.
  </Text>
  <Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' />
</Card> */

//...{this.props.event.startTime.substring(11, 16)}}

//{() => {this.props.navigate('EventInfo', { event: this.props.event });}}