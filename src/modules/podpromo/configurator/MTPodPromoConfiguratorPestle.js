'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';

import {Pestle, Module} from '@natgeo/pestle';
import PodPromoConfiguratorComponent from './MTPodPromoConfigurator';

class PodPromoConfigurator extends Module {
  forceUpdate() {
    deepForceUpdate(this.instance);
  }

  init() {
    const props = {
      endpoint: '/mockdata/podpromo/data.json',
      model: {
        type: 'pod',
        config: {
          parallax: true,
          sponsored: true,
          yourshot: true
        },
        link: {
          url: 'http://www.nationalgeographic.com/photography/photo-of-the-day/08/some-image',
          target: '_self',
          trackingCodes: '?utm_medium=site&utm_site=natgeo-hp'
        },
        leadMedia: [{
          imageUrl: 'http://placehold.it/1140x550.jpg',
          title: 'This is the image title in DAM',
          altText: 'Picture of a stream of water flowing through the narrow Olo Canyon in Arizona',
          aspectRatio: 0.66015625,
          height: 550,
          width: 1140,
          srcset: [
            'http://www.nationalgeographic.com/content/dam/travel/rights-exempt/Travel-2016/nature-contest-promos/orangutan-leaf-bali.adapt.768.1.JPG'
          ]
        }],
        text: {
          brandingBadge: 'Photo of the Day',
          title: 'This is the title field',
          dek: '<p>This was in the DataModel, but the comopnent does not seem to have a use for it</p>',
          credit: '<p>Photograph by Pete McBride</p>',
          assetSource: 'National Geographic',
          kicker: {
            label: '<a href="http://www.google.com">Kicker Label</a>'
          },
          sponsorContentLabel: 'Sponsor Content'
        },
        cta: {
          linkUrl: 'http://www.nationalgeographic.com/photography/photo-of-the-day/',
          linkText: 'See All but be long',
          linkTarget: '_blank',
          linkSeoTitle: 'See more photos'
        }
      }
    };

    this.instance = ReactDOM.render(<PodPromoConfiguratorComponent initialProps={props} />, this.el);
    Pestle.PubSub.subscribe('Configurator.ForceUpdate', () => { this.forceUpdate(); });
  }
}

Pestle.ModuleManager.register('PodPromoConfigurator', PodPromoConfigurator);

export default PodPromoConfigurator;
