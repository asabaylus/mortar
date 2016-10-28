'use strict';

import React, { PropTypes }  from 'react';
import Button from '../../../button/CTAButton';
import Image from '@natgeo/modules-images';
import PromoText from './PromoText';
import { generateHref } from '../../generateHref';

const searchAndGetCroppingSrcset = (croppingSrcset, aspectRatio) => {
  let srcset;
  switch(aspectRatio) {
  case '16:9':
    srcset = croppingSrcset.SixteenNine;
    break;
  case '3:2':
    srcset = croppingSrcset.ThreeTwo;
    break;
  case '4:3':
    srcset = croppingSrcset.FourThree;
    break;
  case '2:1':
    srcset = croppingSrcset.TwoOne;
    break;
  case '1:1':
    srcset = croppingSrcset.OneOne;
    break;
  default:
    srcset = null;
  }

  return srcset;
};

const PromoImage = (props) => {

  let srcset = props.leadMedia.srcset;
  let aspectRatio = props.leadMedia.aspectRatio;

  const attrs = props.link ? {
    className: 'mt3_promocardtext--overlay-link',
    href: props.link ? generateHref(props.link.url, props.link.trackingCodes) : null,
    target: props.link ? props.link.target : null
  } : null;

  const playButton =
      <button className="mt3_videopromo-button" onClick={props.type === 'video' ? props.launchModal : null}>
        <a {...attrs} />
        <span className="mt3_visuallyhidden">Play</span>
        <div className="mt3_videopromo-button-container mt3_intratio--natgeo">
          <svg className="mt3_videopromo-button-icon">
            <use xlinkHref="#play"></use>
          </svg>
        </div>
      </button>;

  const overlayClass = props.breakpoint > (768 - 60) ? 'mt3_promocard-gradient-overlay' : '';

  let frameAspectRatio = props.type === 'gallery' ? props.childFrameAspectRatio : props.config.cardAspectRatio;

  if(props.type === 'gallery') {
    frameAspectRatio = props.childFrameAspectRatio;
  } else {
    //"hero" promos get an enforced frameAspectRatio depending on the current breakpoint
    if(props.cardLocation === 'hero') {
      if (props.breakpoint > 768) {
        frameAspectRatio = '2:1';
      } else {
        frameAspectRatio = '1:1';
      }
    } else {
      frameAspectRatio = props.config.cardAspectRatio;
    }
  }

  if (props.config.cardAspectRatio && props.leadMedia.croppings) {
    const croppingSrcset = searchAndGetCroppingSrcset(props.leadMedia.croppings, frameAspectRatio);
    if (croppingSrcset) {
      srcset = croppingSrcset;
      aspectRatio = frameAspectRatio;
    }
  }

  return(
    <figure className={props.breakpoint > 768 ? 'mt3_promocard-image--large' :  null}>
      {props.config.overlay && !props.secondImage ?
      <div className={overlayClass}>
        <div></div>
      </div>
      : null}
      {props.brandingBadgeLabel ? <figcaption className="mt3_promocard-branding">{props.brandingBadgeLabel}</figcaption> : null}
      <Image
        aspectRatio={aspectRatio}
        frameAspectRatio={frameAspectRatio}
        lazyLoad={false}
        altText={props.leadMedia.altText}
        src={props.leadMedia.url || props.leadMedia.imageUrl}
        srcset={srcset}
      />
      <div className="mt3_promocard-text--overlay">
        {props.type === 'video' ? <div className='mt3_promocardtext--overlay-link' onClick={props.launchModal}></div> : <a {...attrs} /> }
        {(props.config.showPlayButton && props.type !== 'gallery') || props.type === 'video' ? playButton : null }
        {(props.config.overlay && !props.secondImage) && props.text ? <PromoText {...props} /> : null}
      </div>
    </figure>
  );
};

PromoImage.PropTypes = {
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  theme: PropTypes.string,
  config: PropTypes.object,
  childFrameAspectRatio: PropTypes.number,
  secondImage: PropTypes.bool,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  leadMedia: PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number || PropTypes.oneOf(['broadcast', 'photo', 'tv', 'square']),
    altText: PropTypes.string,
    srcset: PropTypes.array,
    imageUrl: PropTypes.string
  }),
  text: PropTypes.object,
  cta: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    seoTitle: PropTypes.string
  }),
  brandingBadgeLabel: PropTypes.string,
  launchModal: PropTypes.func
};

export default PromoImage;
