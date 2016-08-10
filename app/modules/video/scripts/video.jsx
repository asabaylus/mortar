'use strict';

import React, { Component }  from 'react';
import LazyLoad from 'react-lazy-load';
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
      type: 'fng',
      skinName: (this.props.model.overlayPlayButton) ? 'glass-ngs' : 'glass-ngs-no-overlay',
      layoutOptions: {
        tpShareFNG: (this.props.model.sharing !== undefined) ? this.props.model.sharing : true
      }
    });
  }

  createPlayer() {
    let options = this.shapeModel();
    ngsPlayer.init(options);
  }

  componentDidMount() {
    // If we are not using lazyLoad
    // initialize the pdk otherwise we will initialize pdk once a user
    // on the public website scrolls the video "near" the viewport
    if (this.props.lazyLoad === false) {
      this.createPlayer();
    }
  }

  handleOnLoad() {
    // if we are not using editmode
    if (this.props.isEditMode !== true) {
      this.createPlayer();
    }
  }

  render() {
    let {
      className: className,
      lazyLoad: lazyLoad,
      model: {
        instance: instance,
        guid: guid
      }
    } = this.props;

    if (lazyLoad === true) {
      return (
        <figure itemType="http://schema.org/VideoObject" className={`mt2_video mt2_videopromo-container mt2_intratio--broadcast mt2_bgcolor--neutral--xxl ${className}` }>
          <LazyLoad offsetVertical={200} onContentVisible={this.handleOnLoad.bind(this)}><span>&nbsp;</span></LazyLoad>
          <div className="mt2_video-wrapper">
            <div id={instance} className="mt2_video-player" data-guid={ guid }></div>
          </div>
        </figure>
      );
    } else {
      return (
        <figure itemType="http://schema.org/VideoObject" className={`mt2_video mt2_videopromo-container mt2_intratio--broadcast mt2_bgcolor--neutral--xxl ${className}` }>
          <div className="mt2_video-wrapper">
            <div id={instance} className="mt2_video-player" data-guid={ guid }></div>
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
