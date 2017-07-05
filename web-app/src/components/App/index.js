import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../Login';
import Observations from '../Observations';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Observations} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    );
  }
}

export default App;
