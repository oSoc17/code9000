import { FINISH_INITIAL_LOADING, LOAD_USER } from './types';

export const finishInitialLoading = () => ({
  type: FINISH_INITIAL_LOADING,
});

export const loadUser = (user) => ({
  type: LOAD_USER,
  user,
});

