'use strict';

import React, { PropTypes }  from 'react';
import PromoImage from '../shared/PromoImage.jsx';
import PromoText from '../shared/PromoText.jsx';
import events from '../../scripts/events';
import { generateHref } from '../../scripts/generateHref.js';

const Gallery = (props) => {

  const promoData = {
    // data to pass with the event
  };

  const promoClicked = () => {
    props.onClick();
    Pestle.PubSub.publish(events.promoClicked, promoData);
  };

  let attrs = props.link ? {
    className: "mt3_div-link",
    href: generateHref(props.link.url, props.link.trackingCodes),
    target: props.link.target,
    onClick: promoClicked
  } : null;

  let ctaAttrs = props.cta ? {
    className: "mt3_color--neutral--l mt3_subh2 mt3_promocard-gallery-cta",
    href: props.cta.url,
    target: props.link.target,
    title: props.cta.seoTitle
  } : null;

  return(
    <div className="mt3_row mt3_col-12 mt3_promocard-container">
      <a {...attrs} />
      <div className="mt3_row mt3_promocard-gallery-images">
        <a {...ctaAttrs}>{props.cta.title}</a>
        <div className="mt3_row mt3_promocard-gallery-images--image1">
          <PromoImage type={props.type} config={props.config} leadMedia={props.leadMedia[0]} />
        </div>
        <div className="mt3_row mt3_promocard-gallery-images--image2">
          <PromoImage type={props.type} config={props.config} leadMedia={props.leadMedia[1]} />
        </div>
      </div>
      <PromoText {...props} />
    </div>
  );
};

Gallery.PropTypes = {
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
  cta: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    seoTitle: PropTypes.string
  }),
  text: PropTypes.object,
  brandingBadgeLabel: PropTypes.string,
  modal: PropTypes.bool,
  onClick: PropTypes.func
};

export default Gallery;
