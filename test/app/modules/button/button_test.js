'use strict';

import Pestle from '@natgeo/mortar-pestle';
import CTAButton from '../../../../app/modules/button/scripts/CTAButtonPestle.js';
import Icon from '../../../../app/modules/icon/scripts/Icon.jsx';
import CTAButtonComponent from '../../../../app/modules/button/scripts/CTAButton.jsx';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('CTAButton', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div
        data-pestle-module='CTAButton'
        ></div>`

      insertFixture(html);
      Pestle.init();
    });

    after(() => {
      removeFixture();
    });

    it('should be a class', () => {
      expect(CTAButton).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('CTAButton')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('CTAButton')).to.have.length.of.at.least(1);
    });
  });

  describe('React Component', () => {
    let wrapper;

    before(() => {
      const icon = {
        "name" : "#share",
        "align" : "left",
        "size" : "",
        "color" : "",
        "alt" : "Sharing is Caring"
      };
      const link = {
        "target" : "_blank",
        "title" : "Link to external page",
        "trackingCodes": {
          "utmSource" : "google",
          "utmMedium" : "cpc",
          "utmTerm" : ["nature", "reptile", "animal", "swamp", "forest"],
          "utmContent" : "textlink",
          "utmCampaign" : "nature_photos"
        },
        "url" : "http://www.example.com"
      };

      wrapper = shallow(<CTAButtonComponent
        icon={icon}
        label="This is a button"
        link={link}
        inactive={false}
        inverse={false}
        onClick={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        style="default"
        type="button"
      />);
    });

    it('should have button class', () => {
      wrapper.find('button').hasClass('mt_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt_btn-default');
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
      wrapper.find('button').childAt(1).hasClass('mt_iconandlabel--horizontal');
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
