/* global window */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Header.css';

import logo from '../../theme/crest.svg';
import api, { removeToken } from '../../utils/api';

class Header extends Component {
  logout() {
    api
      .post('/auth/logout')
      .then(() => {
        removeToken();
        window.location = '/login';
      });
  }

  render() {
    const { isAdmin } = this.props;

    return (
      <div className="Header">
        <div className="Header__Wrapper">
          <img src={logo} alt="Logo" className="Header__Logo" />
          <div>
            <div className="Logout" onClick={() => this.logout()} >
              Logout
            </div>
            {isAdmin && (
              <div>
                <NavLink to="/installations">Installations</NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
