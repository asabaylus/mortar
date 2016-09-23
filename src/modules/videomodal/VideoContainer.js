'use strict';

import React, {Component} from 'react';
import EmbeddedVideo from '../video/video';

const VideoContainer = (props) => {
  const {
    id,
    dataModel: {
      leadMedia: [{
        guid
      }],
      text: {
        kicker: {
          label
        },
        title,
        dek
      },
      duration
    }
  } = props;
  const videoModel = {
    instance: `platformModalVideoPlayer_${id}`,
    guid,
    sharing: true,
    overlayPlayButton: true,
    autoPlay: false
  };
  return (
    <div className="mt3_video-modal-container">
      <div className="mt3_kicker-wrapper">
        {label && <span className="mt3_kicker">{label}</span>}
        {duration && <span className="mt3_kicker">{duration}</span>}
      </div>
      <div className="mt3_video-modal__head">
        <div className="mt3_video-modal__title mt3_heading--h1--1 mt3_color--white">
          <span dangerouslySetInnerHTML={{__html: title}} />
        </div>
      </div>
      <EmbeddedVideo model={videoModel} lazyLoad={true} />
      <figcaption className="mt3_video-modal__description mt3_caption-container--indent mt3_border--gray40">
        <div className="mt3_caption-body mt3_color--gray40">
          <span dangerouslySetInnerHTML={{__html: dek}} />
        </div>
      </figcaption>
    </div>
  );
}

VideoContainer.propTypes = {
  id: React.PropTypes.string.isRequired,
  dataModel: React.PropTypes.shape({
    leadMedia: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        guid: React.PropTypes.string,
        directLink: React.PropTypes.string
      })
    ),
    text: React.PropTypes.shape({
      title: React.PropTypes.string,
      dek: React.PropTypes.string,
      kicker: React.PropTypes.shape({
        label: React.PropTypes.string
      })
    }),
    duration: React.PropTypes.string,
  })
}

export default VideoContainer;
