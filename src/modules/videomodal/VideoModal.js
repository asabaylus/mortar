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
      account: null,
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
    this.account = data.leadMedia[0].account;
    this.label = data.text.kicker && data.text.kicker.label ? data.text.kicker.label : null;
    this.duration = data.text.duration ? data.text.duration : null;
    this.title = data.text.title ? data.text.title : null;
    this.dek = data.text.dek ? data.text.dek : null;
    
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
      account: this.account,
      autoplay: true
    };
    let isOpen = this.state.open;

    return (
      <Modal onClose={this.closeNGSModal} renderNGSModal={isOpen}>
        {isOpen ?
          <div className="mt3_video-modal-container">
            <div className="mt3_row">
              { this.label ? <span className="mt3_video-modal-kicker" dangerouslySetInnerHTML={{__html: this.label}} /> : null }
              { this.duration ? <span className="mt3_video-modal-kicker" dangerouslySetInnerHTML={{__html: this.duration}} /> : null }
            </div>
            <div className="mt3_video-modal__head">
              <div className="mt3_video-modal__title mt3_heading--h1--1 mt3_color--white">
                <span dangerouslySetInnerHTML={{__html: this.title}} />
              </div>
            </div>
            <EmbeddedVideo key={i} model={videoModel} lazyLoad={true} />
            <figcaption className="mt3_video-modal__description mt3_caption-container--indent mt3_border--gray40">
              <div className="mt3_caption-body mt3_color--gray40" dangerouslySetInnerHTML={{__html: this.dek}}/>
            </figcaption>
          </div>
        : null}
      </Modal>
    );
  }
}

export default VideoModal;
