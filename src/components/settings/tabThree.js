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
        <DownEvents navigation={this.props.navigation} />
      </View>
    );
  }
}

export default tabThree;