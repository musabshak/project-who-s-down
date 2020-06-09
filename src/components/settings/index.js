/* eslint-disable no-alert */
import React, { Component } from 'react';
import {
  Container, Header, Content, Tab, Tabs,
} from 'native-base';
import { Text, View, Button} from 'react-native';
import Tab4Legal from './legal';
import Tab1Alerts from './alerts';
import Tab2 from './tabTwo';
import Tab3 from './tabThree';

const initialState = {
  displayMyEvents: false,
  displayImDownEvents: false,
};

export default class Settings extends Component { // maybe rename user panel 
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  resetState = ({i, ref}) => {
    if (i === 1) {
      this.props.navigation.navigate('MyEvents'); 
    } else if (i === 2) {
      if (i === 2) {
        this.props.navigation.navigate('DownEvents'); 
      }
    }
  }

  render() {
    return (

      <Tabs onChangeTab={this.resetState}>
        <Tab heading="Alerts">
          <Tab1Alerts />
        </Tab>
        <Tab heading="Created Events" />
        <Tab heading="Currently Down For" />
        <Tab heading="Legal">
          <Tab4Legal />
        </Tab>
        
      </Tabs>
    );
  }
}
