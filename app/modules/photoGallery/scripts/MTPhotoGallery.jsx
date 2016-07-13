'use strict';

import React, { Component, PropTypes }  from 'react';
import SliderComponent from '../../slider/scripts/MTSlider.jsx';

class MTPhotoGallery extends Component {
  render() {
    //the following is proof of concept ATM!
    const fakeStyle1 = {
      height: "400px",
      background: "red"
    }
    const fakeStyle2 = {
      height: "300px",
      background: "blue"
    }

    return (
      <SliderComponent>
        <h2 style={fakeStyle1}>slide 1</h2>
        <h2 style={fakeStyle2}>slide 2</h2>
      </SliderComponent>
    );
  }
}

MTPhotoGallery.propTypes = {
  slides: PropTypes.array
}

export default MTPhotoGallery
