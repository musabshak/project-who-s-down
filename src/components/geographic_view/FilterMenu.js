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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { changeFilters, fetchEvents } from './actions';

  
class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_active: false, level_active: false, cat_active: false, setTimePickerVisibilityBefore: false, setTimePickerVisibility: false, 
    };
    console.log('in filter menu!');
  }


  hideDatePicker = () => {
    this.setState({setTimePickerVisibility: false});
  };

  hideDatePickerBefore = () => {
    this.setState({setTimePickerVisibilityBefore: false});
  };

  onTimeFilterPress = (event) => {
    console.log('time filter pressed!');
    this.setState({setTimePickerVisibility: !this.state.setTimePickerVisibility});
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

  onTimeFilterLongPress = () => {
    this.setState({setTimePickerVisibilityBefore: !this.state.setTimePickerVisibilityBefore});
  }


  handleConfirm = (date) => {
    console.log('Make a filter that filters out everything after: ', date);
    this.hideDatePicker();
    const param = {FilterType: 'timesAfter', SpecificFilter: date};
    this.editIndividualFilter(param);
    this.props.fetchEvents();
  };

  handleConfirmBefore = (date) => {
    console.log('Make a filter that filters out everything before: ', date);
    this.hideDatePickerBefore();
    const param = {FilterType: 'timesBefore', SpecificFilter: date};
    this.editIndividualFilter(param);
    this.props.fetchEvents();
  };

  render() {
    return (
      <View>

        {/* <Button style={{ backgroundColor: '#3B5998' }} onPress={this.debugPress}>
          <Icon name="md-print" />
        </Button> */}
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


            <Button style={{ backgroundColor: '#34A34F' }} onPress={this.onTimeFilterPress} onLongPress={this.onTimeFilterLongPress}>
              <Icon name="alarm" />
              <View>
                {this.state.setTimePickerVisibility && (
                  <DateTimePickerModal
                    isVisible={this.state.setTimePickerVisibility}
                    mode="time"
                    onConfirm={this.handleConfirm}
                    onCancel={this.hideDatePicker}
                    // is24Hour
                    // locale="en_GB" 
                    headerTextIOS="Filter out events starting after:"
                  />
                )}
              </View>
              <View>
                {this.state.setTimePickerVisibilityBefore && (
                  <DateTimePickerModal
                    isVisible={this.state.setTimePickerVisibilityBefore}
                    mode="time"
                    onConfirm={this.handleConfirmBefore}
                    onCancel={this.hideDatePickerBefore}
                    // is24Hour
                    // locale="en_GB" 
                    headerTextIOS="Filter out events starting before:"
                  />
                )}
              </View>
            </Button>


            {/* so this chunk below is the category menu */}
            {this.state.main_active && (
              <View>
                <Fab
                  active={this.state.cat_active}
                  style={{ backgroundColor: '#5067FF', direction: 'left'}}
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


export default connect(mapStateToProps, {changeFilters, fetchEvents})(FilterMenu);
