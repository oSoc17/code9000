import React from 'react';

import './Polaroid.css';

const Polaroid = ({ img }) => {
  return (
    <div className="Polaroid">
      <img src={img} alt="" />
    </div>
  );
};

export default Polaroid;
