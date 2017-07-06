/* global document */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './components/App';

import './reset.css';
import './index.css';

const store = createStore(rootReducer, applyMiddleware(thunk));

const Root = () =>
  (<Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>);

render(<Root />, document.getElementById('root'));
