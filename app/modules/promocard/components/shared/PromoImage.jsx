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
    <figure>
      {props.brandingBadgeLabel ? <figcaption className="mt3_promocard-branding">{props.brandingBadgeLabel}</figcaption> : null}
      <Image
        aspectRatio={props.leadMedia.aspectRatio}
        frameAspectRatio={props.config.aspectRatio}
        lazyLoad={false}
        altText={props.leadMedia.altText}
        src={props.type === 'article' ? props.leadMedia.url : props.type === 'video' ? props.leadMedia.imageUrl : null}
        srcset={props.type === 'article' ? props.leadMedia.srcset : null}
      />
      {props.config.showPlayButton || props.type === 'video' ? <Button icon={icon} onClick={() => {}} /> : null}
    </figure>
  );
};

PromoImage.PropTypes = {
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  leadMedia: PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    altText: PropTypes.string,
    srcset: PropTypes.array,
    imageUrl: PropTypes.string
  }),
  brandingBadgeLabel: PropTypes.string
};

export default PromoImage;
