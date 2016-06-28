'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '../../../scripts/pestle/main.js';
import Slick from 'react-slick';
import events from './events';
import classNames from 'classnames';

class PrevButton extends React.Component {
  render() {
    let btnClasses = classNames({
      'mt_slider-button--prev': true,
      'mt_slider-button--inactive': !this.props.infinite && this.props.currentSlide === 0
    });

    return <button {...this.props} className={btnClasses}>
      <span className='mt_visuallyhidden'>Previous</span>
      <svg className='mt_icon'>
        <use xmlnsXlink='http://www.w3.org/1999/xlink' xlinkHref='#chevron-left'></use>
      </svg>
    </button>
  }
}

class NextButton extends React.Component {
  render() {
    let btnClasses = classNames({
      'mt_slider-button--next': true,
      'mt_slider-button--inactive': !this.props.infinite && this.props.currentSlide === this.props.slideCount - 1
    });

    return <button {...this.props} className={btnClasses}>
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

  onSlideChange(currentSlide) {
    const slideData = {
      currentSlideIndex: currentSlide
    };

    Pestle.PubSub.publish(events.slideChange, slideData);
  }

  constructor(props) {
    super(props);
    this.onSlideChange = this.onSlideChange.bind(this);

    this.state = {
      currentSlide: 0
    };
  }

  render() {
    const settings = {
      afterChange: this.onSlideChange,
      className: 'mt_slider-container mt_intratio--photo mt_bgcolor-neutral-xxd',
      nextArrow: <NextButton />,
      prevArrow: <PrevButton />,
      useCSS: this.props.animations
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
  animations: true,
  infinite: true
}

MTSlider.propTypes = {
  animations: PropTypes.bool,
  infinite: PropTypes.bool,
  slides: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired
  }))
}

export default MTSlider
