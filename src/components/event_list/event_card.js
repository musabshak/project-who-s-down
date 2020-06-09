/* eslint-disable no-nested-ternary */
/* eslint-disable react/sort-comp */
/* eslint-disable global-require */
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
import {Card} from '@paraboly/react-native-card';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import {imdownEvent, unimdownEvent, fetchImdownEvents} from './actions';


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
    this.state = {
      imdown: 0,
    };
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.fetchImdownEvents(this.props.token).then((res) => {
        for (let i = 0; i < res.length; i++) { this.setState({ imdown: 0 }); }
        if (res[i].id === this.props.event.id) {
          this.setState({ imdown: 1 });
          console.log(res[i]);
          i = res.length;
        }
      });
    }
  }

  customFormatTime = (dateString) => {
    const date = new Date(dateString);
    const tks = date.toDateString().split(' ');
    const hours = date.getHours() === 0 ? '12' : date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    const ampm = date.getHours() < 12 ? 'AM' : 'PM';
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return `${formattedTime}`;
  }

  onDown() {
    if (this.state.imdown === 0) {
      this.props.imdownEvent(this.props.token, this.props.event.id).then(() => {
        this.setState({ imdown: 1 });
        console.log(this.state.imdown);
      });
    }
    else if (this.state.imdown === 1) {
      this.setState({ imdown: undefined });
      this.props.unimdownEvent(this.props.token, this.props.event.id).then(() => {
        this.setState({ imdown: 0 });
        console.log(this.state.imdown);
      });
    }
  }

  // this.props.post.id
  render() {
    if (this.props.token) {
      if (this.state.imdown === 1 || this.imdown === 1) {
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
              containerHeight={110}
              iconComponent={(
                <Image source={eventCategoryToIcon.get(this.props.event.category)}
                  style={{
                    margin: -30,
                    marginTop: -20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: 40,
                  }}
                />
              )}
              onPress={() => { this.props.navigate('EventInfo', { event: this.props.event }); }}
              topRightText={(
                <Text><Ionicons name="clock"
                  size={17}
                  color="#FF5722"
                  style={{justifyContent: 'flex-start'}}
                />{this.customFormatTime(this.props.event.startTime)}
                </Text>
              )}
              content={this.props.event.description}
              defaultContent="Click on the event to learn more!"
            /><Button 
              onPress={() => this.onDown()}
              style={
                {
                  position: 'absolute',
                  right: 25,
                  bottom: 15,
                  width: 60,
                  height: 50,
                  backgroundColor: '#FF5527', 
                }
              }
            ><Ionicons name="thumbs-up" size={30} color="white" style={{ paddingLeft: 20 }} />
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
              containerHeight={110}
              iconComponent={(
                <Image source={eventCategoryToIcon.get(this.props.event.category)}
                  style={{
                    margin: -30,
                    marginTop: -20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 40,
                    width: 40,
                  }}
                />
              )}
              onPress={() => { this.props.navigate('EventInfo', { event: this.props.event }); }}
              topRightText={(
                <Text><Ionicons name="clock"
                  size={17}
                  color="#FF5722"
                  style={{justifyContent: 'flex-start'}}
                />{this.customFormatTime(this.props.event.startTime)}
                </Text>
              )}
              content={this.props.event.description}
              defaultContent="Click on the event to learn more!"
            /><Button 
              onPress={() => this.onDown()}
              style={
                {
                  position: 'absolute',
                  right: 25,
                  bottom: 15,
                  width: 60,
                  height: 50,
                  backgroundColor: 'white', 
                }
              }
            ><Ionicons name="thumbs-up" size={30} color="#FF5527" style={{ paddingLeft: 20}} />
            </Button>            
          </View>
        ); } 
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
            iconComponent={(
              <Image source={eventCategoryToIcon.get(this.props.event.category)}
                style={{
                  margin: -20,
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 40,
                }}
              />
            )}
            onPress={() => { this.props.navigate('EventInfo', { event: this.props.event }); }}
            topRightText={(
              <Text><Ionicons name="clock"
                size={17}
                color="#FF5722"
                style={{justifyContent: 'flex-start', paddingRight: 20, paddingLeft: 20}}
              />{this.customFormatTime(this.props.event.startTime)}
              </Text>
            )}
            content={this.props.event.description}
            bottomRightText={this.props.event.skillLevel}
          />
        </View>
      );  
    }
  }
}


function mapStateToProps(reduxState) {
  return { 
    events: reduxState.list,
  };
}

export default connect(mapStateToProps, { imdownEvent, unimdownEvent, fetchImdownEvents })(EventCard);
