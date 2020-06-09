import React, { Component } from 'react';
import Search from 'react-native-search-box';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { fetchImDownEventsByUser } from '../event_list/actions';
import FilterMenu from '../geographic_view/FilterMenu';
import EventCard from '../event_list/event_card';


class DownEvents extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.fetchImDownEventsByUser();
    console.log('mounting my event');
  } 

  displayEvent =() => {
    if(this.props.authenticated){
      if (this.props.events.mine !== undefined) {
        return (
          this.props.events.mine.map((item, key) => {
            return (
              <EventCard event={item} key={item.id} authenticated={this.props.authenticated}/>
            );
          })
        );
      }
      else{
        return (<View><Text>You aren't down for anything!</Text></View>)
      }
    }
     else {
      return (<View><Text>Start by signing in and adding events!</Text></View>);
    }
  }

  render() {
    return (
      <View>
        <FilterMenu />
        {this.displayEvent()}
      </View>
      
    );
  }
}

function mapStateToProps(reduxState) {
  return { 
    events: reduxState.list,
    authenticated: reduxState.auth.authenticated,
  };
}

export default connect(mapStateToProps, { fetchImDownEventsByUser })(DownEvents);


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
