/* eslint-disable no-plusplus */
/* eslint-disable react/jsx-props-no-spreading */
import React, {Component, useState} from 'react';
import {
  GiftedChat, Bubble, Send, 
} from 'react-native-gifted-chat';
// import { App } from 'react-native-firebase';
import { IconButton } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchChat, newChat, setChatTimer } from './actions';

//   // https://github.com/FaridSafi/react-native-gifted-chat
//   // https://heartbeat.fritz.ai/chat-app-with-react-native-part-4-create-chat-ui-screens-with-react-native-gifted-chat-7ef428a60d30

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [
      ],
      user: this.props.token,
    //   if (this.props.token) {
    //     this.props.fetchImdownEvents(this.props.token).then((res) => {
    // };
    };
  }
  
  
    componentDidMount = () => {
      // 
      // setInterval(this.callToFetchChat, 1000);
      this.timer = setInterval(this.callToFetchChat, 1000);
      // this.setState({
      //   timer: setInterval(this.callToFetchChat, 1000),
      // }, () => {
      //   console.log(`Chat timer #${this.state.timer} saved to state.`);
      //   this.props.setChatTimer(this.state.timer);
      // })
      console.log(`Chat timer #${this.timer} saved to state.`);
      this.props.setChatTimer(this.timer);
    }
  

    //   setEventId = () => {
    //     return (this.props.route.params.eventId);
    //   }

  callToFetchChat=() => {
    console.log('This timer: ', this.props.timer, 'test', this.props.test);
    if (this.props.token) {
      this.props.fetchChat(this.props.route.params.eventId, this.props.token);
      // console.log(`${this.props.route.params.eventId} what + 5ede2ebe87d3d0003875cd6e`);
      // 5edef6985a11ba0038f315b2
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append([], this.props.chat),
        };
      });
    }
  }
  
  // helper method that is sends a message
  handleSend=(newMessage) => {
    // this.props.newChat()
    const messsageToPost = {
      text: newMessage[0].text,
    };
    this.props.newChat(messsageToPost, this.props.route.params.eventId, this.props.token);
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
      // console.log('messages: ',this.state.messages);
      if (this.state.messages) { return (
        <GiftedChat
          messages={this.state.messages}
          onSend={(newMessage) => { this.handleSend(newMessage); }}
          user={{ _id: this.props.token }}
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
      
      ); }
      else return null;
    }
}

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
    token: state.auth.token,
    chat: state.chat.all,
    timer: state.chat.timer,
    test: state.chat.test,
  });
};
export default connect(mapStateToProps, { fetchChat, newChat, setChatTimer})(Chat);
