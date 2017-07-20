import React, { Component } from 'react';

import api from '../../utils/api';

class BootstrapContainer extends Component {
  componentWillMount() {
    const { loadObservations, loadUser, finishInitialLoading } = this.props;

    api
      .get('/auth/me')
      .then(({ data }) => loadUser(data))
      .then(() => {
        return Promise.all([
          api.get('/auth/observations').then(({ data: paginationModel }) => loadObservations(paginationModel.data)),
        ]);
      })
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
