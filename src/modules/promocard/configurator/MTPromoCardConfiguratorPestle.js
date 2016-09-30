'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';

import {Pestle, Module} from '@natgeo/pestle';
import PromoCardConfiguratorComponent from './MTPromoCardConfigurator';

class PromoCardConfigurator extends Module {
  forceUpdate() {
    deepForceUpdate(this.instance);
  }

  init() {
    const props = {
      itemId: 'hero_promocard_0',
      type: 'article',
      config: {
        cardAspectRatio: '3:2',
        sponsored: false,
        showPlayButton: false,
        channelMapping: true,
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
      leadMedia: [
        {
          url: 'http://placehold.it/800x600',
          aspectRatio: 0.6667,
          altText: 'Picture of a caiman swimming underwater in Pantanal, Brazil',
          srcset: ['http://placehold.it/400x300 400w', 'http://placehold.it/800x600 800w', 'http://placehold.it/1600x1200 1600w'],
          guid: '47746161-1e00-4514-9b4f-168f0b552c66',
          videoUrl: 'http://news.localhost.nationalgeographic.com:4502/content/dam/natgeo/video/mpx/news/c/ch/cha/chasing-ice-photographer-talks-melting-glaciers.mp4',
          imageUrl: 'http://pmdvod.nationalgeographic.com/NG_Video/996/847/62501_1_1280x720_640x360_177594435674.jpg',
          renditionUrl: '/content/dam/natgeo/video/mpx/news/c/ch/cha/chasing-ice-photographer-talks-melting-glaciers.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png'
        },
        {
          url: 'http://placehold.it/800x600',
          aspectRatio: '2048:1365',
          altText: 'Picture of a caiman swimming underwater in Pantanal, Brazil',
          srcset: ['http://www.nationalgeographic.com/content/dam/parks/finals/glacier-hero-1.adapt.470.jpg 470w',
  'http://www.nationalgeographic.com/content/dam/parks/finals/glacier-hero-1.adapt.885.jpg 885w',
  'http://www.nationalgeographic.com/content/dam/parks/finals/glacier-hero-1.adapt.1190.jpg 1190w',
  'http://www.nationalgeographic.com/content/dam/parks/finals/glacier-hero-1.adapt.1900.jpg 1900w']
        }
      ],
      cta: {
        linkUrl: 'http://www.nationalgeographic.com/magazine/2016/05/yellowstone-national-parks-wildlife-restoration/',
        linkText: 'This is the CTA Title',
        linkTarget: '_blank',
        linkSeoTitle: 'This is an SEO title'
      },
      text: {
        title: 'This is the title of the card',
        dek: 'This is a short dek for the card.',
        kicker: {
          label: 'Weird & Wild',
          style: '',
          url: 'http://news.nationalgeographic.com/2016/08/shark-attack/',
          target: '_self',
          trackingCodes: '?utm_medium=site&utm_source=ng.com'
        },
        brandingBadge: 'Heading',
        time: 'Sunday 8pm',
        duration: '',
        photoCount: 12,
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
