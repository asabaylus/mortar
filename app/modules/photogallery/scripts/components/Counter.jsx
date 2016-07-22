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

    return (
      <div className="mt2_photo-gallery-numericcounter">
          <button className="mt2_h5 mt2_numericcounter-button">{this.state.currentSlide}</button>
          <span className="mt2_h5">/</span>
          <button className="mt2_h5 mt2_numericcounter-button">{this.props.slides.length}</button>
      </div>
    );
  }
}

Counter.propTypes = {
  showCounter: PropTypes.bool,
  slides: PropTypes.array.isRequired
}

export default Counter;
