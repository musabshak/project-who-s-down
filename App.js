import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import MainTabBar from './src/navigation/main_tab_bar';
import ActionTypes from './src/components/signin/actions';
import SignIn from './src/components/signin';
import SignUp from './src/components/signup';
import EventInfo from './src/components/event_info';
import reducers from './src/reducers';
import MyEvents from './src/components/my_events';


// disable really annoying in app warnings
console.disableYellowBox = true;

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

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

export default function App() {
  loadToken();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            // gestureEnabled: false,
          }}
        >
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{
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
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="Main"
            component={MainTabBar}
            options={{
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
            name="EventInfo"
            component={EventInfo} 
            options={{
              // headerShown: true,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

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
