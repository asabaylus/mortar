'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/mortar-pestle';
import VideoPlaylist from './VideoPlaylist.jsx';

class VideoPlaylistPestle extends Module {

  init() {
    const rqs = new XMLHttpRequest();
    rqs.open('GET', this.options.endpoint);
    rqs.onload = this.onLoadPlaylistItems.bind(this);
    rqs.onerror = () => { throw new Error('Error on request (Ckeck json URL)'); };
    rqs.send();
  }

  onLoadPlaylistItems(response) {
    if (response.target.status >= 200 && response.target.status < 400) {
      const items = JSON.parse(response.target.responseText);
      ReactDOM.render(<VideoPlaylist
        divID={this.options.id}
        autoContinue={this.options.autoContinue}
        dataModel={items.videos}
        header={items.heading}
            />, this.el);
    } else {
      throw new Error(`Server response with ${response.target.status}`);
    }
  }

}

Pestle.ModuleManager.register('VideoPlaylist', VideoPlaylistPestle);
export default VideoPlaylistPestle;
