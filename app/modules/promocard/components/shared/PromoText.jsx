'use strict';

import React, { PropTypes }  from 'react';
import events from '../../scripts/events';
import { generateHref } from '../../scripts/generateHref.js';

const PromoText = (props) => {

  let attrs = {
    className: "mt3_color--neutral--l mt3_subh2 mt3_promocard-kicker",
    href: props.text.kicker ? generateHref(props.text.kicker.url, props.text.kicker.trackingCodes) : null,
    target: props.text.kicker ? props.text.kicker.target : null
  };

  return(
    <div>
      <div className="mt3_row">
        {props.text.kicker && !props.config.sponsored ? <a {...attrs}>{props.text.kicker.label}</a> : props.config.sponsored ? <span className={attrs.className}>{props.text.sponsorContentLabel}</span> : null}
        {(props.type === 'video' && props.text.duration) ? <div className="mt3_color--neutral--l mt3_subh2 mt3_card-subhead--right">{props.text.duration}</div> : null}
      </div>
      <div className="mt3_row">
        {props.text.title ? <div className="mt3_color--neutral--xxd mt3_h4">{props.text.title}</div> : null}
        {props.text.dek ? <div className="mt3_color--neutral--xxd mt3_subh4">{props.text.dek}</div> : null}
        {props.text.byline ? <div className="mt3_color--neutral--xxd mt3_h5">{props.text.byline}</div> : null}
      </div>
    </div>
  );
};

PromoText.PropTypes = {
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  text: PropTypes.shape({
    title: PropTypes.string,
    dek: PropTypes.string,
    kicker: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
      target: PropTypes.string,
      seoTitle: PropTypes.string,
      trackingCodes: PropTypes.array || PropTypes.string
    }),
    photoCount: PropTypes.number,
    byline: PropTypes.string,
    duration: PropTypes.string,
    publishDate: PropTypes.string,
    sponsorContentLabel: PropTypes.string
  }),
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule'])
};

export default PromoText;
