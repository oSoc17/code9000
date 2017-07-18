import React, { Component } from 'react';
import Flickity from 'flickity';

import 'flickity/dist/flickity.min.css';
import './Slider.css';

class Slider extends Component {

  constructor(...props) {
    super(...props);

    this.state = {
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    this.flickity = new Flickity(this.carousel, this.props.options);

    console.log(this.flickity.selectedIndex);
    this.flickity.on('cellSelect', () => this.updateSelected());
  }

  componentWillUnmount() {
    this.flickity.off('cellSelect', () => this.updateSelected());
    this.flickity.destroy();
  }

  updateSelected() {
    const index = this.flickity.selectedIndex;
    this.setState({ selectedIndex: index });
  }

  render() {
    const { children, className } = this.props;

    return (
      <div ref={(carousel) => this.carousel = carousel} className={className}>
        {children}
      </div>
    );
  }
}

Slider.defaultProps = {
  options: {
    lazyLoad: false,
    prevNextButtons: false,
    pageDots: true,
  },
};

export default Slider;
