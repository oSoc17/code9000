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

  vote(value) {
      const observation = _.last(this.state.observations);

       this.setState({
       observations: [..._.dropRight(this.state.observations)],
       });

    console.log(observation.id)
    api.post('/votes', {
      body: {
        observation_id: observation.id,
        value,
      },
    });
  }

  checkDirectionUp(direction){
      if (direction.toString() == 'Symbol(UP)'){
        this.vote(0)
        }
  }

  render() {
    const observation = _.last(this.state.observations);
    console.log(this.state.observations)
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
                    throwout={(e)=>{this.checkDirectionUp(e.throwDirection)}}
                    throwoutleft={(e) => {this.vote(-1)}}
                    throwoutright={(e) => {this.vote(1)}}
                >
                    {this.state.observations.map( (observation) => {
                        return (
                            <div className="card" key={observation.id}>
                              <img src={`${process.env.REACT_APP_API_URL}/observations/${observation.id}/picture`} alt="Observation" />
                            </div>
                        )}
                    )}
                </Swing>
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
