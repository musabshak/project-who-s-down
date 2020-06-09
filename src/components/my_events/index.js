import React, { Component } from 'react';
import Search from 'react-native-search-box';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchEvents } from '../event_list/actions';
import FilterMenu from '../geographic_view/FilterMenu';
import EventCard from '../event_list/event_card';


class EventList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.fetchEvents();
    console.log('mounting my event');
    console.log(this.props.events);
  } 

  displayEvent =() => {
    if (this.props.events.all !== undefined) {
      return (
        this.props.events.all.map((item, key) => {
          return (
            <EventCard event={item} key={item.id} />
          );
        })
      );
    } else {
      return (<View><Text>Start by signing in and adding events!</Text></View>);
    }
  }

  render() {
    return (
      <View>
        <Search
          backgroundColor="#c4302b"
          showsCancelButton={false}
          textFieldBackgroundColor="#c4302b"
          onChangeText={(query) => {
            this.setState({ query });
          }}
        />
        <FilterMenu />
        {this.displayEvent()}
      </View>
      
    );
  }
}

function mapStateToProps(reduxState) {
  return { 
    events: reduxState.list,
  };
}

export default connect(mapStateToProps, { fetchEvents })(EventList);


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
