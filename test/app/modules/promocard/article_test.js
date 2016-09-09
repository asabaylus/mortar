'use strict';

import Article from '../../../../app/modules/promocard/components/types/Article.jsx';
import PromoImage from '../../../../app/modules/promocard/components/shared/PromoImage.jsx';
import PromoText from '../../../../app/modules/promocard/components/shared/PromoText.jsx';

import {shallow, mount} from 'enzyme';
import React from 'react';

//skipping for now due to refactor to React - abstract React tests to come
describe('Article Component', () => {
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
    wrapper = mount(<Article
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
