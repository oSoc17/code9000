import React, { Component } from 'react';
import _ from 'lodash';
import Swing from 'react-swing';

import Title from '../Title';
import Polaroid from '../Polaroid';

import './Observations.css';
import polaroidTop from '../../theme/icons/polaroid.svg';
import polaroidBottom from '../../theme/icons/polaroid_down.svg';
import trash from '../../theme/icons/trash.svg';
import book from '../../theme/icons/book.svg';
import feather from '../../theme/icons/feather.svg';
import classNames from '../../utils/classNames';

class Observations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stack: null,
      animation: true,
      growTrash: false,
      growBook: false,
      config: {
        throwOutConfidence: (xOffset, yOffset, element) => {
          const xConfidence = Math.min((4 * Math.abs(xOffset)) / element.offsetWidth, 1);
          const yConfidence = Math.min((Math.abs(yOffset)) / (element.offsetHeight * 10), 1);
          if (xConfidence === 1) {
            if (xOffset > 0) {
              this.toggleBook();
            } else {
              this.toggleTrash();
            }
          } else {
            this.setState({
              growBook: false,
              growTrash: false,
            });
          }
          return Math.max(xConfidence, yConfidence);
        },
      },
    };
  }

  vote(value) {
    this.toggleAnimation(this.state.animation);
    this.props.vote(value);
    this.setState({
      growBook: false,
      growTrash: false,
    });
    setTimeout(() => this.toggleAnimation(), 50);
  }

  toggleAnimation() {
    this.setState(({ animation }) => ({ animation: !animation }));
  }

  toggleTrash() {
    this.setState({ growTrash: true });
  }

  toggleBook() {
    this.setState({ growBook: true });
  }

  render() {
    const { observations, generateImageUrl, isDemo } = this.props;
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

    const observation = _.last(observations);

    return (
      <div className="Observations">
        <Title name="Vote" />
        <div className="Observations__Top">
          <div className="Observations__PolaroidIcon">
            <img className="Observations__PolaroidIcon__Top"src={polaroidTop} alt="Polaroid camera" />
            <img className="Observations__PolaroidIcon__Bottom Observations__PolaroidIcon--fix"src={polaroidBottom} alt="Polaroid camera" />
          </div>
          {isDemo && (
            <div className="Observations__DemoText">
              {observation.demoText}
            </div>
          )}
          <Swing
            config={this.state.config}
            className={classNames('Observations__Swing', this.state.animation && 'Observations__Animation__Polaroid')}
            tagName="div"
            setStack={(stack) => this.setState({ stack })}
            throwoutleft={(e) => {
              this.vote(-1);
              this.state.stack.getCard(e.target).throwIn(0, 0);
            }}
            throwoutright={(e) => {
              this.vote(1);
              this.state.stack.getCard(e.target).throwIn(0, 0);
            }}
          >
            <div className="Observations__Picture">
              <Polaroid toggle={this.state.animation} img={generateImageUrl(observation.id)} />
            </div>
          </Swing>
        </div>
        <div className="Observations__Footer">
          <div className={classNames('Observations__Button', this.state.growTrash && 'Observations__Button__Grow')} onClick={() => this.vote(-1)}>
            <img src={trash} alt="Trash" />
          </div>
          <div className={classNames('Observations__Button', this.state.growBook && 'Observations__Button__Grow')} onClick={() => this.vote(1)}>
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
