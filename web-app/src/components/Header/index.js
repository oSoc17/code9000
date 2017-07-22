import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Header from './Header';
import { isAdmin } from '../../selectors/application';

const mapStateToProps = (state) => ({
  isAdmin: isAdmin(state),
});

export default withRouter(connect(
  mapStateToProps,
  undefined,
)(Header));
