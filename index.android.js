import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import Main from './src/Navigator.js';
import ReduxThunk from 'redux-thunk';

class App extends React.Component {
  render(){
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return(
      <Provider store={store}>
        <Main />
      </Provider>
    )
  }
}
AppRegistry.registerComponent('lookatDriver', () => App)
