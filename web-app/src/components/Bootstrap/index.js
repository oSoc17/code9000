import { connect } from 'react-redux';

import BootstrapContainer from './BootstrapContainer';
import mapActionCreatorsToProps from '../../utils/mapActionCreatorsToProps';

import {
  loadObservations,
  loadRanking,
  loadUser,
  finishInitialLoading,
} from '../../actions';

const actionCreators = mapActionCreatorsToProps({
  loadObservations,
  loadRanking,
  loadUser,
  finishInitialLoading,
});

export default connect(
  undefined,
  actionCreators,
)(BootstrapContainer);
