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
    <figure className={props.containerCSSClass} style={props.inlineStyle}>
      {props.brandingBadgeLabel ? <figcaption className="mt2_promocard-branding">{props.brandingBadgeLabel}</figcaption> : null}
      <Image
        aspectRatio={props.aspectRatio}
        frameAspectRatio={props.frameAspectRatio}
        lazyLoad={true}
        src={props.leadMedia.url}
        srcset={props.leadMedia.srcset}/>
      {props.type === 'video' ? <Button icon={icon} onClick={() => {}} /> : null}
      {props.sponsorContent ? <figcaption className="mt2_promocard-sponsor">{props.sponsorContentLabel}</figcaption> : null}
    </figure>
  );
};

PromoImage.PropTypes = {
  frameAspectRatio: PropTypes.number,
  brandingBadgeLabel: PropTypes.string,
  leadMedia: PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    internal: PropTypes.bool,
    position: PropTypes.oneOf(['above', 'below', 'left', 'right']),
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.object,
    srcset: PropTypes.array
  }),
  sponsorContent: PropTypes.bool,
  sponsorContentLabel: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule'])
};

export default PromoImage;
