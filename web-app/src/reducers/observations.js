import _ from 'lodash';
import reducer from './reducer';

import { LOAD_OBSERVATIONS } from '../actions/types';

const defaultState = {
  observations: [],
};

const application = reducer({
  [LOAD_OBSERVATIONS]: (state) => _.merge({}, state, {
    observations: state.observations,
  }),
}, defaultState);

export default application;
