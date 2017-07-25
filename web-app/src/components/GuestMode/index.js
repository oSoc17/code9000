import React from 'react';
import { Link } from 'react-router-dom';

import './GuestMode.css';
import logo from '../../theme/crest.svg';
import classNames from '../../utils/classNames';

const GuestMode = ({ children, className }) => {
  return (
    <div className={classNames('GuestMode', className)}>
      <div className="GuestMode__Wrapper">
        <Link to="/" className="GuestMode__Logo">
          <img src={logo} alt="CODE9000 crest" />
        </Link>
        {children}
      </div>
    </div>
  );
};

export const GoBack = ({ to, text }) => {
  return (
    <div className="GuestMode__GoBack"><Link to={to}>{text}</Link></div>
  );
};

GoBack.defaultProps = {
  to: '/login',
  text: 'Go Back',
};

export default GuestMode;
