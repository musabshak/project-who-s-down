import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';




const YOUR_API_KEY = 'YOUR_API_KEY';
const eventList = [];

class GeographicDisplay extends Component {
    constructor(props) {
        super(props);
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);

                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    }



    // this function creates the map, and is to be called by render
    createMap() {
        return (
            <View>
                <Text>This should be the map view!</Text>
                <MapView
                    style={{
                        flex: 1
                    }}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />
            </View>
        );
    }
    // var uluru = { lat: -25.344, lng: 131.036 };
    // // The map, centered at Uluru
    // var map = new Map({ zoom: 4, center: uluru });
    // // The marker, positioned at Uluru
    // var marker = new Marker({ position: uluru, map: map });
    // return map, marker

    render() {
        return (
            <View>
                <Text>This is the mapview component</Text>
                <Text>I think you're at </Text>
                {this.createMap()}
            </View>
        )
    }

}

const mapStateToProps = (reduxState) => (
    {

    }
);

const mapDispatchToProps = (reduxState) => (
    {}
)

export default connect(mapStateToProps, mapDispatchToProps)(GeographicDisplay)