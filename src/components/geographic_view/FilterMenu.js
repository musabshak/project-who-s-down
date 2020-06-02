/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable global-require */
import {
  Container, Header, View, Button, Icon, Fab, 
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { Component } from 'react';
import { Text, Image } from 'react-native';
  
  
class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
    console.log('in filter menu!');
  }

  onTimeFilterPress = (event) => {
    console.log('time filter pressed!');
  }

  onCategoryFilterPress = (event) => {
    console.log('category filter pressed!');
  }

  onLevelFilterPress = (event) => {
    console.log('level filter pressed!');
  }

  onHotFilterPress = (event) => {
    console.log('hot filter pressed!');
  }
  
  render() {
    return (
      <View>
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <FontAwesome name="eye" />
            <Button style={{ backgroundColor: '#34A34F' }} onPress={this.onTimeFilterPress}>
              <Icon name="alarm" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={this.onCategoryFilterPress}>
              <Icon name="wine" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }} onPress={this.onHotFilterPress}>
              <Icon name="flame" />
            </Button>
            <Button style={{ backgroundColor: '#ADFF2F'}} onPress={this.onLevelFilterPress}>
              <FontAwesome name="gamepad" />
            </Button>
          </Fab>
        </View>
      </View>
    );
  }
}
  
export default FilterMenu;