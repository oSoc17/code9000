import React from 'react';

import Polaroid from '../../../Polaroid';
import { Slide } from '../components/Slider';

import commonTern1 from '../pictures/common_tern_1.jpeg';
import commonTern2 from '../pictures/common_tern_2.jpeg';
import commonTern3 from '../pictures/common_tern_3.jpeg';

const Slide2 = () => (
  <Slide className="Carrousel__Item">
    <div className="Carrousel__Item__Text">
      <p>I&apos;m looking for the common tern..</p>
      <p>I took some pictures, this is what they look like!</p>
    </div>
    <div className="Carrousel__Dias">
      <div className="Carrousel__Dias__1">
        <Polaroid img={commonTern1} />
      </div>
      <div className="Carrousel__Dias__2">
        <Polaroid img={commonTern2} />
      </div>
      <div className="Carrousel__Dias__3">
        <Polaroid img={commonTern3} />
      </div>
    </div>
  </Slide>
);

export default Slide2;
