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

    this.flickity.on('cellSelect', () => this.updateSelected());

    this.scrollListener = (event, progress) => {
      const percent = progress / (this.carousel.clientWidth * this.props.children.length);

      this.progressChanged(parseFloat(percent.toFixed(4)));
    };

    this.flickity.on('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    this.flickity.off('cellSelect', () => this.updateSelected());
    this.flickity.off('scroll', this.scrollListener);
    this.flickity.destroy();
  }

  updateSelected() {
    const index = this.flickity.selectedIndex;
    this.setState({ selectedIndex: index });

    this.props.currentIndex(index);
  }

  progressChanged(procent) {
    const amountChildren = this.props.children.length;
    const currentIndexProcent = (this.state.selectedIndex * (100 / amountChildren)) / 100;

    this.props.process({
      total: procent,
      previous: parseFloat(((procent - currentIndexProcent) * amountChildren).toFixed(4)),
    });
  }

  render() {
    const { children, className, getRef } = this.props;

    return (
      <div
        ref={(carousel) => { this.carousel = carousel; getRef(carousel); }}
        className={className}
      >
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
    dragThreshold: 10,
  },
  process: () => {},
  currentIndex: () => {},
};

export const Slide = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

export default Slider;
