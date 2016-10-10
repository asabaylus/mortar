'use strict';

import React, {Component, PropTypes} from 'react';
import {Pestle} from '@natgeo/pestle';
import events from '../promocard/events';
import Modal from '../modals/Modal';
import EmbeddedVideo from '../video/video';
let i = 0;

class VideoModal extends Component {

  constructor() {
    super();
    this.state = {
      guid: null,
      title: '',
      label: '',
      duration: '',
      dek: '',
      open: false
    };
    this.showVideoModal = this.showVideoModal.bind(this);
    this.closeNGSModal = this.closeNGSModal.bind(this);
  }

  showVideoModal (msg, data) {
    this.guid = data.leadMedia[0].guid;
    this.label = data.text.kicker.label;
    this.duration = data.text.duration;
    this.title = data.text.title;
    this.dek = data.text.dek;

    this.setState({
      open: true
    });
  }

  closeNGSModal () {
    if(ngsPlayer && ngsPlayer.api && typeof $pdk != 'undefined') {
      ngsPlayer.api.unload('platformModalVideoPlayer'+i);
    }
    this.setState({
      open: false
    });
  }

  componentDidMount(){
    //set listener for Pestle event to launch videos to display
    Pestle.PubSub.subscribe(events.launchVideoModal, this.showVideoModal);
  }

  componentWillUnmount(){
    Pestle.PubSub.unsubscribe(events.launchVideoModal);
  }

  render() {
    //increment key
    i++;

    //this model is what will be passed to instantiate the video player.
    const videoModel = {
      instance: 'platformModalVideoPlayer'+i,
      guid: this.guid,
      autoplay: true
    };
    let isOpen = this.state.open;

    return (
      <Modal onClose={this.closeNGSModal} renderNGSModal={isOpen}>
        {isOpen ?
          <div className="mt3_video-modal-container">
            <div className="mt3_kicker-wrapper">
              {this.label && <span className="mt3_kicker">{this.label}</span>}
              {this.duration && <span className="mt3_kicker">{this.duration}</span>}
            </div>
            <div className="mt3_video-modal__head">
              <div className="mt3_video-modal__title mt3_heading--h1--1 mt3_color--white">
                <span dangerouslySetInnerHTML={{__html: this.title}} />
              </div>
            </div>
            <EmbeddedVideo key={i} model={videoModel} lazyLoad={true} />
            <figcaption className="mt3_video-modal__description mt3_caption-container--indent mt3_border--gray40">
              <div className="mt3_caption-body mt3_color--gray40">
                <span dangerouslySetInnerHTML={{__html: this.dek}} />
              </div>
            </figcaption>
          </div>
        : null}
      </Modal>
    );
  }
}

export default VideoModal;
