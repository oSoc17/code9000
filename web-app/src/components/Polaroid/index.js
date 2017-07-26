import React from 'react';
import { PinchView } from 'react-pinch-zoom-pan';
import classNames from '../../utils/classNames';

import './Polaroid.css';

const Polaroid = ({ img, toggle }) => {
  return (
    <div className={classNames('Polaroid', toggle && 'Polaroid__Animation')} >
      <PinchView containerRatio={(9 / 16) * 100}>
        <img src={img} alt="" />
      </PinchView>
    </div>
  );
};

export default Polaroid;
