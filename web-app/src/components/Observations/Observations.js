import React, { Component } from 'react';
import _ from 'lodash';

import Title from '../Title';
import Polaroid from '../Polaroid';

import './Observations.css';
import polaroid from '../../theme/icons/polaroid.svg';
import trash from '../../theme/icons/trash.svg';
import book from '../../theme/icons/book.svg';
import feather from '../../theme/icons/feather.svg';

class Observations extends Component {
  render() {
    const { observations, vote, generateImageUrl } = this.props;

    if (observations.length <= 0) {
      return (
        <div className="container Observations__Empty">
          <div className="Feather">
            <img src={feather} alt="Feather" />
          </div>
          <div className="col-lg-12">
            <h1>All the birds have flown for today!</h1>
            <p>Thank you so much for your contribution.</p>
            <p>
              Follow <a href="https://twitter.com/TodayBirds">@TodayBirds</a> on twitter or like the
              page <a href="https://www.facebook.com/TodayBirds/">Birds Today</a> on Facebook to
              keep track of all the pictures Bert takes.
            </p>
          </div>
        </div>
      );
    }

    const observation = _.head(observations);

    return (
      <div className="Observations">
        <Title name="Vote" />

        <div className="Observations__Top">
          <div className="container">
            <div className="row">
              <div className="col col-lg-12">
                <img className="Observations__PolaroidIcon" src={polaroid} alt="Polaroid camera" />
              </div>
              <div className="col col-lg-offset-2 col-lg-8">
                <div className="Observations__Picture">
                  <Polaroid img={generateImageUrl(observation.id)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Observations__Footer">
          <div className="Observations__Button" onClick={() => vote(-1)}>
            <img src={trash} alt="Trash" />
          </div>
          <div className="Observations__Button" onClick={() => vote(1)}>
            <img src={book} alt="Book" />
          </div>
        </div>
      </div>
    );
  }
}
export default Observations;
