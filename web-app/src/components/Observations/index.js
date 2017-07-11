import { connect } from 'react-redux';

import Observations from './Observations';
import mapActionCreatorsToProps from '../../utils/mapActionCreatorsToProps';

import {
  loadObservations,
} from '../../actions';

const actionCreators = mapActionCreatorsToProps({
  loadObservations,
});

export default connect(
  undefined,
  actionCreators,
)(Observations);
