'use strict';

import Pestle from '@natgeo/pestle';
import Video from '../../../../src/modules/video/VideoPestle';
import VideoComponent from '../../../../src/modules/video/video';

import {shallow} from 'enzyme';
import React from 'react';

describe('Video Component', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div data-pestle-module='Video'>
        <script type="text/json" data-pestle-options>
          {
            "className": "",
            "lazyLoad": false,
            "isEditMode": false,
            "model": {
              "autoPlay": true,
              "autoload": true,
              "debugLib": false,
              "guid": "00000152-7f14-d480-a756-7ffe2c710000",
              "instance": "platformPlaylistVideoPlayer_v1nigrk4",
              "layoutOptions": {
                "tpShare": true
              },
              "overlayPlayButton": true,
              "sharing": true,
              "skinName": "glass-ngs",
              "type": "inline"

            }
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
      expect(Video).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('Video')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('Video')).to.have.length.of.at.least(1);
    });
  });

  describe('React Component: LazyLoad Enabled', () => {
    let wrapper;
    const reactModel = {
      autoPlay: true,
      autoload: true,
      debugLib: false,
      guid: '00000152-7f14-d480-a756-7ffe2c710000',
      instance: 'platformPlaylistVideoPlayer_v1nigrk4',
      layoutOptions: {
        tpShare: true
      }
    }

    before(() => {
      wrapper = shallow(<VideoComponent
          className=''
          isEditMode={false}
          lazyLoad={true}
          model={reactModel}
          overlayPlayButton={true}
          sharing={true}
          skinName='glass-ngs'
          type='inline'
        />);
    });

    it('should include a LazyLoad Component to fire video', () => {
      expect(wrapper.html()).to.include('<div class="LazyLoad"></div>');
    });

    it('should contain the expected mock inside LazyLoad', () => {
      expect(wrapper.childAt(1).html()).to.equal('<div class="mt3_video-wrapper"><div id="'+reactModel.instance+'" class="mt3_video-player" data-guid="'+reactModel.guid+'"></div></div>');
    });
  });

  describe('React Component: LazyLoad Disabled', () => {
    let wrapper;
    const reactModel = {
      autoPlay: true,
      autoload: true,
      debugLib: false,
      guid: '00000152-7f14-d480-a756-7ffe2c710000',
      instance: 'platformPlaylistVideoPlayer_v1nigrk4',
      layoutOptions: {
        tpShare: true
      }
    }

    before(() => {
      wrapper = shallow(<VideoComponent
          className=''
          isEditMode={false}
          lazyLoad={false}
          model={reactModel}
          overlayPlayButton={true}
          sharing={true}
          skinName='glass-ngs'
          type='inline'
        />);
    });

    it('should NOT include a LazyLoad Component to fire video', () => {
      expect(wrapper.html()).not.to.include('<div class="LazyLoad"></div>');
    });

    it('should include a div for the video player to instantiate against', () => {
      expect(wrapper.html()).to.include('<div id="'+reactModel.instance+'" class="mt3_video-player" data-guid="'+reactModel.guid+'"></div>');
    });
  });
});
