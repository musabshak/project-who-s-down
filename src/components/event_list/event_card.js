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
import {imdownEvent,unimdownEvent, fetchImdownEvents} from './actions';




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
   componentDidMount(){
    if (this.props.token) {
      this.props.fetchImdownEvents(this.props.token).then((res) => {
        // console.log(res);
        for (let i = 0; i < res.length; i++)
          if (res[i].id === this.props.route.params.event.id) {
            this.setState({ imdown: 1 });
            break;
          }
      });

  }
}

    onDown = (event) => {
      if (this.state.imdown == 1) {
        this.props.imdownEvent(this.props.token, this.props.route.params.event.id)
      }
      else {
        this.props.unimdownEvent(this.props.token, this.props.route.params.event.id)
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
            <Card
              title={this.props.event.eventTitle}
              containerHeight={100}
              iconComponent={
              <Image source={eventCategoryToIcon.get(this.props.event.category)}
                style={{ margin: -30, marginTop:-20, alignItems: 'center', justifyContent:'center',
                  height: 40, width: 40,
                }}/>}
              onPress={() => {this.props.navigate('EventInfo', { event: this.props.event });}}
              topRightText={<Text><Ionicons name={'clock'} size={17} color={'#FF5722'} style={{
              justifyContent: 'flex-start'}}/>{this.props.event.startTime.substring(11, 16)}</Text>}
              content={this.props.event.description}
              defaultContent="Click on the event to learn more!"
              bottomRightComponent={<Button 
              onPress={() => this.onDown}
              style={
                {
                  position: 'absolute',
                  right: 25,
                  bottom: 15,
                  width: 60,
                  height: 50,
                  backgroundColor: 'none', 
                }
              }
            />}
            /><Button 
            onPress={() => this.onDown}
            style={
              {
                position: 'absolute',
                right: 25,
                bottom: 15,
                width: 60,
                height: 50,
                backgroundColor: 'none', 
              }
            }
          ><Ionicons name="thumbs-up" size={30} color="#FF5722" style={{ paddingLeft: 20 }} />
          </Button>            
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
    };
}


function mapStateToProps(reduxState) {
  return { 
    events: reduxState.list,
  };
}

export default connect(mapStateToProps, { imdownEvent, unimdownEvent, fetchImdownEvents })(EventCard);


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