'use strict';

import React, { Component } from 'react';
import Image from '@natgeo/modules-images';
import CTA from '../../button/scripts/CTAButton.jsx';
import Kicker from './components/Kicker.jsx';
import LazyLoad from 'react-lazy-load';

class PodPromoComponent extends Component {

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

    return (
      <LazyLoad offsetVertical={200}>
        <div className="mt3_podpromo">
          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-top mt3_podpromo-content-container-left">
            <div className="mt3_podpromo-heading" dangerouslySetInnerHTML={{__html: componentHeading}} />
          </div>
          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-top mt3_podpromo-content-container-right">
            <CTA
              label={componentCTA.title}
              link={componentCTA}
              style="naked"
              type="link"
            />
          </div>
          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-bottom mt3_podpromo-content-container-left">
            <Kicker label={componentKicker.label} url={componentKicker.url} target={componentKicker.target} trackingCodes={componentKicker.trackingCodes} />
            <div className="mt3_podpromo-title" dangerouslySetInnerHTML={{__html: componentTitle}} />
          </div>

          <div className="mt3_podpromo-content-container mt3_podpromo-content-container-bottom mt3_podpromo-content-container-right">
            <div className="mt3_podpromo-photocredit" dangerouslySetInnerHTML={{__html: photoCredit}} />
            <div className="mt3_podpromo-affiliation" dangerouslySetInnerHTML={{__html: photoAffiliation}} />
          </div>

          <Image
            aspectRatio={componentImage[0].aspectRatio}
            frameAspectRatio={componentConfig.aspectRatio}
            lazyLoad={false}
            altText={componentImage.altText}
            src={componentImage[0].url}
            srcset={componentImage[0].srcset}
          />
          {
            (componentLink && componentLink.url) ? <a href={componentLink.url+componentLink.trackingCodes} target={componentLink.target} className="mt3_podpromo-container-link" /> : null
          }
        </div>
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
