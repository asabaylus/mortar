'use strict';


import Pestle from '@natgeo/pestle';

import VideoModalPestle from '../../../../src/modules/videomodal/VideoModalPestle';
import VideoModal from '../../../../src/modules/videomodal/VideoModal';
import VideoContainer from '../../../../src/modules/videomodal/VideoContainer';
import {shallow} from 'enzyme';
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
      wrapper = shallow(<VideoModal id="abc321" />);
    });

    it('should render correclty', () => {
      expect(wrapper.is('VideoModal'), true);
    });

  });

  describe('VideoContainer Component', () => {
    let wrapper;
    before(() => {
      const dataModel = {
        leadMedia: [{
          guid: "00000156-46b5-dca8-ab77-7ffdfcf90000",
          directLink: "http://link.theplatform.com/s/ngs/media/guid/2423130747/00000156-46b5-dca8-ab77-7ffdfcf90000?format=redirect&policy=12441385&manifest=m3u&mbr=true"
        }],
        text: {
          title: "Thursday, August 4: Saving Lions",
          dek: "<p>Thandiwe Mweetwa, a National Geographic emerging explorer, takes the stage to talk about her work protecting lions and other wildlife in her home country of Zambia.</p>",
          kicker: {
            label: "National Geographic Live"
          }
        },
        duration: "9:08"
      };
      wrapper = shallow(<VideoContainer id="ab32c1" dataModel={dataModel} />);
    });

    it('should render correclty', () => {
      expect(wrapper.is('VideoContainer'), true);
      expect(wrapper.find('.mt3_kicker')).to.have.length(2);
    });

  });

});
