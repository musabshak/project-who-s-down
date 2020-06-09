import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,

} from 'react-native';
import { connect } from 'react-redux';
import { fetchEvents } from './actions';
import FilterMenu from '../geographic_view/FilterMenu';
import EventCard from './event_card';
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { initializeFilters } from '../geographic_view/FilterMenu/actions'
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { Fab, Icon } from 'native-base';


class EventList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.fetchEvents();
  } 

  handleFetchClick = () => {
    this.props.fetchEvents();
  }

  displayEvent =() => {
    if (this.props.events.all !== undefined) {
      return (
        this.props.events.all.map((item, key) => {
          return (
            <EventCard event={item} key={item.id} navigate={this.props.navigation.navigate} token = {this.props.token} authenticated ={this.props.authenticated} imdown={this.imdown}/>
          );
        })
      );
    } else {
      return (<View><Text>Waiting for events</Text></View>);
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
          {this.displayEvent()}
        </ScrollView>
        <Fab
          onPress={() => this.handleFetchClick()}
          position="bottomLeft"
          style={{ }}
        >
          <Icon name="ios-refresh" />
        </Fab>
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
