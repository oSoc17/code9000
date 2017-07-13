import React from 'react';
import logo from '../../theme/crest_red.svg';

import './NotFound.css';

const NotFound = () => {
  return (
    <div className="NotFound">
      <div className="NotFound__Wrapper">
        <div className="NotFound__Text">
          404 not found!
        </div>
        <img src={logo} alt="CODE9000 crest" className="NotFound__Logo" />
        <div className="NotFound__SubText">
          Woops!<br /><br />
          Looks like the bird has flown.
        </div>
      </div>
    </div>
  );
};

export default NotFound;
