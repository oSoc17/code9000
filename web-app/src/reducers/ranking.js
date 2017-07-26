import reducer from './reducer';

import { LOAD_RANKING } from '../actions/types';

const defaultState = {
  all: [],
};

const ranking = reducer({
  [LOAD_RANKING]: (state, action) => ({
    ...state,
    all: [...action.ranking],
  }),
}, defaultState);

export default ranking;
