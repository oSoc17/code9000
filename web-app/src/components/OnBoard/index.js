/* global window */
import React, { Component } from 'react';
import Slider from './components/Slider';

import classNames from '../../utils/classNames';

import Header from '../Header';
import './OnBoard.css';

import bertIcon from '../../theme/icons/bert.svg';
import armIcon from '../../theme/icons/arm.svg';
import verkijkerIcon from '../../theme/icons/verkijker.svg';
import polaroidIcon from '../../theme/icons/polaroid.svg';

const PROGRESS_ITEM = 0.25;
const PROGRESS_LAST = PROGRESS_ITEM * 3;
const PROGRESS_SECOND_LAST = PROGRESS_ITEM * 2;
const TIME_ANIMATION = 5000;
const WIDTH_BERT = 325;

class OnBoard extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      showFixedPolaroid: false,
      progress: undefined,
      disappear: false,
      next: false,
    };
  }

  checkProgress(percent) {
    const disappear = percent >= PROGRESS_LAST;

    if (disappear) {
      this.next();
    }

    this.setState({
      showFixedPolaroid: percent >= PROGRESS_SECOND_LAST,
      progress: percent,
      disappear,
    }, () => this.styleArm());
  }

  next() {
    setTimeout(() => {
      if (this.state.disappear) {
        this.setState({ next: true });
      }
    }, TIME_ANIMATION);
  }

  styleArm() {
    const { progress } = this.state;

    return {
      visibility: window.innerHeight < WIDTH_BERT || progress > PROGRESS_SECOND_LAST ? 'hidden' : 'visible',
      zIndex: progress >= 0.04 && progress < 0.34 ? '0' : '1',
    };
  }

  render() {
    const { showFixedPolaroid, disappear, next } = this.state;

    if (next) {
      return (
        <div>Next step, coming soon...</div>
      );
    }

    return (
      <div className="OnBoard">
        <Header />
        <div className="OnBoard__Content" />

        <div className="OnBoard__Bottom">
          <img
            src={bertIcon}
            alt="Avatar of Bert, the Bird nerd."
            className={classNames('OnBoard__Bert', disappear && 'OnBoard__Bert--disappear')}
          />

          <img
            src={armIcon}
            alt="Arm of Bert."
            className="OnBoard__Arm"
            style={this.styleArm()}
          />

          {showFixedPolaroid && (
            <img
              src={polaroidIcon}
              alt=""
              className={classNames('Carrousel__Polaroid', disappear && 'Carrousel__Polaroid--disappear')}
            />
          )}

          <Slider
            className="Carrousel"
            process={(percent) => this.checkProgress(percent)}
          >

            <div className="Carrousel__Item">
              <div className="Carrousel__Item__Text">Hi, my name is Bert.</div>
              <div className="Carrousel__Item__Text">I LOVE birds. And I need your help.</div>
              <img src={verkijkerIcon} alt="" className="Carrousel__Glass" />
            </div>

            <div className="Carrousel__Item">
              <div className="Carrousel__Item__Text">I&apos;m looking for the common tern.</div>
              <div className="Carrousel__Item__Text">I took some pictures, this is what they look like!</div>
              <div className="Carrousel__Dias">
                <div className="Carrousel__Dia Carrousel__Dia--1">
                  <img src="" alt="" />
                </div>
                <div className="Carrousel__Dia Carrousel__Dia--2">
                  <img src="" alt="" />
                </div>
                <div className="Carrousel__Dia Carrousel__Dia--3">
                  <img src="" alt="" />
                </div>
              </div>
            </div>

            <div className="Carrousel__Item">
              <div className="Carrousel__Item__Text">I&apos;m going to the HoutDok in Ghent right now to take some more pictures..</div>
              <div className="Carrousel__Item__Text">I would like you to help me spot the common tern.</div>

              {!showFixedPolaroid && (
                <img
                  src={polaroidIcon}
                  alt=""
                  className="Carrousel__Polaroid"
                />
              )}
            </div>

            <div className="Carrousel__Item" />

          </Slider>
        </div>
      </div>
    );
  }
}

export default OnBoard;
