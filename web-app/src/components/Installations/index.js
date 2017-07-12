import React, { Component } from 'react';

import api from '../../utils/api';

class Installations extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      installations: undefined,
    };
  }

  componentDidMount() {
    api.get('/installations')
      .then(({ data }) => {
        this.setState({
          installations: data,
        });
      });
  }

  activate(id, value) {
    const installations = this.state.installations;

    const body = {
      active: value,
    };

    api
      .put(`/installations/${id}`, { body })
      .then(() => {
        const index = installations.findIndex((installation) => installation.id === id);
        installations[index].active = value;

        this.setState({
          installations,
        });
      });
  }

  render() {
    const { installations } = this.state;

    if (!installations) {
      return <div>loading...</div>;
    }

    return (
      <table style={{ width: '100%', marginLeft: '100px' }}>
        <tbody>
          <tr>
            <th>Device token</th><th>Actions</th>
          </tr>
          {installations.map((installation) => (
            <tr key={installation.id}>
              <td>{installation.token}</td>
              <td>{installation.active
                  ? <div onClick={() => this.activate(installation.id, 0)}>Deactive</div>
                  : <div onClick={() => this.activate(installation.id, 1)}>Activate</div>
              }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Installations;
