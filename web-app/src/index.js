import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import App from './components/App';

let store = createStore(rootReducer, applyMiddleware(thunk));

const root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

render(<App />, document.getElementById('root'));
