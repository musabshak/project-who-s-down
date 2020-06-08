/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';
import { StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

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

function Main(props) {
  props.loadToken();
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
            title: 'Who\'s Down?',
            headerStyle: {
              backgroundColor: '#FF5722',
            },
            headerTintColor: '#fff',
            // headerTitle: (props) => <LogoTitle {...props} />,
            headerLeft: NullComponent,
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
