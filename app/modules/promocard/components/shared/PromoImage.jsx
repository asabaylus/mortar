'use strict';

import React, { PropTypes }  from 'react';
import Button from '../../../button/scripts/CTAButton.jsx';

const PromoImage = (props) => {
  const icon = {
    "align": "left",
    "alt": "Play Button",
    "name": "#play"
  };

  const imageStyle = {
    backgroundImage: 'url(' + props.leadMedia.url + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: props.leadMedia.height
  };

  // Button takes onClick function prop to hook into for play functionality
  return(
    <figure className={props.leadMedia.containerCSSClass} style={props.leadMedia.inlineStyle}>
      {props.brandingBadgeLabel ? <figcaption className="mt2_promocard-branding">{props.brandingBadgeLabel}</figcaption> : null}
      <div className="mt2_promocard-image" style={imageStyle}>
        {props.type === 'video' ? <Button icon={icon} onClick={() => {}} /> : null}
      </div>
      {props.sponsorContent ? <figcaption className="mt2_promocard-sponsor">{props.sponsorContentLabel}</figcaption> : null}
    </figure>
  );
};

PromoImage.PropTypes = {
  brandingBadgeLabel: PropTypes.string,
  leadMedia: PropTypes.shape({
    url: PropTypes.string,
    position: PropTypes.oneOf(['above', 'below', 'left', 'right']),
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.object,
    height: PropTypes.string
  }),
  sponsorContent: PropTypes.bool,
  sponsorContentLabel: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule'])
};

export default PromoImage;
