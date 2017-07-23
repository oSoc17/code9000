import React from 'react';

import { Slide } from '../components/Slider';

import polaroidIcon from '../../../theme/icons/polaroid.svg';

const Slide3 = ({ showFixedPolaroid }) => (
  <Slide className="Carrousel__Item">
    <div className="Carrousel__Item__Text">
      <p>I&apos;m going to the HoutDok in Ghent right now to take some more pictures.</p>
      <p>I would like you to help me spot the common tern.</p>
    </div>
    {!showFixedPolaroid && (<img src={polaroidIcon} alt="" className="OnBoard__Polaroid" />)}
  </Slide>
);

export default Slide3;
