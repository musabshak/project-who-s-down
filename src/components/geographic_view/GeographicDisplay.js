import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const YOUR_API_KEY = 'YOUR_API_KEY';
const eventList = [];

class GeographicDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: '',
      location: {},
      didWeAskForLocation: false,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this._getLocation();
  }

  _getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
  

    if (status !== 'granted') {
      console.log('permission not granted');
      this.setState({
        errorMessage: 'PERMISSION NOT GRANTED',
      });
    }

    const location = await Location.getCurrentPositionAsync();
    this.setState({
      location,
      region: {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    });
  }

  // this function creates the map, and is to be called by render
  createMap = () => {
    return (
      <View>
        <Text>This should be the map view!</Text>
        <MapView
          style={{
            flex: 0.5,
          }}
          region={this.state.region}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <Text>This is the mapview component</Text>
        <Text>I think youre at {JSON.stringify(this.state.location)}</Text>
        {this.createMap()}
      </View>
    );
  }
}

const mapStateToProps = (reduxState) => (
  {

  }
);

const mapDispatchToProps = (reduxState) => (
  {}
);

export default connect(mapStateToProps, mapDispatchToProps)(GeographicDisplay);