'use strict';

import React from 'react';
import {shallow, mount} from 'enzyme';
import Counter from '../../../../../src/modules/photogallery/components/Counter';

describe.only('Counter Component', () => {
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

  describe('Counter: Initial', () => {
    before(() => {
      wrapper = shallow(<Counter
        showCounter={true}
        slides={slides}
      />);
    });

    it('Logs to console', () => {
      console.log(wrapper.find('mt3_photogallery-countercontainer'));
    });

    it('Should contain a left button', () => {
      expect(wrapper.find('mt3_photogallery-countercontainer').childAt(0).props().type).to.equal(button);
    });

    it('Left button should have appropriate class', () => {
      expect(wrapper.find('mt3_photogallery-countercontainer').childAt(0).props().className).to.equal("mt3_h5 mt3_numericcounter-button");
    });

    it('Left button should contain initial index number', () => {
      expect(wrapper.find('mt3_photogallery-countercontainer').childAt(0).props().children).to.equal(1);
    });

  });

});
