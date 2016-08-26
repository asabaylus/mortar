'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import Slick from 'react-slick';
import events from './events';
import ImageSlide from './imageSlide.jsx';
import classNames from 'classnames';

class PrevButton extends React.Component {
  render() {
    let btnClasses = classNames({
      'mt3_slider-button--prev': true,
      'mt3_slider-button--inactive': !this.props.infinite && this.props.currentSlide === 0
    });

    return <button onClick={this.props.onClick} className={btnClasses}>
      <span className='mt3_visuallyhidden'>Previous</span>
      <svg className='mt3_icon'>
        <use xlinkHref='#chevron-left'></use>
      </svg>
    </button>
  }
}

class NextButton extends React.Component {
  render() {
    let btnClasses = classNames({
      'mt3_slider-button--next': true,
      'mt3_slider-button--inactive': !this.props.infinite && this.props.currentSlide === this.props.slideCount - 1
    });

    return <button onClick={this.props.onClick} className={btnClasses}>
      <span className='mt3_visuallyhidden'>Next</span>
      <svg className='mt3_icon'>
        <use xlinkHref='#chevron-right'></use>
      </svg>
    </button>
  }
}

class MTSlider extends Component {
  findSlideType(type, data) {
    const backgroundColor = this.props.letterboxBackgroundColor === "light" ? "#F2F2F2" : this.props.letterboxBackgroundColor === "dark" ? "#000000" : " ";
    switch(type) {
    case 'image':
      return <ImageSlide aspectRatio={data.aspectRatio}
                         frameAspectRatio={this.props.frameAspectRatio}
                         letterbox={this.props.letterbox}
                         letterboxBackgroundColor={backgroundColor}
                         src={data.src}
                         srcset={data.srcset}/>
    default:
      return;
    }
  }

  onSlideChange(currentSlide) {
    this.setState({
      currentSlideIndex: currentSlide
    });

    const slideData = {
      currentSlideIndex: currentSlide
    };

    Pestle.PubSub.publish(events.slideChange, slideData);
  }

  constructor(props) {
    super(props);
    this.onSlideChange = this.onSlideChange.bind(this);

    this.state = {
      currentSlideIndex: 0
    };
  }

  render() {
    const props = this.props;
    const state = this.state;
    const settings = {
      afterChange: this.onSlideChange,
      arrows: props.showArrows,
      className: 'mt3_slider-container',
      infinite: props.infinite,
      lazyLoad: props.lazyLoad,
      nextArrow: <NextButton
        infinite={props.infinite}
        currentSlide={state.currentSlideIndex}
        slideCount={props.slides.length} />,
      prevArrow: <PrevButton
        infinite={props.infinite}
        currentSlide={state.currentSlideIndex} />,
      useCSS: props.animations
    };

    const slides = props.slides.map((slide, i) => {
      const {type, ...data} = slide;
      const slideMarkup = this.findSlideType(type, data);

      return <div key={i}>{slideMarkup}</div>;
    });

    return (
      <Slick {...settings} >
        {slides}
      </Slick>
    );
  }
}

MTSlider.defaultProps = {
  animations: true,
  frameAspectRatio: "3:2",
  infinite: true
}

MTSlider.propTypes = {
  animations: PropTypes.bool,
  frameAspectRatio: PropTypes.string,
  letterboxBackgroundColor: PropTypes.string,
  infinite: PropTypes.bool,
  lazyLoad: PropTypes.bool,
  letterbox: PropTypes.bool,
  showArrows: PropTypes.bool,
  slides: PropTypes.arrayOf(PropTypes.shape({
    aspectRatio: PropTypes.string,
    assetSource: PropTypes.string,
    caption: PropTypes.string,
    credit: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string.isRequired,
    src: PropTypes.string,
    srcset: PropTypes.array
  }))
}

export default MTSlider
