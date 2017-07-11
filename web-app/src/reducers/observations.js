import reducer from './reducer';

import { LOAD_OBSERVATIONS } from '../actions/types';

const defaultState = {
  all: [],
};

const application = reducer({
  [LOAD_OBSERVATIONS]: (state, action) => ({
    ...state,
    all: [...action.observations],
  }),
}, defaultState);

export default application;
