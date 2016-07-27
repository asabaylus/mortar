'use strict';

import React, { PropTypes }  from 'react';
import Button from '../../button/scripts/CTAButton.jsx';

const PromoImage = ({image, brandingBadgeLabel, sponsorContent, sponsorContentLabel}) => {
  const icon = {
    "name": "#play",
    "align": "left",
    "alt": "Play Button"
  };

  return(
    <div className={"mt2_promocard-imagecontainer" + image.containerCSSClass} style={image.inlineStyle}>
      <h1 className="mt2_promocard-branding">{brandingBadgeLabel}</h1>
      <img src={image.url} />
      <Button icon={icon} />
      <span className="mt2_promocard-sponsor">{sponsorContentLabel}</span>
    </div>
  );
};

PromoImage.PropTypes = {
  brandingBadgeLabel: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    position: PropTypes.oneOf(['above', 'below', 'left', 'right']),
    containerCSSClass: PropTypes.string,
    inlineStyle: PropTypes.string
  }),
  sponsorContent: PropTypes.bool,
  sponsorContentLabel: PropTypes.string
}

export default PromoImage;
