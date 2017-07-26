import { connect } from 'react-redux';

import mapActionCreatorsToProps from '../../utils/mapActionCreatorsToProps';
import RankingContainer from './RankingContainer';

import { loadRanking } from '../../actions';
import { getRanking, getUser } from '../../selectors';

const mapStateToProps = (state) => ({
  ranking: getRanking(state),
  user: getUser(state),
});

const actionCreators = mapActionCreatorsToProps({
  loadRanking,
});

export default connect(
  mapStateToProps,
  actionCreators,
)(RankingContainer);
