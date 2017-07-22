import React, { Component } from 'react';

import api from '../../utils/api';
import takeAtLeast from '../../utils/takeAtLeast';
import feather from '../../theme/icons/feather.svg';

import './Bootstrap.css';

class BootstrapContainer extends Component {
  componentWillMount() {
    const { loadObservations, loadUser, finishInitialLoading } = this.props;

    api
      .get('/auth/me')
      .then(({ data }) => loadUser(data))
      .then(() => {
        return Promise.all([
          takeAtLeast(800),
          api.get('/auth/observations').then(({ data: paginationModel }) => loadObservations(paginationModel.data)),
        ]);
      })
      .then(finishInitialLoading);
  }

  render() {
    return (
      <div className="Bootstrap">
        <img
          className="Bootstrap__Feather"
          src={feather}
          alt="Feather loading"
        />
      </div>
    );
  }
}

export default BootstrapContainer;
