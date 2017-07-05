/* global window */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../Login';
import Observations from '../Observations';

class App extends Component {
  render() {
    // TODO: use a jwt manager
    const token = window.localStorage.getItem('jwt.token');

    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />

          {token === null
            ? <Redirect to="/login" />
            : <div>
              <Route exact path="/" component={Observations} />
              <Route exact path="/login" component={Login} />
            </div>}
        </Switch>
      </div>
    );
  }
}

export default App;