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

  onPress = (event) => {
    console.log('pressed!2');
  }
  
  render() {
    const filterImg = require('../../../assets/eyes.png');
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
            <Button style={{ backgroundColor: '#34A34F' }} onPress={this.onPress()}>
              <Icon name="alarm" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="wine" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="flame" />
            </Button>
            <Button style={{ backgroundColor: '#ADFF2F'}}>
              <FontAwesome name="gamepad" />
            </Button>
          </Fab>
        </View>
      </View>
    );
  }
}
  
export default FilterMenu;