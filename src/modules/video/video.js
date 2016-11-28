'use strict';

import React, { Component }  from 'react';
import LazyLoad from 'react-lazy-load';
import _defaultsDeep from 'lodash/defaultsDeep';
import _isEqual from 'lodash/isEqual';

// add the NatGeo modules-video to the global window
window.ngsPlayer = require('@natgeo/modules-video');


class Video extends Component {

  constructor(props) {
    super(props);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.videoContainer = `<div id="${props.model.instance}" class="mt3_video-player" data-guid="${props.model.guid}"></div>`;
  }

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
    window.ngsPlayer.init(options);
  }

  componentDidMount() {
    // If we are not using lazyLoad
    // initialize the pdk otherwise we will initialize pdk once a user
    // on the public website scrolls the video "near" the viewport
    if (this.props.lazyLoad === false) {
      this.createPlayer();
    }
  }

  componentWillUnmount() {
    this.willUnmount = true;
  }

  handleOnLoad() {
    // if we are not using editmode
    if ((this.props.isEditMode !== true) && (!this.willUnmount)) {
      this.createPlayer();
    }
  }

  shouldComponentUpdate(nextProps) {
    // Prevent unnecessary re-render
    // because this component is stateless and only changes from props alterations
    // therefore it prevents from re-loading the video content.
    // a serious big performance impact.
    return !_isEqual(this.props, nextProps);
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

    return (
      <figure itemType="http://schema.org/VideoObject" className={`mt3_video mt3_videopromo-container mt3_bgcolor--black ${className}` }>
        <div className="mt3_video-wrapper" dangerouslySetInnerHTML={{__html: this.videoContainer}}>
        </div>
        { lazyLoad &&
          /** Don't use LazyLoad's onContentVisible callback.
           * Lazyload triggers twice the callback if the element
           * was on the viewport at first mount.
           **/
          <LazyLoad offsetVertical={200}>
            <span ref={() => { this.handleOnLoad() }}/>
          </LazyLoad>
        }
      </figure>
    );
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
