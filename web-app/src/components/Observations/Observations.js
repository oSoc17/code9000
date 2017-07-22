import React, { Component } from 'react';

import Title from '../Title';

import './Observations.css';
import polaroid from '../../theme/icons/polaroid.svg';
import trash from '../../theme/icons/trash.svg';
import book from '../../theme/icons/book.svg';

class Observations extends Component {
  render() {
    const { observation, vote } = this.props;

    return (
      <div className="Observations">
        <Title name="Vote" />
        <div className="container">
          <div className="row">
            <div className="col col-lg-12">
              <img className="Observations__PolaroidIcon" src={polaroid} alt="Polaroid camera" />
            </div>
            <div className="col col-lg-12">
              <div className="Observations__Picture">
                <img
                  className="Observations__Picture"
                  src={`${process.env.REACT_APP_API_URL}/observations/${observation.id}/picture`}
                  alt="The Observation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="Observations__Footer">
          <div className="container">
            <div className="row">
              <div className="col col-lg-12 Observations__Buttons">
                <img src={trash} alt="Swipe observation to trash" onClick={() => vote(1)} />
                <img src={book} alt="Swipe book to trash" onClick={() => vote(-1)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Observations;
