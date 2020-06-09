import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  FlatList,

} from 'react-native';
import { connect } from 'react-redux';
import { fetchMyEvents } from '../event_list/actions';
import FilterMenu from '../geographic_view/FilterMenu';
import EventCard from '../event_list/event_card';


class myEvents extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.fetchMyEvents(this.props.token);
    console.log(this.props.events);
  } 


  displayEvent =() => {
    if(this.props.authenticated){
      if (this.props.events.myEvents !== undefined) {
        return (
          this.props.events.myEvents.map((item, key) => {
            return (
              <EventCard event={item} key={item.id} navigate={this.props.navigation.navigate} authenticated ={this.props.authenticated}/>
            );
          })
        );
      }
      else{
        return(<View><Text>You aren't down for anything!</Text></View>)
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
        <FilterMenu/>
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

export default connect(mapStateToProps, { fetchMyEvents })(myEvents);


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
