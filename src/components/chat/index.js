/* eslint-disable react/jsx-props-no-spreading */
import React, {Component, useState} from 'react';
import {
  GiftedChat, Bubble, Send, 
} from 'react-native-gifted-chat';
// import { App } from 'react-native-firebase';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchEvents, fetchChat, newChat} from './actions';

//   // https://github.com/FaridSafi/react-native-gifted-chat
//   // https://heartbeat.fritz.ai/chat-app-with-react-native-part-4-create-chat-ui-screens-with-react-native-gifted-chat-7ef428a60d30

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [
      ],
      user: 'userId',
      FullName: 'AprilZ',
    };
  }
  
  callToFetchChat=() => {
    this.props.fetchChat(this.props.route.params.eventId);
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append([], this.props.chat),
      };
    });
  }
  

  componentDidMount = () => {
    setInterval(this.callToFetchChat, 1000);
    // this.props.fetchChat(this.props.route.params.eventId);
    // this.setState({messages: this.props.chat});
    // console.log(`${this.props.event}event is this`);
  } 


  // helper method that is sends a message
  handleSend=(newMesssage) => {
    // this.props.newChat()
    const messsageToPost = {
      text: newMesssage[0].text,
    };
    
    this.props.newChat(messsageToPost, this.props.route.params.eventId);
  }


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
            left: {
              // Here is the color change
              backgroundColor: 'white',
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


const mapStateToProps = (state) => {
  return ({
    events: state.eventsSh.all,
    token: state.auth.token,
    chat: state.chat.all,
  });
};
export default connect(mapStateToProps, { fetchEvents, fetchChat, newChat})(Chat);
// export default Chat;