'use strict';

import React, { Component, PropTypes }  from 'react';
import {Pestle} from '@natgeo/pestle';
import cx from 'classnames';
import events from '../../events';
import PromoImage from '../shared/PromoImage';
import PromoText from '../shared/PromoText';
import { generateHref } from '../../generateHref';
import _debounce from 'lodash/debounce';
import VideoModal from '../../../videomodal/VideoModal';


class Story extends Component {
  constructor(props) {
    super(props);
    this.resizeHandler = null;
    this.getWidth = this.getWidth.bind(this);
    this.calcAspectRatio = this.calcAspectRatio.bind(this);
    this.launchModal = this.launchModal.bind(this);
    this.state = {
      breakpoint: this.props.parentWidth || null
    }
  }

  static defaultProps = {
    ...Component.defaultProps,
    config: {
      overlay: false
    }
  };

  launchModal() {
    const videoData = {
      'itemId': this.props.itemId,
      'leadMedia': this.props.leadMedia,
      'text': this.props.text
    };
    Pestle.PubSub.publish(events.launchVideoModal, videoData);
  }

  getWidth() {
    const containerWidth = this.refs.promocardContainer.getBoundingClientRect().width;
    if (this.state.containerWidth !== containerWidth) {
      this.setState({
        breakpoint: containerWidth
      });
    }
  }

  calcAspectRatio() {
    const width = this.state.breakpoint;
    const parentFrameAspectRatio = this.props.config.cardAspectRatio;
    let parentFrameHeightMultiplier;
    switch (parentFrameAspectRatio) {
    case '16:9':
      parentFrameHeightMultiplier = 0.5625;
      break;
    case '2:1':
      parentFrameHeightMultiplier = 0.5;
      break;
    case '1:1':
      parentFrameHeightMultiplier = 1;
      break;
    default: //default to 3:2
      parentFrameHeightMultiplier = 0.667;
    }
    const height = width * parentFrameHeightMultiplier;

    let corner = 30;
    if (width > 375 && width < 768) {
      corner = 40;
    } else if (width > 768) {
      corner = 60;
    }

    return (height - corner) / (width - corner);
  }

  componentDidMount() {
    this.getWidth();
    this.resizeHandler = _debounce(this.getWidth, 250);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    const {itemId, additionalClasses, type, config, cardLocation, link, leadMedia, brandingBadgeLabel, text, theme, ...props} = this.props;
    const attrs = link || type !== 'video' ? {
      className: 'mt3_div-link',
      href: link ? generateHref(link.url, link.trackingCodes) : null,
      target: link ? link.target : null
    } : null;
    const noImages = !leadMedia || leadMedia[0].url === ''; // add second check for configurator as leadMedia array is always present

    const promoContainerClass = cx({
      'mt3_promocard-container--text-only': noImages,
      'mt3_promocard-container--dark': theme === 'dark',
      'mt3_promocard-container--large': this.state.breakpoint > 768
    });

    let i = 0;
    let content = type === 'video' ? [<div key={i++} className='mt3_div-link' onClick={this.launchModal}></div>] : [<a key={i++} {...attrs} />]; // container should not be linked if video card
    const aspectRatio = config.cardAspectRatio === '16:9' ? 'mt3_intratio--broadcast'
      : config.cardAspectRatio === '3:2' ? 'mt3_intratio--photo'
      : config.cardAspectRatio === '2:1' ? 'mt3_intratio--two-one'
      : config.cardAspectRatio === '1:1' ? 'mt3_intratio--square'
      : 'mt3_intratio--photo';

    const kickerStyle = text.kicker && text.kicker.style === 'prompt' ? 'mt3_promocard-container--prompt' : '';

    if (this.state.breakpoint !== null) {

      // this builds the structure differently based on the container width, which if above 768 should have nested text overlaying the photo by passing an additional
      // property via the config object
      if (!noImages && this.state.breakpoint > 768) {
        Object.assign(config, {
          overlay: true
        });
        if (type === 'gallery') {
          const ctaSizeClass = 'mt3_promocard-gallery-cta--large';
          content.push(
            <div key={i++} className={`mt3_row mt3_promocard-gallery-images ${aspectRatio}`}>
              <div
                className={`mt3_color--white mt3_btn mt3_btn--naked mt3_fullwidth mt3_promocard-gallery-cta ${ctaSizeClass}`}>
                <a {...attrs} />
                <span>Photo Gallery</span>
                <svg className="mt3_promocard-gallery-cta-icon">
                  <use xlinkHref="#plus"></use>
                </svg>
              </div>
              <div className="mt3_row mt3_promocard-gallery-images--image1 mt3_promocard-gallery-images--image1-large">
                <a {...attrs} />
                <PromoImage type={type} config={config} leadMedia={leadMedia[0]}
                            childFrameAspectRatio={this.calcAspectRatio()} link={link}
                            brandingBadgeLabel={brandingBadgeLabel} text={text} breakpoint={this.state.breakpoint}
                />
              </div>
              <div className="mt3_row mt3_promocard-gallery-images--image2 mt3_promocard-gallery-images--image2-large">
                <PromoImage type={type} config={config} leadMedia={leadMedia[1]}
                            childFrameAspectRatio={this.calcAspectRatio()} secondImage={true}
                            breakpoint={this.state.breakpoint}
                />
              </div>
            </div>
          );
        } else {
          content.push(
            <PromoImage key={i++} type={type} config={config} cardLocation={cardLocation} link={link}
                        leadMedia={leadMedia[0]} brandingBadgeLabel={brandingBadgeLabel} text={text}
                        breakpoint={this.state.breakpoint} launchModal={this.launchModal}
            />
          );
        }
      } else if (!noImages && this.state.breakpoint < 768) {
        if (type === 'gallery') {
          const ctaSizeClass = this.state.breakpoint > 375 ? 'mt3_promocard-gallery-cta--medium' : '';
          const imageSizeClass = this.state.breakpoint > 375 ? 'mt3_promocard-gallery-images--image2-medium' : '';

          content.push(
            <div key={i++} className={`mt3_row mt3_promocard-gallery-images ${aspectRatio}`}>
              <div className='mt3_promocard-gallery-cta--medium'>
                <div
                  className={`mt3_color--white mt3_btn mt3_btn--naked mt3_fullwidth mt3_promocard-gallery-cta ${ctaSizeClass}`}>
                  <a {...attrs} />
                  <span>Photo Gallery</span>
                  <svg className="mt3_promocard-gallery-cta-icon">
                    <use xlinkHref="#plus"></use>
                  </svg>
                </div>
              </div>
              <div className={`mt3_row mt3_promocard-gallery-images--image1 ${imageSizeClass}`}>
                <a {...attrs} />
                <PromoImage type={type} config={config} leadMedia={leadMedia[0]}
                            childFrameAspectRatio={this.calcAspectRatio()} breakpoint={this.state.breakpoint}
                />
              </div>

              <div className={`mt3_row mt3_promocard-gallery-images--image2 ${imageSizeClass}`}>
                <PromoImage type={type} config={config} leadMedia={leadMedia[1]}
                            childFrameAspectRatio={this.calcAspectRatio()} secondImage={true}
                            breakpoint={this.state.breakpoint}
                />
              </div>
            </div>,
            <PromoText key={i++} config={config} link={link} text={text} theme={theme} type={type} leadMedia={leadMedia}
                       breakpoint={this.state.breakpoint}
            />
          );
        } else {
          content.push(
            <PromoImage key={i++} type={type} config={config} cardLocation={cardLocation} link={link}
                        leadMedia={leadMedia[0]} brandingBadgeLabel={brandingBadgeLabel} text={text}
                        breakpoint={this.state.breakpoint} launchModal={this.launchModal}
            />,
            <PromoText key={i++} config={config} link={link} text={text} theme={theme} type={type} noImages={noImages}
                       leadMedia={leadMedia} breakpoint={this.state.breakpoint}
            />
          );
        }
      } else {
        content.push(
          <PromoText key={i++} config={config} link={link} text={text} theme={theme} type={type} noImages={noImages}
                     breakpoint={this.state.breakpoint}
          />
        );
      }
    }

    return (
      <div className={`mt3_row mt3_col-12 mt3_promocard-container ${promoContainerClass} ${kickerStyle} ${additionalClasses}`}
           ref='promocardContainer'>
        {content}
      </div>
    );
  }

}

Story.PropTypes = {
  itemId: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  leadMedia: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      aspectRatio: PropTypes.number,
      altText: PropTypes.string,
      srcset: PropTypes.array
    }) ||
    PropTypes.shape({
      guid: PropTypes.string.isRequired,
      account: PropTypes.string,
      directLink: PropTypes.string
    })),
  text: PropTypes.object,
  brandingBadgeLabel: PropTypes.string,
  modal: PropTypes.bool
};

export default Story;
