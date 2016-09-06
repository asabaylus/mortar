'use strict';

import React, { Component } from 'react';
import Image from '@natgeo/modules-images';
import CTA from '../../button/scripts/CTAButton.jsx';
import ParallaxContainer from './components/parallaxContainer.jsx';
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

    if (url) {
      attrs = {
        href: url + trackingCodes,
        target: linkTarget,
        title: label,
      };
    }

  return (
    url ? <div className='mt3_kicker mt3_podpromo-elevate'><a className="mt3_kicker--link" {...attrs}>{label}</a></div> : <div className="mt3_kicker">{label}</div>
    );
};

  /*
    Tried in vain to accomplish this with css alone, but wasn't able to accomplish the desired layout. The purpuse of this method is to wrap a div around the first letter in the heading. That div is used to style the line that matches the height of the first line in the heading (but not the entire height of the heading if it breaks to two lines).
  */
  wrapFirstLetter(heading) {
    let tmpString = heading.split('');
    tmpString[0] = `<div class="mt3_podpromo-heading-firstletter">${tmpString[0]}</div>`
    return tmpString.join('');
  }

  render() {
    const {
      model: {
        config: componentConfig,
        link: componentLink,
        leadMedia: componentImage,
        text: {
          heading: componentHeading,
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
      <LazyLoad offsetVertical={200}>
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
              label={componentCTA.title}
              link={componentCTA}
              style="naked"
              type="link"
            />
          </div>
          <div className="mt3_podpromo-imagewrapper">
            <ParallaxContainer frameRatio={"2:1"}>
                  <Image
                    aspectRatio={componentImage[0].aspectRatio}
                    frameAspectRatio={"3:2"}
                    lazyLoad={false}
                    altText={componentImage.altText}
                    src={componentImage[0].url}
                    srcset={componentImage[0].srcset}
                  />
            </ParallaxContainer>
          </div>
          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-bottom mt3_podpromo-content-container-left mt3_podpromo-autoindex mt3_podpromo-fade">
            { this.kickerLink(componentKicker) }
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
      </LazyLoad>
    );
  }
}

PodPromoComponent.propTypes = {
  model: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    config: React.PropTypes.shape({
      aspectRatio: React.PropTypes.string,
      yourshot: React.PropTypes.bool,
      sponsored: React.PropTypes.bool,
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
      heading: React.PropTypes.string,
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
      url: React.PropTypes.string,
      title: React.PropTypes.string,
      target: React.PropTypes.string,
      seoTitle: React.PropTypes.string,

    }),
  }).isRequired,
};

export default PodPromoComponent;
