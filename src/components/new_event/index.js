import React, { Component } from 'react';
import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from './actions';

class NewEventPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventTitle: '',
    };
  }

  // Update local state to reflect modified title 
  handleTitleChange = (event) => {
    this.setState({eventTitle: event.target.value});
  }

  handleCreateBtnPress = () => {
    const event = {
      eventTitle: this.state.eventTitle,
    };
    this.props.createEvent(event);
  }

  renderConfirmation = () => {
    console.log(typeof (this.props.newEvent.eventTitle));
    if (typeof (this.props.newEvent.eventTitle) !== 'undefined') {
      return (
        <Text> {this.props.newEvent.eventTitle} has been created!!</Text>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Input placeholder="Add title!" onBlur={this.handleTitleChange} />
        <Button onPress={this.handleCreateBtnPress} title="Create My Event" />
        {this.renderConfirmation()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => ({
  newEvent: state.events.newEvent,
});

export default connect(mapStateToProps, 
  {createEvent: actions.createEvent})(NewEventPage);
