'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';

import {Pestle, Module} from '@natgeo/mortar-pestle';
import PodPromoConfiguratorComponent from './MTPodPromoConfigurator.jsx';

class PodPromoConfigurator extends Module {
  forceUpdate() {
    deepForceUpdate(this.instance);
  }

  init() {
    const props = {
      id: 'f89234jw',
      endpoint: '/mockdata/podpromo/data.json',
      model: {
        id: '12344678',
        type: 'pod',
        config: {
          aspectRatio: '2:1',
          yourshot: true,
          sponsored: true
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
          heading: 'Photo of the Day',
          title: 'This is the title field',
          dek: '<p>This was in the DataModel, but the comopnent does not seem to have a use for it</p>',
          credit: '<p>Photograph by Pete McBride</p>',
          affiliation: 'National Geographic',
          assetSource: '',
          kicker: {
            label: 'Kicker Label',
            url: '/content/news/en_US/weird-wild.html',
            target: '_self',
            trackingCodes: '?utm_medium=site&utm_source=ng.com'
          },
          sponsorContentLabel: 'Sponsor Content'
        },
        cta: {
          url: 'http://www.nationalgeographic.com/photography/photo-of-the-day/',
          title: 'See All',
          target: '_blank',
          seoTitle: 'See more photos'
        }
      }
    };

    this.instance = ReactDOM.render(<PodPromoConfiguratorComponent initialProps={props} />, this.el);
    Pestle.PubSub.subscribe('Configurator.ForceUpdate', () => { this.forceUpdate(); });
  }
}

Pestle.ModuleManager.register('PodPromoConfigurator', PodPromoConfigurator);

export default PodPromoConfigurator;
