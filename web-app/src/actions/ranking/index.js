import { LOAD_RANKING } from './types';

export const loadRanking = (ranking) => ({
  type: LOAD_RANKING,
  ranking,
});
