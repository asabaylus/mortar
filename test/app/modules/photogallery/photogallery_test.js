'use strict';

import Pestle from '@natgeo/mortar-pestle';
import PhotoGallery from '../../../../app/modules/photogallery/scripts/MTPhotoGalleryPestle.js';
import Heading from '../../../../app/modules/photogallery/scripts/components/Heading.jsx';
import Counter from '../../../../app/modules/photogallery/scripts/components/Counter.jsx';
import Slider from '../../../../app/modules/slider/scripts/MTSlider.jsx';
import Captions from '../../../../app/modules/photogallery/scripts/components/Captions.jsx';
import MTPhotoGalleryComponent from '../../../../app/modules/photogallery/scripts/MTPhotoGallery.jsx';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe.only('MTPhotoGallery', () => {
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

    it('logs to console', () => {
      console.log(wrapper.debug());
    });

    it('Should have container class', () => {
      wrapper.first().hasClass('mt2_photo-gallery-container');
    });

    it('First child should be Heading component', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(0).type()).to.equal(Heading);
    });

    it('Heading component has props', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(0).props().title).to.equal("This is the title");
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(0).props().description).to.equal("Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.");
    });

    it('Second child should be div', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(1).type()).to.equal('div');
    });

    it('Div should have clear class', () => {
      wrapper.find('.mt2_photo-gallery-container').childAt(1).hasClass('clear');
    });

    it('Third child should be Counter component', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(2).type()).to.equal(Counter);
    });

    it('Counter component should have props', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(2).props().showCounter).to.equal(true);
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(2).props().slides).to.equal(slides);
    });

    it('Fourth child should be div', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(3).type()).to.equal('div');
    });

    it('Div should have clear class', () => {
      wrapper.find('.mt2_photo-gallery-container').childAt(3).hasClass('clear');
    });

    it('Fifth child should be Slider component', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(4).type()).to.equal(Slider);
    });

    it('Slider component should have props', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(4).props().frameAspectRatio).to.equal("photo");
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(4).props().infinite).to.equal(false);
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(4).props().lazyLoad).to.equal(true);
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(4).props().letterbox).to.equal(true);
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(4).props().letterboxBackgroundColor).to.equal("light");
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(4).props().showArrows).to.equal(true);
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(4).props().slides).to.equal(slides);
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(4).props().animations).to.equal(true);
    });

    it('Sixth child should be Captions component', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(5).type()).to.equal(Captions);
    });

    it('Captions component should have slides prop', () => {
      expect(wrapper.find('.mt2_photo-gallery-container').childAt(5).props().slides).to.equal(slides);
    });

  });
});
