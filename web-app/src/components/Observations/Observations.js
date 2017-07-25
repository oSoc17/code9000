import React, { Component } from 'react';
import _ from 'lodash';
import Swing from 'react-swing';

import Title from '../Title';
import Polaroid from '../Polaroid';

import './Observations.css';
import polaroid from '../../theme/icons/polaroid.svg';
import trash from '../../theme/icons/trash.svg';
import book from '../../theme/icons/book.svg';
import feather from '../../theme/icons/feather.svg';

class Observations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: null,
      config: {
        throwOutConfidence: (xOffset, yOffset, element) => {
          const xConfidence = Math.min((2 * Math.abs(xOffset)) / element.offsetWidth, 1);
          const yConfidence = Math.min((Math.abs(yOffset)) / (element.offsetHeight * 10), 1);
          return Math.max(xConfidence, yConfidence);
        },
      },
    };
  }

  render() {
    const { observations, vote, generateImageUrl, isDemo } = this.props;

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
          <img className="Observations__PolaroidIcon" src={polaroid} alt="Polaroid camera" />

          {isDemo && (
            <div className="Observations__DemoText">
              {observation.demoText}
            </div>
          )}

          <Swing
            config={this.state.config}
            className="Observations__Swing"
            tagName="div"
            setStack={(stack) => this.setState({ stack })}

            throwoutleft={(e) => {
              vote(-1);
              this.state.stack.getCard(e.target).throwIn(0, 0);
            }}
            throwoutright={(e) => {
              vote(1);
              this.state.stack.getCard(e.target).throwIn(0, 0);
            }}
          >
            <div className="Observations__Picture">
              <Polaroid img={generateImageUrl(observation.id)} />
            </div>
          </Swing>
        </div>
        <div className="Observations__Bottom">
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

Observations.defaultProps = {
  isDemo: false,
};

export default Observations;
