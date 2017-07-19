/* global window */
import React, { Component } from 'react';
import Slider from './components/Slider';

import Header from '../Header';
import './OnBoard.css';

import bertIcon from '../../theme/icons/bert.svg';
import armIcon from '../../theme/icons/arm.svg';
import verkijkerIcon from '../../theme/icons/verkijker.svg';
import polaroidIcon from '../../theme/icons/polaroid.svg';

class OnBoard extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      showFixedPolaroid: false,
      progress: undefined,
      top: undefined,
      bottom: undefined,
      armBottom: 'visibile',
    };
  }

  checkProgress(percent) {
    this.setState({
      showFixedPolaroid: percent >= 0.5,
      progress: percent,
      top: this.calculateTopPolaroid(),
      bottom: this.calculateBottomBert(),
      armBottom: this.calculateBottomArm(),
    });
  }

  calculateTopPolaroid() {
    const { progress } = this.state;

    const top = (window.innerHeight - (152 + 127)); // Margin from bottom + height of polaroid

    if (progress >= 0.5) {
      return top * (1 - ((progress - 0.5) * 4.15));
    }

    return top - (60 - 5); // Height of header
  }

  calculateBottomBert() {
    const { progress } = this.state;

    if (progress >= 0.5) {
      return -20 * (1 + ((progress - 0.5) * 72));
    }

    return -20;
  }

  calculateBottomArm() {
    const { progress } = this.state;

    return {
      visibility: progress > 0.5 ? 'hidden' : 'visible',
      zIndex: progress >= 0.04 && progress < 0.34 ? '0' : '1',
    };
  }

  render() {
    const { showFixedPolaroid } = this.state;

    return (
      <div className="OnBoard">
        <Header />
        <div className="OnBoard__Content" />

        <div className="OnBoard__Footer">
          <img src={bertIcon} alt="Avatar of Bert, the Bird nerd." className="OnBoard__Footer__Bert" style={{ bottom: `${this.calculateBottomBert()}px` }} />
          <img src={armIcon} alt="Arm of Bert." className="OnBoard__Footer__Arm" style={this.calculateBottomArm()} />
          {showFixedPolaroid && (<img src={polaroidIcon} alt="" className="OnBoard__Carrousel__Polaroid OnBoard__Carrousel__PolaroidFixed" style={{ top: `${this.calculateTopPolaroid()}px` }} />)}

          <Slider className="OnBoard__Carrousel" process={(percent) => this.checkProgress(percent)}>
            <div className="OnBoard__Carrousel__Item">
              <div className="OnBoard__Carrousel__Item__Text">Hi, my name is Bert.</div>
              <div className="OnBoard__Carrousel__Item__Text">I LOVE birds. And I need your help.</div>
              <img src={verkijkerIcon} alt="" className="OnBoard__Carrousel__Glass" />
            </div>
            <div className="OnBoard__Carrousel__Item">
              <div className="OnBoard__Carrousel__Item__Text">I&apos;m looking for the common tern.</div>
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
              <div className="OnBoard__Carrousel__Item__Text">I&apos;m going to the HoutDok in Ghent right now to take some more pictures..</div>
              <div className="OnBoard__Carrousel__Item__Text">I would like you to help me spot the common tern.</div>

              {!showFixedPolaroid && <img src={polaroidIcon} alt="" className="OnBoard__Carrousel__Polaroid" style={{ top: `${this.calculateTopPolaroid()}px` }} />}
            </div>
            <div className="OnBoard__Carrousel__Item" />
          </Slider>
        </div>
      </div>
    );
  }
}

export default OnBoard;
