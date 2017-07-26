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
import classNames from '../../utils/classNames'

class Observations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: null,
      toggle: true,
      config: {
        throwOutConfidence: (xOffset, yOffset, element) => {
          const xConfidence = Math.min((4 * Math.abs(xOffset)) / element.offsetWidth, 1);
          const yConfidence = Math.min((Math.abs(yOffset)) / (element.offsetHeight * 10), 1);
          return Math.max(xConfidence, yConfidence);
        },
      },
    };
  }

  vote(value){
    console.log(this.state.toggle);
    this.toggle();
    console.log(this.state.toggle);
    this.props.vote(value);
    console.log(this.state.toggle);
  }

  toggle() {
    this.setState(({ toggle }) => ({ toggle: !toggle }));
  }

  render() {
    const { observations, generateImageUrl } = this.props;

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
              <Swing
                config={this.state.config}
                className="stack"
                tagName="div"
                setStack={(stack) => this.setState({ stack })}

                throwoutleft={(e) => {
                  this.vote(-1);
                  this.state.stack.getCard(e.target).throwIn(0, 0);
                  this.toggle();
                }}
                throwoutright={(e) => {
                  this.vote(1);
                  this.state.stack.getCard(e.target).throwIn(0, 0);
                  this.toggle();
                }}
              >
                <div className="col col-lg-offset-2 col-lg-8">
                  <div className={classNames("Observations__Picture")}>
                    <Polaroid toggle={this.state.toggle} img={generateImageUrl(observation.id)} />
                  </div>
                </div>
              </Swing>
            </div>
          </div>
        </div>

        <div className="Observations__Footer">
          <div className="Observations__Button" onClick={() => {this.vote(-1); setTimeout(() => this.toggle(), 50)}}>
            <img src={trash} alt="Trash" />
          </div>
          <div className="Observations__Button" onClick={() => {this.vote(1); setTimeout(() => this.toggle(), 50)}}>
            <img src={book} alt="Book" />
          </div>
        </div>
      </div>
    );
  }
}
export default Observations;
