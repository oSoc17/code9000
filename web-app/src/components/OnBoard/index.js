/* global */
import React, { Component } from 'react';
import Slider from './Fase1/components/Slider';

import Slide1 from './Fase1/Slides/Slide1';
import Slide2 from './Fase1/Slides/Slide2';
import Slide3 from './Fase1/Slides/Slide3';
import Slide4 from './Fase1/Slides/Slide4';

import Header from '../Header';
import './Fase1/OnBoard.css';

import bertIcon from '../../theme/icons/bert.svg';
import polaroidIcon from '../../theme/icons/polaroid_original.svg';

import Fase2 from './Fase2';

const BERT_POSITION_BOTTOM = 0;
const POLAROID_POSITION_BOTTOM = 180;
class OnBoard extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      index: 0,
      progress: {},
      fase2: false,
    };
  }

  process(progress) {
    this.setState({ progress });
  }

  currentIndex(index) {
    this.setState({ index });
    if (index === 3) {
      setTimeout(() => this.showFase2(), 1500);
    }
  }

  moveBottom(positionFrom, component) {
    if (!this.slider || !component) {
      return undefined;
    }

    if (this.state.progress.total >= 0.65) {
      return {
        bottom: positionFrom - component.clientHeight,
      };
    }

    if (this.state.progress.total < 0.5 || this.state.progress.previous < 0) {
      return undefined;
    }

    return {
      bottom: positionFrom - ((component.clientHeight * this.state.progress.previous)),
    };
  }

  moveTop(positionFrom, component) {
    if (!this.slider || !component) {
      return undefined;
    }

    if (this.state.progress.total >= 0.65) {
      return {
        bottom: this.slider.clientHeight,
      };
    }

    if (this.state.progress.total < 0.5 || this.state.progress.previous < 0) {
      return undefined;
    }

    return {
      bottom:
        positionFrom
        + (((this.slider.clientHeight - component.clientHeight)
        * this.state.progress.previous)),
    };
  }

  moveBert() {
    return this.moveBottom(BERT_POSITION_BOTTOM, this.fixedBert);
  }

  movePolaroid() {
    return this.moveTop(POLAROID_POSITION_BOTTOM, this.fixedPolaroid);
  }

  showFase2() {
    this.setState({ fase2: true });
  }

  render() {
    const showFixedPolaroid = this.state.progress.total >= 0.5;

    return (
      <div className="OnBoard">
        <Header />
        {this.state.fase2 && (
          <Fase2 />
        )}
        {!this.state.fase2 && (
          <div className="OnBoard__Wrapper">
            <div className="OnBoard__Content">
              {!false && (<img
                src={bertIcon}
                alt="Avatar of Bert, the Bird nerd."
                className="OnBoard__Bert"
                ref={(ref) => this.fixedBert = ref}
                style={this.moveBert()}
              />)}

              {showFixedPolaroid && (<img
                src={polaroidIcon}
                alt="Polaroid of Bert"
                className="OnBoard__Polaroid"
                ref={(ref) => this.fixedPolaroid = ref}
                style={this.movePolaroid()}
              />)}

              <Slider
                className="Carrousel"
                process={(percent) => this.process(percent)}
                currentIndex={(index) => this.currentIndex(index)}
                getRef={(ref) => this.slider = ref}
              >
                <Slide1 />
                <Slide2 />
                <Slide3 showFixedPolaroid={showFixedPolaroid} />
                <Slide4 />
              </Slider>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default OnBoard;
