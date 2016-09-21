'use strict';

import React, { PropTypes }  from 'react';
import Image from '@natgeo/modules-images';
import { generateHref } from '../../../modules/promocard/generateHref';

const FiveUpCard = (props) => {

  const attrs = {
    className: props.theme === 'dark' ? 'mt3_color--white mt3_kicker' : 'mt3_color--gray40 mt3_kicker',
    href: props.text.kicker ? generateHref(props.text.kicker.url, props.text.kicker.trackingCodes) : null,
    target: props.text.kicker ? props.text.kicker.target : null
  };

  const playButton =
      <button className="mt3_videopromo-button">
        <span className="mt3_visuallyhidden">Play</span>
        <div className="mt3_videopromo-button-container mt3_intratio--natgeo">
          <svg className="mt3_videopromo-button-icon">
            <use xlinkHref="#play"></use>
          </svg>
        </div>
      </button>;

  return(
      <figure className="mt3_fiveup-card">
        { props.link && props.link.url ? <a className="mt3_fiveup-divlink" href={generateHref(props.link.url, props.link.trackingCodes)} target={props.link.target} /> : null}
        { props.text.kicker || props.config.sponsored ?
        <div className="mt3_row mt3_fiveup-kicker">
          <div className="mt3_kicker-wrapper">
            {props.text.kicker && !props.config.sponsored ? <span className={attrs.className}><a href={attrs.href} target={attrs.target} className="mt3_kicker--link">{props.text.kicker.label}</a></span> : props.config.sponsored ? <span className={attrs.className}>{props.text.sponsorContentLabel}</span> : null}
            {(props.type === 'video' && props.text.duration) ? <span className={`${attrs.className} mt3_kicker`}>{props.text.duration}</span> : null}
          </div>
        </div> : null }
        <div className="mt3_row mt3_fiveup-card-row">
            {props.text.title ? <div className="mt3_fiveup-card-title">{props.text.title}</div> : null}
        </div>

        {
          props.showImage ? 
            <Image
              aspectRatio={props.leadMedia[0].aspectRatio}
              frameAspectRatio={'16:9'}
              lazyLoad={false}
              altText={props.leadMedia[0].altText}
              src={props.type !== 'video' ? props.leadMedia[0].url : props.leadMedia[0].imageUrl}
              srcset={props.leadMedia[0].srcset}
            /> : null
        }
        {
          (props.config.showPlayButton && props.showImage) || (props.type === 'video' && props.showImage) ? playButton : null
        }

      </figure>
  );
};

FiveUpCard.PropTypes = {
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  theme: PropTypes.string,
  config: PropTypes.object,
  showImage: PropTypes.bool,
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
  cta: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    seoTitle: PropTypes.string
  }),
  brandingBadgeLabel: PropTypes.string
};

export default FiveUpCard;
