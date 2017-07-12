import React from 'react';

import './Divider.css';

const Divider = ({ text }) => {
  return (
    <div className="Divider">
      <div className="Divider__Left" />
      <div className="Divider__Text">
        {text}
      </div>
      <div className="Divider__Right" />
    </div>
  );
};

export default Divider;
