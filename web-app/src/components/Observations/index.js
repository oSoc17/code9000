import React, { Component } from 'react';
import _ from 'lodash';

import Title from '../Title';
import { Button } from '../Form';
import Icon from '../Icon';

import api from '../../utils/api';
import Swing from '../../utils/Swing'
import './Observations.css';

class Observations extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      observations: [],
        stack: null,
    };
  }

    // throwOut Method
    throwCard(card) {

        // throwOut method call
        card.throwOut(100, 200);
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
          <div id="viewport">
            <Swing
                className="stack"
                tagName="div"
                setStack={(stack)=> this.setState({stack:stack})}
                ref="stack"
                throwoutleft={(e)=> this.vote(-1)}
                throwoutup={(e) => this.vote(0)}
                throwoutright={(e) => this.vote(1)}
            >
              <div className="card clubs" ref="card1" >
                <img src={`${process.env.REACT_APP_API_URL}/observations/${observation.id}/picture`} alt="Observation" />
              </div>
            </Swing>
          </div>
        )}
      </div>
    );
  }
}
export default Observations;
