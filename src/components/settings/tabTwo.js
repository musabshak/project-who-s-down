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
        {/* {console.log('musabs props in tab two', this.props)} */}
        <MyEvents navigation={this.props.navigation} />
      </View>
    );
  }
}

export default tabTwo;