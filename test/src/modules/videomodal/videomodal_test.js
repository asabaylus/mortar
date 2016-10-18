'use strict';


import Pestle from '@natgeo/pestle';

import VideoModalPestle from '../../../../src/modules/videomodal/VideoModalPestle';
import VideoModal from '../../../../src/modules/videomodal/VideoModal';
import Modal from '../../../../src/modules/modals/Modal';
import {shallow, mount} from 'enzyme';
import React from 'react';

describe('VideoModal Component', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `
        <div data-pestle-module="VideoModal">
          <script type="text/json" data-pestle-options>
          {
            "id": "df3lk433",
            "dataModel":
            {
              "leadMedia": [{
                "guid": "00000156-46b5-dca8-ab77-7ffdfcf90000",
                "account": "2423130747",
                "directLink": "http://link.theplatform.com/s/ngs/media/guid/2423130747/00000156-46b5-dca8-ab77-7ffdfcf90000?format=redirect&policy=12441385&manifest=m3u&mbr=true"
              }],
              "text": {
                "title": "Thursday, August 4: Saving Lions",
                "dek": "<p>Thandiwe Mweetwa, a National Geographic emerging explorer, takes the stage to talk about her work protecting lions and other wildlife in her home country of Zambia.</p>",
                "kicker": {
                  "label": "National Geographic Live"
                }
              },
              "duration": "9:08",
              "publishDate": "Mon Aug 01 11:25:56 EDT 2016"
            }
          }
          </script>`;
      insertFixture(html);
      Pestle.init();
    });

    after(() => {
      removeFixture();
    });

    it('should be a class', () => {
      expect(VideoModalPestle).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('VideoModal')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('VideoModal')).to.have.length.at.least(1);
    });

  });

  describe('VideoModal Component', () => {
    let wrapper;
    before(() => {
      wrapper = mount(<VideoModal />);
      wrapper.setState({ open: true });
    });

    it('should render correctly', () => {
      expect(wrapper.is('VideoModal'), true);
    });

    it('Should have a Modal component', () => {
      expect(wrapper.find('Modal').type()).to.equal(Modal);
    });

    it('Should have a button', () => {
      expect(wrapper.find('.mt3_modal-container').childAt(0).hasClass("mt3_modal-button")).to.equal(true);
    });

    it('Should have a title', () => {
      expect(wrapper.find('.mt3_video-modal__head').childAt(0).hasClass("mt3_video-modal__title")).to.equal(true);
    });

    it('Should have a description', () => {
      expect(wrapper.find('.mt3_video-modal-container').childAt(3).hasClass("mt3_video-modal__description")).to.equal(true);
    });

  });

});
