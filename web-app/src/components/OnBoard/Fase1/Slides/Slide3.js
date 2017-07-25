import React from 'react';

import { Slide } from '../components/Slider';

import polaroidIcon from '../../../../theme/icons/polaroid.svg';

const Slide3 = ({ showFixedPolaroid }) => (
  <Slide className="Carrousel__Item">
    <div className="Carrousel__Item__Text">
      <p>I&apos;m at the Houtdok in Ghent right now. Let me show you how you can help me sort the pictures I take!</p>
    </div>
    {!showFixedPolaroid && (<img src={polaroidIcon} alt="" className="OnBoard__Polaroid" />)}
  </Slide>
);

export default Slide3;
