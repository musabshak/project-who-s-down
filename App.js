import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import MainTabBar from './src/navigation/main_tab_bar';
import reducers from './src/components/new_event/reducers';

// disable really annoying in app warnings
console.disableYellowBox = true;

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

export default function App() {
  return (
    <Provider store={store}>
      <MainTabBar />
    </Provider>
  );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
