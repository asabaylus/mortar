'use strict';

import React, { Component, PropTypes }  from 'react';

class Counter extends Component {
  componentDidMount () {
    if(this.refs.previousButton) {
      this.refs.previousButton.addEventListener('click', this.props.slidePrev);
      this.refs.nextButton.addEventListener('click', this.props.slideNext);
    }
  }

  componentWillUnmount () {
    if(this.refs.previousButton) {
      this.refs.previousButton.removeEventListener('click', this.props.slidePrev);
      this.refs.nextButton.removeEventListener('click', this.props.slideNext);
    }
  }

  render() {
    let prevDimClass = this.props.firstSlideActive ? "mt2_numericcounter-arrow--disabled" : " ",
        nextDimClass = this.props.lastSlideActive ? "mt2_numericcounter-arrow--disabled" : " ";

    return <div className="mt2_numericcounter">
      <button ref="previousButton" className="mt2_numericcounter-button">
        <svg className={"mt2_icon mt2_numericcounter-arrow" + prevDimClass}>
          <use xlinkHref="#chevron-left"></use>
        </svg>
        <span className="mt2_h5">{this.props.currentSlide}</span>
      </button>
      <span className="mt2_h5">/</span>
      <button ref="nextButton" className="mt2_numericcounter-button">
        <span className="mt2_h5">{this.props.totalSlides}</span>
        <svg className={"mt2_icon mt2_numericcounter-arrow" + nextDimClass}>
          <use xlinkHref="#chevron-right"></use>
        </svg>
      </button>
    </div>
  }
}

Counter.propTypes = {
  currentSlide: PropTypes.string,
  firstSlideActive: PropTypes.bool,
  lastSlideActive: PropTypes.bool,
  slideNext: PropTypes.func,
  slidePrev: PropTypes.func,
  totalSlides: PropTypes.string
}

export default Counter;
