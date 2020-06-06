import React, { Component } from 'react';
import {
    Button,
    ActivityIndicator,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
  } from 'react-native';
  import { Card } from '@paraboly/react-native-card'
import Ionicons from 'react-native-vector-icons/FontAwesome';

class EventCard extends Component {
    constructor(props){
        super(props);
        console.log(this.props.event);
    }

    onDown = (event) => {
        if (this.props.event.down == true){
            this.props.event.setState({
                down: false,
            });}
        else{
            this.props.event.setState({
                down: true,
        });
        }
    }

//this.props.post.id
    render(){
        if(this.props.event.down == true){
                  return(
                    <View style={{
                        borderRadius:5,
                        padding: 5,
                        justifyContent: 'center',
                        alignItems: 'center',}}>
                    <Card
                     title= {this.props.event.eventTitle}
                     iconName="home"
                     defaultTitle=""
                     iconType="Entypo"
                     defaultContent=""
                     onPress={() => {() => this.props.navigation.navigate('EventInfo',  this.props.event)}}
                     topRightText= {this.props.event.startTime.substring(11, 16)}
                     bottomRightText={this.props.event.category}
                     content={this.props.event.description}
                    />
                    </View>
        );  
        }
        else {
            return(<View style={{
                borderRadius:5,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',}}>
            <Card
             title= {this.props.event.eventTitle}
             iconName="home"
             defaultTitle=""
             iconType="Entypo"
             defaultContent=""
             onPress={() => {() => this.props.navigation.navigate('EventInfo',  this.props.event)}}
             topRightText= {this.props.event.startTime.substring(11, 16)}
             bottomRightText={this.props.event.category}
             content={this.props.event.description}
            >
            </Card>
            </View>
        ); 
        }

    }
}

export default EventCard;


/*<Card

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
</Card>*/