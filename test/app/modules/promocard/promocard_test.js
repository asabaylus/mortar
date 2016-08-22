'use strict';

import Pestle from '@natgeo/mortar-pestle';
import PromoCard from '../../../../app/modules/promocard/scripts/MTPromoCardPestle.js';
import MTPromoCardComponent from '../../../../app/modules/promocard/scripts/MTPromoCard.jsx';
import Article from '../../../../app/modules/promocard/components/types/Article.jsx';

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

  describe('React Component', () => {
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
        "leadMedia": {
          "url": "http://placehold.it/800x600",
          "aspectRatio": 0.6667,
          "altText": "Picture of a caiman swimming underwater in Pantanal, Brazil",
          "srcset": ["http://placehold.it/400x300 400w", "http://placehold.it/800x600 800w", "http://placehold.it/1600x1200 1600w"],
          "containerCSSClass": "",
          "inlineStyle": null
        },
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

    it('Should have a containing div with classes', () => {
      expect(wrapper.first().props().className).to.equal("mt3_row mt3_col-12 mt3_promocard-container");
    });

    it('Should have a PromoImage component', () => {
      expect(wrapper.find('PromoImage').type()).to.equal(PromoImage);
    });

    it('Container should have class', () => {
      expect(wrapper.first().props().className).to.equal("mt2_promocard-container");
    });

    it('Should have an Article component', () => {
      expect(wrapper.find('Article').type()).to.equal(Article);
    });

    it('Article component should have props', () => {
      expect(wrapper.find('Article').props().id).to.equal("hero_promocard_0");
      expect(wrapper.find('Article').props().type).to.equal("article");
      expect(wrapper.find('Article').props().config.aspectRatio).to.equal("photo");
      expect(wrapper.find('Article').props().config.sponsored).to.equal(true);
      expect(wrapper.find('Article').props().leadMedia.url).to.equal("http://placehold.it/800x600");
      expect(wrapper.find('Article').props().leadMedia.aspectRatio).to.equal(0.6667);
      expect(wrapper.find('Article').props().leadMedia.altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
      expect(wrapper.find('Article').props().leadMedia.srcset).to.equal(options.leadMedia.srcset);
      expect(wrapper.find('Article').props().text.title).to.equal("This is the title of the card");
      expect(wrapper.find('Article').props().text.dek).to.equal("This is a short dek for the card.");
      expect(wrapper.find('Article').props().text.kicker).to.equal("Kicker");
    });

  });
});
