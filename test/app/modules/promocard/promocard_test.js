'use strict';

import Pestle from '@natgeo/mortar-pestle';
import PromoCard from '../../../../app/modules/promocard/scripts/MTPromoCardPestle.js';
import MTPromoCardComponent from '../../../../app/modules/promocard/scripts/MTPromoCard.jsx';
import PromoImage from '../../../../app/modules/promocard/components/shared/PromoImage.jsx';
import PromoText from '../../../../app/modules/promocard/components/shared/PromoText.jsx';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe.only('MTPromoCard', () => {
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

    const options =
      {
        "image": {
          "url": "http://placehold.it/800x600",
          "position": "above",
          "height": "500",
          "containerCSSClass": null,
          "inlineStyle": null
        },
        "text": {
          "containerCSSClass": null,
          "inlineStyle": null
        },
        "modal": false,
        "target": "_blank",
        "leadMedia": {
          "url": "http://placehold.it/350x150",
          "aspectRatio": 0.6667,
          "height": 150,
          "width": 350,
          "internal": false
        },
        "title": "This is the title of the card",
        "hideTitle": false,
        "dek": "This is a short dek for the card.",
        "hideDek": false,
        "series": "Series",
        "hideSeries": false,
        "byline": "This is a great byline",
        "hideByline": false,
        "brandingBadgeLabel": "This is a cool branding badge label",
        "sponsorContent": true,
        "sponsorContentLabel": "This is the Sponsor Content Label",
        "video": true
      };

    before(() => {

      wrapper = shallow(<MTPromoCardComponent
        image={options.image}
        text={options.text}
        modal={options.modal}
        target={options.target}
        leadMedia={options.leadMedia}
        title={options.title}
        hideTitle={options.hideTitle}
        dek={options.dek}
        hideDek={options.hideDek}
        series={options.series}
        hideSeries={options.hideSeries}
        byline={options.byline}
        hideByline={options.hideByline}
        brandingBadgeLabel={options.brandingBadgeLabel}
        sponsorContent={options.sponsorContent}
        sponsorContentLabel={options.sponsorContentLabel}
        video={options.video}
      />);
    });

    it('Should have a containing div with classes', () => {
      expect(wrapper.first().props().className).to.equal("mt2_row mt2_col-12 mt2_promocard-container");
    });

    it('Should have a PromoImage component', () => {
      expect(wrapper.find('PromoImage').type()).to.equal(PromoImage);
    });

    it('PromoImage component should have props', () => {
      expect(wrapper.find('PromoImage').props().brandingBadgeLabel).to.equal("This is a cool branding badge label");
      expect(wrapper.find('PromoImage').props().image).to.equal(options.image);
      expect(wrapper.find('PromoImage').props().sponsorContent).to.equal(true);
      expect(wrapper.find('PromoImage').props().sponsorContentLabel).to.equal("This is the Sponsor Content Label");
      expect(wrapper.find('PromoImage').props().video).to.equal(true);
    });

    it('Should have a PromoText component', () => {
      expect(wrapper.find('PromoText').type()).to.equal(PromoText);
    });

    it('PromoText component should have props', () => {
      expect(wrapper.find('PromoText').props().byline).to.equal("This is a great byline");
      expect(wrapper.find('PromoText').props().dek).to.equal("This is a short dek for the card.");
      expect(wrapper.find('PromoText').props().hideByline).to.equal(false);
      expect(wrapper.find('PromoText').props().hideDek).to.equal(false);
      expect(wrapper.find('PromoText').props().hideSeries).to.equal(false);
      expect(wrapper.find('PromoText').props().hideTitle).to.equal(false);
      expect(wrapper.find('PromoText').props().series).to.equal("Series");
      expect(wrapper.find('PromoText').props().title).to.equal("This is the title of the card");
    });

  });
});
