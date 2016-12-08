'use strict';


import Pestle from '@natgeo/pestle';
import events from '../../../../promocard/events';

import VideoModalPestle from '../../../../src/modules/videomodal/VideoModalPestle';
import VideoModal from '../../../../src/modules/videomodal/VideoModal';
import Modal from '../../../../src/modules/modals/Modal';
import Video from '../../../../src/modules/video/video';
import {shallow, mount} from 'enzyme';
import React from 'react';

describe.only('VideoModal Component', () => {
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
      launchModal() {
        const videoData = {
          'itemId': "df3lk433",
          'leadMedia': "leadMedia": [{
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
          }
        };
        Pestle.PubSub.publish(events.launchVideoModal, videoData);
      }
      launchModal();
      wrapper = mount(<VideoModal />);
    });

    it('should log to console', () => {
      console.log(wrapper.debug());
    });

    it('should render correctly', () => {
      expect(wrapper.is('VideoModal'), true);
    });

    it('Should have a Modal component', () => {
      expect(wrapper.find('Modal').type()).to.equal(Modal);
    });

    it('Should have a close button', () => {
      expect(wrapper.find('Modal').childAt(0).props().className).to.equal("mt3_modal-button");
    });

    it('Close button should take a function', () => {
      expect(wrapper.find('Modal').childAt(0).props().onClick).to.be.a("function");
    });

    it('Close button should have ARIA text', () => {
      expect(wrapper.find('Modal').childAt(0).childAt(0).props().children).to.equal("Close Modal");
    });

    it('Close button should have an icon', () => {
      expect(wrapper.find('Modal').childAt(0).childAt(1).props().className).to.equal("mt3_icon--large");
    });

    it('Should have a container', () => {
      expect(wrapper.find('Modal').childAt(1).props().className).to.equal("mt3_video-modal-container");
    });

    it('Should have a heading wrapper', () => {
      expect(wrapper.find(".mt3_video-modal-container").childAt(1).props().className).to.equal("mt3_video-modal__head");
    });

    it('Should have a title', () => {
      expect(wrapper.find(".mt3_video-modal__head").childAt(0).props().className).to.equal("mt3_video-modal__title mt3_heading--h1--1 mt3_color--white");
    });

    it('Should have a Video component', () => {
      expect(wrapper.find('Video').type()).to.equal(Video);
    });

    it('Video component should have wrapper class', () => {
      expect(wrapper.find('Video').childAt(0).props().className).to.equal("mt3_video-wrapper");
    });

    it('Should have a description container', () => {
      expect(wrapper.find(".mt3_video-modal-container").childAt(3).props().className).to.equal("mt3_video-modal__description mt3_caption-container--indent mt3_border--gray40");
    });

    it('Description container should have a caption', () => {
      expect(wrapper.find(".mt3_video-modal__description").childAt(0).props().className).to.equal("mt3_caption-body mt3_color--gray40");
    });

  });

});
