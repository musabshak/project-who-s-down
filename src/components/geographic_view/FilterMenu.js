/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable global-require */
import {
  Container, Header, View, Button, Icon, Fab, 
} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React, { Component, useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { changeFilters } from './actions';

  
class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_active: false, level_active: false, cat_active: false, 
    };
    console.log('in filter menu!');
  }


  onTimeFilterPress = (event) => {
    console.log('time filter pressed!');
  }

  onCategoryFilterPress = (event) => {
    console.log('category filter pressed!');
  }

  handleCatFabPress = (event) => {
    console.log('handle cat fab press called!');
    this.setState({
      cat_active: !this.state.cat_active,
      level_active: false,
    });
  }

  onLevelFilterPress = (event) => {
    console.log('level filter pressed!');
  }

  onHotFilterPress = (event) => {
    console.log('hot filter pressed!');
  }

  handleLevelFabPress = (event) => {
    console.log('handle level fab press called!');
    this.setState({
      level_active: !this.state.level_active,
      cat_active: false, 
    });
  }


  // these are the lines you need to focus on

  debugPress = (event) => {
    console.log('props:', this.props);
    console.log('state:', this.state);
  }

  editIndividualFilter = (param) => {
    this.props.changeFilters(param);
  }

  render() {
    return (
      <View style={{
        padding: 5,
        flexDirection: 'row',}}>

        <Button style={{ backgroundColor: '#3B5998' }} onPress={this.debugPress}>
          <Icon name="md-print" />
        </Button>
        <View style={{ flex: 1 }}>
          <Fab
            active={this.state.main_active}
            direction="left"
            containerStyle={{ }}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.setState({ main_active: !this.state.main_active })}
          >
            <FontAwesome name="eye" />


            <Button style={{ backgroundColor: '#34A34F' }} onPress={this.onTimeFilterPress}>
              <Icon name="alarm" />
            </Button>


            {/* so this chunk below is the category menu */}
            {this.state.main_active && (
              <View>
                <Fab
                  active={this.state.cat_active}
                  style={{ backgroundColor: '#5067FF', direction: 'left', flexDirection: 'row'}}
                  onPress={this.handleCatFabPress}
                >
                  <Icon name="wine" />
                  <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.editIndividualFilter({FilterType: 'categories', SpecificFilter: 'nightlife'})}> 
                    <Text>nightlife </Text>                  
                  </Button>
                  <Button style={{ backgroundColor: '#3B5998' }} onPress={() => this.editIndividualFilter({FilterType: 'categories', SpecificFilter: 'sports'})}>
                    <Text>sports</Text>                  
                  </Button>
                  <Button style={{ backgroundColor: '#DD5144' }} onPress={() => this.editIndividualFilter({FilterType: 'categories', SpecificFilter: 'boardgame'})}>
                    <Text> boardgame </Text>
                  </Button>

                </Fab>
              </View>
            ) }

            <Button disabled style={{ backgroundColor: '#DD5144' }} onPress={this.onHotFilterPress}>
              <Icon name="flame" />
            </Button>
            

            {/* so this chunk below is the level menu */}
            {this.state.main_active 
            && (
              <View>
                <Fab
                  active={this.state.level_active}
                  style={{ backgroundColor: '#5067FF', direction: 'left'}}
                  onPress={this.handleLevelFabPress}
                >
                  <FontAwesome name="gamepad" />

                  <Button style={{ backgroundColor: '#34A34F' }}
                    onPress={() => this.editIndividualFilter({
                      FilterType: 'skillLevels',
                      SpecificFilter: 'casual',
                    })}
                  >
                    <Text>casual </Text>                  
                  </Button>
                  <Button style={{ backgroundColor: '#3B5998' }}
                    onPress={() => this.editIndividualFilter({
                      FilterType: 'skillLevels',
                      SpecificFilter: 'amateur',
                    })}
                  >
                    <Text>amateur</Text>                  
                  </Button>
                  <Button style={{ backgroundColor: '#DD5144' }}
                    onPress={() => this.editIndividualFilter({
                      FilterType: 'skillLevels',
                      SpecificFilter: 'pro',
                    })}
                  >
                    <Icon name="star" />
                    <Text> pro </Text>
                  </Button>

                </Fab>
              </View>
            )}

          </Fab>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (reduxState) => (
  {filteredOut: reduxState.geoViewEvents.filteredOut}
);


export default connect(mapStateToProps, {changeFilters})(FilterMenu);
