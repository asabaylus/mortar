'use strict';

import Story from '../../../../app/modules/promocard/components/types/Story.jsx';
import PromoImage from '../../../../app/modules/promocard/components/shared/PromoImage.jsx';
import PromoText from '../../../../app/modules/promocard/components/shared/PromoText.jsx';
import {shallow, mount} from 'enzyme';
import React from 'react';

describe('Story Component', () => {
  describe('Article', () => {
    let wrapper;

    const options = {
      "type": "article",
      "config": {
        "aspectRatio": "photo",
        "sponsored": true
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
      wrapper = mount(<Story
        id={options.id}
        type={options.type}
        config={options.config}
        link={options.link}
        leadMedia={options.leadMedia}
        text={options.text}
        brandingBadgeLabel={options.brandingBadgeLabel}
        sponsorContentLabel={options.sponsorContentLabel}
      />);
      wrapper.setState({ breakpoint: "700" });
    });

    it('Should have a containing div', () => {
      expect(wrapper.find('.mt3_promocard-container').type()).to.equal("div");
    });

    it('Should have a containing div with classes', () => {
      expect(wrapper.find('.mt3_promocard-container').props().className).to.include("mt3_row mt3_col-12 mt3_promocard-container");
    });

    it('Should have a PromoImage component', () => {
      expect(wrapper.find('PromoImage').type()).to.equal(PromoImage);
    });

    it('PromoImage component should have props', () => {
      expect(wrapper.find('PromoImage').props().type).to.equal("article");
      expect(wrapper.find('PromoImage').props().config.aspectRatio).to.equal("photo");
      expect(wrapper.find('PromoImage').props().config.sponsored).to.equal(true);
      expect(wrapper.find('PromoImage').props().leadMedia.url).to.equal("http://placehold.it/800x600");
      expect(wrapper.find('PromoImage').props().leadMedia.aspectRatio).to.equal(0.6667);
      expect(wrapper.find('PromoImage').props().leadMedia.altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[0]).to.equal("http://placehold.it/400x300 400w");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[1]).to.equal("http://placehold.it/800x600 800w");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[2]).to.equal("http://placehold.it/1600x1200 1600w");
    });

    it('Should have a PromoText component', () => {
      expect(wrapper.find('PromoText').type()).to.equal(PromoText);
    });

    it('PromoText component should have props', () => {
      expect(wrapper.find('PromoText').props().text.title).to.equal("This is the title of the card");
      expect(wrapper.find('PromoText').props().text.dek).to.equal("This is a short dek for the card.");
      expect(wrapper.find('PromoText').props().text.kicker).to.equal("Kicker");
    });
  });

  describe('Video', () => {
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

      wrapper = mount(<Story
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
      wrapper.setState({ breakpoint: "700" });
    });

    it('Should have a containing div', () => {
      expect(wrapper.find('.mt3_promocard-container').type()).to.equal("div");
    });

    it('Should have a containing div with classes', () => {
      expect(wrapper.find('.mt3_promocard-container').props().className).to.include("mt3_row mt3_col-12 mt3_promocard-container");
    });

    it('Should have a PromoImage component', () => {
      expect(wrapper.find('PromoImage').type()).to.equal(PromoImage);
    });

    it('PromoImage component should have props', () => {
      expect(wrapper.find('PromoImage').props().type).to.equal("video");
      expect(wrapper.find('PromoImage').props().config.aspectRatio).to.equal("photo");
      expect(wrapper.find('PromoImage').props().config.sponsored).to.equal(true);
      expect(wrapper.find('PromoImage').props().leadMedia.guid).to.equal("47746161-1e00-4514-9b4f-168f0b552c66");
      expect(wrapper.find('PromoImage').props().leadMedia.videoUrl).to.equal("http://news.localhost.nationalgeographic.com:4502/content/dam/natgeo/video/mpx/news/c/ch/cha/chasing-ice-photographer-talks-melting-glaciers.mp4");
      expect(wrapper.find('PromoImage').props().leadMedia.imageUrl).to.equal("http://pmdvod.nationalgeographic.com/NG_Video/996/847/62501_1_1280x720_640x360_177594435674.jpg");
      expect(wrapper.find('PromoImage').props().leadMedia.renditionUrl).to.equal("/content/dam/natgeo/video/mpx/news/c/ch/cha/chasing-ice-photographer-talks-melting-glaciers.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png");
    });

    it('Should have a PromoText component', () => {
      expect(wrapper.find('PromoText').type()).to.equal(PromoText);
    });

    it('PromoText component should have props', () => {
      expect(wrapper.find('PromoText').props().text.title).to.equal("This is the title of the card");
      expect(wrapper.find('PromoText').props().text.dek).to.equal("This is a short dek for the card.");
      expect(wrapper.find('PromoText').props().text.kicker).to.equal("Kicker");
    });

  });

  describe('Gallery', () => {
    let wrapper;

    const options = {
      "id": "hero_promocard_0",
      "type": "gallery",
      "config": {
        "aspectRatio": "photo",
        "sponsored": false,
        "showPlayButton": false,
        "showByline": true
      },
      "link": {
        "url": "http://ngm.nationalgeographic.com/2007/05/zambia-wildlife/eckstrom-text",
        "target": "_blank",
        "trackingCodes": [
          "utm_medium=website",
          "utm_source=site"
        ]
      },
      "leadMedia": [
        {
          "url": "http://placehold.it/800x600",
          "aspectRatio": 0.6667,
          "altText": "This is a picture of of a village in Tibet",
          "srcset": ["http://placehold.it/400x300 400w", "http://placehold.it/800x600 800w", "http://placehold.it/1600x1200 1600w"]
        },
        {
          "url": "http://www.digital-photography-school.com/wp-content/uploads/2011/10/night-sky-astrophotography-1-tm.jpg",
          "aspectRatio": 0.6667,
          "altText": "Picture of a caiman swimming underwater in Pantanal, Brazil"
        }
      ],
      "text": {
        "title": "This is the title of the card",
        "dek": "This is a short dek for the card.",
        "kicker": {
          "label": "Weird & Wild",
          "url": "http://news.nationalgeographic.com/2016/08/shark-attack/",
          "target": "_blank",
          "trackingCodes": "?utm_medium=site&utm_source=ng.com"
        },
        "byline": "This is a great byline",
        "duration": "",
        "publishDate": "Thu Aug 04 13:30:39 EDT 2016",
        "sponsorContentLabel": "This is the sponsor content label"
      },
      "modal": false
    };

    before(() => {

      wrapper = mount(<Story
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
      wrapper.setState({ breakpoint: "700" });
    });

    it('logs to console', () => {
      console.log(wrapper.find('.mt3_promocard-gallery-images--image1').childAt(0));
    });

    it('Should have a containing div', () => {
      expect(wrapper.find('.mt3_promocard-container').type()).to.equal("div");
    });

    it('Should have a containing div with classes', () => {
      expect(wrapper.find('.mt3_promocard-container').props().className).to.include("mt3_row mt3_col-12 mt3_promocard-container");
    });

    it('Should have an images container', () => {
      expect(wrapper.find('.mt3_promocard-gallery-images').type()).to.equal("div");
    });

    it('Should have a CTA button', () => {
      expect(wrapper.find('.mt3_promocard-gallery-cta').type()).to.equal("div");
    });

    it('Should have two PromoImage components', () => {
      expect(wrapper.find('.mt3_promocard-gallery-images--image1').childAt(1).type()).to.equal(PromoImage);
      expect(wrapper.find('.mt3_promocard-gallery-images--image2').childAt(0).type()).to.equal(PromoImage);
    });

    it('First PromoImage component should have props', () => {
      expect(wrapper.find('.mt3_promocard-gallery-images--image1').childAt(1).props().leadMedia.url).to.equal("http://placehold.it/800x600");
      expect(wrapper.find('.mt3_promocard-gallery-images--image1').childAt(1).props().leadMedia.aspectRatio).to.equal(0.6667);
      expect(wrapper.find('.mt3_promocard-gallery-images--image1').childAt(1).props().leadMedia.altText).to.equal("This is a picture of of a village in Tibet");
      expect(wrapper.find('.mt3_promocard-gallery-images--image1').childAt(1).props().leadMedia.srcset[0]).to.equal("http://placehold.it/400x300 400w");
      expect(wrapper.find('.mt3_promocard-gallery-images--image1').childAt(1).props().leadMedia.srcset[1]).to.equal("http://placehold.it/800x600 800w");
      expect(wrapper.find('.mt3_promocard-gallery-images--image1').childAt(1).props().leadMedia.srcset[2]).to.equal("http://placehold.it/1600x1200 1600w");
    });

    it('Second PromoImage component should have props', () => {
      expect(wrapper.find('.mt3_promocard-gallery-images--image2').childAt(0).props().leadMedia.url).to.equal("http://www.digital-photography-school.com/wp-content/uploads/2011/10/night-sky-astrophotography-1-tm.jpg");
      expect(wrapper.find('.mt3_promocard-gallery-images--image2').childAt(0).props().leadMedia.aspectRatio).to.equal(0.6667);
      expect(wrapper.find('.mt3_promocard-gallery-images--image2').childAt(0).props().leadMedia.altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
    });

    it('Should have a PromoText component', () => {
      expect(wrapper.find('PromoText').type()).to.equal(PromoText);
    });

    it('PromoText component should have props', () => {
      expect(wrapper.find('PromoText').props().text.title).to.equal("This is the title of the card");
      expect(wrapper.find('PromoText').props().text.dek).to.equal("This is a short dek for the card.");
      expect(wrapper.find('PromoText').props().text.kicker.label).to.equal("Weird & Wild");
    });

  });

});
