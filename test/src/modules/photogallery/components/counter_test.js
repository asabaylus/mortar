'use strict';

import React from 'react';
import {shallow, mount} from 'enzyme';
import Counter from '../../../../../src/modules/photogallery/components/Counter';

describe('Counter Component', () => {
  let wrapper;

  const slides = [
    {
      "aspectRatio": "broadcast",
      "assetSource": "National Geographic",
      "caption": "This is Caption One",
      "credit": "Joel Sartore",
      "src": "http://placehold.it/350x150.jpg",
      "srcSet": [
        "http://placehold.it/350x150.jpg 350w",
        "http://placehold.it/700x300.jpg 700w",
        "http://placehold.it/1400x600.jpg 1400w"
      ],
      "title": "This is Title One",
      "type": "image"
    },
    {
      "aspectRatio": "photo",
      "assetSource": "National Geographic",
      "caption": "This is Caption Two",
      "credit": "Joel Sartore",
      "src": "http://placehold.it/350x150.jpg",
      "srcSet": [
        "http://placehold.it/350x150.jpg 350w",
        "http://placehold.it/700x300.jpg 700w",
        "http://placehold.it/1400x600.jpg 1400w"
      ],
      "title": "This is Title Two",
      "type": "image"
    }
  ];

  describe('React Component', () => {
    before(() => {
      wrapper = shallow(<Counter
        showCounter={true}
        slides={slides}
      />);
    });

    it('Left button should have appropriate class', () => {
      expect(wrapper.find('.mt3_photogallery-countercontainer').childAt(0).props().className).to.equal("mt3_h5 mt3_numericcounter-button");
    });

    it('Left button should contain initial index number', () => {
      expect(wrapper.find('.mt3_photogallery-countercontainer').childAt(0).props().children).to.equal(1);
    });

    it('Divider should have appropriate class', () => {
      expect(wrapper.find('.mt3_photogallery-countercontainer').childAt(1).props().className).to.equal("mt3_h5");
    });

    it('Divider should be a slash', () => {
      expect(wrapper.find('.mt3_photogallery-countercontainer').childAt(1).props().children).to.equal("/");
    });

    it('Right button should have appropriate class', () => {
      expect(wrapper.find('.mt3_photogallery-countercontainer').childAt(2).props().className).to.equal("mt3_h5 mt3_numericcounter-button");
    });

    it('Right button should contain total number of slides', () => {
      expect(wrapper.find('.mt3_photogallery-countercontainer').childAt(2).props().children).to.equal(2);
    });

  });

});
