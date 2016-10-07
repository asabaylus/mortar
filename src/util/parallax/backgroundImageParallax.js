'use strict';

import React, { Component } from 'react';
import Image from '@natgeo/modules-images';
import {Pestle} from '@natgeo/pestle';
import $ from 'jquery';
import _debounce from 'lodash/debounce';

class BackgroundImageParallax extends Component {
  constructor(props) {
    super(props);
    this.randomId = `p${Math.random().toString(36).substr(2, 10)}`;
    this.resizeHandler = null;
    this._window = $(window);
    this.resetMeasurements = this.resetMeasurements.bind(this);
    this.scrollmagicController = null;
    this.state = {
      translationOffset: 0,
      frameAspect: this.calculatePadding(props.frameRatio)
    };
  }

  resetMeasurements() {
    const frameHeight = this.refs.frame.getBoundingClientRect().height;
    const contentHeight = this.refs.content.getBoundingClientRect().height;
    const contentWidth = this.refs.content.getBoundingClientRect().width;
    const viewportHeight = this._window.height();

    if(contentHeight < frameHeight || contentWidth < 768) {
      //cancel parallax, frame is larger than content or we're "mobile" width
      return;
    }
    //the amount of pixels scrolled during which the animation will occur
    let duration = frameHeight + viewportHeight;
    let distanceToTranslate;
    let translationOffset;
    let translationSpeed;

    //if content is larger than viewport, we cannot show all of the image
    if (contentHeight > viewportHeight) {
      //use hard coded speed value - will not show all of image
      translationSpeed = 0.4;
    } else {
      //calculate the speed of translation for the child content, in (pixels of offset) per (pixel scrolled), needed to show all of image
      translationSpeed = (contentHeight - frameHeight) / (viewportHeight - frameHeight);
      //how much offset, in px, does the child content need at first (when below the viewport) in order
      // for the bottom of the child to align with the frame's bottom when the frame's bottom enters the viewport
    }

    //now that all vars have been computed, round pixel-based ones to whole pixels
    distanceToTranslate = Math.round(duration * translationSpeed);
    duration = Math.round(duration);

    let contentOffsetFromFrame = (distanceToTranslate - contentHeight + frameHeight) / 2;
    translationOffset = viewportHeight - distanceToTranslate + Math.round(contentOffsetFromFrame);

    Pestle.PubSub.publish('ParallaxScenes.addParallaxScene', {
      triggerElement: this.refs.frame,
      duration: duration,
      parallaxElement: this.refs.content,
      transformDistance: distanceToTranslate,
      onEnterViewport: true,
      translationOffset: translationOffset
    });
  }

  componentDidMount() {
    if(this.props.enableParallax) {
      this.resetMeasurements();
      this.resizeHandler = _debounce(this.resetMeasurements, 250);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  componentWillUnmount() {
    if(this.props.enableParallax) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  //sets the aspect ratio of the parallax frame
  calculatePadding(ratio='16:9') {
    const ratioVals = ratio.split(':');
    const ratioWidth = parseFloat(ratioVals[0]);
    const ratioHeight = parseFloat(ratioVals[1]);
    return ((ratioHeight / ratioWidth) * 100) + '%';
  }

  render() {

    const frameStyle = {
      'paddingBottom': this.state.frameAspect,
      'height' : 0,
      'position' : 'relative',
      'overflow' : 'hidden',
      'zIndex' : 1
    }

    const frameContentStyle = {
      'pointerEvents': "none",
      'zIndex' : -1
    }

    return (
      <div style={frameStyle} id={this.randomId} ref="frame">
        <div style={frameContentStyle} ref="content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

BackgroundImageParallax.propTypes = {
  enableParallax: React.PropTypes.bool,
  frameRatio: React.PropTypes.string
};


BackgroundImageParallax.defaultProps = {
  enableParallax: true
}

export default BackgroundImageParallax;
