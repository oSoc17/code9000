import React, { Component } from 'react';

import api from '../../utils/api';

class BootstrapContainer extends Component {
  componentWillMount() {
    const { loadObservations, finishInitialLoading } = this.props;

    Promise.all([
      api.get('/observations').then(({ data }) => loadObservations(data)),
    ])
      .then(finishInitialLoading);
  }

  render() {
    return (
      <div>
        Loading ...
      </div>
    );
  }
}

export default BootstrapContainer;
