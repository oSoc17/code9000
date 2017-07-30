import React, { Component } from 'react';
import ReactModal from 'react-modal';
import classNames from '../../utils/classNames';

import zoomIcon from '../../theme/icons/zoom.svg';

import './Polaroid.css';

class Polaroid extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      showModal: false,
    };
  }

  showModal(status) {
    this.setState({ showModal: status });
  }

  render() {
    const { img, toggle, zoomable } = this.props;
    const { showModal } = this.state;

    return (
      <div className={classNames('Polaroid', toggle && 'Polaroid__Animation__Resize', toggle && 'Polaroid__Animation')} >
        <img src={img} alt="" className="Polaroid__Image" />
        {zoomable && (
          <div>
            <img onClick={() => this.showModal(true)} src={zoomIcon} alt="Zoom icon" className="Polaroid__ZoomIcon" />

            <ReactModal
              isOpen={showModal}
              contentLabel="Big modal showing the polaroid in big size."
            >
              <img src={img} alt="" onClick={() => this.showModal(false)} />
            </ReactModal>
          </div>
        )}

        <div className="Polaroid__Bottom" />
      </div>
    );
  }
}

Polaroid.defaultProps = {
  zoomable: true,
};

export default Polaroid;
