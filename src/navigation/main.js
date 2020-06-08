/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { StyleSheet, Button, Text, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import MainTabBar from './main_tab_bar';
import { signoutUser, loadToken } from '../components/signin/actions';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import EventInfo from '../components/event_info';
import MyEvents from '../components/my_events';
import NewEventPage from '../components/new_event';

const NullComponent = () => null;
export const navigationRef = React.createRef();
export function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

const Stack = createStackNavigator();

class Main extends Component {
  constructor(props) {
    super(props);

    // load everything
    this.state = {
      fontLoaded: 0,
    };

    this.props.loadToken();
    this.loadFont();
    
  }

  loadFont = async () => {
    try {
      await Font.loadAsync({
        'pacifico-regular': require('../../assets/fonts/Pacifico-Regular.ttf'),
        'TitilliumWeb-SemiBold': require('../../assets/fonts/TitilliumWeb-SemiBold.ttf'),
        'ReenieBeanie-Regular': require('../../assets/fonts/ReenieBeanie-Regular.ttf'),
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
        'OpenSans-Regular': require('../../assets/fonts/OpenSans-Regular.ttf'),
      });
      // this.setState({ fontLoaded: true });
      console.log('fonts are loaded');
      this.setState({ fontLoaded: 1 });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {

  }

  render() {
    if (this.state.fontLoaded) {
      return (
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              // headerShown: false,
              // gestureEnabled: false,
            }}
          >
            <Stack.Screen
              name="Main"
              component={MainTabBar}
                
              options={{
                // title: 'Who\'s Down?',
                headerMode : 'none',
                headerTitle: () => (
                  <Text style={{
                    fontFamily: "pacifico-regular",
                    fontSize: 30,
                    // position: 'absolute',
                    // top: 0,
                    color: '#fff',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                    Who's Down?
                  </Text>
                ),
                headerStyle: {
                  backgroundColor: '#FF5722',
                  height: 92,
                  // shadowOffset: { width: 0, height: 10 },
                  // shadowColor: 'black',
                  // shadowOpacity: 0.1,
                  // shadowRadius: 10,
                },
                headerTintColor: '#fff',
                // headerTitle: (props) => <LogoTitle {...props} />,
                headerLeft: NullComponent,
                headerRight: () => (
                  <Button
                    // onPress={() => (props.token ? props.signoutUser() : props.signoutUser(props.navigation.navigate))}
                    onPress={() => (this.props.token ? this.props.signoutUser() : this.props.signoutUser(navigate))}
                    title={this.props.userName ? 'Logout' : 'Login'}
                    // title="tmp"
                    color="#fff"
                  />
                ),
                // gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
                
              options={{
                headerShown: false,
                // title: 'Youtube Search',
                // headerStyle: {
                //   backgroundColor: '#f4511e',
                //   // backgroundColor: tabColor,
                // },
                // headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp} 
              options={{
                // header: NullComponent,
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="MyEvents"
              component={MyEvents} 
              options={{
                // gestureEnabled: false,
                // headerShown: true,
              }}
            />
            <Stack.Screen
              name="NewEvent"
              component={NewEventPage} 
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
            <Stack.Screen
              name="EventInfo"
              component={EventInfo} 
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}>
          <ActivityIndicator size="large" color="#FF5722" />
        </View>
      );
    }
  }
  
  
}

const mapStateToProps = (state) => {
  return ({
    userName: state.auth.userName,
    token: state.auth.token,
  });
};

export default connect(mapStateToProps, { loadToken, signoutUser })(Main);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // borderColor: 'green',
    // borderWidth: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
