'use strict';

import React, { Component, PropTypes } from 'react';
import _debounce from 'lodash/debounce';
import $ from 'jquery';

import FourUpComponent from './components/FourUp.js';
import FiveUpComponent from './components/FiveUp.js';
import PortalWrapper from '../../util/PortalWrapper';
import railsParallax from '../../util/parallax/railsParallax';

const mobileBreakpoint = 768;

class LeftAndRightContentPackage extends Component {
  constructor(props) {
    super(props);
    this.resizeHandler = null;
    this._window = $(window);
    this.resetParallax = this.resetParallax.bind(this);
  }

  resetParallax() {
    const viewportHeight = this._window.height();
    const contentWidth = this.props.parentEl.getBoundingClientRect().width;

    //if the component width is < mobileBreakpoint, cancel parallax effects
    if(contentWidth < mobileBreakpoint) {
      return;
    }

    //build rails scene
    if(this.props.parallaxRails) {
      railsParallax({
        leftRail: this.props.parentEl.getElementsByClassName("left-rail")[0],
        rightRail: this.props.parentEl.getElementsByClassName("right-rail")[0],
        viewportHeight: viewportHeight
      });
    }
  }

  componentDidMount() {
    if(this.props.parallaxRails) {
      this.resetParallax();
      this.resizeHandler = _debounce(this.resetParallax, 250);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  componentWillUnmount() {
    if(this.props.parallaxRails) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  render() {
    const portalContent = [
      <PortalWrapper targetDiv={document.getElementById(this.props.fourUpModel.itemId)} key={"fourUpWrapper"}>
        <FourUpComponent
          theme={this.props.theme}
          initialWidth={this.props.fourUpWidth}
          model={this.props.fourUpModel}
        />
      </PortalWrapper>,
      <PortalWrapper targetDiv={document.getElementById(this.props.fiveUpModel.itemId)} key={"fiveUpWrapper"}>
        <FiveUpComponent
          theme={this.props.theme}
          initialWidth={this.props.fiveUpWidth}
          model={this.props.fiveUpModel}
        />
      </PortalWrapper>
    ];

    return (
      <div className="mt3_left-and-right-package__app">
        {portalContent}
      </div>
    )
  }
}

LeftAndRightContentPackage.propTypes = {
  parallaxRails: PropTypes.bool
};

LeftAndRightContentPackage.defaultProps = {
  parallaxRails: true
};

export default LeftAndRightContentPackage;
