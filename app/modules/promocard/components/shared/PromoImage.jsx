'use strict';

import React, { PropTypes }  from 'react';
import Button from '../../../button/scripts/CTAButton.jsx';
import Image from '@natgeo/modules-images';
import events from '../../scripts/events';

const PromoImage = (props) => {
  const icon = {
    "align": "left",
    "alt": "Play Button",
    "name": "#play"
  };

  // Button takes onClick function prop to hook into for play functionality
  return(
    <figure>
      {props.brandingBadgeLabel ? <figcaption className="mt3_promocard-branding">{props.brandingBadgeLabel}</figcaption> : null}
      <Image
        aspectRatio={props.leadMedia.aspectRatio}
        frameAspectRatio={props.config.aspectRatio}
        lazyLoad={false}
        altText={props.leadMedia.altText}
        src={props.type !== 'video' ? props.leadMedia.url : props.leadMedia.imageUrl}
        srcset={props.leadMedia.srcset}
      />
      {props.config.showPlayButton || props.type === 'video' ? <Button icon={icon} onClick={() => {}} /> : null}
    </figure>
  );
};

PromoImage.PropTypes = {
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  leadMedia: PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    altText: PropTypes.string,
    srcset: PropTypes.array,
    imageUrl: PropTypes.string
  }),
  cta: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    seoTitle: PropTypes.string
  }),
  brandingBadgeLabel: PropTypes.string
};

export default PromoImage;
