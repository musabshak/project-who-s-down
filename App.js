import React from 'react';
import { YellowBox } from 'react-native';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './src/reducers';
import Main from './src/navigation/main';

// disable really annoying in app warnings
console.disableYellowBox = true;
YellowBox.ignoreWarnings(['Require cycle', 'componentWillMount']);
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];

// this creates the store with the reducers, and does some other stuff to initialize devtools
// boilerplate to copy, don't have to know
const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}