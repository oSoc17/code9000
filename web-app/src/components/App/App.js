/* global */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Bootstrap from '../Bootstrap';
import Header from '../Header';
import Observations from '../Observations';
import Ranking from '../Ranking';
import Installations from '../Installations';
import NotFound from '../NotFound';

import './App.css';

class App extends Component {
  render() {
    const { loading } = this.props;

    if (loading) {
      return <Bootstrap />;
    }

    return (
      <div className="App">
        <Header />
        <div className="App__Content">
          <Switch>
            <Route exact path="/" component={Observations} />
            <Route exact path="/ranking" component={Ranking} />
            <Route exact path="/installations" component={Installations} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <div className="App__Footer" />
      </div>
    );
  }
}

export default App;
