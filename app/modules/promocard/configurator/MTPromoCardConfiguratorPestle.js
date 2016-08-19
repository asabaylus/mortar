'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';

import {Pestle, Module} from '@natgeo/mortar-pestle';
import PromoCardConfiguratorComponent from './MTPromoCardConfigurator.jsx';

class PromoCardConfigurator extends Module {
  forceUpdate() {
    deepForceUpdate(this.instance);
  }

  init() {
    const props = {
      id: 'hero_promocard_0',
      type: 'article',
      config: {
        aspectRatio: 'photo',
        sponsored: false,
        showPlayButton: false,
        showByline: true
      },
      link: {
        url: 'http://ngm.nationalgeographic.com/2007/05/zambia-wildlife/eckstrom-text',
        target: '_blank',
        trackingCodes: [
          'utm_medium=website',
          'utm_source=site'
        ]
      },
      leadMedia: [{
        url: 'http://placehold.it/800x600',
        aspectRatio: 0.6667,
        altText: 'Picture of a caiman swimming underwater in Pantanal, Brazil',
        srcset: ['http://placehold.it/400x300 400w', 'http://placehold.it/800x600 800w', 'http://placehold.it/1600x1200 1600w']
      }],
      text: {
        title: 'This is the title of the card',
        dek: 'This is a short dek for the card.',
        kicker: {
          label: 'Weird & Wild',
          url: 'http://news.nationalgeographic.com/2016/08/shark-attack/',
          target: '_self',
          trackingCodes: '?utm_medium=site&utm_source=ng.com'
        },
        duration: '',
        publishDate: 'Thu Aug 04 13:30:39 EDT 2016',
        sponsorContentLabel: 'This is the Sponsor Content Label'
      },
      onClick: () => {},
      modal: false,
      brandingBadgeLabel: ''
    };

    this.instance = ReactDOM.render(<PromoCardConfiguratorComponent initialProps={props} />, this.el);
    Pestle.PubSub.subscribe('Configurator.ForceUpdate', () => { this.forceUpdate(); });
  }
}

Pestle.ModuleManager.register('PromoCardConfigurator', PromoCardConfigurator);

export default PromoCardConfigurator;
