import React, { Component } from 'react';
import _ from 'lodash';

import Title from '../Title';
import { Button } from '../Form';

import api from '../../utils/api';

import './Observations.css';

class Observations extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      observations: [],
    };
  }

  componentDidMount() {
    api.get('/observations')
      .then(({ data }) => this.setState({ observations: data }));
  }

  vote(value) {
    const observation = _.last(this.state.observations);

    this.setState({
      observations: [..._.dropRight(this.state.observations)],
    });

    api.post('/votes', {
      body: {
        observation_id: observation.id,
        value,
      },
    });
  }

  render() {
    const observation = _.last(this.state.observations);

    return (
      <div className="Observations">
        <Title name="Observations" />
        {observation && (
          <div>
            <div className="Observations__Picture">
              <img src={`${process.env.REACT_APP_API_URL}/observations/${observation.id}/picture`} alt="Observation" />
            </div>
            <Button onClick={() => this.vote(1)}>UP</Button>
            <Button onClick={() => this.vote(0)}>SKIP</Button>
            <Button onClick={() => this.vote(-1)}>DOWN</Button>
          </div>
        )}
      </div>
    );
  }
}
export default Observations;
