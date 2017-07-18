import React from 'react';
import Slider from './components/Slider';

import Header from '../Header';
import './OnBoard.css';

export const OnBoard = () => (
  <div className="OnBoard">
    <Header />

    <div className="OnBoard__Content" />

    <div className="OnBoard__Footer">
      <Slider className="OnBoard__Carrousel">
        <div className="OnBoard__Carrousel__Item" />
        <div className="OnBoard__Carrousel__Item" />
        <div className="OnBoard__Carrousel__Item" />
        <div className="OnBoard__Carrousel__Item" />
      </Slider>
    </div>
  </div>
);

export default OnBoard;
