'use strict';

import React from 'react';
import { mount } from 'enzyme';

import PromoImage from '../../../../../src/modules/promocard/components/shared/PromoImage.js';


describe('PromoImage Component', () => {
    let wrapper;

    const options = {
      "type": "article",
      "config": {
        "cardAspectRatio": "16:9",
        "showPlayButton": true,
        "sponsored": true
      },
      "leadMedia": [{
        "url": "http://placehold.it/800x600",
        "aspectRatio": 0.6667,
        "altText": "Picture of a caiman swimming underwater in Pantanal, Brazil",
        "srcset": [
          "http://placehold.it/400x300 400w",
          "http://placehold.it/800x600 800w",
          "http://placehold.it/1600x1200 1600w"
        ],
        "croppings": {
          "SixteenNine": [
            "http://placehold.it/400x225 400w",
            "http://placehold.it/800x450 800w",
            "http://placehold.it/1600x900 1600w"
          ]
        }
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

    it('Should be of type article', () => {
      expect(wrapper.find('PromoImage').props().type).to.equal("article");
    });

    it('Should have config with props', () => {
      expect(wrapper.find('PromoImage').props().config.cardAspectRatio).to.equal("16:9");
      expect(wrapper.find('PromoImage').props().config.sponsored).to.equal(true);
    });

    it('Should have leadMedia with props', () => {
      expect(wrapper.find('PromoImage').props().leadMedia.url).to.equal("http://placehold.it/800x600");
      expect(wrapper.find('PromoImage').props().leadMedia.aspectRatio).to.equal(0.6667);
      expect(wrapper.find('PromoImage').props().leadMedia.altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[0]).to.equal("http://placehold.it/400x300 400w");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[1]).to.equal("http://placehold.it/800x600 800w");
      expect(wrapper.find('PromoImage').props().leadMedia.srcset[2]).to.equal("http://placehold.it/1600x1200 1600w");
      expect(wrapper.find('PromoImage').props().leadMedia.croppings.SixteenNine[0]).to.equal("http://placehold.it/400x225 400w");
      expect(wrapper.find('PromoImage').props().leadMedia.croppings.SixteenNine[1]).to.equal("http://placehold.it/800x450 800w");
      expect(wrapper.find('PromoImage').props().leadMedia.croppings.SixteenNine[2]).to.equal("http://placehold.it/1600x900 1600w");
    });

    it('Should have link with props', () => {
      expect(wrapper.find('PromoImage').props().link.url).to.equal("http://www.google.com");
      expect(wrapper.find('PromoImage').props().link.target).to.equal("_self");
    });

    it('Should have an Image component', () => {
      expect(wrapper.find('Image').type()).to.be.a("function");
    });

    it('Image component should have props', () => {
      expect(wrapper.find('Image').props().aspectRatio).to.equal("16:9");
      expect(wrapper.find('Image').props().frameAspectRatio).to.equal("16:9");
      expect(wrapper.find('Image').props().lazyLoad).to.equal(false);
      expect(wrapper.find('Image').props().src).to.equal("http://placehold.it/800x600");
      expect(wrapper.find('Image').props().altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
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

    it('Text overlay should have a play button', () => {
      expect(wrapper.find('.mt3_promocard-text--overlay').childAt(1).type()).to.equal("button");
    });

    it('Button should have a tag with classes and attributes', () => {
      expect(wrapper.find('.mt3_videopromo-button').childAt(0).type()).to.equal("a");
      expect(wrapper.find('.mt3_videopromo-button').childAt(0).props().className).to.equal("mt3_promocardtext--overlay-link");
      expect(wrapper.find('.mt3_videopromo-button').childAt(0).props().href).to.equal("http://www.google.com");
      expect(wrapper.find('.mt3_videopromo-button').childAt(0).props().target).to.equal("_self");
    });

    it('Button should have ARIA text', () => {
      expect(wrapper.find('.mt3_visuallyhidden').props().children).to.equal("Play");
    });

    it('Button should have containing div for icon', () => {
      expect(wrapper.find('.mt3_videopromo-button').childAt(2).type()).to.equal("div");
      expect(wrapper.find('.mt3_videopromo-button').childAt(2).props().className).to.equal("mt3_videopromo-button-container mt3_intratio--natgeo");
    });

    it('Containing div should have an icon', () => {
      expect(wrapper.find('.mt3_videopromo-button-container').childAt(0).type()).to.equal("svg");
      expect(wrapper.find('.mt3_videopromo-button-container').childAt(0).props().className).to.equal("mt3_videopromo-button-icon");
    });

});
