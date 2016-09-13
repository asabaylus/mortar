'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';

import {Pestle, Module} from '@natgeo/mortar-pestle';
import VideoPlaylistConfigurator from './MTVideoPlaylistConfigurator.jsx';

class VideoPlaylistConfiguratorPestle extends Module {

  forceUpdate() {
    deepForceUpdate(this.instance);
  }

  init() {
    const props = {
      divID: 'e36254kz',
      endpoint: '/mockdata/videoplaylist/data.json',
      autoContinue: true,
      dataModel: JSON.stringify({
        heading: 'Trending Videos',
        videos: [
          {
            'pageType': 'video/mp4',
            'guid': '00000156-46b5-dca8-ab77-7ffdfcf90000',
            'title': 'Thursday, August 4: Saving Lions',
            'path': '/content/dam/natgeo/video/mpx/845/s/sa/sav/saving-lions-how-im-protecting-wildlife-in-my-homeland.mp4',
            'kicker': {
              'label': 'Wild'
            },
            'duration': '9:48',
            'abstract': '<p>Thandiwe Mweetwa, a National Geographic emerging explorer, takes the stage to talk about her work protecting lions and other wildlife in her home country of Zambia.</p>\n',
            'publishDate': 'Mon Aug 01 11:25:56 EDT 2016',
            'thumbnail': 'http://pmdvod.nationalgeographic.com/NG_Video/440/971/160801-sciex-nglive-mweetwa-lion-conservation-lecture_branded_M16001-31_640x360_736058435549.jpg',
            'damThumbnail': '/content/dam/natgeo/video/mpx/845/s/sa/sav/saving-lions-how-im-protecting-wildlife-in-my-homeland.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png',
            'directLink': 'http://link.theplatform.com/s/ngs/media/guid/2423130747/00000156-46b5-dca8-ab77-7ffdfcf90000?format=redirect&policy=12441385&manifest=m3u&mbr=true',
            'valid': true
          },
          {
            'pageType': 'video/mp4',
            'guid': '00000156-47be-dca8-ab77-7ffe94e00000',
            'title': 'Wednesday, August 3: New Studies Reveal Secrets From a Dead City',
            'path': '/content/dam/natgeo/video/mpx/news/p/po/pom/pompeii-new-studies-reveal-secrets-from-a-dead-city.mp4',
            'kicker': {
              'label': 'Ancient Civilizations'
            },
            'duration': '3:22',
            'abstract': '<p>The remains of Pompeii’s inhabitants provide details about life in the Roman Empire.</p>\n',
            'publishDate': 'Mon Aug 01 16:14:54 EDT 2016',
            'thumbnail': 'http://pmdvod.nationalgeographic.com/NG_Video/587/943/160728-news-pompeii-italy_txls_split_ds1602001-69~_640x360_737363523925.jpg',
            'damThumbnail': '/content/dam/natgeo/video/mpx/news/p/po/pom/pompeii-new-studies-reveal-secrets-from-a-dead-city.mp4/jcr:content/renditions/cq5dam.thumbnail.319.319.png',
            'directLink': 'http://link.theplatform.com/s/ngs/media/guid/2423130747/00000156-47be-dca8-ab77-7ffe94e00000?format=redirect&policy=12441385&manifest=m3u&mbr=true',
            'valid': true
          }

        ]
      },null, '\t')
    };

    this.instance = ReactDOM.render(<VideoPlaylistConfigurator initialProps={props} />, this.el);
    Pestle.PubSub.subscribe('Configurator.ForceUpdate', () => { this.forceUpdate(); });
  }
}

Pestle.ModuleManager.register('VideoPlaylistConfiguratorPestle', VideoPlaylistConfiguratorPestle);

export default VideoPlaylistConfiguratorPestle;
