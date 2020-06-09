/* eslint-disable react/no-unescaped-entities */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,

} from 'react-native';
import { connect } from 'react-redux';
import { fetchImdownEvents } from '../event_list/actions';
import FilterMenu from '../geographic_view/FilterMenu';
import EventCard from '../event_list/event_card';


class DownEvents extends Component {
  constructor(props) {
    super(props);

    this.props.navigation.addListener(
      'focus',
      (payload) => {
        console.log('token', this.props.token);
        this.props.fetchImdownEvents(this.props.token);
        console.log('navigation event listener', 'in focus');
      },
    );
  }

  componentDidMount = () => {
    this.props.fetchImdownEvents(this.props.token);
    console.log('list of im down events', this.props.imdownEvents);
  } 


  displayEvent =() => {
    console.log(this.props.events.imdownEvents);
    if (this.props.authenticated) {
      if (this.props.events.imdownEvents && this.props.events.imdownEvents.length) {
        return (
          this.props.events.imdownEvents.map((item, key) => {
            return (
              <EventCard event={item} key={item.id} navigate={this.props.navigation.navigate} authenticated={this.props.authenticated} />
            );
          })
        );
      }
      else if (!(this.props.events.imdownEvents && this.props.events.imdownEvents.length)) {
        return (<View><Text>You aren't down for anything!</Text></View>);
      }
      else {
        return (<ActivityIndicator size="large" color="#FF5722" />);
      }
    }
    else {
      return (<View><Text>Waiting for events</Text></View>);
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.displayEvent()}
        </ScrollView>
        <FilterMenu />
      </View>
      
    );
  }
}

function mapStateToProps(reduxState) {
  return { 
    events: reduxState.list,
    authenticated: reduxState.auth.authenticated,
    token: reduxState.auth.token,

  };
}

export default connect(mapStateToProps, { fetchImdownEvents })(DownEvents);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgb(240,240,240)',
  },
  thumbnail: {
    width: 100,
    height: 100,
    marginRight: 5,
    backgroundColor: 'black',
  },
  rightContainer: {
    flex: 1,
    padding: 5,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgb(200,200,200)',
  },
  listView: {
    backgroundColor: 'rgb(240,240,240)',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
