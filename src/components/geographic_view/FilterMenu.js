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
import { changeFilters, fetchEvents, initializeFilters } from './actions';

  
class FilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_active: false, level_active: false, cat_active: false, setTimePickerVisibilityBefore: false, setTimePickerVisibility: false, 
    };
    this.filterMasterDebug = false;
    if (this.filterMasterDebug) { console.log('in filter menu!'); }
  }


  // -------------- CATEGORY AND LEVEL FILTER BELOW ---------------------


  onCategoryFilterPress = (event) => {
    if (this.filterMasterDebug) { console.log('category filter pressed!'); }
    // don't worry, the FAB has another on open method, this function just exists for debugging purposes
  }

  handleCatFabPress = (event) => {
    if (this.filterMasterDebug) { console.log('handle cat fab press called!'); }
    this.setState({
      cat_active: !this.state.cat_active,
      level_active: false,
    });
  }

  onLevelFilterPress = (event) => { // same thing as onCategoryFilterPress
    if (this.filterMasterDebug) { console.log('level filter pressed!'); }
  }

  onHotFilterPress = (event) => { // to be implemented in a future release
    if (this.filterMasterDebug) { console.log('hot filter pressed!'); }
  }

  handleLevelFabPress = (event) => {
    if (this.filterMasterDebug) { console.log('handle level fab press called!'); }
    this.setState({
      level_active: !this.state.level_active,
      cat_active: false, 
    });
  }


  // -------------- TIME FILTER BELOW --------------------


  onTimeFilterLongPress = () => {
    this.setState({setTimePickerVisibilityBefore: !this.state.setTimePickerVisibilityBefore});
  }

  // it's very possible the next two functions could be collapsed into one
  handleConfirm = (date) => {
    if (this.filterMasterDebug) { console.log('Make a filter that filters out everything after: ', date); }
    this.hideDatePicker();
    const param = {FilterType: 'timesAfter', SpecificFilter: date};
    this.editIndividualFilter(param);
    this.props.fetchEvents();
  };

  handleConfirmBefore = (date) => {
    if (this.filterMasterDebug) {
      console.log('Make a filter that filters out everything before: ', date); }
    this.hideDatePickerBefore();
    const param = {FilterType: 'timesBefore', SpecificFilter: date};
    this.editIndividualFilter(param);
    this.props.fetchEvents();
  };


  hideDatePicker = () => {
    this.setState({setTimePickerVisibility: false});
  };

  hideDatePickerBefore = () => {
    this.setState({setTimePickerVisibilityBefore: false});
  };

  onTimeFilterPress = (event) => {
    if (this.filterMasterDebug) { console.log('time filter pressed!'); }
    this.setState({setTimePickerVisibility: !this.state.setTimePickerVisibility});
  }


  // ----------- GENERAL METHODS BELOW ------------

  debugPress = (event) => { // button is removed
    console.log('props:', this.props);
    console.log('state:', this.state);
  }

  editIndividualFilter = (param) => {
    this.props.changeFilters(param);
  }

  clearAllFilters = () => {
    console.log('clear all filters called!');
    this.props.initializeFilters();
  }


  render() {
    return (
      <View>

        {this.state.filterMasterDebug && (
          <Button style={{ backgroundColor: '#3B5998' }} onPress={this.debugPress}>
            <Icon name="md-print" />
          </Button>
        )}
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

            <Button style={{backgroundColor: '#DD5144', left: 20}} onPress={() => this.clearAllFilters()}>
              <Icon name="close" />
            </Button>

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
                    // locale="en_GB" // these would force 24 hour time on the user
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
              <View style={{width: 0, paddingTop: 70}}>
                <Fab
                  active={this.state.cat_active}
                  style={{ backgroundColor: '#5067FF' }}
                  onPress={this.handleCatFabPress}
                >
                  <Icon name="wine" />
                  <Button style={{ backgroundColor: '#34A34F' }} onPress={() => this.editIndividualFilter({FilterType: 'categories', SpecificFilter: 'nightlife'})}> 
                    <Icon name="md-wine" />                  
                  </Button>
                  <Button style={{ backgroundColor: '#3B5998' }} onPress={() => this.editIndividualFilter({FilterType: 'categories', SpecificFilter: 'sport'})}>
                    <Icon name="md-american-football" />
                  </Button>
                  <Button style={{ backgroundColor: '#DD5144' }} onPress={() => this.editIndividualFilter({FilterType: 'categories', SpecificFilter: 'game'})}>
                    {/* <FontAwesome name="md-chess-queen" /> */}
                    <Text>Someone put something here please</Text>
                    {/* I couldn't find a great boardgame icon, if you can find like a chess queen that'd be great */}                  
                  </Button>
                  <Button style={{ backgroundColor: '#DD5144' }} onPress={() => this.editIndividualFilter({FilterType: 'categories', SpecificFilter: 'culture'})}>
                    <Icon name="md-color-palette" />                  
                  </Button>
                  <Button style={{ backgroundColor: '#DD5144' }} onPress={() => this.editIndividualFilter({FilterType: 'categories', SpecificFilter: 'educational'})}>
                    <Icon name="planet" />                  
                  </Button>
                  <Button style={{ backgroundColor: '#DD5144' }} onPress={() => this.editIndividualFilter({FilterType: 'categories', SpecificFilter: 'food'})}>
                    <Icon name="md-pizza" />                  
                  </Button>

                </Fab>
              </View>
            ) }

            {/* <Button disabled style={{ backgroundColor: '#DD5144' }} onPress={this.onHotFilterPress}>
              <Icon name="flame" /> <-- this would be filter by "hot" events
              </Button>
              */}

            {/* so this chunk below is the level menu, wasn't too sure how to convey skill levels */}
            {this.state.main_active 
              && (
                <View style={{width: 0, paddingTop: 70}}>
                  <Fab
                    active={this.state.level_active}
                    style={{ backgroundColor: '#5067FF', left: 17}}
                    onPress={this.handleLevelFabPress}
                    position="bottomLeft"
                  >
                    <FontAwesome name="gamepad" />
                    
                    <Button style={{ backgroundColor: '#34A34F' }}
                      onPress={() => this.editIndividualFilter({
                        FilterType: 'skillLevels',
                        SpecificFilter: 'casual',
                      })}
                    >
                      <Icon name="radio-button-off" />                  
                    </Button>

                    <Button style={{ backgroundColor: '#3B5998' }}
                      onPress={() => this.editIndividualFilter({
                        FilterType: 'skillLevels',
                        SpecificFilter: 'amateur',
                      })}
                    >
                      <Icon name="ios-contrast" />                  
                    </Button>
                    <Button style={{ backgroundColor: '#DD5144' }}
                      onPress={() => this.editIndividualFilter({
                        FilterType: 'skillLevels',
                        SpecificFilter: 'pro',
                      })}
                    >
                      <Icon name="ios-radio-button-on" />
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


export default connect(mapStateToProps, {changeFilters, fetchEvents, initializeFilters})(FilterMenu);
