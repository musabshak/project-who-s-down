/* eslint-disable no-alert */
/* eslint-disable no-plusplus */
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import axios from 'axios';
import {
  Container, Header, Content, Card, CardItem, Body, Button,
} from 'native-base';


const ROOT_URL = 'https://project-who-s-down-api.herokuapp.com/api/';

// so for alerts you want to query the server every so often

// export function fetchNotifsByUser(debug = false) {
//     return (dispatch) => {
//       axios.get(`${ROOT_URL}/fetchNotifs`)
//         .then((response) => {
//          this.state.setState({notifs: response})
//         })
//         .catch((error) => {
//           console.log('error!', error);
//         });
//     };
//   }

class tabFour extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifs: [],
    };
  }

  componentDidMount() {
    this.fetchNotifsFromServer();
    this.timer = setInterval(() => this.fetchNotifsFromServer(), 2000);
  }

  fetchNotifsFromServer = () => {
    // so from the backend you want a list of json objects
    // each json object should have notif type ("New Chat Message", "Event Starting soon!"), source (event title), and ID (event ID)
    const base = {
      type: 'New Chat Message',
      source: 'Sample Event Title',
      id: 'sample ID',
      dismiss: 'Dismiss Notification',
    };

    // this is all basically getting a list of JSON objects
    const notifList = [];
    // add a random number of notifs
    for (let i = 0; i < (Math.floor(Math.random() * 4 + 1)); i++) {
      notifList.push(base);
    }

    // make each notif different
    for (let i = 0; i < notifList.length; i++)
    {
      notifList[i].type += (Math.floor(Math.random() * 99) + 1);
      notifList[i].id += (Math.floor(Math.random() * 999) + 1);
    }

    this.setState({notifs: notifList});
  }

  renderAllNotifs = () => {
    if (this.state.notifs) {
      return this.state.notifs.map((notif) => { return this.renderSingleNotif(notif); }); }
  }

  clearNotif = (notif1) => {
    console.log('in clear notif!');
    const notifList = this.state.notifs;
    for (let i = 0; i < this.state.notifs.length; i++) {
      if (notifList[i].id === notif1.id) {
        notifList.splice(i, 1);
        this.setState({notif: notifList});
        console.log('found it!');
      }
    }
  }

  handleNotifClick = (notif) => {
    console.log('notification clicked! now you ought to take them to the event info page');
    // this.props.navigate('EventInfo', { event: notif.id });
  }

  renderSingleNotif = (notif) => {
    return (
      <View>
        <Card style={{flexWrap: 'nowrap', backgroundColor: '#fcba03'}}>
          <CardItem header button onPress={() => this.handleNotifClick()}>
            <Text>{notif.type}</Text>
          </CardItem>
          <CardItem button onPress={() => this.handleNotifClick()}>
            <Body>
              <Text> {notif.source} </Text>
            </Body>
          </CardItem>
          <CardItem style={{backgroundCOlor: '#00FFFF'}} footer button onPress={() => this.clearNotif(notif)}>
            {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
            <Text> {notif.dismiss} </Text>
          </CardItem>
        </Card>
      </View>
    );
  }

  render() {
    console.log('rerendering!');
    return (
      <View>
        {this.renderAllNotifs()}
        {/* <Button onPress={() => { console.log(this.state); }}><Text>log state</Text></Button>
        <Button onPress={() => { this.fetchNotifsFromServer(); }}><Text>fetch notifs</Text></Button> */}

      </View>
    );
  }
}

export default tabFour;