import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GeographicDisplay from './src/GeographicDisplay'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk';

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));


export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>Welcome to the Who's Down app!</Text>
        <Text>This is Aarish</Text>
        <Text>This is Anjali!</Text>
        <Text>This is Arjun :DDD</Text>
        <GeographicDisplay />
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


