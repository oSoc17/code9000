/* global window */
import React, { Component } from 'react';
import './Header.css';

import logo from '../../theme/crest.png';

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
    return (
      <div className="Header">
        <div className="Header__Wrapper">
          <img src={logo} alt="Logo" className="Header__Logo" />
          <div className="Logout" onClick={() => this.logout()} >
            Logout
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
