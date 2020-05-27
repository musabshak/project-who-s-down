import React from 'react';
import WebView from 'react-native-webview';
import {
    ActivityIndicator,
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    TouchableHighlight,
  } from 'react-native';

const EventDetail = (props) => {
  return (
    <View>
      <Text>Event Detail in stack</Text>
    </View>
    
  );
};



const styles = StyleSheet.create({
    shrink: {
      width: 50,
      backgroundColor: 'black',
    },
  });

  export default EventDetail;
