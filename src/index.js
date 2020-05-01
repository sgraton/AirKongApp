
import React, { Component } from 'react';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import AppWithNavigationState from './navigators/AppNavigator';

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
    this.state.isLoading = true;
    this.state.store = configureStore(() => {
      this.state.isLoading = false;
    });
  }

  render() {
    return (
      this.state.isLoading
      ?
      null
      :
      <Provider store={this.state.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
