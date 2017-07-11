import { connect } from 'react-redux';

import BootstrapContainer from './BootstrapContainer';
import mapActionCreatorsToProps from '../../utils/mapActionCreatorsToProps';

import {
  loadObservations,
  finishInitialLoading,
} from '../../actions';

const actionCreators = mapActionCreatorsToProps({
  loadObservations,
  finishInitialLoading,
});

export default connect(
  undefined,
  actionCreators,
)(BootstrapContainer);
