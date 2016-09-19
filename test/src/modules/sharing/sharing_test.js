'use strict';

import Pestle from '@natgeo/pestle';
import Sharing from '../../../../src/modules/sharing/MTSharingPestle';
import SharingComponent from '../../../../src/modules/sharing/MTSharing';
import SocialButton from '../../../../src/modules/sharing/MTSocialButton';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('sharing', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div data-pestle-module='Sharing'></div>`

      insertFixture(html);
      Pestle.init();
    });

    after(() => {
      removeFixture();
    });

    it('should be a class', () => {
      expect(Sharing).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('Sharing')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('Sharing')).to.have.length.of.at.least(1);
    });
  });

  describe('Sharing React Component', () => {
    let wrapper;
    const socialOptions = [
      "facebook",
      "email",
      "twitter"
    ];

    before(() => {
      wrapper = mount(<SharingComponent buttons={socialOptions} url="http://natgeo.com" title="title"/>);
    });

    it('has correct number of children', () => {
      expect(wrapper.find(SharingComponent).children()).to.have.lengthOf(socialOptions.length);
    })
  });

  describe('SocialButton React Component', () => {
    let wrapper;

    before(() => {
      wrapper = mount(<SocialButton />);
    });

    it('should center the popup window on the screen', () => {
      expect(wrapper.instance().centerPopup(1000, 1000, 300, 500)).to.eql({top: 350, left: 250});
    })
  });
});
