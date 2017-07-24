import { combineReducers } from 'redux';
import application from './application';
import observations from './observations';
import ranking from './ranking';

const rootReducer = combineReducers({
  application,
  observations,
  ranking,
});

export default rootReducer;
