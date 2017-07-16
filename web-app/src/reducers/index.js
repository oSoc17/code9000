import { combineReducers } from 'redux';
import application from './application';
import observations from './observations';

const rootReducer = combineReducers({
  application,
  observations,
});

export default rootReducer;
