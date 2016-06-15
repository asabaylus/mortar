'use strict';

import React, { Component, PropTypes }  from 'react';
import MTSlider from '../../slider/scripts/MTSlider.jsx';

class MTPhotoGallery extends Component {
  render() {
    console.log("SOMETHING");
    debugger;
    return (
      <MTSlider>
        {this.props.slides.map(function(item, i) {
          return (
            <div key={i}>
              <img src={item.url} />
              <p>{item.description}</p>
            </div>
          );
        })}
      </MTSlider>
    );
  }
}

MTPhotoGallery.defaultProps = {
  slides: null
}

MTPhotoGallery.propTypes = {
  slides: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      description: PropTypes.string
  })).isRequired
}

export default MTPhotoGallery
