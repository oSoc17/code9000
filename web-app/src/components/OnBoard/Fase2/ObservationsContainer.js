import React, { Component } from 'react';
import _ from 'lodash';
import Observations from '../../Observations/Observations';
import redirect from '../../../utils/redirect';

import picture1 from './pictures/fase2_picture1.png';
import picture2 from './pictures/fase2_picture2.png';

const OBSERVATIONS = [
  {
    id: 1,
    picture: picture1,
  },
  {
    id: 2,
    picture: picture2,
  },
];

const generateImageUrl = (observationId) => {
  return OBSERVATIONS.find((observation) => observation.id === observationId).picture;
};

class ObservationsContainer extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      observations: OBSERVATIONS,
    };
  }

  vote() {
    this.setState((prevState) => ({ observations: [..._.drop(prevState.observations)] }));
  }

  render() {
    const { observations } = this.state;

    if (observations.length === 0) {
      redirect('/you-made-it');
    }

    return (<Observations
      observations={observations}
      vote={value => this.vote(value)}
      generateImageUrl={generateImageUrl}
    />);
  }
}
export default ObservationsContainer;
