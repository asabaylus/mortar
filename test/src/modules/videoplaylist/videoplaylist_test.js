'use strict';

import Pestle from '@natgeo/pestle';
import VideoPlaylistPestle from '../../../../src/modules/videoplaylist/VideoPlaylistPestle';
import VideoPlaylist from '../../../../src/modules/videoplaylist/VideoPlaylist';
import VideoThumbnail from '../../../../src/modules/videoplaylist/VideoThumbnail';

import {shallow} from 'enzyme';
import React from 'react';

//this may or may not help with an error we're seeing in the pipeline. Let's give it a shot.
const START_VIDEO_INDEX = 0;

describe('VideoPlaylist Component', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `
        <div data-pestle-module='VideoPlaylist'>
          <script type="text/json" data-pestle-options>
            {
              "id": "abc123",
              "autocontinue": "false",
              "endpoint": "http://style-guide.nationalgeographic.com/beta/mockdata/videoplaylist/data.json"
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

      const playlistModel = {
         "heading": "Trending Videos",
         "videos": [{
          "pageType": "video/mp4",
          "guid": "00000156-46b5-dca8-ab77-7ffdfcf90000",
          "title": "Thursday, August 4: Saving Lions",
          "path": "/content/dam/natgeo/video/mpx/845/s/sa/sav/saving-lions-how-im-protecting-wildlife-in-my-homeland.mp4",
          "abstract": "<p>Thandiwe Mweetwa, a National Geographic emerging explorer, takes the stage to talk about her work protecting lions and other wildlife in her home country of Zambia.</p>",
          "publishDate": "Mon Aug 01 11:25:56 EDT 2016",
          "thumbnail": "http://pmdvod.nationalgeographic.com/NG_Video/440/971/160801-sciex-nglive-mweetwa-lion-conservation-lecture_branded_M16001-31_640x360_736058435549.jpg",
           "account": "2423130747",
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
          "account": "2423130747",
          "damThumbnail": "/content/dam/natgeo/video/mpx/news/p/po/pom/pompeii-new-studies-reveal-secrets-from-a-dead-city.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png",
          "directLink": "http://link.theplatform.com/s/ngs/media/guid/2423130747/00000156-47be-dca8-ab77-7ffe94e00000?format=redirect&policy=12441385&manifest=m3u&mbr=true",
          "valid": true
        },
         {
           "pageType": "video/mp4",
           "duration": "3:17",
           "durationMillis": 197000,
           "guid": "Ne0xtMTTZGFRyKK6EMCyA5nZtX7RQSJb",
           "title": "Title override",
           "path": "/content/dam/natgeo/video/mpx/796/p/pr/pro/proving-ground.mp4",
           "abstract": "<p>abs override</p>\n",
           "publishDate": "Fri Aug 12 13:19:21 UTC 2011",
           "thumbnail": "http://natgeo.edgeboss.net/download/natgeo/channel/feed/00013/02911_04_Proving-Ground_06100343.jpg",
           "account": "2173752954",
           "damThumbnail": "/content/dam/natgeo/video/mpx/796/p/pr/pro/proving-ground.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png",
           "directLink": "http://link.theplatform.com/s/ngs/media/guid/2173752954/Ne0xtMTTZGFRyKK6EMCyA5nZtX7RQSJb?policy=12441385&mbr=true",
           "valid": true
         }]
      };
      wrapper = shallow(<VideoPlaylist
        divID="abc123"
        autocontinue={false}
        dataModel={playlistModel}
        header="Trending Videos"
      />);
      videoThumbnail = wrapper.find('VideoThumbnail');

    });

    it('should have three thumbnails', () => {
      expect(videoThumbnail.length, 3);
    });

    it('should highlight first thumbnail', () => {
      expect(wrapper.state('currentVideoIndex'), 0);
      expect(videoThumbnail.first().hasClass('mt3_video-playlist-container--active-thumbnail'), true);
    });

    it('should highlight the clicked thumbnail', () => {
      const nextThumnailIndex = 1;
      const nextThumbnail = videoThumbnail.at(nextThumnailIndex);
      nextThumbnail.simulate('click');
      expect(wrapper.state('currentVideoIndex'), 1);
      expect(nextThumbnail.hasClass('mt3_video-playlist-container--active-thumbnail'), true);
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
        wrapperClass='mt3_video-playlist-container--thumbnail'
        item={thumbnailModel}
        onClick={onClickThumnail}
      />);
      wrapper.simulate('click');
      expect(onClickThumnail.calledOnce, true);
      expect(wrapper.find('Image').length, 1);
    });


  });


});
