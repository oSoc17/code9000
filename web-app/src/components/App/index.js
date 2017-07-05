import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../Header';
import Login from '../Login';
import Observations from '../Observations';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path='/' component={Observations} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
