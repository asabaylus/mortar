'use strict';

import Pestle from '@natgeo/pestle';
import Tooltip from '../../../../src/modules/tooltips/MTTooltipPestle';
import TooltipComponent from '../../../../src/modules/tooltips/MTTooltip';

import {shallow, mount} from 'enzyme';
import React from 'react';

describe('Tooltip', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div data-pestle-module="Tooltip">
                      <script type="text/json" data-pestle-options>
                        {
                          "tooltipContent": "Hello world!"
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
      expect(Tooltip).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('Tooltip')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('Tooltip')).to.have.length.of.at.least(1);
    });
  });

  describe('Tooltip :: Default', () => {
    let wrapper;
    before(() => {
      wrapper = mount(<TooltipComponent
        placement="top"
        tooltipContent="Hello World!"
      />);
    });

    it('should be wrapped in the proper className', () => {
      expect(wrapper.find('div').first().hasClass('mt3_tooltip-container')).to.equal(true);
    });

    it('the button should have the proper className', () => {
      expect(wrapper.find('button').hasClass('mt3_tooltip-btn')).to.equal(true);
    });
  });

  describe('Tooltip :: Open :: Top', () => {
    let wrapper;
    before(() => {
      wrapper = mount(<TooltipComponent
        placement="top"
        tooltipContent="Hello World!"
      />);
      wrapper.find('button').simulate('click');
    });

    it('should have the proper text', () => {
      expect(wrapper.find('.mt3_tooltip').text()).to.equal('Hello World!');
    });


    it('should have the proper class on the tooltip', () => {
      expect(wrapper.find('.mt3_tooltip').hasClass('mt3_tooltip--top')).to.equal(true);
    });

  });

  describe('Tooltip :: Open :: Bottom', () => {
    let wrapper;
    before(() => {
      wrapper = mount(<TooltipComponent
        placement="bottom"
        tooltipContent="Hello World!"
      />);
      wrapper.find('button').simulate('click');
    });

    it('should have the proper class on the tooltip', () => {
      expect(wrapper.find('.mt3_tooltip').hasClass('mt3_tooltip--bottom')).to.equal(true);
    });
  });

  describe('Tooltip :: Open :: Left', () => {
    let wrapper;
    before(() => {
      wrapper = mount(<TooltipComponent
        placement="left"
        tooltipContent="Hello World!"
      />);
      wrapper.find('button').simulate('click');
    });

    it('should have the proper class on the tooltip', () => {
      expect(wrapper.find('.mt3_tooltip').hasClass('mt3_tooltip--left')).to.equal(true);
    });
  });

  describe('Tooltip :: Open :: Right', () => {
    let wrapper;
    before(() => {
      wrapper = mount(<TooltipComponent
        placement="right"
        tooltipContent="Hello World!"
      />);
      wrapper.find('button').simulate('click');
    });

    it('should have the proper class on the tooltip', () => {
      expect(wrapper.find('.mt3_tooltip').hasClass('mt3_tooltip--right')).to.equal(true);
    });
  });

  describe('Tooltip :: Open :: No Placement', () => {
    let wrapper;
    before(() => {
      wrapper = mount(<TooltipComponent
        tooltipContent="Hello World!"
      />);
      wrapper.find('button').simulate('click');
    });

    it('should have the proper class on the tooltip', () => {
      expect(wrapper.find('.mt3_tooltip').hasClass('mt3_tooltip--top')).to.equal(true);
    });
  });

  describe('Tooltip :: Check State', () => {
    let wrapper;
    before(() => {
      wrapper = mount(<TooltipComponent
        tooltipContent="Hello World!"
      />);
    });

    it(':: mouseenter :: should set state properly', () => {
      wrapper.simulate('mouseenter');
      expect(wrapper.state().visible).to.equal(true);
      expect(wrapper.state().sticky).to.equal(false);
    });

    it(':: mouseleave :: should set state properly', () => {
      wrapper.simulate('mouseleave');
      expect(wrapper.state().visible).to.equal(false);
      expect(wrapper.state().sticky).to.equal(false);
    });

    it(':: click should ::  set state properly', () => {
      wrapper.find('button').simulate('click');
      expect(wrapper.state().visible).to.equal(true);
      expect(wrapper.state().sticky).to.equal(true);
    });

    it(':: a second click ::  should set state properly', () => {
      wrapper.find('button').simulate('click');
      expect(wrapper.state().visible).to.equal(false);
      expect(wrapper.state().sticky).to.equal(false);
    });


  });

});
