import React, { Component } from 'react';
import _ from 'lodash';

import Observations from './Observations';
import api from '../../utils/api';

class ObservationsContainer extends Component {
  componentWillMount() {
    this.fetch();
  }

  vote(value) {
    const observation = _.head(this.props.observations);
    const newObservations = [..._.drop(this.props.observations)];

    const body = {
      observation_id: observation.id,
      value,
    };

    api.post('/votes', { body }).then(() => {
      this.props.loadObservations(newObservations);

      if (newObservations.length < 6) {
        this.fetch();
      }
    });
  }

  fetch() {
    api.get('/auth/observations').then(({ data: paginationModel }) => this.props.loadObservations(paginationModel.data));
  }

  render() {
    return <Observations observations={this.props.observations} vote={value => this.vote(value)} />;
  }
}
export default ObservationsContainer;
