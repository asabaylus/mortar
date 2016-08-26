import React, {Component} from 'react';
import Velocity from 'velocity-animate';
import classNames from 'classnames';
import EmbeddedVideo from '../../video/scripts/video.jsx';

import VideoThumbnail from './VideoThumbnail.jsx';
import VideoCaption from './VideoCaption.jsx';

//This is the initial index of the video playback.
const START_VIDEO_INDEX = 0;

class VideoPlaylist extends Component {

  constructor(props) {
    super(props);
    this.autoPlay = false;
    this.playerInstanceName = `platformPlaylistVideoPlayer_${this.props.divID}`;
    this.adPlaying = false;
    this.handleEvent = this.handleEvent.bind(this);
    this.manualPlay = false;
    this.didLoop = false;
    this.state = {
      currentVideoIndex: START_VIDEO_INDEX
    };
  }

  componentWillUpdate(nextProps, nextState) {
    this.loadVideo(this.props.dataModel[nextState.currentVideoIndex].directLink, nextState);
  }

  componentDidMount() {
    this.pdkCheck(this.activateEventListeners.bind(this));
  }

  componentWillMount() {
    this.changeVideo(this.state.currentVideoIndex);
  }

  //Return true if the elements is out of the viewport.
  isElementOutViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight;
  }

  //Return true if the element is visible inside the container.
  isElementVisible(el, container) {
    const rect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return rect.top > containerRect.top && rect.bottom < containerRect.bottom;
  }

  getThumbOffset(el, container) {
    const currThumbRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    return ((containerRect.height - (currThumbRect.bottom - containerRect.bottom)) * -1) + (currThumbRect.height + 35);
  }

  handleClick(index) {
    if (ngsPlayer && ngsPlayer.api && typeof $pdk != 'undefined') {
      this.changeVideo(index);
    }
  }

  handleEvent(e) {
    if (!(ngsPlayer && ngsPlayer.api && typeof $pdk != 'undefined')) {
      return;
    }
    if (e.originator.controlId !== this.playerInstanceName) {
      //ignore the event if it's not coming from the current player instance
      return;
    }

    this.adPlaying = e.data.baseClip && e.data.baseClip.isAd;
    if (e.type === 'OnMediaComplete' && !this.adPlaying && this.autoPlay) {
      //We're in automated playlist mode
      this.updateVideo();
    }
    if (!this.props.autoContinue && e.type === 'OnLoadReleaseUrl' && this.manualPlay) {
      //autoContinue is turned off, so we're reacting to a click on a playlist item
      if (this.getBreakpoint() !== 'mobile') {
        //Not able to get iOS to play in the native player by triggering .play() here after the call back from the load method, so, for desktop we'll go ahead and play the video. Mobile will require a click on the player. This only happens when the automated playlist is turned off and we're not calling the .set() api method
        ngsPlayer.api.play(this.playerInstanceName);
      }
      //Turning flag back to false
      this.manualPlay = false;
    }

    if (e.type === 'OnReleaseStart') {
      if (this.props.autoContinue) {
        this.autoPlay = true;
      }
    }
  }

  getBreakpoint() {
    const body = document.querySelector('body');
    return window.getComputedStyle(body, ':after').getPropertyValue('content').replace(/"/g, '').replace(/'/g, '') || 'not available';
  }

  updateVideo() {
    if (this.state.currentVideoIndex < (this.props.dataModel.length - 1)) {
      this.changeVideo(this.state.currentVideoIndex + 1);
    } else if (this.state.currentVideoIndex === (this.props.dataModel.length - 1)) {
      this.autoPlay = false;
      this.didLoop = true;
      this.changeVideo(START_VIDEO_INDEX);
    }
  }

  //Set the state in order to change the video when something actions has
  //happened in the playlist.
  changeVideo(index) {
    this.setState({
      currentVideoIndex: index
    });
  }

  loadVideo(url, nextState) {
    const formatUrl = url.match(/http.*\?|mbr.*/g).join('');
    //if ads are playing, we need to call the unload method so that we can replace the existing video
    if (this.adPlaying) {
      ngsPlayer.api.pause(this.playerInstanceName);
      //calling unload immediately after the call to pause doesn't seem to work properly, and just calling unload allows the audio from the ad to continue playing (though that does not happen on regular clips). This ads a 200ms delay between call to pause and unload
      window.setTimeout(() => {
        ngsPlayer.api.unload(this.playerInstanceName);
        this.playVideo(formatUrl, nextState);
      }, 200);
    } else {
      this.playVideo(formatUrl, nextState);
    }
  }

  playVideo(url, nextState) {
    const videoContainer = document.getElementById(this.playerInstanceName);
    const stickyHeaderEl = document.getElementById('header-ad');
    const scrollOffset = (stickyHeaderEl) ? (stickyHeaderEl.getBoundingClientRect().height + 20) * -1 : 0;

    //This sentence checks when the component has autocontinue and the video is
    //not the first one in the list. So this stops the playback when the last
    //video has been played. If we need a loop just change the second
    //condition by the loop property. Currently that is not in the scope.
    if (this.props.autoContinue && !this.didLoop) {
      this.autoPlay = true;
      //This should set the proper url for the video player instance and start playing it
      ngsPlayer.api.set(url, this.playerInstanceName);
    } else {
      //set flag to use in "OnLoadReleaseUrl" call back, so we know to call play on player instance
      this.manualPlay = true;
      this.didLoop = false;
      ngsPlayer.api.unload(this.playerInstanceName);
      ngsPlayer.api.load(url, this.playerInstanceName);
    }

    this.showHiddenThumb(nextState);
    //this will scroll to the video player when it is out of the viewport
    if (this.isElementOutViewport(videoContainer)) {
      Velocity(videoContainer, 'scroll', {
        duration: 250,
        offset: scrollOffset
      });
    }
  }

  activateEventListeners() {
    $pdk.controller.addEventListener('OnLoadReleaseUrl', this.handleEvent, '*');
    $pdk.controller.addEventListener('OnReleaseStart', this.handleEvent, '*');
    $pdk.controller.addEventListener('OnMediaComplete', this.handleEvent, '*');
    //needed to get proper data in call back to determine if media is an ad
    $pdk.controller.addEventListener('OnMediaStart', this.handleEvent, '*');
  }

  pdkCheck(callback) {
    let checkForPdk;
    if (typeof($pdk) !== 'object') {
      checkForPdk = window.setTimeout(() => {
        this.pdkCheck(callback);
      }, 250);

    } else {
      clearTimeout(checkForPdk);
      return callback();
    }
  }

  showHiddenThumb(nextState) {
    const currThumbs = this.refs.thumbnailContainer.querySelectorAll('.mt3_video-playlist-container--thumbnail');
    let currThumb = currThumbs[nextState.currentVideoIndex];
    let currThumbParent = currThumb.parentNode;
    let thumbOffset = 0;
    if (!this.isElementVisible(currThumb, currThumbParent)) {
      thumbOffset = this.getThumbOffset(currThumb, currThumbParent);
      Velocity(currThumb, 'scroll', {
        container: currThumbParent,
        duration: 250,
        offset: thumbOffset
      });
    }
  }

  render() {
    const firstVideo = this.props.dataModel[this.state.currentVideoIndex];
    const videoModel = {
      instance: this.playerInstanceName,
      guid: firstVideo.guid,
      sharing: true,
      overlayPlayButton: true,
      autoPlay: false
    };

    const thumbnails = this.props.dataModel.map((item, index) => {
      const thumbClass = classNames({
        'mt3_video-playlist-container--thumbnail': true,
        'mt3_video-playlist-container--active-thumbnail': this.state.currentVideoIndex === index,
        'mt3_hide-play': !this.props.autoContinue
      });
      return <VideoThumbnail key={index} wrapperClass={thumbClass} item={item} onClick={this.handleClick.bind(this, index)}/>
    });
    return(
      <div ref="mainVideoContainer" className="mt3_multi-layout-promos multi-layout-promos--box-ads mt3_video-playlist-container">
        <div className="mt3_col-12 mt3_col-lg-8 mt3_multi-layout-promos__promo-content">
          <div className="mt3_multi-layout-promos__promo--text__bg"></div>
          <EmbeddedVideo model={videoModel} lazyLoad={true}/>
          <VideoCaption title={firstVideo.title} abstract={firstVideo.abstract} />
        </div>
        <div className="mt3_col-12 mt3_col-lg-4">
          <div ref="thumbnailContainer" className='mt3_video-playlist-container--thumbnails'>
            <div className="mt3_video-playlist-container--thumbnails__scroll">
              {thumbnails}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

VideoPlaylist.propTypes = {
  divID: React.PropTypes.string.isRequired,
  autoContinue: React.PropTypes.bool,
  dataModel: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      guid: React.PropTypes.string,
      title: React.PropTypes.string,
      path: React.PropTypes.string,
      abstract: React.PropTypes.string,
      publishDate: React.PropTypes.string,
      thumbnail: React.PropTypes.string,
      damThumbnail: React.PropTypes.string,
      directLink: React.PropTypes.string,
      valid: React.PropTypes.bool
    })
  ).isRequired

}

VideoPlaylist.defaultProps = {
  autoContinue: true
}

export default VideoPlaylist;
