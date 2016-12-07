'use strict';

import React from 'react';
import { shallow } from 'enzyme';

import SubscribeCard from '../../../../src/modules/subscribecard/MTSubscribeCard.js';

describe('Subscribe Card Component', () => {
  let wrapper;

  const options = {
    "link": {
      "url": "/content/magazine/en_US/2016/05/yellowstone-national-parks-part-1.html",
      "target": "_self"
    },
    "text": {
      "heading": "National Geographic Magazine",
      "prompt": "Subscribe",
      "publishDate": "Fri Apr 01 13:49:00 UTC 2016",
      "credit": "Photograph by&nbsp;Charlie Hamilton James"
    },
    "leadMedia": [
      {
        "imageUrl":"http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.jpg",
        "aspectRatio":0.665625,
        "caption": "Parts of the Yellowstone region are wilder now than they’ve been in a century. Sharks are spreading. This one, in Grand Teton National Park, fends off ravens from a bison carcass. Workers moved it away from the road to keep scavengers and tourists apart.",
        "credit": "Photograph by&nbsp;Charlie Hamilton James",
        "srcset":[
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.80.1.jpg 80w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.133.1.jpg 133w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.152.1.jpg 152w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.162.1.jpg 162w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.210.1.jpg 210w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.224.1.jpg 224w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.225.1.jpg 225w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.280.1.jpg 280w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.352.1.jpg 352w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.470.1.jpg 470w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.536.1.jpg 536w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.590.1.jpg 590w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.676.1.jpg 676w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.710.1.jpg 710w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.768.1.jpg 768w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.885.1.jpg 885w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.945.1.jpg 945w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.1190.1.jpg 1190w",
          "http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.adapt.1900.1.jpg 1900w"
        ]
      }
    ]
  };

  before(() => {
    wrapper = shallow(<SubscribeCard
      model={options}
    />);
  });

  it('Should have expected CSS class', () => {
    expect(wrapper.html()).to.include("mt3_subscribe-card");
  });

  it('Prompt should display as expected', () => {
    expect(wrapper.html()).to.include('<span class="mt3_subscribe-card__prompt">Subscribe</span>');
  });

  it('Heading should display as expected', () => {
    expect(wrapper.html()).to.include('<span class="mt3_subscribe-card__heading">National Geographic Magazine</span></div>');
  });

  it('Promo-wide Link should appear as expected', () => {
    console.log(wrapper.html());
    expect(wrapper.html()).to.include('<a href="/content/magazine/en_US/2016/05/yellowstone-national-parks-part-1.html" class="mt3_div-link"></a>');
  });

  it('Child ImageComponent should be called with expected props', () => {
      const props = wrapper.find("Image").props();
      expect(props.src).to.equal("http://news.nationalgeographic.com/content/dam/news/2016/12/05/shark_skerry_gallery/01_shark_skerry_gallery.jpg");
      expect(props.aspectRatio).to.equal(0.665625);
      expect(props.frameAspectRatio).to.equal(0.78);
  });
});
