import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import GeographicDisplay from './src/GeographicDisplay';
import NewEventPage from './src/new_event';

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
      <View style={styles.container}>
        <Text>Welcome to the Whos Down app!</Text>
        <Text>This is Aarish</Text>
        <Text>This is Anjali!</Text>
        <Text>This is Arjun :DDD</Text>
        <GeographicDisplay />
        <NewEventPage />
      </View>
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
