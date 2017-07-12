import { connect } from 'react-redux';

import BootstrapContainer from './BootstrapContainer';
import mapActionCreatorsToProps from '../../utils/mapActionCreatorsToProps';

import {
  loadObservations,
  finishInitialLoading,
  loadUser,
} from '../../actions';

const actionCreators = mapActionCreatorsToProps({
  loadObservations,
  finishInitialLoading,
  loadUser,
});

export default connect(
  undefined,
  actionCreators,
)(BootstrapContainer);
