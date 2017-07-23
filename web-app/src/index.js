/* global document, window */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './components/App';
import Login from './components/Login';
import LoginCallback from './components/Login/LoginCallback';
import StartScreen from './components/StartScreen';
import SignUp from './components/SignUp';
import OnBoard from './components/OnBoard';
import RequestResetPassword from './components/RequestResetPassword';
import ResetPassword from './components/ResetPassword';

import './index.css';

const configureStore = () => {
  if (process.env.NODE_ENV === 'production') {
    return createStore(rootReducer, applyMiddleware(thunk));
  }

  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line
    applyMiddleware(thunk),
  );
};

const isAuthenticated = () => {
  const token = window.localStorage.getItem('jwt.token');

  if (token === null || token === undefined) {
    return <Redirect to="/app" />;
  }

  return <App />;
};

// TODO: need to think about the onboarding url's

const Root = () => (
  <Provider store={configureStore()}>
    <Router>
      <Switch>
        <Route exact path="/app" component={StartScreen} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/callback/facebook/:token" component={LoginCallback} />
        <Route exact path="/reset-password" component={RequestResetPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/start" component={OnBoard} />
        {isAuthenticated()}
      </Switch>
    </Router>
  </Provider>
);

render(<Root />, document.getElementById('root'));
