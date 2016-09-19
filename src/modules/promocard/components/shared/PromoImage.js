'use strict';

import React, { PropTypes }  from 'react';
import Button from '../../../button/CTAButton';
import ElementQuery from 'react-element-query';
import Image from '@natgeo/modules-images';
import PromoText from './PromoText';
import { generateHref } from '../../generateHref';

const PromoImage = (props) => {

  const playButton =
      <button className="mt3_videopromo-button">
        <span className="mt3_visuallyhidden">Play</span>
        <div className="mt3_videopromo-button-container mt3_intratio--natgeo">
          <svg className="mt3_videopromo-button-icon">
            <use xlinkHref="#play"></use>
          </svg>
        </div>
      </button>;

  const attrs = props.link ? {
    className: 'mt3_promocardtext--overlay-link',
    href: props.link ? generateHref(props.link.url, props.link.trackingCodes) : null,
    target: props.link ? props.link.target : null
  } : null;

  const frameAspectRatio = props.type === 'gallery' ? props.childFrameAspectRatio : props.config.frameAspectRatio;

  return(
      <figure>
        {props.config.overlay && !props.secondImage ?
        <ElementQuery sizes={[{name: 'mt3_promocard-gradient-overlay', width: 768 - 60}]}>
          <div></div>
        </ElementQuery>
        : null}
        {props.brandingBadgeLabel ? <figcaption className="mt3_promocard-branding">{props.brandingBadgeLabel}</figcaption> : null}
        <Image
          aspectRatio={props.leadMedia.aspectRatio}
          frameAspectRatio={frameAspectRatio}
          lazyLoad={false}
          altText={props.leadMedia.altText}
          src={props.type !== 'video' ? props.leadMedia.url : props.leadMedia.imageUrl}
          srcset={props.leadMedia.srcset}
        />
        <div className="mt3_promocard-text--overlay">
          <a {...attrs} />
          {(props.config.showPlayButton && props.type !== 'gallery') || props.type === 'video' ? playButton : null}
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
  brandingBadgeLabel: PropTypes.string
};

export default PromoImage;
