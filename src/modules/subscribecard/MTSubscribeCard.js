'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/pestle';
import Image from '@natgeo/modules-images';
import { generateHref } from '../promocard/generateHref';

class MTSubscribeCard extends Component {
  render() {

    //the card's image is hardcoded to a size that makes for a roughly square promo when the promo has 2 lines of text
    const imageFrameAspectRatio = 0.78;

    const { link,
      leadMedia,
      text } = this.props.model;

    //text data required to render
    if(!text) {
      return false;
    }

    const isImage = leadMedia && leadMedia[0] && (leadMedia[0].src || leadMedia[0].srcset);


    const href = link && link.url ? generateHref(link.url, link.trackingCodes) : null;

    let textBlock = [];

    //three options for the text currently - either a "brandingBadge" prop, or separate "prompt" and "heading" props. "brandingBadge" wins if all are provided.
    if(text.brandingBadge) {
      textBlock.push(
        <span key='brandingBadge' dangerouslySetInnerHTML={{__html: text.brandingBadge}} />
      );
    } else {
      if(text.prompt) {
        textBlock.push(
          <span key='prompt' className='mt3_subscribe-card__prompt' dangerouslySetInnerHTML={{__html: text.prompt}} />
        );
      }
      if(text.heading) {
        textBlock.push(
          <span key='heading' className='mt3_subscribe-card__heading' dangerouslySetInnerHTML={{__html: text.heading}} />
        );
      }
    }

    return (
      <div className='mt3_subscribe-card'>
        {href ?
          <a href={href} className="mt3_div-link"/>
        : null}
        <div className='mt3_subscribe-card__text'>
          {textBlock}
        </div>
        {isImage ?
          <Image
            aspectRatio={leadMedia[0].aspectRatio}
            frameAspectRatio={imageFrameAspectRatio}
            letterbox={true}
            placeholderBackgroundColor={'rgb(0,0,0)'}
            letterboxBackgroundColor = {'rgb(0,0,0)'}
            placeholder='none'
            src={leadMedia[0].imageUrl}
            srcset={leadMedia[0].srcset}
          />
        : null}
      </div>
    );
  }
}

MTSubscribeCard.PropTypes = {
  model: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      trackingCodes: PropTypes.string
    })),
    leadMedia: PropTypes.arrayOf(PropTypes.shape({
      imageUrl: PropTypes.string,
      srcset: PropTypes.array
    })),
    text: PropTypes.arrayOf(PropTypes.shape({
      brandingBadge: PropTypes.string,
      heading: PropTypes.string,
      prompt: PropTypes.string
    }))
  })).isRequired
};

export default MTSubscribeCard;
