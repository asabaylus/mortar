'use strict';

import React, { Component }  from 'react';
// import * as Slider from "SimpleSlider";

export default class MTSlider extends Component {
  render() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div>
        <h1>slider</h1>
        <ul>
          <li>transition speed: {this.props.transitionSpeed}</li>
          <li>transition type: {this.props.transitionType}</li>
          <li>initialSlide: {this.props.initialSlide}</li>
        </ul>
      </div>
    );
  }
}
