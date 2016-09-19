'use strict';

import Pestle from '@natgeo/pestle';
import PromoCard from '../../../../src/modules/promocard/MTPromoCardPestle.js';
import MTPromoCardComponent from '../../../../src/modules/promocard/MTPromoCard.js';
import Story from '../../../../src/modules/promocard/components/types/Story.js';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('MTPromoCard', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div
        data-pestle-module='PromoCard'
        ></div>`

      insertFixture(html);
      Pestle.init();
    });

    after(() => {
      removeFixture();
    });

    it('should be a class', () => {
      expect(PromoCard).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('PromoCard')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('PromoCard')).to.have.length.of.at.least(1);
    });
  });

  describe('React Component: Story Card', () => {
    let wrapper;

    const options = {
        "id": "hero_promocard_0",
        "type": "article",
        "config": {
          "aspectRatio": "photo",
          "sponsored": true
        },
        "link": {
          "url": "http://ngm.nationalgeographic.com/2007/05/zambia-wildlife/eckstrom-text",
          "target": "_blank",
          "trackingCodes": [
            "utm_medium=website",
            "utm_source=site"
          ]
        },
        "leadMedia": [{
          "url": "http://placehold.it/800x600",
          "aspectRatio": 0.6667,
          "altText": "Picture of a caiman swimming underwater in Pantanal, Brazil",
          "srcset": ["http://placehold.it/400x300 400w", "http://placehold.it/800x600 800w", "http://placehold.it/1600x1200 1600w"]
        }],
        "text": {
          "title": "This is the title of the card",
          "dek": "This is a short dek for the card.",
          "kicker": "Kicker"
        },
        "modal": false,
        "brandingBadgeLabel": "This is a cool branding badge label",
        "sponsorContentLabel": "This is the Sponsor Content Label"
    };

    before(() => {

      wrapper = shallow(<MTPromoCardComponent
        id={options.id}
        type={options.type}
        config={options.config}
        link={options.link}
        leadMedia={options.leadMedia}
        text={options.text}
        cta={options.cta}
        brandingBadgeLabel={options.brandingBadgeLabel}
        sponsorContentLabel={options.sponsorContentLabel}
        modal={options.modal}
        onClick={()=>{}}
      />);
    });

    it('Should have a Story component', () => {
      expect(wrapper.find('Story').type()).to.equal(Story);
    });

  });

});
