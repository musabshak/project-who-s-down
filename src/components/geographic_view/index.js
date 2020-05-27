import React, { Component } from 'react';
import Search from 'react-native-search-box';
import {
  Button,
  ActivityIndicator,
  StyleSheet,
  View,
  Image,
  Text,
  FlatList,
  TouchableHighlight,
} from 'react-native';


class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'anjali chikkula',
      isLoading: true,
      dataSource: [],
    };
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
        <Button
          onPress={() => this.props.navigation.navigate('EventList')}
          title="Event List View"
          color="#841584"
          accessibilityLabel="Event List view"
        />
        <Text>This is WHERE the mapview will go</Text>
      </View>
    );
  }
}

export default MapView;

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
