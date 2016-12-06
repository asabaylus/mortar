'use strict';

import React from 'react';
import {shallow, mount} from 'enzyme';
import Captions from '../../../../../src/modules/photogallery/components/Captions';

describe('Captions Component', () => {
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

  describe('Slide 1', () => {
    before(() => {
      wrapper = shallow(<Captions
        slides={slides}
      />);
    });

    it('Should have a container with appropriate classes', () => {
      expect(wrapper.find('figcaption').childAt(0).props().className).to.equal("mt3_color--gray80 mt3_row-gut-half");
    });

    it('Should have a span with heading class and title', () => {
      expect(wrapper.find('figcaption').childAt(0).childAt(0).props().className).to.equal("mt3_h5");
      expect(wrapper.find('figcaption').childAt(0).childAt(0).props().children).to.equal("This is Title One");
    });

    it('Should have a span with heading class and caption', () => {
      expect(wrapper.find('figcaption').childAt(0).childAt(1).props().className).to.equal("mt3_subh4");
      expect(wrapper.find('figcaption').childAt(0).childAt(1).props().children).to.equal("This is Caption One");
    });

    it('Should have a span with heading class, credit and assetSource', () => {
      expect(wrapper.find('figcaption').childAt(1).props().className).to.equal("mt3_subh3 mt3_color--gray40");
      expect(wrapper.find('figcaption').childAt(1).props().children[0]).to.equal("Photograph by ");
      expect(wrapper.find('figcaption').childAt(1).props().children[1]).to.equal("Joel Sartore");
      expect(wrapper.find('figcaption').childAt(1).props().children[3]).to.equal("Source: ");
      expect(wrapper.find('figcaption').childAt(1).props().children[4]).to.equal("National Geographic");
    });

  });

  describe('Slide 2', () => {
    before(() => {
      wrapper = mount(<Captions
        slides={slides}
      />);
      wrapper.setState({ currentSlide: 1 });
    });

    it('Should have a container with appropriate classes', () => {
      expect(wrapper.find('figcaption').childAt(0).props().className).to.equal("mt3_color--gray80 mt3_row-gut-half");
    });

    it('Should have a span with heading class and title', () => {
      expect(wrapper.find('figcaption').childAt(0).childAt(0).props().className).to.equal("mt3_h5");
      expect(wrapper.find('figcaption').childAt(0).childAt(0).props().children).to.equal("This is Title Two");
    });

    it('Should have a span with heading class and caption', () => {
      expect(wrapper.find('figcaption').childAt(0).childAt(1).props().className).to.equal("mt3_subh4");
      expect(wrapper.find('figcaption').childAt(0).childAt(1).props().children).to.equal("This is Caption Two");
    });

    it('Should have a span with heading class, credit and assetSource', () => {
      expect(wrapper.find('figcaption').childAt(1).props().className).to.equal("mt3_subh3 mt3_color--gray40");
      expect(wrapper.find('figcaption').childAt(1).props().children[0]).to.equal("Photograph by ");
      expect(wrapper.find('figcaption').childAt(1).props().children[1]).to.equal("Joel Sartore");
      expect(wrapper.find('figcaption').childAt(1).props().children[3]).to.equal("Source: ");
      expect(wrapper.find('figcaption').childAt(1).props().children[4]).to.equal("National Geographic");
    });

  });

});
