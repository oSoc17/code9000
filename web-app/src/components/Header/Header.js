import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

import logo from '../../theme/crest.svg';
import logoNotAuthenticated from '../../theme/icons/crest_menu.svg';

import api, { removeToken } from '../../utils/api';
import redirect from '../../utils/redirect';
import authenticated from '../../utils/isAuthenticated';

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
        {authenticated() && (
          <div className="Header__Wrapper">
            <NavLink to="/" className="Header__Logo">
              <img src={logo} alt="Logo" />
            </NavLink>
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
              <div
                onClick={() => this.logout()}
                className="Header__Menu__Icon Header__Menu__SignOut"
              >
                Sign Out
              </div>
            </div>
          </div>
        )}

        {!authenticated() && (
          <NavLink to="/" className="Header__LogoNotAuthenticated">
            <img src={logoNotAuthenticated} alt="Logo" />
          </NavLink>
        )}
      </div>
    );
  }
}

export default Header;
