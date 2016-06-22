'use strict';

import React, { Component, PropTypes }  from 'react';
import Slick from 'react-slick';

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

  render() {
    const settings = {
      className: 'mt_slider-container mt_intratio--photo mt_bgcolor-neutral-xxd',
      nextArrow: <NextButton />,
      prevArrow: <PrevButton />
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
  transitionSpeed: 100,
  transitionType: 'fade',
  initialSlide: 1
}

MTSlider.propTypes = {
  transitionSpeed: PropTypes.number,
  transitionType: PropTypes.oneOf(['fade']),
  initialSlide: PropTypes.number,
  slides: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired
  }))
}

export default MTSlider
