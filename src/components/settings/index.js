/* eslint-disable no-alert */
import React, { Component } from 'react';
import {
  Container, Header, Content, Tab, Tabs, StyleProvider, TabHeading,
} from 'native-base';
import { Text, View, Button} from 'react-native';
import Tab4Legal from './legal';
import Tab1Alerts from './alerts';
import Tab3 from './tabThree';
import Tab2 from './tabTwo';

const initialState = {
  displayMyEvents: false,
  displayImDownEvents: false,
};
const fontSize = 18;
export default class Settings extends Component { // maybe rename user panel 
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount = () => {
    console.log('profile page mounted');
  }

  resetState = ({i, ref}) => {
    // console.log(i, 'musabs props', this.props);
    // if (i === 1) {
    //   this.props.navigation.navigate('MyEvents'); 
    // } else if (i === 2) {
    //   if (i === 2) {
    //     this.props.navigation.navigate('DownEvents'); 
    //   }
    // }
  }

  render() {
    return (
     
      <Tabs 
        initialPage={0}
      >
        <Tab
          heading={(
            <TabHeading style={{backgroundColor: '#FF5722'}}>
              <Text style={{color: 'white', fontSize}}>Alerts</Text>
            </TabHeading>
          )}
        >
          <Tab1Alerts />
        </Tab>
        <Tab
          heading={(
            <TabHeading style={{backgroundColor: '#FF5722'}}>
              <Text style={{color: 'white', fontSize, textAlign: 'center'}}>Created Events</Text>
            </TabHeading>
          )}
        >
          <Tab2 navigation={this.props.navigation} />
        </Tab>
        <Tab
          heading={(
            <TabHeading style={{backgroundColor: '#FF5722'}}>
              <Text style={{color: 'white', fontSize, textAlign: 'center'}}>RSVPed</Text>
            </TabHeading>
          )}
        >
          <Tab3 navigation={this.props.navigation} />
        </Tab>
        <Tab
          heading={(
            <TabHeading style={{backgroundColor: '#FF5722'}}>
              <Text style={{color: 'white', fontSize, textAlign: 'center'}}>Legal</Text>
            </TabHeading>
          )}
        >
          <Tab4Legal />
        </Tab>
            
      </Tabs>

      
    // <View>
    //   <Button title="my events" onPress={() => this.props.navigation.navigate('MyEvents')} />
    //   <Button title="down events" />
    // </View>
      
    );
  }
}
