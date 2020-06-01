import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import MainTabBar from './src/navigation/main_tab_bar';
import reducers from './src/components/new_event/reducers';
// import GeographicDisplay from './src/components/geographic_view/GeographicDisplay';
import NewEventPage from './src/components/new_event';

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
        {/* <GeographicDisplay /> */}
        {/* <NewEventPage /> */}
        <MainTabBar />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: 'green',
    borderWidth: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
