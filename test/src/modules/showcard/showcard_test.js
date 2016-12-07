'use strict';

import React from 'react';
import { shallow, mount } from 'enzyme';

import Pestle from '@natgeo/pestle';
import MTShowCardComponent from '../../../../src/modules/showcard/showCard.js';
import PromoImage from '../../../../src/modules/promocard/components/shared/PromoImage.js';
import ShowCard from '../../../../src/modules/showcard/showCardPestle.js';


describe('ShowCard', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div data-pestle-module='ShowCard'>
        <script type="text/json" data-pestle-options>
          {
            "type": "show",
            "config": {
              "cardAspectRatio": "16:9",
              "sponsored": false,
              "showPlayButton": false,
              "channelMapping": true,
              "showByline": true
            },
            "text": {
              "brandingBadge": "Heading"
            }
          }
        </script>
      </div>`

      insertFixture(html);
      Pestle.init();
    });

    after(() => {
      removeFixture();
    });

    it('should be a class', () => {
      expect(ShowCard).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('ShowCard')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('ShowCard')).to.have.length.of.at.least(1);
    });
  });

  describe('React Component: Show Card', () => {
    let wrapper;

    const options = {
      "id": "hero_promocard_0",
      "type": "show",
      "config": {
        "cardAspectRatio": "16:9",
        "channelMapping":true
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
        "brandingBadge": "This is a heading",
        "title": "This is the show title",
        "time": "8pm"
      }
    };

    before(() => {
      wrapper = mount(<MTShowCardComponent {...options} onClick={() => {}} />);
    });

    it('Should have a containing div', () => {
      expect(wrapper.find('.mt3_showcard-container').type()).to.equal("div");
    });

    it('Should have a containing div with classes', () => {
      expect(wrapper.find('.mt3_showcard-container').props().className).to.include("mt3_row mt3_col-12 mt3_showcard-container");
    });

    it('Should have a containing div with expected aspect ratio class', () => {
      expect(wrapper.find('.mt3_showcard-container').props().className).to.include("mt3_intratio--broadcast");
    });

    it('Should have a containing div with expected channel branding theme class', () => {
      expect(wrapper.find('.mt3_showcard-container').props().className).to.include("mt3_channelbranding--default");
    });

    it('should have the correct title value', () => {
      expect(wrapper.find('.mt3_showcard-title').html()).to.equal('<h2 class="mt3_showcard-title">This is the show title</h2>');
    });

    it('Should have a PromoImage component', () => {
      expect(wrapper.find('PromoImage').type()).to.equal(PromoImage);
    });

    it('PromoImage component should have props', () => {
      expect(wrapper.find('PromoImage').props().leadMedia.url).to.equal("http://placehold.it/800x600");
      expect(wrapper.find('PromoImage').props().leadMedia.aspectRatio).to.equal(0.6667);
      expect(wrapper.find('PromoImage').props().leadMedia.altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[0]).to.equal("http://placehold.it/400x300 400w");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[1]).to.equal("http://placehold.it/800x600 800w");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[2]).to.equal("http://placehold.it/1600x1200 1600w");
    });
  });
});
