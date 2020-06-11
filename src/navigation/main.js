/* eslint-disable react/no-unescaped-entities */
/* eslint-disable global-require */

/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import {
  StyleSheet, Button, Text, ActivityIndicator, View, 
} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';

import { TouchableOpacity } from 'react-native-gesture-handler';
import MainTabBar from './main_tab_bar';
import { signoutUser, loadToken } from '../components/signin/actions';
import { clearChat} from '../components/chat/actions';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import EventInfo from '../components/event_info';
import MyEvents from '../components/my_events';
import DownEvents from '../components/down_events';
import NewEventPage from '../components/new_event';
import Chat from '../components/chat';

import Settings from '../components/settings';

const NullComponent = () => null;
export const navigationRef = React.createRef();
export function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

export function pop(params) {
  if (params) navigationRef.current?.dispatch(StackActions.pop(...params));
  else navigationRef.current?.dispatch(StackActions.pop());
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

  componentDidMount() {

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

  genSettingsName = (props) => {
    // console.log('gen settings name!');
    // console.log('props=', props);
    if (props.notifNumber) {
      // console.log('we think notifnumber exists here:::!', props);
      if (props.notifNumber > 9) {
        return ('Profile(9+)');
      }
      else {
        return (`Profile(${props.notifNumber})`); }
    }
    else {
      // console.log('no props detected');
      return ('Profile');
    }
  }

  settingsHelper = () => {
    navigate('Profile');
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
                headerMode: 'none',
                headerTitle: () => (
                  <Text style={{
                    fontFamily: 'pacifico-regular',
                    fontSize: 30,
                    // position: 'absolute',
                    // top: 0,
                    color: '#fff',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}
                  >
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
                headerLeft: () => (
                  <Button
                    onPress={() => (this.settingsHelper(this.props))}
                    title={this.props.userName ? this.genSettingsName(this.props) : ''}
                    color="#fff"
                  />
                ),
                // headerTitle: (props) => <LogoTitle {...props} />,
                headerRight: () => (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => (this.props.token ? this.props.signoutUser() : this.props.signoutUser(navigate))}
                    style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 20 }}
                  >
                    <Text style={{ color: '#fff', fontFamily: 'TitilliumWeb-SemiBold', fontSize: 16 }}>{this.props.userName ? 'Logout' : 'Login'}</Text>
                  </TouchableOpacity>
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
              name="DownEvents"
              component={DownEvents} 
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
            <Stack.Screen
              name="Chat"
              component={Chat} 
              options={{
                headerShown: true,
                headerLeft: () => (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { console.log('Clearing timer: ', this.props.timer); clearInterval(this.props.timer); this.props.clearChat(); pop(); }}
                    style={{ justifyContent: 'center', alignItems: 'center', paddingRight: 20 }}
                  >
                    <Icon type="MaterialCommunityIcons" name="arrow-left" style={{ fontSize: 30, color: '#FF5722', marginLeft: 15 }} />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen
              name="Profile"
              component={Settings}
              options={{}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <ActivityIndicator size="large" color="#FF5722" />
        </View>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return (
    {
      userName: state.auth.userName,
      token: state.auth.token,
      notifNumber: state.settings.notifNumber, 
      timer: state.chat.timer,
    }
  );
};

export default connect(mapStateToProps, { loadToken, signoutUser, clearChat})(Main);

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
