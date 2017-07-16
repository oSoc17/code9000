import { connect } from 'react-redux';

import Header from './Header';
import { isAdmin } from '../../selectors/application';

const mapStateToProps = (state) => ({
  isAdmin: isAdmin(state),
});

export default connect(
  mapStateToProps,
  undefined,
)(Header);
