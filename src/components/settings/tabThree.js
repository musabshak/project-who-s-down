import React, {Component} from 'react';
import {Text, View} from 'react-native';
import DownEvents from '../down_events';

class tabThree extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>Events I am down for, this is also coming from Anjali and is currently called my_events</Text>
        <DownEvents />
      </View>
    );
  }
}

export default tabThree;