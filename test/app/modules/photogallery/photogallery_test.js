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

    before(() => {
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

    it('should have button class', () => {
      wrapper.find('button').hasClass('mt2_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt2_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt2_btn-default');
    });

    it('should take a callback function for the click event', () => {
      expect(wrapper.find('button').props().onClick).to.be.a('function');
    });

    it('should take a callback function for the focus event', () => {
      expect(wrapper.find('button').props().onFocus).to.be.a('function');
    });

    it('should take a callback function for the blur event', () => {
      expect(wrapper.find('button').props().onBlur).to.be.a('function');
    });

    it('should contain an icon container div with class', () => {
      wrapper.find('button').childAt(1).hasClass('mt2_iconandlabel--horizontal');
    });

    it('Label component should be called with expected props', () => {
      expect(wrapper.find('Label').props().icon.name).to.equal("#share");
      expect(wrapper.find('Label').props().icon.align).to.equal("left");
      expect(wrapper.find('Label').props().icon.alt).to.equal("Sharing is Caring");
    });

    it('should have a span with text', () => {
      wrapper.find('span').contains('This is a button');
    });

  });
});
