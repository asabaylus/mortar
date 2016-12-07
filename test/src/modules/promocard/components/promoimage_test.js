'use strict';

import React from 'react';
import { mount } from 'enzyme';

import PromoImage from '../../../../../src/modules/promocard/components/shared/PromoImage.js';


describe('PromoImage Component', () => {
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
      link: {
        url: "http://www.google.com",
        target: '_self'
      }
    };

    before(() => {
      wrapper = mount(<PromoImage
        type={options.type}
        config={options.config}
        leadMedia={options.leadMedia[0]}
        link={options.link}
      />);
    });

    it('Should log to console', () => {
      console.log(wrapper.debug());
      console.log(wrapper.find('PictureFill').childAt(1).props());
    });

    it('Should be of type article', () => {
      expect(wrapper.find('PromoImage').props().type).to.equal("article");
    });

    it('Should have config with props', () => {
      expect(wrapper.find('PromoImage').props().config.aspectRatio).to.equal("photo");
      expect(wrapper.find('PromoImage').props().config.sponsored).to.equal(true);
    });

    it('Should have leadMedia with props', () => {
      expect(wrapper.find('PromoImage').props().leadMedia.url).to.equal("http://placehold.it/800x600");
      expect(wrapper.find('PromoImage').props().leadMedia.aspectRatio).to.equal(0.6667);
      expect(wrapper.find('PromoImage').props().leadMedia.altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[0]).to.equal("http://placehold.it/400x300 400w");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[1]).to.equal("http://placehold.it/800x600 800w");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[2]).to.equal("http://placehold.it/1600x1200 1600w");
    });

    it('Should have link with props', () => {
      expect(wrapper.find('PromoImage').props().link.url).to.equal("http://www.google.com");
      expect(wrapper.find('PromoImage').props().link.target).to.equal("_self");
    });

    it('Should have an Image component', () => {
      expect(wrapper.find('Image').type()).to.be.a("function");
    });

    it('Image component should have props', () => {
      expect(wrapper.find('Image').props().src).to.equal("http://placehold.it/800x600");
      expect(wrapper.find('Image').props().altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
    });

    it('Should have placeholder div', () => {
      expect(wrapper.find('Frame').childAt(0).type()).to.equal("div");
      expect(wrapper.find('Frame').childAt(0).props().className).to.equal("modules-images__placeholder");
    });

    it('Should have PictureFill component', () => {
      expect(wrapper.find('PictureFill').type()).to.be.a("function");
    });

    it('PictureFill should have Source component', () => {
      expect(wrapper.find('Source').type()).to.be.a("function");
    });

    it('Source should have image element', () => {
      expect(wrapper.find('PictureFill').childAt(1).type()).to.equal("img");
      expect(wrapper.find('PictureFill').childAt(1).props().alt).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
    });

    it('Should have text overlay div', () => {
      expect(wrapper.find('.mt3_promocard-text--overlay').type()).to.equal("div");
    });

    it('Text overlay should have nested a tag', () => {
      expect(wrapper.find('.mt3_promocard-text--overlay').childAt(0).type()).to.equal("a");
      expect(wrapper.find('.mt3_promocard-text--overlay').childAt(0).props().className).to.equal("mt3_promocardtext--overlay-link");
    });


});
