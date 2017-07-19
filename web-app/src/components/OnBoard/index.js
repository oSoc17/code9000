import React from 'react';
import Slider from './components/Slider';

import Header from '../Header';
import './OnBoard.css';

import bertIcon from '../../theme/icons/bert.svg';
import verkijkerIcon from '../../theme/icons/verkijker.svg';
import polaroidIcon from '../../theme/icons/polaroid.svg';

export const OnBoard = () => (
  <div className="OnBoard">
    <Header />

    <div className="OnBoard__Content" />

    <div className="OnBoard__Footer">
      <img src={bertIcon} alt="Avatar of Bert, the Bird nerd." className="OnBoard__Footer__Bert" />
      <Slider className="OnBoard__Carrousel">
        <div className="OnBoard__Carrousel__Item">
          <div className="OnBoard__Carrousel__Item__Text">Hi, my name is Bert.</div>
          <div className="OnBoard__Carrousel__Item__Text">I LOVE birds. And I need your help.</div>
          <img src={verkijkerIcon} alt="" className="OnBoard__Carrousel__Glass" />
        </div>
        <div className="OnBoard__Carrousel__Item">
          <div className="OnBoard__Carrousel__Item__Text">I'm looking for the common tern.</div>
          <div className="OnBoard__Carrousel__Item__Text">I took some pictures, this is what they look like!</div>

          <div className="OnBoard__Carrousel__Dias">
            <div className="OnBoard__Carrousel__Dia OnBoard__Carrousel__Dia--1">
              <img src="" alt="" />
            </div>
            <div className="OnBoard__Carrousel__Dia OnBoard__Carrousel__Dia--2">
              <img src="" alt="" />
            </div>
            <div className="OnBoard__Carrousel__Dia OnBoard__Carrousel__Dia--3">
              <img src="" alt="" />
            </div>
          </div>
        </div>
        <div className="OnBoard__Carrousel__Item">
          <div className="OnBoard__Carrousel__Item__Text">I'm going to the HoutDok in Ghent right now to take some more pictures..</div>
          <div className="OnBoard__Carrousel__Item__Text">I would like you to help me spot the common tern.</div>

          <img src={polaroidIcon} alt="" className="OnBoard__Carrousel__Polaroid" />
        </div>
        <div className="OnBoard__Carrousel__Item" />
      </Slider>
    </div>
  </div>
);

export default OnBoard;
