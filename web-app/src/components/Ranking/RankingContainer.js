import React, { Component } from 'react';

import Ranking from './Ranking';
import api from '../../utils/api';

class RankingContainer extends Component {
  componentWillMount() {
    api.get('/leaderboard').then(({ data }) => this.props.loadRanking(data));
  }

  render() {
    return (
      <Ranking ranking={this.props.ranking} user={this.props.user} />
    );
  }
}

export default RankingContainer;
