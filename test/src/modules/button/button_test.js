'use strict';

import Pestle from '@natgeo/pestle';
import CTAButton from '../../../../src/modules/button/CTAButtonPestle';
import Icon from '../../../../src/modules/icon/Icon';
import CTAButtonComponent from '../../../../src/modules/button/CTAButton';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('CTAButton', () => {

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

  describe('Pestle Module', () => {
    before(() => {
      const html = `<div data-pestle-module='CTAButton'>
          <script type="text/json" data-pestle-options>
          {
            "icon": {
              "name": "#map-geolocator",
              "align": "left",
              "alt": "Map Pin Icon"
            },
            "label": "Find My Location",
            "style": "default",
            "type": "button"
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
      expect(CTAButton).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('CTAButton')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('CTAButton')).to.have.length.of.at.least(1);
    });
  });

  describe('Default Submit Button - active', () => {
    let wrapper;

    before(() => {
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
      wrapper.find('button').hasClass('mt3_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt3_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt3_btn--default');
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
      wrapper.find('button').childAt(1).hasClass('mt3_iconandlabel--horizontal');
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

  describe('Default Button - inactive', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<CTAButtonComponent
        icon={icon}
        label="This is a button"
        link={link}
        inactive={true}
        inverse={false}
        onClick={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        style="default"
        type="button"
      />);
    });

    it('should have button class', () => {
      wrapper.find('button').hasClass('mt3_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt3_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt3_btn--default');
    });

    it('should have inactive style class', () => {
      wrapper.find('button').hasClass('mt3_btn--default--inactive');
    });

    it('should take a callback function for the click event', () => {
      expect(wrapper.find('button').props().onClick).to.equal(null);
    });

    it('should take a callback function for the focus event', () => {
      expect(wrapper.find('button').props().onFocus).to.equal(null);
    });

    it('should take a callback function for the blur event', () => {
      expect(wrapper.find('button').props().onBlur).to.equal(null);
    });

    it('should contain an icon container div with class', () => {
      wrapper.find('button').childAt(1).hasClass('mt3_iconandlabel--horizontal');
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

  describe('Secondary Button - active', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<CTAButtonComponent
        icon={icon}
        label="This is a button"
        link={link}
        inactive={false}
        inverse={false}
        onClick={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        style="secondary"
        type="button"
      />);
    });

    it('should have button class', () => {
      wrapper.find('button').hasClass('mt3_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt3_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt3_btn--secondary');
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
      wrapper.find('button').childAt(1).hasClass('mt3_iconandlabel--horizontal');
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

  describe('Secondary Button - inactive', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<CTAButtonComponent
        icon={icon}
        label="This is a button"
        link={link}
        inactive={true}
        inverse={false}
        onClick={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        style="secondary"
        type="button"
      />);
    });

    it('should have button class', () => {
      wrapper.find('button').hasClass('mt3_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt3_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt3_btn--secondary');
    });

    it('should have inactive style class', () => {
      wrapper.find('button').hasClass('mt3_btn--secondary--inactive');
    });

    it('should take a callback function for the click event', () => {
      expect(wrapper.find('button').props().onClick).to.equal(null);
    });

    it('should take a callback function for the focus event', () => {
      expect(wrapper.find('button').props().onFocus).to.equal(null);
    });

    it('should take a callback function for the blur event', () => {
      expect(wrapper.find('button').props().onBlur).to.equal(null);
    });

    it('should contain an icon container div with class', () => {
      wrapper.find('button').childAt(1).hasClass('mt3_iconandlabel--horizontal');
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

  describe('Naked Button - active', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<CTAButtonComponent
        icon={icon}
        label="This is a button"
        link={link}
        inactive={false}
        inverse={false}
        onClick={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        style="naked"
        type="button"
      />);
    });

    it('should have button class', () => {
      wrapper.find('button').hasClass('mt3_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt3_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt3_btn--naked');
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
      wrapper.find('button').childAt(1).hasClass('mt3_iconandlabel--horizontal');
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

  describe('Naked Button - inactive', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<CTAButtonComponent
        icon={icon}
        label="This is a button"
        link={link}
        inactive={true}
        inverse={false}
        onClick={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        style="naked"
        type="button"
      />);
    });

    it('should have button class', () => {
      wrapper.find('button').hasClass('mt3_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt3_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt3_btn--naked');
    });

    it('should have inactive style class', () => {
      wrapper.find('button').hasClass('mt3_btn--naked--inactive');
    });

    it('should take a callback function for the click event', () => {
      expect(wrapper.find('button').props().onClick).to.equal(null);
    });

    it('should take a callback function for the focus event', () => {
      expect(wrapper.find('button').props().onFocus).to.equal(null);
    });

    it('should take a callback function for the blur event', () => {
      expect(wrapper.find('button').props().onBlur).to.equal(null);
    });

    it('should contain an icon container div with class', () => {
      wrapper.find('button').childAt(1).hasClass('mt3_iconandlabel--horizontal');
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

  describe('Success Reset Button', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<CTAButtonComponent
        icon={icon}
        label="This is a button"
        link={link}
        inactive={false}
        inverse={false}
        onClick={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        style="success"
        type="reset"
      />);
    });

    it('should be of type submit', () => {
      expect(wrapper.find('button').props().type).to.equal('reset');
    });

    it('should have button class', () => {
      wrapper.find('button').hasClass('mt3_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt3_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt3_btn--success');
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
      wrapper.find('button').childAt(1).hasClass('mt3_iconandlabel--horizontal');
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

  describe('Error Button', () => {
    let wrapper;

    before(() => {
      wrapper = shallow(<CTAButtonComponent
        icon={icon}
        label="This is a button"
        link={link}
        inactive={false}
        inverse={false}
        onClick={() => {}}
        onFocus={() => {}}
        onBlur={() => {}}
        style="error"
        type="button"
      />);
    });

    it('should have button class', () => {
      wrapper.find('button').hasClass('mt3_btn');
    });

    it('should have fullwidth class', () => {
      wrapper.find('button').hasClass('mt3_fullwidth');
    });

    it('should have default style class', () => {
      wrapper.find('button').hasClass('mt3_btn--error');
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
      wrapper.find('button').childAt(1).hasClass('mt3_iconandlabel--horizontal');
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
