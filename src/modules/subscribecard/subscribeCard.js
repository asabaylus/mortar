'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/pestle';
import Image from '@natgeo/modules-images';


class SubscribeCard extends Component {

  render() {

    return (
      <header className='mt3_broadsheet-cover-heading mt3_verlag-heading'>
        <p><span className='mt3_broadsheet-subscribe-label'>Subscribe</span><br/> National Geographic Magazine</p>

        <Image
          aspectRatio={this.props.image.aspectRatio}
          lazyLoad={false}
          placeholderBackgroundColor={'rgb(0,0,0)'}
          letterboxBackgroundColor = {'rgb(0,0,0)'}
          placeholder='none'
          fadeSpeed={0}
          altText='National Geographic Magazine Cover Image'
          src={this.props.image.src}
          srcset={this.props.image.srcset}
        />
      </header>
    );
  }
}

SubscribeCard.PropTypes = {
  leadMedia: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    srcset: PropTypes.array
  })),
  text: PropTypes.object
};

export default SubscribeCard;
