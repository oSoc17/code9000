import React, { Component } from 'react';
import _ from 'lodash';

import Title from '../Title';
import { Button } from '../Form';
import Icon from '../Icon';

import api from '../../utils/api';

import './Observations.css';

class Observations extends Component {

  vote(value) {
    const observation = _.head(this.props.observations);

    api.post('/votes', {
      body: {
        observation_id: observation.id,
        value,
      },
    });

    const newObservations = [..._.drop(this.props.observations)];

    this.props.loadObservations(newObservations);

    if (newObservations.length < 6) {
      this.fetch();
    }
  }

  fetch() {
    api.get('/auth/observations').then(({ data: paginationModel }) => {
      this.props.loadObservations(paginationModel.data);
    });
  }

  render() {
    const observation = _.head(this.props.observations);

    console.log(observation && observation.id);

    return (
      <div className="Observations">
        <Title name="Observations" />
        {observation && (
          <div>
            <div className="Observations__Picture">
              <img src={`${process.env.REACT_APP_API_URL}/observations/${observation.id}/picture`} alt="Observation" />
            </div>
            <div className="Observations__Buttons">
              <Button onClick={() => this.vote(1)} circle><Icon name="thumbs-up" /></Button>
              <Button onClick={() => this.vote(0)} >SKIP</Button>
              <Button onClick={() => this.vote(-1)} circle><Icon name="thumbs-down" /></Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Observations;
