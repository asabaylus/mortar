'use strict';

import React, { Component, PropTypes }  from 'react';
import EQ from '../../util/EQ.js';
import PromoImage from '../promocard/components/shared/PromoImage';
import { generateHref } from '../promocard/generateHref';
import {Pestle} from '@natgeo/pestle';


class ShowCard extends Component {

  render() {
    const {type, config, link, leadMedia, text, ...props} = this.props;
    let i = 0;
    const imageContent = [];
    const sizes = {
      '480': 'mt3_showcard--tablet',
      '920': 'mt3_showcard--desktop',
      '1280': 'mt3_showcard--lg-desktop'
    };

    const aspectRatio = config.cardAspectRatio === '16:9' ? 'mt3_intratio--broadcast'
      : config.cardAspectRatio === '3:2' ? 'mt3_intratio--photo'
      : config.cardAspectRatio === '2:1' ? 'mt3_intratio--two-one'
      : config.cardAspectRatio === '1:1' ? 'mt3_intratio--square'
      : 'mt3_intratio--photo';


    let brandingTheme = 'mt3_channelbranding--nobranding';
    if (config.channelMapping) {
      if (leadMedia && leadMedia.length > 0) {
        brandingTheme = 'mt3_channelbranding--default';
      } else {
        brandingTheme = 'mt3_channelbranding--inverse';
      }
    }

    const attrs = link ? {
      className: 'mt3_div-link',
      href: link ? generateHref(link.url, link.trackingCodes) : null,
      target: link ? link.target : null
    } : null;


    if (leadMedia) {
      imageContent.push (
        <PromoImage key={i++} type={type} config={config} link={link} leadMedia={leadMedia[0]} />
      );
    }

    return (
      <EQ sizeClasses={sizes}>
        <div className={`mt3_row mt3_col-12 mt3_showcard-container ${aspectRatio} ${brandingTheme}`} ref='showcardContainer'>
          <span className='mt3_channelbranding--rect mt3_channelbranding--topleft'></span>
          <span className='mt3_channelbranding--rect mt3_channelbranding--bottomright'></span>
          <a {...attrs} />
          {imageContent}
          <div className='mt3_showcard-text-container'>
            <div className='mt3_showcard-text-center'>
              <div className='mt3_showcard-text-cell'>
                <div className='mt3_showcard-text'>
                  <span className='mt3_showcard-heading' dangerouslySetInnerHTML={{__html: text.brandingBadge}} />
                  <h2 className='mt3_showcard-title' dangerouslySetInnerHTML={{__html: text.title}} />
                  <span className='mt3_showcard-airdate'>{text.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </EQ>
    );
  }
}

ShowCard.PropTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  leadMedia: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    srcset: PropTypes.array
  })),
  text: PropTypes.object.isRequired
};

export default ShowCard;
