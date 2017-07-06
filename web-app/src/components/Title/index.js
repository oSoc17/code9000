/* global document */
import { Component } from 'react';

const DEFAULT_TITLE = 'Birds';

class Title extends Component {
  componentDidMount() {
    this.setTitle(this.props);
  }

  componentWillReceiveProps(props) {
    this.setTitle(props);
  }

  componentWillUnmount() {
    this.setTitle({
      name: undefined,
    });
  }

  setTitle({ name }) {
    const title = name ? `${DEFAULT_TITLE} - ${name}` : DEFAULT_TITLE;

    document.title = title;
  }

  render() {
    return null;
  }
}

export default Title;
