'use strict';

import React, { Component } from 'react';
import Image from '@natgeo/modules-images';
import CTA from '../button/CTAButton';
import BackgroundImageParallax from '../../util/parallax/backgroundImageParallax';
import LazyLoad from 'react-lazy-load';
import ElementQuery from 'react-element-query';

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
          affiliation: photoAffiliation,
          assetSource: photoSource,
          kicker: componentKicker,
          sponsorContentLabel: sponsorLabel,
        },
        cta: componentCTA,
      },
    } = this.props;

    const mortarCTAModel = {
      url: componentCTA.linkUrl,
      title: componentCTA.linkText,
      target: componentCTA.linkTarget,
      seoTitle: componentCTA.linkSeoTitle
    }

    const componentIcon = {
      name: '#plus',
      align: 'right',
      alt: 'Plus Icon'
    };

    const elementQueries = [
      {
        name: 'mt3_podpromo--mobile',
        width: 1
      },
      {
        name: 'mt3_podpromo--tablet',
        width: 768
      },
      {
        name: 'mt3_podpromo--desktop',
        width: 1024
      },
      {
        name: 'mt3_podpromo--largedesktop',
        width: 1280
      },
    ];


    return (
      <ElementQuery sizes={elementQueries}>
        <div className="mt3_podpromo">
          {
            (componentLink && componentLink.url) ? <a href={componentLink.url+componentLink.trackingCodes} target={componentLink.target} className="mt3_podpromo-container-link" /> : null
          }
          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-top mt3_podpromo-content-container-left mt3_podpromo-fade">
            <div className="mt3_podpromo-heading" dangerouslySetInnerHTML={{__html: this.wrapFirstLetter(componentHeading)}} />
          </div>
          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-top mt3_podpromo-content-container-right mt3_podpromo-ctacontainer">
            <CTA
              icon={componentIcon}
              label={mortarCTAModel.title}
              link={mortarCTAModel}
              style="naked"
              type="link"
            />
          </div>
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
              componentKicker ? this.kickerLink(componentKicker) : null
            }
            <div className="mt3_podpromo-title" dangerouslySetInnerHTML={{__html: componentTitle}} />
          </div>

          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-bottom mt3_podpromo-content-container-right mt3_podpromo-fade">
            <div className="mt3_podpromo-photocredit-container">

              {
                photoCredit ? <div className="mt3_caption-creditname mt3_podpromo-photocredit" dangerouslySetInnerHTML={{__html: photoCredit}} /> : null
              }
              {
                photoAffiliation ? <div className="mt3_caption-credit mt3_podpromo-affiliation" dangerouslySetInnerHTML={{__html: photoAffiliation}} /> : null
              }
            </div>
          </div>
        </div>
      </ElementQuery>
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
      affiliation: React.PropTypes.string,
      assestSource: React.PropTypes.string,
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
