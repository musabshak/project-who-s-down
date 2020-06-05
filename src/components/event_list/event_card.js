import { Card } from "@paraboly/react-native-card";
import React, { Component } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
  } from 'react-native';

class EventCard extends Component {
    constructor(props){
        super(props);
    }

    getDate =() =>{
        const date = new Date(this.props.event.startTime);
        date.toISOString().substring(0, 10);
        console.log(date);

    }
//this.props.post.id
    render(){
        return(
            <View style={{
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',}}>
            <Card
             title= {this.props.event.eventTitle}
             iconName='home'
             defaultTitle=""
             iconType="FontAwesome"
             defaultContent=""
             onPress={() => this.props.navigation.navigate('EventDetail')}
             topRightText= {this.props.event.startTime.substring(11, 16)}
             bottomRightText={this.props.event.category}
             content={this.props.event.description}
            />
            </View>
        )
    }
}

export default EventCard;


/*<Card
  title='HELLO WORLD'
  image={require('../images/pic2.jpg')}>
  <Text style={{marginBottom: 10}}>
    The idea with React Native Elements is more about component structure than actual design.
  </Text>
  <Button
    icon={<Icon name='code' color='#ffffff' />}
    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
    title='VIEW NOW' />
</Card>*/