'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/mortar-pestle';
import events from '../../../slider/scripts/events';

class Counter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSlide : 1,
      firstSlideActive: true,
      lastSlideActive: false
    };
  }

  componentDidMount(){
    Pestle.PubSub.subscribe(events.slideChange, this.updateCounter.bind(this));
  }

  componentWillUnmount(){
    Pestle.PubSub.unsubscribe(events.slideChange);
  }

  updateCounter(msg, data){
    this.setState({
      currentSlide: data.currentSlideIndex + 1,
      firstSlideActive: data.currentSlideIndex === 0,
      lastSlideActive: data.currentSlideIndex + 1 === this.props.slides.length
    });
  }

  render() {
    let prevDimClass = this.state.firstSlideActive ? " mt2_numericcounter-arrow--disabled" : " ",
        nextDimClass = this.state.lastSlideActive ? " mt2_numericcounter-arrow--disabled" : " ";

    return (
      <div className="mt2_numericcounter">
        <button ref="previousButton" className="mt2_numericcounter-button">
          <svg className={"mt2_icon mt2_numericcounter-arrow" + prevDimClass}>
            <use xlinkHref="#chevron-left"></use>
          </svg>
          <span className="mt2_h5">{this.state.currentSlide}</span>
        </button>
        <span className="mt2_h5">/</span>
        <button ref="nextButton" className="mt2_numericcounter-button">
          <span className="mt2_h5">{this.props.slides.length}</span>
          <svg className={"mt2_icon mt2_numericcounter-arrow" + nextDimClass}>
            <use xlinkHref="#chevron-right"></use>
          </svg>
        </button>
      </div>
    );
  }
}

Counter.propTypes = {
  showCounter: PropTypes.bool,
  slides: PropTypes.array
}

export default Counter;
