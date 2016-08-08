'use strict';

import React, { Component, PropTypes }  from 'react';
import LazyLoad from 'react-lazy-load';
import classNames from 'classnames';
import _defaultsDeep from 'lodash/defaultsDeep';

// add the NatGeo modules-video to the global window
window.ngsPlayer = require('modules-video');

class Video extends Component {

  /**
  * returns the options objects overriding any existing defaults
  */
  shapeModel() {
    return _defaultsDeep(this.props.model, {
      autoload: true,
      type: 'inline',
      skinName: (this.props.model.overlayPlayButton) ? 'glass-ngs' : 'glass-ngs-no-overlay',
      layoutOptions: {
        tpShare: (this.props.model.sharing !== undefined) ? this.props.model.sharing : true
      }
    });
  }

  createPlayer() {
    let options = this.shapeModel();
    return ngsPlayer.init(options);
  }

  componentDidMount() {
    // If we are not using lazyLoad
    // initialize the pdk otherwise we will initialize pdk once a user
    // on the public website scrolls the video "near" the viewport
    if (this.props.lazyLoad === false) {
      this.createPlayer();
      //return NGS.platform.sandbox.log.info('EmbeddedVideo component initialized \"onLoad\"');
    }
  }

  handleOnLoad() {
    // if we are not using editmode
    if (this.props.isEditMode !== true) {
      this.createPlayer();
      //NGS.platform.sandbox.log.info('EmbeddedVideo component LazyLoaded');
    }
  }

  render() {
    console.log('does this fire?')
    // LazyLoad will defer PDK initialization until component is within 200px of the visible viewport
    if (this.props.lazyLoad === true) {
      return (
        <figure itemType="http://schema.org/VideoObject" className={'embedded-video ' + this.props.className }>
          <LazyLoad offsetVertical={200} onContentVisible={this.handleOnLoad.bind(this)}><span>&nbsp;</span></LazyLoad>
          <div className="embedded-video__player-wrapper">
            <div id={this.props.model.instance} className="embedded-video__player" data-guid={ this.props.model.guid }></div>
          </div>
        </figure>
      );
    } else {
      return (
        <figure itemType="http://schema.org/VideoObject" className={'embedded-video ' + this.props.className }>
          <div className="embedded-video__player-wrapper">
            <div id={this.props.model.instance} className="embedded-video__player" data-guid={ this.props.model.guid }></div>
          }
          </div>
        </figure>
      );
    }
  }
}

Video.propTypes = {
  model: React.PropTypes.shape({
    instance: React.PropTypes.string.isRequired,
    guid: React.PropTypes.string.isRequired,
    sharing: React.PropTypes.bool,
    type: React.PropTypes.string,
    overlayPlayButton: React.PropTypes.bool
  }).isRequired,
  className: React.PropTypes.string,
  lazyLoad: React.PropTypes.bool,
  isEditMode: React.PropTypes.bool
}

Video.defaultProps = {
  className: '',
  lazyLoad: true,
  isEditMode: false
}

export default Video;
