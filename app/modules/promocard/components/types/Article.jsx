'use strict';

import React, { PropTypes }  from 'react';
import PromoImage from '../shared/PromoImage.jsx';
import PromoText from '../shared/PromoText.jsx';
import { generateHref } from '../../scripts/generateHref.js';

const Article = (props) => {
  const promoData = {
    // data to pass with the event
  };

  const promoClicked = () => {
    props.onClick();
    Pestle.PubSub.publish(events.promoClicked, promoData);
  };

  let attrs = {
    className: "mt3_div-link",
    href: props.link ? generateHref(props.link.url, props.link.trackingCodes) : null,
    target: props.link ? props.link.target : null,
    onClick: promoClicked
  };

  if (props.leadMedia){
    return(
      <div className="mt3_row mt3_col-12 mt3_promocard-container">
        <a {...attrs} />
        <PromoImage type={props.type} config={props.config} link={props.link} leadMedia={props.leadMedia[0]} brandingBadgeLabel={props.brandingBadgeLabel} onClick={props.onClick} />
        <PromoText {...props} />
      </div>
    );
  }else{
    return(
      <div className="mt3_row">
        <PromoText {...props} />
      </div>
    );
  }
};

Article.PropTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  leadMedia: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    altText: PropTypes.string,
    srcset: PropTypes.array
  })),
  text: PropTypes.object,
  brandingBadgeLabel: PropTypes.string,
  modal: PropTypes.bool,
  onClick: PropTypes.func
};

export default Article;
