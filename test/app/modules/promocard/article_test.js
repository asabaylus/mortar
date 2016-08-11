'use strict';

import Article from '../../../../app/modules/promocard/components/types/Article.jsx';
import PromoImage from '../../../../app/modules/promocard/components/shared/PromoImage.jsx';
import PromoText from '../../../../app/modules/promocard/components/shared/PromoText.jsx';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('Article Component', () => {
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
      "height": "500",
      "width": 350,
      "altText": "Picture of a caiman swimming underwater in Pantanal, Brazil",
      "srcset": ["http://placehold.it/400x300 400w", "http://placehold.it/800x600 800w", "http://placehold.it/1600x1200 1600w"],
      "containerCSSClass": "",
      "inlineStyle": null
    },
    "text": {
      "title": "This is the title of the card",
      "dek": "This is a short dek for the card.",
      "kicker": "Kicker",
      "byline": "This is a great byline",
      "duration": "",
      "publishDate": "Thu Aug 04 13:30:39 EDT 2016"
    },
    "modal": false,
    "brandingBadgeLabel": "This is a cool branding badge label",
    "sponsorContentLabel": "This is the Sponsor Content Label"
  };

  before(() => {
    wrapper = shallow(<Article
      id={options.id}
      type={options.type}
      config={options.config}
      link={options.link}
      leadMedia={options.leadMedia}
      text={options.text}
      brandingBadgeLabel={options.brandingBadgeLabel}
      sponsorContentLabel={options.sponsorContentLabel}
    />);
  });

  it('Logs to console', () => {
    console.log(wrapper.find('PromoText').props());
  });

  it('Should have a containing div', () => {
    expect(wrapper.first().type()).to.equal("div");
  });

  it('Containing div should have class', () => {
    expect(wrapper.first().props().className).to.equal("mt2_row mt2_col-12");
  });

  it('Should have a PromoImage component', () => {
    expect(wrapper.find('PromoImage').type()).to.equal(PromoImage);
  });

  it('PromoImage component should have props', () => {
    expect(wrapper.find('PromoImage').props().id).to.equal("hero_promocard_0");
    expect(wrapper.find('PromoImage').props().type).to.equal("article");
    expect(wrapper.find('PromoImage').props().config.aspectRatio).to.equal("photo");
    expect(wrapper.find('PromoImage').props().config.sponsored).to.equal(true);
    expect(wrapper.find('PromoImage').props().leadMedia.url).to.equal("http://placehold.it/800x600");
    expect(wrapper.find('PromoImage').props().leadMedia.aspectRatio).to.equal(0.6667);
    expect(wrapper.find('PromoImage').props().leadMedia.altText).to.equal("Picture of a caiman swimming underwater in Pantanal, Brazil");
    expect(wrapper.find('PromoImage').props().leadMedia.srcset).to.equal(options.leadMedia.srcset);
  });

  it('Should have a PromoText component', () => {
    expect(wrapper.find('PromoText').type()).to.equal(PromoText);
  });

  it('PromoText component should have props', () => {
    expect(wrapper.find('PromoText').props().title).to.equal("This is the title of the card");
    expect(wrapper.find('PromoText').props().dek).to.equal("This is a short dek for the card.");
    expect(wrapper.find('PromoText').props().kicker).to.equal("Kicker");
    expect(wrapper.find('PromoText').props().byline).to.equal("This is a great byline");
  });

});
