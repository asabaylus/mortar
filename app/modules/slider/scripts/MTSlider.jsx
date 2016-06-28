'use strict';

import React, { Component, PropTypes }  from 'react';
import Slick from 'react-slick';
import {Pestle} from '../../../scripts/pestle/main.js';
import events from './events';

class PrevButton extends React.Component {
  render() {
    return <button {...this.props} className='mt_slider-button--prev'>
      <span className='mt_visuallyhidden'>Previous</span>
      <svg className='mt_icon'>
        <use xmlnsXlink='http://www.w3.org/1999/xlink' xlinkHref='#chevron-left'></use>
      </svg>
    </button>
  }
}

class NextButton extends React.Component {
  render() {
    return <button {...this.props} className='mt_slider-button--next'>
      <span className='mt_visuallyhidden'>Next</span>
      <svg className='mt_icon'>
        <use xmlnsXlink='http://www.w3.org/1999/xlink' xlinkHref='#chevron-right'></use>
      </svg>
    </button>
  }
}

class MTSlider extends Component {
  findSlideType(type, data) {
    switch(type) {
    case 'image':
      return <img src={data.src} />
    default:
      return;
    }
  }

  onChangeSlide(currentSlide) {
    const slideData = {
      currentSlideIndex: currentSlide
    };

    Pestle.PubSub.publish(events.slideChange, slideData);
  }

  render() {
    const settings = {
      afterChange: this.onChangeSlide,
      className: 'mt_slider-container mt_intratio--photo mt_bgcolor-neutral-xxd',
      nextArrow: <NextButton />,
      prevArrow: <PrevButton />,
      useCSS: this.props.useCSS
    };

    const slides = this.props.slides.map((slide, i) => {
      const {type, ...data} = slide;
      const slideMarkup = this.findSlideType(type, data);

      return <div key={i}>{slideMarkup}</div>;
    });

    return (
      <Slick {...settings}>
        {slides}
      </Slick>
    );
  }
}

MTSlider.defaultProps = {
  useCSS: true
}

MTSlider.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired
  }))
}

export default MTSlider
