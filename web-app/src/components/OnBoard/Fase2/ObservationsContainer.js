import React, { Component } from 'react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import Observations from '../../Observations/Observations';
import { Redirect } from 'react-router-dom';

import picture1 from './pictures/fase2_picture1.jpg';
import picture2 from './pictures/fase2_picture2.jpg';

const OBSERVATIONS = [
  {
    id: 1,
    picture: picture1,
    demoText: 'This is a common tern! Drag this to my photobook!',
  },
  {
    id: 2,
    picture: picture2,
    demoText: 'This is NOT a common tern! Drag this to the trash!',
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
      return <Redirect push to="/you-made-it" />;
    }

    return (<Observations
      isDemo
      observations={observations}
      vote={value => this.vote(value)}
      generateImageUrl={generateImageUrl}
    />);
  }
}
export default ObservationsContainer;
