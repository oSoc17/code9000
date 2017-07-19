/* global window */
import React, { Component } from 'react';

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
    // const { isAdmin } = this.props;
    // TODO: show icon for the IoT installations

    return (
      <div className="Header">
        <img src={logo} alt="Logo" className="Header__Logo" />
      </div>
    );
  }
}

export default Header;
