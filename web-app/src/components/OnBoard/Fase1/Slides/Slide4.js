import React from 'react';

import { Button } from '../../../Form';
import { Slide } from '../components/Slider';

const Slide4 = ({ showFase2 }) => (
  <Slide className="Carrousel__Item Carrousel__Item__Slide4">
    <Button className="Carrousel__Item__Action" onClick={() => showFase2()}>Help Bert now!</Button>
  </Slide>
);

export default Slide4;
