import { LOAD_OBSERVATIONS } from './types';

export const loadObservations = (observations) => ({
  type: LOAD_OBSERVATIONS,
  observations,
});
