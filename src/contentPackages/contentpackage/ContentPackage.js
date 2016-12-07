'use strict';

import React from 'react';
import _debounce from 'lodash/debounce';

import FourUpComponent from './components/FourUp.js';
import FiveUpComponent from './components/FiveUp.js';
import PortalWrapper from '../../util/PortalWrapper';
import railsParallax from '../../util/parallax/railsParallax';


const mobileBreakpoint = 768;

export default class LeftAndRightContentPackage extends React.Component {
  constructor() {
    super();
    this.resizeHandler = null;
    this.resetParallax = ::this.resetParallax;
  }

  resetParallax() {
    const viewportHeight = window.innerHeight,
      { parentEl, parallaxRails } = this.props,
      contentWidth = parentEl.getBoundingClientRect().width;

    // if the component width is < mobileBreakpoint, cancel parallax effects
    if (contentWidth < mobileBreakpoint) {
      return;
    }

    // build rails scene
    if (parallaxRails) {
      railsParallax({
        leftRail: parentEl.getElementsByClassName("left-rail")[0],
        rightRail: parentEl.getElementsByClassName("right-rail")[0],
        viewportHeight: viewportHeight,
        resetFunction: this.resetParallax
      });
    }
  }

  componentDidMount() {
    if (this.props.parallaxRails) {
      this.resetParallax();
      this.resizeHandler = _debounce(this.resetParallax, 250);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  componentWillUnmount() {
    if (this.props.parallaxRails) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  render() {
    const {
      fiveUpModel,
      fiveUpWidth,
      fourUpModel,
      fourUpWidth,
      theme,
    } = this.props;

    return (
      <div className="mt3_left-and-right-package__portal-wrap">
        <PortalWrapper targetDiv={document.getElementById(fourUpModel.itemId)} key={"fourUpWrapper"}>
          <FourUpComponent
            theme={theme}
            initialWidth={fourUpWidth}
            model={fourUpModel}
          />
        </PortalWrapper>

        <PortalWrapper targetDiv={document.getElementById(fiveUpModel.itemId)} key={"fiveUpWrapper"}>
          <FiveUpComponent
            theme={theme}
            initialWidth={fiveUpWidth}
            model={fiveUpModel}
          />
        </PortalWrapper>
      </div>
    )
  }
}

LeftAndRightContentPackage.propTypes = {
  parallaxRails: React.PropTypes.bool
};

LeftAndRightContentPackage.defaultProps = {
  parallaxRails: true
};
