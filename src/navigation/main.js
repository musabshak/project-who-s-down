/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { StyleSheet, Button, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import MainTabBar from './main_tab_bar';
import ActionTypes, { signoutUser } from '../components/signin/actions';
import SignIn from '../components/signin';
import SignUp from '../components/signup';
import EventInfo from '../components/event_info';
import MyEvents from '../components/my_events';
import NewEventPage from '../components/new_event';
import Settings from '../components/settings';

const NullComponent = () => null;
export const navigationRef = React.createRef();
export function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

const loadToken = async () => {
  console.log('loadToken Called');
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      const userName = await AsyncStorage.getItem('userName');
      dispatch({ type: ActionTypes.AUTH_USER, userName, token: value });
    }
  } catch (e) {
    // error reading value
    console.log('loadToken failed!');
  }
};

const Stack = createStackNavigator();

function Main(props) {
  loadToken();
  console.log('in Main:', props);
  return (
    
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false,
          // gestureEnabled: false,
        }}
      >
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
          name="Main"
          component={MainTabBar}
            
          options={{
            title: 'Who\'s Down?',
            headerStyle: {
              backgroundColor: '#FF5722',
            },
            headerTintColor: '#fff',
            // headerTitle: (props) => <LogoTitle {...props} />,
            headerLeft: () => (
              <Button
                onPress={() => (settingsHelper(props))}
                title={props.userName ? genSettingsName(props) : ''}
                color="#fff"
              />
            ),
            headerRight: () => (
              <Button
                // onPress={() => (props.token ? props.signoutUser() : props.signoutUser(props.navigation.navigate))}
                onPress={() => (props.token ? props.signoutUser() : props.signoutUser(navigate))}
                title={props.userName ? 'Logout' : 'Login'}
                // title="tmp"
                color="#fff"
              />
            ),
            // gestureEnabled: false,
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
        <Stack.Screen
          name="Profile"
          component={Settings}
          options={{}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const settingsHelper = (props) => {
  navigate('Profile');
};

const genSettingsName = (props) => {
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
    console.log('no props detected');
    return ('Profile');
  }
};

const mapStateToProps = (state) => {
  console.log('mapstatetoprops state', state);
  return ({
    userName: state.auth.userName,
    token: state.auth.token,
    notifNumber: state.settings.notifNumber,
  });
};

export default connect(mapStateToProps, { signoutUser })(Main);

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
