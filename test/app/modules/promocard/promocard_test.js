'use strict';

import Pestle from '@natgeo/mortar-pestle';
import PromoCard from '../../../../app/modules/promocard/scripts/MTPromoCardPestle.js';
import MTPromoCardComponent from '../../../../app/modules/promocard/scripts/MTPromoCard.jsx';
import Article from '../../../../app/modules/promocard/components/types/Article.jsx';
import VideoCard from '../../../../app/modules/promocard/components/types/VideoCard.jsx';

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

  describe('React Component: Article Card', () => {
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
          "srcset": ["http://placehold.it/400x300 400w", "http://placehold.it/800x600 800w", "http://placehold.it/1600x1200 1600w"],
          "containerCSSClass": "",
          "inlineStyle": null
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

    it('Should have an Article component', () => {
      expect(wrapper.find('Article').type()).to.equal(Article);
    });

    it('Article component should have props', () => {
      expect(wrapper.find('Article').props().id).to.equal("hero_promocard_0");
      expect(wrapper.find('Article').props().type).to.equal("article");
      expect(wrapper.find('Article').props().config.aspectRatio).to.equal("photo");
      expect(wrapper.find('Article').props().config.sponsored).to.equal(true);
      expect(wrapper.find('Article').props().leadMedia[0].url).to.equal("http://placehold.it/800x600");
      expect(wrapper.find('Article').props().leadMedia[0].aspectRatio).to.equal(0.6667);
      expect(wrapper.find('Article').props().leadMedia[0].altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
      expect(wrapper.find('Article').props().leadMedia[0].srcset).to.equal(options.leadMedia[0].srcset);
      expect(wrapper.find('Article').props().text.title).to.equal("This is the title of the card");
      expect(wrapper.find('Article').props().text.dek).to.equal("This is a short dek for the card.");
      expect(wrapper.find('Article').props().text.kicker).to.equal("Kicker");
    });
  });

  describe('React Component: Video Card', () => {
    let wrapper;

    const options = {
      "id": "hero_promocard_0",
      "type": "video",
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
        "guid": "47746161-1e00-4514-9b4f-168f0b552c66",
        "videoUrl": "http://news.localhost.nationalgeographic.com:4502/content/dam/natgeo/video/mpx/news/c/ch/cha/chasing-ice-photographer-talks-melting-glaciers.mp4",
        "imageUrl": "http://pmdvod.nationalgeographic.com/NG_Video/996/847/62501_1_1280x720_640x360_177594435674.jpg",
        "renditionUrl": "/content/dam/natgeo/video/mpx/news/c/ch/cha/chasing-ice-photographer-talks-melting-glaciers.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png"
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

    it('Should have an VideoCard component', () => {
      expect(wrapper.find('VideoCard').type()).to.equal(VideoCard);
    });

    it('VideoCard component should have props', () => {
      expect(wrapper.find('VideoCard').props().id).to.equal("hero_promocard_0");
      expect(wrapper.find('VideoCard').props().type).to.equal("video");
      expect(wrapper.find('VideoCard').props().config.aspectRatio).to.equal("photo");
      expect(wrapper.find('VideoCard').props().config.sponsored).to.equal(true);
      expect(wrapper.find('VideoCard').props().leadMedia[0].guid).to.equal("47746161-1e00-4514-9b4f-168f0b552c66");
      expect(wrapper.find('VideoCard').props().leadMedia[0].videoUrl).to.equal("http://news.localhost.nationalgeographic.com:4502/content/dam/natgeo/video/mpx/news/c/ch/cha/chasing-ice-photographer-talks-melting-glaciers.mp4");
      expect(wrapper.find('VideoCard').props().leadMedia[0].imageUrl).to.equal("http://pmdvod.nationalgeographic.com/NG_Video/996/847/62501_1_1280x720_640x360_177594435674.jpg");
      expect(wrapper.find('VideoCard').props().leadMedia[0].renditionUrl).to.equal("/content/dam/natgeo/video/mpx/news/c/ch/cha/chasing-ice-photographer-talks-melting-glaciers.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png");
      expect(wrapper.find('VideoCard').props().text.title).to.equal("This is the title of the card");
      expect(wrapper.find('VideoCard').props().text.dek).to.equal("This is a short dek for the card.");
      expect(wrapper.find('VideoCard').props().text.kicker).to.equal("Kicker");
    });
  });
});
