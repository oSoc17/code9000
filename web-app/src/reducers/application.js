import _ from 'lodash';
import reducer from './reducer';

import { FINISH_INITIAL_LOADING } from '../actions/types';

const defaultState = {
  loading: true,
};

const application = reducer({
  [FINISH_INITIAL_LOADING]: (state) => _.merge({}, state, {
    loading: false,
  }),
}, defaultState);

export default application;
