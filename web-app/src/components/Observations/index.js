import React, { Component } from 'react';
import _ from 'lodash';
import Swing from 'react-swing';


import Title from '../Title';
import { Button } from '../Form';
import Icon from '../Icon';

import api from '../../utils/api';
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

  vote(id, value) {
    /*
     this.setState({
     observations: [..._.dropRight(this.state.observations)],
     });
    */


    api.post('/votes', {
      body: {
        observation_id: id,
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
              <div id="viewport">
                <Swing
                    className="stack"
                    tagName="div"
                    setStack={(stack)=> this.setState({stack:stack})}
                    ref="stack"
                    throwout={(e)=>{e.target.style.visibility='hidden'}}
                    throwoutleft={(e) => {this.vote(e.target.id, -1)}}
                    throwoutup={(e) => {this.vote(e.target.id, 0)}}
                    throwoutright={(e) => {this.vote(e.target.id, 1)}}
                >
                    {this.state.observations.map( (observation) => {
                        return (
                            <div className="card" key={observation.id} id={observation.id}>
                              <img src={`${process.env.REACT_APP_API_URL}/observations/${observation.id}/picture`} alt="Observation" />
                            </div>
                        )}
                    )}
                </Swing>
              </div>
            </div>
        )}
      </div>
    );
  }
}
export default Observations;
