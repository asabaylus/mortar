'use strict';

import React, { PropTypes }  from 'react';
import Button from '../../button/scripts/CTAButton.jsx';

const PromoImage = ({image, brandingBadgeLabel, sponsorContent, sponsorContentLabel}) => {
  const icon = {
    "name": "#play",
    "align": "left",
    "alt": "Play Button"
  };

  const imageStyle = {
    backgroundImage: 'url(' + image.url + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: image.height
  };

  // Button takes onClick function prop to hook into for play functionality
  return(
    <figure className={image.containerCSSClass} style={image.inlineStyle}>
      {brandingBadgeLabel ? <figcaption className="mt2_promocard-branding">{brandingBadgeLabel}</figcaption> : null}
      <div className="mt2_promocard-image" style={imageStyle}>
        <Button icon={icon} onClick={() => {}} />
      </div>
      {sponsorContent ? <figcaption className="mt2_promocard-sponsor">{sponsorContentLabel}</figcaption> : null}
    </figure>
  );
};

PromoImage.PropTypes = {
  brandingBadgeLabel: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    position: PropTypes.oneOf(['above', 'below', 'left', 'right']),
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.string,
    height: PropTypes.string
  }),
  sponsorContent: PropTypes.bool,
  sponsorContentLabel: PropTypes.string
}

export default PromoImage;
