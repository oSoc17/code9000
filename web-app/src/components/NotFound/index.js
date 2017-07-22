import React, { Component } from 'react';

import classNames from '../../utils/classNames';

import crestBackground from '../../theme/icons/crest_red_empty.svg';
import crestBirdAlone from '../../theme/icons/crest_bird.svg';
import crestBirdFlying from '../../theme/icons/crest_bird_flying.svg';

import './NotFound.css';

class NotFound extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      wings: false,
      fly: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(({ wings }) => ({ wings: !wings }));
    }, 400);

    setInterval(() => {
      this.setState(({ fly }) => ({ fly: !fly }));
    }, 6000);
  }

  render() {
    const { fly, wings } = this.state;

    return (
      <div className="NotFound">
        <div className="NotFound__Wrapper">
          <div className="NotFound__Text">
            404 not found!
          </div>
          <div className="NotFound__Logo">
            <img className="NotFound_Logo_Background" src={crestBackground} alt="" />
            <div className={classNames('NotFound_Logo_Bird', fly && 'NotFound_Logo_Bird--hide', wings && 'NotFound_Logo_Bird--wings')}alt="" />
          </div>
          <div className="NotFound__SubText">
            Woops!<br /><br />
            Looks like the bird has flown.
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
