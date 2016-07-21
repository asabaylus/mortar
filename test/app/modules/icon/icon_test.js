'use strict';

import Pestle from '@natgeo/mortar-pestle';
import Icon from '../../../../app/modules/icon/scripts/IconPestle.js';
import IconComponent from '../../../../app/modules/icon/scripts/Icon.jsx';

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
          "color" : "neutral--xxd",
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

  describe('React Component', () => {
    let wrapper;

    before(() => {

      wrapper = shallow(<IconComponent
          name="#share"
          align="left"
          size="large"
          color="neutral--xxd"
          alt="Sharing is Caring"
      />);

    });

    it('has svg element with appropriate classes', () => {
      expect(wrapper.find('svg').props().className).to.equal('mt2_icon mt2_icon--large mt2_icon--left mt2_color--neutral--xxd');
    });

    it('has title element with alt text', () => {
      wrapper.find('title').text('Sharing is Caring');
    });

    it('has use element with link reference', () => {
      expect(wrapper.find('use').props().xlinkHref).to.equal('#share');
    });

  });
});
