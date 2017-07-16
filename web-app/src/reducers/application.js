import _ from 'lodash';
import reducer from './reducer';

import { FINISH_INITIAL_LOADING, LOAD_USER } from '../actions/types';

const defaultState = {
  loading: true,
  user: undefined,
};

const application = reducer({
  [FINISH_INITIAL_LOADING]: (state) => _.merge({}, state, {
    loading: false,
  }),
  [LOAD_USER]: (state, action) => _.merge({}, state, {
    user: action.user,
  }),
}, defaultState);

export default application;
