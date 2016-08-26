'use strict';

import Gallery from '../../../../app/modules/promocard/components/types/Gallery.jsx';
import PromoImage from '../../../../app/modules/promocard/components/shared/PromoImage.jsx';
import PromoText from '../../../../app/modules/promocard/components/shared/PromoText.jsx';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('Gallery Component', () => {
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
    "cta": {
      "url": "http://www.nationalgeographic.com/magazine/2016/05/yellowstone-national-parks-wildlife-restoration/",
      "title": "This is the CTA Title",
      "target": "_blank",
      "seoTitle": "This is an SEO title"
    },
    "modal": false
  };

  before(() => {
    wrapper = shallow(<Gallery
      id={options.id}
      type={options.type}
      config={options.config}
      link={options.link}
      leadMedia={options.leadMedia}
      text={options.text}
      cta={options.cta}
      brandingBadgeLabel={options.brandingBadgeLabel}
      sponsorContentLabel={options.sponsorContentLabel}
    />);
  });

  it('Should have a containing div', () => {
    expect(wrapper.first().type()).to.equal("div");
  });

  it('Should have a containing div with classes', () => {
    expect(wrapper.first().props().className).to.include("mt3_row mt3_col-12 mt3_promocard-container");
  });

  it('Should have 2 PromoImage components', () => {
    expect(wrapper.find('PromoImage').at(0).type()).to.equal(PromoImage);
    expect(wrapper.find('PromoImage').at(1).type()).to.equal(PromoImage);
  });

  it('First PromoImage component should have props', () => {
    const firstImage = wrapper.find('PromoImage').at(0);
    expect(firstImage.props().config.aspectRatio).to.equal("photo");
    expect(firstImage.props().config.sponsored).to.equal(false);
    expect(firstImage.props().leadMedia.url).to.equal("http://placehold.it/800x600");
    expect(firstImage.props().leadMedia.aspectRatio).to.equal(0.6667);
    expect(firstImage.props().leadMedia.altText).to.equal("This is a picture of of a village in Tibet");
    expect(firstImage.props().leadMedia.srcset[0]).to.equal("http://placehold.it/400x300 400w");
    expect(firstImage.props().leadMedia.srcset[1]).to.equal("http://placehold.it/800x600 800w");
    expect(firstImage.props().leadMedia.srcset[2]).to.equal("http://placehold.it/1600x1200 1600w");
  });

  it('Second PromoImage component should have props', () => {
    const secondImage = wrapper.find('PromoImage').at(1);
    expect(secondImage.props().config.aspectRatio).to.equal("photo");
    expect(secondImage.props().config.sponsored).to.equal(false);
    expect(secondImage.props().leadMedia.url).to.equal("http://www.digital-photography-school.com/wp-content/uploads/2011/10/night-sky-astrophotography-1-tm.jpg");
    expect(secondImage.props().leadMedia.aspectRatio).to.equal(0.6667);
    expect(secondImage.props().leadMedia.altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
  });

  it('Should have a PromoText component', () => {
    expect(wrapper.find('PromoText').type()).to.equal(PromoText);
  });

  it('PromoText component should have title and dek props', () => {
    expect(wrapper.find('PromoText').props().text.title).to.equal("This is the title of the card");
    expect(wrapper.find('PromoText').props().text.dek).to.equal("This is a short dek for the card.");
  });

  it('PromoText component should have kicker with props', () => {
    expect(wrapper.find('PromoText').props().text.kicker).to.equal(options.text.kicker);
  });

});
