import React from 'react';

import './GuestMode.css';
import logo from '../../theme/crest.svg';
import classNames from '../../utils/classNames';

const GuestMode = ({ children, className }) => {
  return (
    <div className={classNames('GuestMode', className)}>
      <div className="GuestMode__Wrapper">
        <img src={logo} alt="CODE9000 crest" className="Login__Logo" />
        {children}
      </div>
    </div>
  );
};

export default GuestMode;
