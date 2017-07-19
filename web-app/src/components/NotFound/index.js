import React, { Component } from 'react';
import crest_background from '../../theme/flying/crest_red_background_no_shadow.svg';
import crest_bird_alone from '../../theme/flying/crest_bird_alone.svg';
import crest_bird_flying from '../../theme/flying/crest_bird_flying.svg';

import './NotFound.css';
import classNames from '../../utils/classNames';

class NotFound extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      fly: false,
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(({ fly }) => ({ fly: !fly }))
    }, 400)
  }

  render() {
    return (
      <div className="NotFound">
        <div className="NotFound__Wrapper">
          <div className="NotFound__Text">
            404 not found!
          </div>
          <div className="NotFound__Logo">
            <img className="NotFound_Logo_Background" src={crest_background} alt="CODE9000 crest background" />
            <img className="NotFound_Logo_Bird_Alone NotFound_Logo_Bird_Animation"src={crest_bird_alone} alt="CODE9000 crest bird" />
            <img className={classNames('NotFound_Logo_Bird_Flying', 'NotFound_Logo_Bird_Animation', this.state.fly && 'hidden')} src={crest_bird_flying} alt="CODE9000 crest bird" />
          </div>
          <div className="NotFound__SubText">
            Woops!<br /><br />
            Looks like the bird has flown.
          </div>
        </div>
      </div>
    );
  }
};

export default NotFound;
