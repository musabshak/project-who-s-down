import React, {Component} from 'react';
import {Text, View} from 'react-native';
import MyEvents from '../my_events';

class tabTwo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Created events, this is coming from Anjali and will be called my created events</Text>
        <MyEvents />
      </View>
    );
  }
}

export default tabTwo;