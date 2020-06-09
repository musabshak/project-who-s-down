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
import Ionicons from 'react-native-vector-icons/FontAwesome';
import { Fab, Icon } from 'native-base';
import { fetchEvents } from './actions';
import FilterMenu from '../geographic_view/FilterMenu';
import EventCard from './event_card';
import { fetchImdownEvents } from '../event_info/actions';
// import { initializeFilters } from '../geographic_view/FilterMenu/actions'


class EventList extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      events: [],
      downed: [],
      popupVisible: false,
      txt: 'Fallback',
      rowDisplay: 1,
      nav: 0,
      name: 'emoticon-wink-outline',
      downEventsLoaded: 0
    };
  }

  componentDidMount = () => {
    this.props.fetchEvents();

    this.fetchDown();
  } 

  fetchDown = () => {
    if (this.props.token) {
      this.props.fetchImdownEvents(this.props.token).then((res) => {
        // console.log(res);
        this.setState({ downEventsLoaded: 1 });
        // for (let i = 0; i < res.length; i++) { if (res[i].id === this.props.route.params.event.id) {
        //   this.setState({ imdown: 1 });
        //   break;
        // } }
      });
    }
  }

  // componentDidUpdate(prevProps) {
  //   console.log('compdidupdate called', this.props.imdownEvents?.length, prevProps.imdownEvents?.length);
  //   if (this.props.imdownEvents?.length !== prevProps.imdownEvents?.length) {
  //     this.setState({
  //       downed: this.props.imdownEvents
  //     });
  //   }
  //   console.log('eventlist is refreshed');  
  // } 

  handleFetchClick = () => {
    this.props.fetchEvents();
  }

  displayEvent =() => {
    if (this.props.events !== undefined) {
      return (
        this.props.events.map((item, key) => {
          let highlight = 0;
          // for (let i = 0; i < this.state.downed.length; i++) { if (this.state.downed[i].id === item.id) {
          //   highlight = 1;
          //   break;
          // }};
          if (this.state.downEventsLoaded) {
            // console.log('imdownEvents: ', this.props.imdownEvents);
            for (let i = 0; i < this.props.imdownEvents.length; i++) { if (this.props.imdownEvents[i].id === item.id) {
              highlight = 1;
              break;
            }};
          }
            
          if (!key) console.log('printing highlight: ', highlight);
          // return (<EventCard highlight={highlight} event={item} key={item.id} navigate={this.props.navigation.navigate} token={this.props.token} authenticated={this.props.authenticated} imdown={this.imdown} />);
          return (<EventCard highlight={highlight} event={item} key={item.id} navigate={this.props.navigation.navigate} token={this.props.token} authenticated={this.props.authenticated}/>);
        })
      );
    } else {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" color="#FF5722" />
        </View>
      );
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
    events: reduxState.list.all,
    imdownEvents: reduxState.eventsSh.imdownEvents,
    authenticated: reduxState.auth.authenticated,
    token: reduxState.auth.token,
  };
}

export default connect(mapStateToProps, { fetchEvents, fetchImdownEvents })(EventList);


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
