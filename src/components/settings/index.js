import React, { Component } from 'react';
import {
  Container, Header, Content, Tab, Tabs, 
} from 'native-base';
import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabThree'; 
import Tab4 from './tabFour';

export default class Settings extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs />
        <Tabs>
          <Tab heading="Main">
            <Tab1 />
          </Tab>
          <Tab heading="Created Events">
            <Tab2 />
          </Tab>
          <Tab heading="Currently Down For">
            <Tab3 />
          </Tab>
          <Tab heading="Alerts">
            <Tab4 />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
