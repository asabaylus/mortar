'use strict';

import React, { Component, PropTypes }  from 'react';
import Slick from 'react-slick';

import SlideImage from './slides/Image.jsx';

class MTSlider extends Component {
  getComponent(type, data) {
    switch(type) {
      case 'image':
        return <SlideImage src={data.url} />
      default:
        return;
    }
  }
  render() {
    const settings = {
      dots: true
    };

    const slides = this.props.slides.map((slide, i) => {
      const {type, ...data} = slide;
      const component = this.getComponent(type, data);
      return <div key={i}>{component}</div>;
    });

    return (
      <div>
        <h1>slider</h1>
        <ul>
          <li>transition speed: {this.props.transitionSpeed}</li>
          <li>transition type: {this.props.transitionType}</li>
          <li>initialSlide: {this.props.initialSlide}</li>
        </ul>
        <Slick {...settings}>
          {slides}
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
