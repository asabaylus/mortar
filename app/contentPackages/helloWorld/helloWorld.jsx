'use strict';

import React, { Component, PropTypes } from 'react';
import MTPromoCard from 'natgeo-mortar/lib/modules/promocard/scripts/MTPromoCard.jsx';

class HelloWorld extends Component {
    render() {
        const settings = {
            image: {
              url: this.props.image.url,
              position: this.props.image.position,
              height: this.props.image.height
            },
            title: this.props.title,
            hideTitle: false
        };

        return (<div><MTPromoCard {...settings} /></div>);
    }
}

HelloWorld.propTypes = {
  title: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    position: PropTypes.oneOf(['above', 'below', 'left', 'right']),
    height: PropTypes.number.isRequired
  })
};

HelloWorld.defaultProps = {
  title: '',
  image: {
    position: 'below'
  }
};

export default HelloWorld;
