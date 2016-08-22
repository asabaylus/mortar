'use strict';

import Pestle from '@natgeo/mortar-pestle';
import VideoPlaylistPestle from '../../../../app/modules/videoplaylist/scripts/VideoPlaylistPestle';
import VideoPlaylist from '../../../../app/modules/videoplaylist/scripts/VideoPlaylist.jsx';
import VideoThumbnail from '../../../../app/modules/videoplaylist/scripts/VideoThumbnail.jsx';

import {shallow} from 'enzyme';
import React from 'react';

describe('VideoPlaylist Component', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `
        <div data-pestle-module='VideoPlaylist'>
          <script type="text/json" data-pestle-options>
            {
              "id": "abc123",
              "autocontinue": "false",
              "endpoint": "http://www.nationalgeographic.com/versions/20160804-v1/_jcr_content/content/videoplaylist.promo-all.json"
            }
          </script>
        </div>`;

       insertFixture(html);
       Pestle.init();
    });

    after(() => {
      removeFixture();
    })

    it('should be a class', () => {
      expect(VideoPlaylistPestle).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('VideoPlaylist')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('VideoPlaylist')).to.have.length.of.at.least(1);
    });

  });

  describe('VideoPlaylist Component', () => {
    let wrapper;
    let videoThumbnail;

    before(() => {

      const playlistModel = [{
        "pageType": "video/mp4",
        "guid": "00000156-46b5-dca8-ab77-7ffdfcf90000",
        "title": "Thursday, August 4: Saving Lions",
        "path": "/content/dam/natgeo/video/mpx/845/s/sa/sav/saving-lions-how-im-protecting-wildlife-in-my-homeland.mp4",
        "abstract": "<p>Thandiwe Mweetwa, a National Geographic emerging explorer, takes the stage to talk about her work protecting lions and other wildlife in her home country of Zambia.</p>",
        "publishDate": "Mon Aug 01 11:25:56 EDT 2016",
        "thumbnail": "http://pmdvod.nationalgeographic.com/NG_Video/440/971/160801-sciex-nglive-mweetwa-lion-conservation-lecture_branded_M16001-31_640x360_736058435549.jpg",
        "damThumbnail": "/content/dam/natgeo/video/mpx/845/s/sa/sav/saving-lions-how-im-protecting-wildlife-in-my-homeland.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png",
        "directLink": "http://link.theplatform.com/s/ngs/media/guid/2423130747/00000156-46b5-dca8-ab77-7ffdfcf90000?format=redirect&policy=12441385&manifest=m3u&mbr=true",
        "valid": true
      },
      {
        "pageType": "video/mp4",
        "guid": "00000156-47be-dca8-ab77-7ffe94e00000",
        "title": "Wednesday, August 3: New Studies Reveal Secrets From a Dead City",
        "path": "/content/dam/natgeo/video/mpx/news/p/po/pom/pompeii-new-studies-reveal-secrets-from-a-dead-city.mp4",
        "abstract": "<p>The remains of Pompeii’s inhabitants provide details about life in the Roman Empire.</p>",
        "publishDate": "Mon Aug 01 16:14:54 EDT 2016",
        "thumbnail": "http://pmdvod.nationalgeographic.com/NG_Video/587/943/160728-news-pompeii-italy_txls_split_ds1602001-69~_640x360_737363523925.jpg",
        "damThumbnail": "/content/dam/natgeo/video/mpx/news/p/po/pom/pompeii-new-studies-reveal-secrets-from-a-dead-city.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png",
        "directLink": "http://link.theplatform.com/s/ngs/media/guid/2423130747/00000156-47be-dca8-ab77-7ffe94e00000?format=redirect&policy=12441385&manifest=m3u&mbr=true",
        "valid": true
      }];

      wrapper = shallow(<VideoPlaylist
        divID="abc123"
        autocontinue={false}
        dataModel={playlistModel}
      />);
      videoThumbnail = wrapper.find('VideoThumbnail');

    });

    it('should have two thumbnails', () => {
      expect(videoThumbnail.length, 2);
    });

    it('should highlight first thumbnail', () => {
      expect(wrapper.state('currentVideoIndex'), 0);
      expect(videoThumbnail.first().hasClass('mt2_video-playlist-container--active-thumbnail'), true);
    });

    it('should highlight the clicked thumbnail', () => {
      const nextThumnailIndex = 1;
      const nextThumbnail = videoThumbnail.at(nextThumnailIndex);
      nextThumbnail.simulate('click');
      expect(wrapper.state('currentVideoIndex'), 1);
      expect(nextThumbnail.hasClass('mt2_video-playlist-container--active-thumbnail'), true);
    });

  });

  describe('VideoThumbnail Component', () => {
    let wrapper;

    it('should render correclty', () => {
      const onClickThumnail = sinon.spy();
      const thumbnailModel = {
        "title": "Wednesday, August 3: New Studies Reveal Secrets From a Dead City",
        "path": "/content/dam/natgeo/video/mpx/news/p/po/pom/pompeii-new-studies-reveal-secrets-from-a-dead-city.mp4",
        "abstract": "<p>The remains of Pompeii’s inhabitants provide details about life in the Roman Empire.</p>",
        "publishDate": "Mon Aug 01 16:14:54 EDT 2016",
        "thumbnail": "http://pmdvod.nationalgeographic.com/NG_Video/587/943/160728-news-pompeii-italy_txls_split_ds1602001-69~_640x360_737363523925.jpg",
        "damThumbnail": "/content/dam/natgeo/video/mpx/news/p/po/pom/pompeii-new-studies-reveal-secrets-from-a-dead-city.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png",
        "directLink": "http://link.theplatform.com/s/ngs/media/guid/2423130747/00000156-47be-dca8-ab77-7ffe94e00000?format=redirect&policy=12441385&manifest=m3u&mbr=true",
      }
      wrapper = shallow(<VideoThumbnail
        wrapperClass='mt2_video-playlist-container--thumbnail'
        item={thumbnailModel}
        onClick={onClickThumnail}
      />);
      wrapper.simulate('click');
      expect(onClickThumnail.calledOnce, true);
      expect(wrapper.find('Image').length, 1);
    });


  });


});