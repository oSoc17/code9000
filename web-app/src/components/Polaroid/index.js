import React from 'react';
import { PinchView } from 'react-pinch-zoom-pan';

import './Polaroid.css';

const Polaroid = ({ img }) => {
  return (
    <div className="Polaroid">
      <PinchView containerRatio={(9 / 16) * 100}>
        <img src={img} alt="" />
      </PinchView>
    </div>
  );
};

export default Polaroid;
