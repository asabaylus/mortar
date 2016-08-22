'use strict';

import VideoCard from '../../../../app/modules/promocard/components/types/VideoCard.jsx';
import PromoImage from '../../../../app/modules/promocard/components/shared/PromoImage.jsx';
import PromoText from '../../../../app/modules/promocard/components/shared/PromoText.jsx';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('Video Component', () => {
  let wrapper;

  const options = {
    "id": "hero_promocard_1",
    "type": "video",
    "config": {
      "aspectRatio": "photo",
      "sponsored": false,
      "showPlayButton": true,
      "showByline": true
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
      "duration": "25 mins"
    },
    "modal": true
  }

  before(() => {
    wrapper = shallow(<VideoCard
      id={options.id}
      type={options.type}
      config={options.config}
      leadMedia={options.leadMedia}
      text={options.text}
    />);
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
    expect(wrapper.find('PromoImage').props().type).to.equal("video");
    expect(wrapper.find('PromoImage').props().config.aspectRatio).to.equal("photo");
    expect(wrapper.find('PromoImage').props().config.sponsored).to.equal(false);
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
    expect(wrapper.find('PromoText').props().text.duration).to.equal("25 mins");
  });

});
