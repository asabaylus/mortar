'use strict';

import React, { Component, PropTypes }  from 'react';
import Slick from 'react-slick';
// import * as Slider from "SimpleSlider";

class MTSlider extends Component {
  render() {
    const settings = {
      dots: true
    };
    return (
      <div>
        <h1>slider</h1>
        <ul>
          <li>transition speed: {this.props.transitionSpeed}</li>
          <li>transition type: {this.props.transitionType}</li>
          <li>initialSlide: {this.props.initialSlide}</li>
        </ul>
        <Slick {...settings}>
          {this.props.children}
        </Slick>
      </div>
    );
  }
}

MTSlider.defaultProps = {
  transitionSpeed: 100,
  transitionType: 'fade',
  initialSlide: 1
}

MTSlider.propTypes = {
  transitionSpeed: PropTypes.number,
  transitionType: PropTypes.oneOf(['fade']),
  initialSlide: PropTypes.number
}

export default MTSlider
