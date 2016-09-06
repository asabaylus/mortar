'use strict';

import React, { Component } from 'react';
import Image from '@natgeo/modules-images';
import { TweenLite, CSSPlugin } from 'gsap';
import ScrollMagic from 'scrollmagic';
import $ from "jquery";
import _debounce from 'lodash/debounce';

//additional Scrollmagic plugins: GSAP API, debug indicators. Debug plugin commented out here - uncomment to debug
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
//import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';

class ParallaxContainer extends Component {
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

    //if there's already a ScrollMagic controller, destroy it
    if(this.scrollmagicController) {
      //pass an argument of true to "reset" the scene
      this.scrollmagicController = this.scrollmagicController.destroy(true);

      this.setState({
        translationOffset: 0,
        frameAspect: (contentWidth < 768) ? this.calculatePadding("3:2") : this.calculatePadding(this.props.frameRatio)
      });
    }
    if(contentHeight < frameHeight || contentWidth < 768) {
      //cancel parallax, frame is larger than content or we're "mobile" width
      return;
    }
    //the amount of pixels scrolled during which the animation will occur
    let duration = frameHeight + viewportHeight;
    let distanceToTranslate;
    let translationOffset = 0;
    //if content is larger than viewport
    if (contentHeight > viewportHeight) {
      //don't attempt to show whole image
      distanceToTranslate = contentHeight - frameHeight;
    } else {
      //calculate the speed of translation for the child content, in (pixels of offset) per (pixel scrolled)
      const translationSpeed = (contentHeight - frameHeight) / (viewportHeight - frameHeight);
      //how far, in px, does the child content need to translate in order to show the whole image
      distanceToTranslate = duration * translationSpeed;
      //how much offset, in px, does the child content need at first (when below the viewport) in order
      // for the bottom of the child to align with the frame's bottom when the frame's bottom enters the viewport
      translationOffset = (distanceToTranslate - contentHeight + frameHeight) / 2;
    }

    //now that all vars have been computed, round pixel-based ones to 2 decimals
    duration = Math.round(duration);
    distanceToTranslate = Math.round(distanceToTranslate);
    translationOffset = Math.round(translationOffset);

    this.setState({
      translationOffset: translationOffset
    });

    // init controller
    this.scrollmagicController = new ScrollMagic.Controller(
      {
        globalSceneOptions: {
          triggerHook: "onEnter",
          duration: `${duration}px`
        }
      }
    );

    // build scenes
    new ScrollMagic.Scene({triggerElement:`#${this.randomId}`})
      .setTween(`#${this.randomId} > div`, {y: `${distanceToTranslate}px`, ease: Linear.easeIn})
      /*
        for debugging, uncomment this next line, and make sure the "debug.addIndicators.js" plugin is imported
      */
      //.addIndicators()
      .addTo(this.scrollmagicController);
  }

  componentDidMount() {
    this.resetMeasurements();
    this.resizeHandler = _debounce(this.resetMeasurements, 250);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.resizeHandler);
  }

  //sets the aspect ratio of the parallax frame
  calculatePadding( ratio="16:9" ) {
    const ratioVals = ratio.split(':');
    const ratioWidth = parseFloat(ratioVals[0]);
    const ratioHeight = parseFloat(ratioVals[1]);
    return ((ratioHeight / ratioWidth) * 100) + "%";
  }

  render() {

    const frameStyle = {
      "paddingBottom": this.state.frameAspect,
      "height" : 0,
      "position" : "relative",
      "overflow" : "hidden"
    }

    const frameContentStyle = {
      'position' : 'absolute',
      'width' : '100%',
      'bottom' : `${this.state.translationOffset}px`
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

ParallaxContainer.propTypes = {
  frameRatio: React.PropTypes.string
};

export default ParallaxContainer;
