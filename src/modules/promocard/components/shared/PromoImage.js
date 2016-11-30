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

class PromoImage extends React.Component {
  render() {
    let src = this.props.leadMedia.url || this.props.leadMedia.imageUrl;
    let srcset = this.props.leadMedia.srcset;
    let aspectRatio = this.props.leadMedia.aspectRatio;

    const attrs = this.props.link ? {
      className: 'mt3_promocardtext--overlay-link',
      href: this.props.link.url ? generateHref(this.props.link.url, this.props.link.trackingCodes) : null,
      target: this.props.link.target ? this.props.link.target : null
    } : null;

    const playButton =
      <button className="mt3_videopromo-button" onClick={this.props.type === 'video' ? this.props.launchModal : null}>
        <a {...attrs} />
        <span className="mt3_visuallyhidden">Play</span>
        <div className="mt3_videopromo-button-container mt3_intratio--natgeo">
          <svg className="mt3_videopromo-button-icon">
            <use xlinkHref="#play"></use>
          </svg>
        </div>
      </button>;

    const overlayClass = this.props.breakpoint > (768 - 60) ? 'mt3_promocard-gradient-overlay' : '';

    let frameAspectRatio = (this.props.type === 'gallery' && this.props.galleryImage) ? this.props.childFrameAspectRatio : this.props.config.cardAspectRatio;

    if (this.props.type === 'gallery' && this.props.galleryImage) {
      frameAspectRatio = this.props.childFrameAspectRatio;
    } else {
      //"hero" promos get an enforced frameAspectRatio depending on the current breakpoint
      if (this.props.cardLocation === 'hero') {
        if (this.props.breakpoint > 768) {
          frameAspectRatio = '2:1';
        } else {
          frameAspectRatio = '1:1';
        }
      } else {
        frameAspectRatio = this.props.config.cardAspectRatio;
      }
    }

    if (this.props.config.cardAspectRatio && this.props.leadMedia.croppings) {
      const croppingSrcset = searchAndGetCroppingSrcset(this.props.leadMedia.croppings, frameAspectRatio);
      if (croppingSrcset) {
        srcset = croppingSrcset;
        aspectRatio = frameAspectRatio;
      }
    }

    return (
      <figure>
        {this.props.config.overlay && !this.props.secondImage ?
        <div className={overlayClass}>
          <div/>
        </div>
        : null}

        {this.props.brandingBadgeLabel ? <figcaption className="mt3_promocard-branding">{this.props.brandingBadgeLabel}</figcaption> : null}

        <Image
          key={src}
          aspectRatio={aspectRatio}
          frameAspectRatio={frameAspectRatio}
          lazyLoad={false}
          altText={this.props.leadMedia.altText}
          src={src}
          srcset={srcset}
        />

        <div className="mt3_promocard-text--overlay">
          {this.props.type === 'video' ? <div className='mt3_promocardtext--overlay-link' onClick={this.props.launchModal}></div> : <a {...attrs} /> }
          {(this.props.config.showPlayButton && this.props.type !== 'gallery') || this.props.type === 'video' ? playButton : null }
          {(this.props.config.overlay && !this.props.secondImage) && this.props.text ? <PromoText {...this.props} /> : null}
        </div>
      </figure>
    );
  }
};

PromoImage.PropTypes = {
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  theme: PropTypes.string,
  config: PropTypes.object,
  childFrameAspectRatio: PropTypes.number,
  galleryImage: PropTypes.bool,
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
