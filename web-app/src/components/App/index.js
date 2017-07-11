import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from './App';

import { isLoading } from '../../selectors';

const mapStateToProps = (state) => ({
  loading: isLoading(state),
});

export default withRouter(connect(
  mapStateToProps,
  undefined,
)(App));
