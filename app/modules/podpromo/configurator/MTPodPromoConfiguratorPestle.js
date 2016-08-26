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
          aspectRatio: 0.4824561403508772,
          height: 550,
          width: 1140,
          srcset: [
            'http://placehold.it/80x39.jpg 80w',
            'http://placehold.it/133x64.jpg 133w',
            'http://placehold.it/152x73.jpg 152w',
            'http://placehold.it/162x78.jpg 162w',
            'http://placehold.it/210x101.jpg 210w',
            'http://placehold.it/224x108.jpg 224w',
            'http://placehold.it/225x109.jpg 225w',
            'http://placehold.it/280x135.jpg 280w',
            'http://placehold.it/352x170.jpg 352w',
            'http://placehold.it/470x227.jpg 470w',
            'http://placehold.it/536x259.jpg 536w',
            'http://placehold.it/590x285.jpg 590w',
            'http://placehold.it/676x326.jpg 676w',
            'http://placehold.it/710x343.jpg 710w',
            'http://placehold.it/768x371.jpg 768w',
            'http://placehold.it/885x427.jpg 885w',
            'http://placehold.it/945x456.jpg 945w',
            'http://placehold.it/1190x574.jpg 1190w',
            'http://placehold.it/1900x917.jpg 1900w'
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
