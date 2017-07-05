import React from 'react';

import './Header.css';
import logo from  './crest.png'

const Header = () => {
  return (
    <div className="Header">
      <div className="Header__Wrapper">
        <img src={logo} alt="Logo" className="Header__Logo" />
        <div className="Header__Login">
          Login
        </div>
      </div>
    </div>
  );
}

export default Header;