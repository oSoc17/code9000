/* global document, window */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './components/App';
import Login from './components/Login';
import LoginCallback from './components/Login/LoginCallback';
import StartScreen from './components/StartScreen';
import SignUp from './components/SignUp';
import SignUpAfterOnBoarding from './components/SignUpAfterOnBoarding';
import OnBoard from './components/OnBoard';
import RequestResetPassword from './components/RequestResetPassword';
import ResetPassword from './components/ResetPassword';
import authenticated from './utils/isAuthenticated';

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
  if (!authenticated()) {
    return <Redirect to="/app" />;
  }

  return <App />;
};

const Router = process.env.REACT_APP_ROUTER === 'HASH'
  ? HashRouter
  : BrowserRouter;

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
        <Route exact path="/you-made-it" component={SignUpAfterOnBoarding} />
        <Route exact path="/start" component={OnBoard} />
        {isAuthenticated()}
      </Switch>
    </Router>
  </Provider>
);

render(<Root />, document.getElementById('root'));
