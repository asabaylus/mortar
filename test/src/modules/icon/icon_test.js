'use strict';

import Pestle from '@natgeo/pestle';
import Icon from '../../../../src/modules/icon/IconPestle';
import IconComponent from '../../../../src/modules/icon/Icon';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('Icon', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div data-pestle-module='Icon'>
        <script type="text/json" data-pestle-options>
        {
          "name" : "#camera",
          "align" : "right",
          "size" : "large",
          "color" : "black",
          "alt" : "Camera Icon"
        }
        </script>
      </div>`

      insertFixture(html);
      Pestle.init();
    });

    after(() => {
      removeFixture();
    });

    it('should be a class', () => {
      expect(Icon).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('Icon')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('Icon')).to.have.length.of.at.least(1);
    });
  });

  describe('Icon: Default', () => {
    let wrapper;

    before(() => {

      wrapper = shallow(<IconComponent
          name="#share"
          align="left"
          size="large"
          color="black"
          alt="Sharing is Caring"
      />);

    });

    it('has svg element with appropriate classes', () => {
      expect(wrapper.find('svg').props().className).to.equal('mt3_icon mt3_icon--large mt3_icon--left mt3_color--black');
    });

    it('has title element with alt text', () => {
      wrapper.find('title').text('Sharing is Caring');
    });

    it('has use element with link reference', () => {
      expect(wrapper.find('use').props().xlinkHref).to.equal('#share');
    });

  });

  describe('Icon: Small Size, Inverse Color', () => {
    let wrapper;

    before(() => {

      wrapper = shallow(<IconComponent
          name="#camera"
          align="left"
          size=""
          color="white"
          alt="Camera icon"
      />);

    });

    it('has svg element with appropriate classes', () => {
      expect(wrapper.find('svg').props().className).to.equal('mt3_icon mt3_icon--left mt3_color--white');
    });

    it('has title element with alt text', () => {
      wrapper.find('title').text('Camera icon');
    });

    it('has use element with link reference', () => {
      expect(wrapper.find('use').props().xlinkHref).to.equal('#camera');
    });

  });
});
