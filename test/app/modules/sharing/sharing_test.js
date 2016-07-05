'use strict';

import Pestle from '@natgeo/mortar-pestle';
import Sharing from '../../../../app/modules/sharing/scripts/MTSharingPestle.js';
import SharingComponent from '../../../../app/modules/sharing/scripts/MTSharing.jsx';

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
});
