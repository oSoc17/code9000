import React, { Component } from 'react';

class voteButton extends Component {
  vote() {
    fetch(this.props.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        confirmation: {
          id: this.props.id,
          value: this.props.value,
        },
      }),
    });
  }

  render() {
    return (
      <div>
        <button />
        <p>Test</p>
        test
      </div>
    );
  }
}

export default voteButton;
