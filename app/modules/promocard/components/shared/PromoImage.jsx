'use strict';

import React, { PropTypes }  from 'react';
import Button from '../../../button/scripts/CTAButton.jsx';
import Image from '@natgeo/modules-images';

const PromoImage = (props) => {
  const icon = {
    "align": "left",
    "alt": "Play Button",
    "name": "#play"
  };

  // Button takes onClick function prop to hook into for play functionality
  return(
    <figure className={props.leadMedia.containerCSSClass} style={props.leadMedia.inlineStyle}>
      {props.brandingBadgeLabel ? <figcaption className="mt2_promocard-branding">{props.brandingBadgeLabel}</figcaption> : null}
      <Image
        aspectRatio={props.leadMedia.aspectRatio}
        frameAspectRatio={props.config.aspectRatio}
        lazyLoad={false}
        altText={props.leadMedia.altText}
        src={props.leadMedia.url}
        srcset={props.leadMedia.srcset}
      />
      {props.type === 'video' ? <Button icon={icon} onClick={() => {}} /> : null}
      {props.config.sponsored ? <figcaption className="mt2_promocard-sponsor">{props.sponsorContentLabel}</figcaption> : null}
    </figure>
  );
};

PromoImage.PropTypes = {
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  leadMedia: PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    altText: PropTypes.string,
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.object,
    srcset: PropTypes.array
  }),
  brandingBadgeLabel: PropTypes.string,
  sponsorContentLabel: PropTypes.string
};

export default PromoImage;