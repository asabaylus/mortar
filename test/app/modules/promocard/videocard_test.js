'use strict';

import VideoCard from '../../../../app/modules/promocard/components/types/VideoCard.jsx';
import PromoImage from '../../../../app/modules/promocard/components/shared/PromoImage.jsx';
import PromoText from '../../../../app/modules/promocard/components/shared/PromoText.jsx';
import Article from '../../../../app/modules/promocard/components/types/Article.jsx';

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

  it('Should contain an Article component', () => {
    expect(wrapper.first().type()).to.equal(Article);
  });

});
