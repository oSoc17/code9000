import { includes } from 'lodash';


const reducer = (patterns = {}, defaultState) => {
  return (state = defaultState, action = {}) => {
    if (!includes(Object.keys(patterns), action.type)) {
      return state;
    }

    return patterns[action.type](state, action);
  };
};

export default reducer;
