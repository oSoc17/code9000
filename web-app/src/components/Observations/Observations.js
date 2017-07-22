import React, { Component } from 'react';
import _ from 'lodash';

import Title from '../Title';
import { Button } from '../Form';

import api from '../../utils/api';

import polaroid from '../../theme/icons/polaroid.svg';
import trash from '../../theme/icons/trash.svg';
import book from '../../theme/icons/book.svg';

import './Observations.css';
import classNames from '../../utils/classNames';

class Observations extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      toggle: true,
    };
  }

  vote(value) {
    this.togglePolaroidAnimation();

    const observation = _.head(this.props.observations);
    const newObservations = [..._.drop(this.props.observations)];

    api
      .post('/votes', {
        body: {
          observation_id: observation.id,
          value,
        },
      })
      .then(() => {
        this.props.loadObservations(newObservations);
        this.togglePolaroidAnimation();

        if (newObservations.length < 6) {
          this.fetch();
        }
      });
  }

  togglePolaroidAnimation() {
    this.setState(({ toggle }) => ({ toggle: !toggle }));
  }

  fetch() {
    api.get('/auth/observations').then(({ data: paginationModel }) => {
      this.props.loadObservations(paginationModel.data);
    });
  }

  render() {
    const observation = _.head(this.props.observations);

    return (
      <div className="Observations">
        <Title name="Vote" />
        <div className="container">
          <div className="row">
            <div className="col col-lg-12">
              <img
                className="Observations__PolaroidIcon"
                src={polaroid}
                alt="Polaroid camera"
              />
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
                <img
                  src={trash}
                  alt="Swipe observation to trash"
                  onClick={() => this.vote(1)}
                />
                <img
                  src={book}
                  alt="Swipe book to trash"
                  onClick={() => this.vote(-1)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Observations;
