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

  const kicker = [];

  if(props.text.kicker && !props.config.sponsored) {
    if(attrs.href) {
      kicker.push(<span key={`kicker-container-${props.cardNum}`} className={attrs.className}><a href={attrs.href} target={attrs.target} className="mt3_kicker--link">{props.text.kicker.label}</a></span>);
    } else {
      kicker.push(<span key={`kicker-container-${props.cardNum}`} className={attrs.className} dangerouslySetInnerHTML={{__html: props.text.kicker.label}} />);
    }
  } else if(props.config.sponsored) {
    kicker.push(<span key={`kicker-container-${props.cardNum}`} className={attrs.className} dangerouslySetInnerHTML={{__html: props.text.sponsorContentLabel}} />);
  }

  const playButton =
      <button className="mt3_videopromo-button">
        <span className="mt3_visuallyhidden">Play</span>
        <div className="mt3_videopromo-button-container mt3_intratio--natgeo">
          <svg className="mt3_videopromo-button-icon">
            <use xlinkHref="#play"></use>
          </svg>
        </div>
      </button>;

  // setting a class on the top card if it has an image so that it can span 100% width
  const rowClass = (props.showImage && props.leadMedia && (props.leadMedia[0].url || props.leadMedia[0].imageUrl)) ? 'mt3_row mt3_fiveup-card-row mt3_fiveup-card-row--has-image' : 'mt3_row mt3_fiveup-card-row';

  return(
      <figure className="mt3_fiveup-card">
        { props.link && props.link.url ? <a className="mt3_fiveup-divlink" href={generateHref(props.link.url, props.link.trackingCodes)} target={props.link.target} /> : null}
        { props.text.kicker || props.config.sponsored ?
        <div className="mt3_row mt3_fiveup-kicker">
          <div className="mt3_kicker-wrapper">
            {kicker.length ? kicker : null}
            {(props.type === 'video' && props.text.duration) ? <span className={`${attrs.className} mt3_kicker`} dangerouslySetInnerHTML={{__html: props.text.duration}} /> : null}
          </div>
        </div> : null }
        <div className={rowClass}>
            {props.text.title ? <div className="mt3_fiveup-card-title" dangerouslySetInnerHTML={{__html: props.text.title}} /> : null}
        </div>

        {
          props.showImage && props.leadMedia && props.leadMedia[0] ?
            <Image
              aspectRatio={props.leadMedia[0].aspectRatio}
              frameAspectRatio={'16:9'}
              lazyLoad={false}
              altText={props.leadMedia[0].altText}
              src={props.leadMedia[0].url || props.leadMedia[0].imageUrl}
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
  cardNum: PropTypes.number,
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
