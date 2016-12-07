'use strict';

import React from 'react';
import { Pestle } from '@natgeo/pestle';

import events from '../promocard/events';
import Modal from '../modals/Modal';
import Video from '../video/video';

let i = 0;

const initialState = {
  guid: null,
  account: null,
  title: '',
  label: '',
  duration: '',
  dek: '',
  open: false
};

export default class VideoModal extends React.Component {
  constructor() {
    super();
    this.state = initialState;
    this.showVideoModal = ::this.showVideoModal;
    this.closeNGSModal = ::this.closeNGSModal;
  }

  showVideoModal(msg, data) {
    console.log('showvideomodal', data.leadMedia[0]);
    this.setState({
      guid: data.leadMedia[0].guid,
      account: data.leadMedia[0].account,
      label: data.text.kicker && data.text.kicker.label ? data.text.kicker.label : null,
      duration: data.text.duration ? data.text.duration : null,
      title: data.text.title ? data.text.title : null,
      dek: data.text.dek ? data.text.dek : null,
      open: true
    });
    VideoModal.toggleBodyOverflow(true);
  }

  closeNGSModal() {
    if (ngsPlayer && ngsPlayer.api && typeof $pdk != 'undefined') {
      ngsPlayer.api.unload('platformModalVideoPlayer'+i);
    }
    VideoModal.toggleBodyOverflow(false);
    this.setState(initialState);
  }

  componentDidMount() {
    // set listener for Pestle event to launch videos to display
    Pestle.PubSub.subscribe(events.launchVideoModal, this.showVideoModal);
  }

  componentWillUnmount() {
    Pestle.PubSub.unsubscribe(events.launchVideoModal);
  }

  static toggleBodyOverflow(force) {
    document.body.classList.toggle('mt3_modal__overflow--hidden', force);
  }

  render() {
    i++;

    // this model is what will be passed to instantiate the video player.
    const videoModel = {
      instance: 'platformModalVideoPlayer'+i,
      guid: this.state.guid,
      account: this.state.account,
      autoplay: true
    };

    return (
      <Modal onClose={this.closeNGSModal} renderNGSModal={this.state.open}>
        {this.state.open &&
          <div className="mt3_video-modal-container">
            <div className="mt3_row">
              { this.label &&
                <span
                  className="mt3_video-modal-kicker"
                  dangerouslySetInnerHTML={{__html: this.label}} /> }

              { this.duration &&
                <span
                  className="mt3_video-modal-kicker"
                  dangerouslySetInnerHTML={{__html: this.duration}} /> }
            </div>

            <div className="mt3_video-modal__head">
              <div className="mt3_video-modal__title mt3_heading--h1--1 mt3_color--white">
                <span dangerouslySetInnerHTML={{__html: this.title}} />
              </div>
            </div>

            <Video key={i} model={videoModel} lazyLoad={true} />

            <figcaption className="mt3_video-modal__description mt3_caption-container--indent mt3_border--gray40">
              <div
                className="mt3_caption-body mt3_color--gray40"
                dangerouslySetInnerHTML={{__html: this.dek}} />
            </figcaption>
          </div>
        }
      </Modal>
    );
  }
}
