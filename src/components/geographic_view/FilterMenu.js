/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable global-require */
import {
  Container, Header, View, Button, Icon, Fab, 
} from 'native-base';
  
import React, { Component } from 'react';
import { Text, Image } from 'react-native';
  
  
class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
  }
  
  render() {
    const filterImg = require('../../../assets/eyes.png');
    return (
      <View>
        <Image source={filterImg} style={{width: 35, height: 35}} />
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
          >
            <Icon name="share" />
            <Button style={{ backgroundColor: '#34A34F' }}>
              <Icon name="logo-whatsapp" />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }}>
              <Icon name="logo-facebook" />
            </Button>
            <Button disabled style={{ backgroundColor: '#DD5144' }}>
              <Icon name="mail" />
            </Button>
          </Fab>
        </View>
      </View>
    );
  }
}
  
export default FilterMenu;