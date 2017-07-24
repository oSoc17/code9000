import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

import logo from '../../theme/crest.svg';
import api, { removeToken } from '../../utils/api';
import redirect from '../../utils/redirect';

class Header extends Component {
  logout() {
    api.post('/auth/logout').then(() => {
      removeToken();
      redirect('/login');
    });
  }

  render() {
    // const { isAdmin } = this.props;
    // TODO: show icon for the IoT installations

    return (
      <div className="Header">
        <div className="Header__Wrapper">
          <NavLink to="/" className="Header__Logo"><img src={logo} alt="Logo" /></NavLink>
          <div className="Header__Menu">
            <NavLink
              to="/ranking"
              className="Header__Menu__Icon Header__Menu__Leader"
              activeClassName="Header__Menu__Leader--active"
            >
              Ranking
            </NavLink>
            <NavLink
              to="/"
              exact
              className="Header__Menu__Icon Header__Menu__Bird"
              activeClassName="Header__Menu__Bird--active"
            >
              Vote
            </NavLink>
            <NavLink
              to="/profile"
              className="Header__Menu__Icon Header__Menu__Profile"
              activeClassName="Header__Menu__Profile--active"
            >
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
