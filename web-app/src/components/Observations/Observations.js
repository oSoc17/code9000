import React, { Component } from 'react';
import _ from 'lodash';

import Title from '../Title';
import { Button } from '../Form';

import api from '../../utils/api';

import polaroid from '../../theme/icons/polaroid.svg';
import trash from '../../theme/icons/trash.svg';
import book from '../../theme/icons/book.svg';

import './Observations.css';

class Observations extends Component {

  vote(value) {
    const observation = _.head(this.props.observations);
    const newObservations = [..._.drop(this.props.observations)];
    api.post('/votes', {
      body: {
        observation_id: observation.id,
        value,
      },
    }).then(() => {
      this.props.loadObservations(newObservations);

      if (newObservations.length < 6) {
        this.fetch();
      }
    });
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
        <Title name="Observations" />
        {observation && (
          <div>
            <div className="Observations__Polaroid">
              <img src={polaroid} alt="Polaroid" />
            </div>
            <div className="Polaroid">
              <img
                className="Polaroid__Inner"
                src={`${process.env.REACT_APP_API_URL}/observations/${observation.id}/picture`}
                alt="Observation"
              />
              <div className="Polaroid__Footer" />
            </div>

            <div className="Observations__Buttons">
              <Button onClick={() => this.vote(1)} className="Form__Button--clean">
                <img className="Observations__Button" src={book} alt="Add to collection" />
              </Button>
              <Button onClick={() => this.vote(1)} className="Form__Button--clean">
                <img className="Observations__Button" src={trash} alt="Add to trash" />
              </Button>
            </div>
          </div>
        )}

        {observation === undefined && (
          <p>No observations left</p>
        )}
      </div>
    );
  }
}
export default Observations;
