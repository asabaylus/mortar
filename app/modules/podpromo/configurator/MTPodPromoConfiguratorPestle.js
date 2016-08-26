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
            'http://baconmockup.com/80/39/ 80w',
            'http://baconmockup.com/133/64/ 133w',
            'http://baconmockup.com/152/73/ 152w',
            'http://baconmockup.com/162/78/ 162w',
            'http://baconmockup.com/210/101/ 210w',
            'http://baconmockup.com/224/108/ 224w',
            'http://baconmockup.com/225/109/ 225w',
            'http://baconmockup.com/280/135/ 280w',
            'http://baconmockup.com/352/170/ 352w',
            'http://baconmockup.com/470/227/ 470w',
            'http://baconmockup.com/536/259/ 536w',
            'http://baconmockup.com/590/285/ 590w',
            'http://baconmockup.com/676/326/ 676w',
            'http://baconmockup.com/710/343/ 710w',
            'http://baconmockup.com/768/371/ 768w',
            'http://baconmockup.com/885/427/ 885w',
            'http://baconmockup.com/945/456/ 945w',
            'http://baconmockup.com/1190/574/ 1190w',
            'http://baconmockup.com/1900/917/ 1900w'
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
