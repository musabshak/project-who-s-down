/* eslint-disable react/jsx-props-no-spreading */
import React, {Component, useState} from 'react';
import {
  GiftedChat, Bubble, Send, 
} from 'react-native-gifted-chat';
// import { App } from 'react-native-firebase';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
// import { connect } from 'react-redux';
// import { fetchEvents } from './actions';

// export default function chat() {
//   // https://github.com/FaridSafi/react-native-gifted-chat
//   // https://heartbeat.fritz.ai/chat-app-with-react-native-part-4-create-chat-ui-screens-with-react-native-gifted-chat-7ef428a60d30

//     // example of chat message
//     {
//       _id: 1,
//       text: 'no.1',
//       createdAt: new Date().getTime(),
//       user: {
//         _id: 2,
//         name: 'Test User',
//         _id: 5,
//         name: 'Aarish Iyer',
//       },
//     },
//     {
//       _id: 2,
//       text: 'no.2',
//       createdAt: new Date().getTime(),
//       user: {
//         _id: 3,
//         name: 'April Zhang',
//       },
//     },

//   ]);
// const Example = () => {
//   const [messages, setMessages] = useState([
//     {
//       _id: 1,
//       text: 'Hello developer',
//       createdAt: new Date(),
//       user: { _id: 2, name: 'Name' },
//     },
//   ]);
// };  
class Chat extends Component {
  constructor(props) {
    super(props);
   
    this.state = { 
      //   charId: this.props.route.params.event.id,
      //   title: this.props.route.params.event.eventTitle,
      //   skillLevel: this.props.route.params.event.skillLevel,
      //   startTime: this.props.route.params.event.startTime,
      // description: this.props.route.params.event.description,
      // category: this.props.route.params.event.category,
      // eventList: [],
      // currentTime: new Date(),
      messages:
        [
          {
            _id: 1,
            text: 'Welcome ',
            createdAt: new Date().getTime(),
          },
        ],
      user: 'userId',
      FullName: 'AprilZ',
     
    };
  }
  
  
  // componentDidMount = () => {
  //   this.props.fetchEvents();
  //   console.log(`${this.props.event}event is this`);
  // } 


    // helper method that is sends a message
    handleSend = (newMessage = []) => {
      const [message, setMessages] = useState([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: { _id: 2, name: 'Name' },
        },
      ]);
      setMessages(GiftedChat.append(message, newMessage));
      this.setState({messages: message});
    };

    // setInterval(functionaname, 1000)
    scrollToBottomComponent = () => {
      return (
        <View style={styles.bottomComponentContainer}>
          <IconButton icon="chevron-double-down" size={36} color="#FF5722" />
        </View>
      );
    };

    renderBubble = (props) => {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              // Here is the color change
              backgroundColor: '#FF5722',
            },
          }}
          textStyle={{
            right: {
              color: '#fff',
            },
          }}
        />
      );
    };


    renderSend = (props) => {
      return (
        <Send {...props}>
          <View style={styles.sendingContainer}>
            <IconButton icon="send-circle" size={32} color="#FF5722" />
          </View>
        </Send>
      );
    };
  
    render() {
      return (
      
        <GiftedChat
          messages={this.state.messages}
          onSend={(newMessage) => { this.handleSend(newMessage); }}
          user={{ _id: this.state.user, name: this.state.FullName }}
          renderBubble={this.renderBubble}
          placeholder="Anything to share for this event?"
          showUserAvatar
          alwaysShowSend
          renderSend={this.renderSend}
          scrollToBottom
          maxInputLength={300}
          renderUsernameOnMessage
          scrollToBottomComponent={this.scrollToBottomComponent}
        />
     
      );
    }}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// const [messages, setMessages] = useState([
//   {
//     _id: 0,
//     text: 'Welcome to' {this.state.eventTitle},
//     createdAt: new Date().getTime(),
//     system: true,
//   },
// ]);

// const mapStateToProps = (state) => {
//   return ({
//     events: state.eventsSh.all,
//     token: state.auth.token,
//   });
// };
// export default connect(mapStateToProps, { fetchEvents })(Chat);
export default Chat;