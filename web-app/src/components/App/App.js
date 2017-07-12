/* global */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Bootstrap from '../Bootstrap';
import Header from '../Header';
import Observations from '../Observations';
import Installations from '../Installations';

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
        <Switch>
          <div className="App__Wrapper">
            <Route exact path="/" component={Observations} />
            <Route exact path="/installations" component={Installations} />
          </div>
        </Switch>
      </div>
    );
  }
}

export default App;
