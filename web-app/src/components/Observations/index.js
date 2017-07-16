import { connect } from 'react-redux';

import Observations from './Observations';
import mapActionCreatorsToProps from '../../utils/mapActionCreatorsToProps';

import { loadObservations } from '../../actions';

import { getObservations } from '../../selectors';

const mapStateToProps = (state) => ({
  observations: getObservations(state),
});

const actionCreators = mapActionCreatorsToProps({
  loadObservations,
});

export default connect(
  mapStateToProps,
  actionCreators,
)(Observations);
