'use strict';

import React, { Component } from 'react';
import Image from '@natgeo/modules-images';
import CTA from '../button/CTAButton';
import BackgroundImageParallax from '../../util/parallax/backgroundImageParallax';
import LazyLoad from 'react-lazy-load';
import EQ from '../../util/EQ.js';
import classNames from 'classnames';

class PodPromoComponent extends Component {

  kickerLink(args) {
    const {
      trackingCodes,
      target: linkTarget,
      url,
      label,
    } = args;

    let attrs;

    if (url && trackingCodes && linkTarget && label) {
      attrs = {
        href: url + trackingCodes,
        target: linkTarget,
        title: label,
      };
      return (
        url ? <div className='mt3_kicker mt3_podpromo-elevate'><a className="mt3_kicker--link" {...attrs} dangerouslySetInnerHTML={{__html: label}} /></div> : <div className="mt3_kicker mt3_podpromo-elevate" dangerouslySetInnerHTML={{__html: label}} />
      );
    } else {
      return (
        <div className="mt3_kicker mt3_podpromo-elevate" dangerouslySetInnerHTML={{__html: label}} />
      );
    }
  };

  /*
    Tried in vain to accomplish this with css alone, but wasn't able to accomplish the desired layout. The purpuse of this method is to wrap a div around the first letter in the heading. That div is used to style the line that matches the height of the first line in the heading (but not the entire height of the heading if it breaks to two lines).
  */
  wrapFirstLetter(heading) {
    if (heading) {
      let tmpString = heading.split('');
      tmpString[0] = `<div class="mt3_podpromo-heading-firstletter">${tmpString[0]}</div>`
      return tmpString.join('');
    }
  }

  render() {
    const {
      model: {
        config: componentConfig,
        link: componentLink,
        leadMedia: componentImage,
        text: {
          brandingBadge: componentHeading,
          title: componentTitle,
          credit: photoCredit,
          assetSource: photoSource,
          kicker: componentKicker,
          sponsorContentLabel: sponsorLabel,
        },
        cta: componentCTA,
      },
    } = this.props;

    const mortarCTAModel = (componentCTA) ? {
      url: componentCTA.linkUrl,
      title: componentCTA.linkText,
      target: componentCTA.linkTarget,
      seoTitle: componentCTA.linkSeoTitle
    } : null;

    let componentUrl = (componentLink.url) ? componentLink.url : null;

    if (componentUrl && componentLink.trackingCodes) {
      componentUrl = componentUrl + componentLink.trackingCodes;
    }

    let headerClassNames = classNames({
      'mt3_podpromo-heading': true,
      'mt3_podpromo-heading--noCTA': !(mortarCTAModel && mortarCTAModel.url)
    });

    const componentIcon = {
      name: '#plus',
      align: 'right',
      alt: 'Plus Icon'
    };

    const PODSizes = {
      '1': 'mt3_podpromo mt3_podpromo--mobile',
      '768': 'mt3_podpromo mt3_podpromo--tablet',
      '1024': 'mt3_podpromo mt3_podpromo--desktop',
      '1280': 'mt3_podpromo mt3_podpromo--largedesktop'
    };

    return (
      <EQ elementRef="podpromo" sizeClasses={PODSizes}>
          {
            (componentUrl) ? <a href={componentUrl} target={componentLink.target} className="mt3_podpromo-container-link" /> : null
          }
          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-top mt3_podpromo-content-container-left mt3_podpromo-fade">
            <div className={headerClassNames} dangerouslySetInnerHTML={{__html: this.wrapFirstLetter(componentHeading)}} />
          </div>
          { mortarCTAModel && mortarCTAModel.url ?
            <div className="mt3_podpromo-content-container mt3_podpromo-content-container-top mt3_podpromo-content-container-right mt3_podpromo-ctacontainer">
              <div className="mt3_podpromo-ctaBtn-wrapper">
                <CTA
                  icon={componentIcon}
                  label={mortarCTAModel.title}
                  link={mortarCTAModel}
                  style="naked"
                  type="link"
                />
              </div>
            </div>
            : null
          }
          <div className="mt3_podpromo-imagewrapper">
            <BackgroundImageParallax frameRatio={"16:9"} enableParallax={componentConfig.parallax}>
                <Image
                  aspectRatio={componentImage[0].aspectRatio}
                  frameAspectRatio={componentConfig.parallax ? '3:2' : '16:9'}
                  lazyLoad={true}
                  altText={componentImage.altText}
                  src={componentImage[0].url}
                  srcset={componentImage[0].srcset}
                />
            </BackgroundImageParallax>
          </div>
          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-bottom mt3_podpromo-content-container-left mt3_podpromo-autoindex mt3_podpromo-fade">
            {
              componentConfig.sponsored ? <div className='mt3_kicker mt3_kicker--sponsored'>{sponsorLabel}</div> : componentKicker ? this.kickerLink(componentKicker) : null
            }
            <div className="mt3_podpromo-title" dangerouslySetInnerHTML={{__html: componentTitle}} />
          </div>

          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-bottom mt3_podpromo-content-container-right mt3_podpromo-fade">
            <div className="mt3_podpromo-photocredit-container">

              {
                photoCredit ? <div className="mt3_caption-creditname mt3_podpromo-photocredit" dangerouslySetInnerHTML={{__html: photoCredit}} /> : null
              }
              {
                photoSource ? <div className="mt3_caption-credit mt3_podpromo-source" dangerouslySetInnerHTML={{__html: photoSource}} /> : null
              }
            </div>
          </div>
      </EQ>
    );
  }
}

PodPromoComponent.propTypes = {
  model: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    config: React.PropTypes.shape({
      parallax: React.PropTypes.bool,
      sponsored: React.PropTypes.bool,
      yourshot: React.PropTypes.bool,
    }),
    link: React.PropTypes.shape({
      url: React.PropTypes.string,
      target: React.PropTypes.string,
      trackingCodes: React.PropTypes.string,
    }),
    // come back for leadMedia for shaping
    leadMedia: React.PropTypes.arrayOf(React.PropTypes.shape({
      imageUrl: React.PropTypes.string,
      title: React.PropTypes.string,
      altText: React.PropTypes.string,
      aspectRatio: React.PropTypes.number,
      height: React.PropTypes.number,
      width: React.PropTypes.number,
      srcset: React.PropTypes.array,
    })),
    text: React.PropTypes.shape({
      brandingBadge: React.PropTypes.string,
      title: React.PropTypes.string,
      dek: React.PropTypes.string,
      credit: React.PropTypes.string,
      assetSource: React.PropTypes.string,
      kicker: React.PropTypes.shape({
        label: React.PropTypes.string,
        url: React.PropTypes.string,
        target: React.PropTypes.string,
        trackingCodes: React.PropTypes.string,
      }),
      sponsoredContentLabel: React.PropTypes.string,
    }),
    cta: React.PropTypes.shape({
      linkUrl: React.PropTypes.string,
      linkText: React.PropTypes.string,
      linkTarget: React.PropTypes.string,
      linkSeoTitle: React.PropTypes.string,

    }),
  }).isRequired,
};

export default PodPromoComponent;
