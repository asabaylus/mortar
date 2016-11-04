'use strict';

import EQ from '../../../src/util/EQ.js';
import {shallow, mount} from 'enzyme';
import React from 'react';

describe('EQ Component', () => {
  describe('X-Small', () => {
    let wrapper;

    const sizeClasses = {
      '0': 'xtra-small-class',
      '375' : 'small-class',
      '768' : 'medium-class',
      '1024': 'large-class'
    };

    before(() => {

      wrapper = mount(<EQ
        sizeClasses={sizeClasses}
      />);
      wrapper.setState({ contentWidth: 238 });
    });

    it('Should have a div with xtra small class', () => {
      expect(wrapper.find('.xtra-small-class').type()).to.equal('div');
    });

  });

  describe('Small', () => {
    let wrapper;

    const sizeClasses = {
      '0': 'xtra-small-class',
      '375' : 'small-class',
      '768' : 'medium-class',
      '1024': 'large-class'
    };

    before(() => {

      wrapper = mount(<EQ
        sizeClasses={sizeClasses}
      />);
      wrapper.setState({ contentWidth: 420 });
    });

    it('Should have a div with small class', () => {
      expect(wrapper.find('.small-class').type()).to.equal('div');
    });

  });

  describe('Medium', () => {
    let wrapper;

    const sizeClasses = {
      '0': 'xtra-small-class',
      '375' : 'small-class',
      '768' : 'medium-class',
      '1024': 'large-class'
    };

    before(() => {

      wrapper = mount(<EQ
        sizeClasses={sizeClasses}
      />);
      wrapper.setState({ contentWidth: 800 });
    });

    it('Should have a div with medium class', () => {
      expect(wrapper.find('.medium-class').type()).to.equal('div');
    });

  });

  describe('Large', () => {
    let wrapper;

    const sizeClasses = {
      '0': 'xtra-small-class',
      '375' : 'small-class',
      '768' : 'medium-class',
      '1024': 'large-class'
    };

    before(() => {

      wrapper = mount(<EQ
        sizeClasses={sizeClasses}
      />);
      wrapper.setState({ contentWidth: 1500 });
    });

    it('Should have a div with large class', () => {
      expect(wrapper.find('.large-class').type()).to.equal('div');
    });

  });

});
