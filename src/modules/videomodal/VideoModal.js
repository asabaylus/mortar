'use strict';

import React, {Component} from 'react';

import VideoContainer from './VideoContainer';
import Modal from '../modals/Modal';

class VideoModal extends Component {

  render() {
    return (
      <Modal>
        <VideoContainer {...this.props} />
      </Modal>
    );
  }
}

export default VideoModal;
