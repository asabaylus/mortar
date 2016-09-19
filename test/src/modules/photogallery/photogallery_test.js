'use strict';

import Pestle from '@natgeo/pestle';
import PhotoGallery from '../../../../src/modules/photogallery/MTPhotoGalleryPestle';
import Heading from '../../../../src/modules/photogallery/components/Heading';
import Counter from '../../../../src/modules/photogallery/components/Counter';
import Slider from '../../../../src/modules/slider/MTSlider';
import Captions from '../../../../src/modules/photogallery/components/Captions';
import MTPhotoGalleryComponent from '../../../../src/modules/photogallery/MTPhotoGallery';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('MTPhotoGallery', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div
        data-pestle-module='PhotoGallery'
        ></div>`

      insertFixture(html);
      Pestle.init();
    });

    after(() => {
      removeFixture();
    });

    it('should be a class', () => {
      expect(PhotoGallery).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('PhotoGallery')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('PhotoGallery')).to.have.length.of.at.least(1);
    });
  });

  describe('React Component', () => {
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
      },
      {
        "aspectRatio": "tv",
        "assetSource": "National Geographic",
        "caption": "This is Caption Three",
        "credit": "Joel Sartore",
        "src": "http://placehold.it/300x200.jpg",
        "srcSet": [
          "http://placehold.it/300x200.jpg 300w",
          "http://placehold.it/600x400.jpg 600w",
          "http://placehold.it/1200x800.jpg 1200w"
        ],
        "title": "This is Title Three",
        "type": "image"
      }
    ];

    before(() => {

      wrapper = shallow(<MTPhotoGalleryComponent
        frameAspectRatio="photo"
        letterboxBackgroundColor="light"
        description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis."
        infinite={false}
        letterbox={true}
        showArrows={true}
        showCounter={true}
        slides={slides}
        title="This is the title"
      />);
    });

    it('Should have a Heading component', () => {
      expect(wrapper.find('Heading').type()).to.equal(Heading);
    });

    it('Heading component has props', () => {
      expect(wrapper.find('Heading').props().title).to.equal("This is the title");
      expect(wrapper.find('Heading').props().description).to.equal("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.");
    });

    it('Should have a Counter component', () => {
      expect(wrapper.find('Counter').type()).to.equal(Counter);
    });

    it('Counter component should have props', () => {
      expect(wrapper.find('Counter').props().showCounter).to.equal(true);
      expect(wrapper.find('Counter').props().slides).to.equal(slides);
    });

    it('Should have a Slider component', () => {
      expect(wrapper.find('MTSlider').type()).to.equal(Slider);
    });

    it('Slider component should have props', () => {
      expect(wrapper.find('MTSlider').props().frameAspectRatio).to.equal("photo");
      expect(wrapper.find('MTSlider').props().infinite).to.equal(false);
      expect(wrapper.find('MTSlider').props().lazyLoad).to.equal(true);
      expect(wrapper.find('MTSlider').props().letterbox).to.equal(true);
      expect(wrapper.find('MTSlider').props().letterboxBackgroundColor).to.equal("light");
      expect(wrapper.find('MTSlider').props().showArrows).to.equal(true);
      expect(wrapper.find('MTSlider').props().slides).to.equal(slides);
      expect(wrapper.find('MTSlider').props().animations).to.equal(true);
    });

    it('Should have a Captions component', () => {
      expect(wrapper.find('Captions').type()).to.equal(Captions);
    });

    it('Captions component should have slides prop', () => {
      expect(wrapper.find('Captions').props().slides).to.equal(slides);
    });

  });
});
