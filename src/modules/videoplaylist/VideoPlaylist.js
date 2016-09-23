'use strict';

import React, {Component} from 'react';
import Velocity from 'velocity-animate';
import classNames from 'classnames';
import _defer from 'lodash/defer';
import EmbeddedVideo from '../video/video';

import VideoThumbnail from './VideoThumbnail';
import VideoCaption from './VideoCaption';

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
      currentVideoIndex: START_VIDEO_INDEX,
    };
    this.videoModel = {
      instance: this.playerInstanceName,
      guid: props.dataModel.videos[START_VIDEO_INDEX].guid,
      sharing: true,
      overlayPlayButton: true,
      autoPlay: false
    };
  }

  componentWillUpdate(nextProps, nextState) {
    this.loadVideo(nextProps.dataModel.videos[nextState.currentVideoIndex].directLink, nextState);
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
    if (e.type === 'OnMediaComplete' && !this.adPlaying && this.props.autoContinue) {
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
    if (this.state.currentVideoIndex < (this.props.dataModel.videos.length - 1)) {
      this.changeVideo(this.state.currentVideoIndex + 1);
    } else if (this.state.currentVideoIndex === (this.props.dataModel.videos.length - 1)) {
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
    const formatUrl = url.match(/http.*\?|mbr.*|policy=.*/g).join('');
    this.playVideo(url, formatUrl, nextState);
  }

  playVideo(originalUrl, formatUrl, nextState) {
    //This block validates if the properties were changes, it means the state
    //into the component keep the same, so we need to check if the direct link
    //is different in order to update the player with the new video.
    if (nextState.currentVideoIndex === this.state.currentVideoIndex) {
      if (this.props.dataModel.videos[nextState.currentVideoIndex].directLink !== originalUrl) {
        this.resetVideo(this.playerInstanceName, formatUrl);
        window.dispatchEvent(new Event('resize'));
      }
      return;
    }
    const videoContainer = document.getElementById(this.playerInstanceName);
    const stickyHeaderEl = document.getElementById('header-ad');
    const scrollOffset = (stickyHeaderEl) ? (stickyHeaderEl.getBoundingClientRect().height + 20) * -1 : 0;

    //This sentence checks when the component has autocontinue and the video is
    //not the first one in the list. So this stops the playback when the last
    //video has been played. If we need a loop just change the second
    //condition by the loop property. Currently that is not in the scope.
    if (this.props.autoContinue && !this.didLoop) {
      this.autoPlay = true;

      // Play new video while a PreRoll is playing.
      if (this.adPlaying) {
        // Cancel current video
        ngsPlayer.api.unload(this.playerInstanceName);
        // load and play the video at next JS call stack.
        // It gives enough time to unload the previous video
        _defer((releaseURL)=> {
          ngsPlayer.api.set(releaseURL, this.playerInstanceName);
        }, formatUrl);
      } else {
        ngsPlayer.api.set(formatUrl, this.playerInstanceName);
      }
    } else {
      //set flag to use in "OnLoadReleaseUrl" call back, so we know to call play on player instance
      this.manualPlay = true;
      this.didLoop = false;
      resetVideo(this.playerInstanceName, formatUrl);
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

  resetVideo(instanceName, url) {
    ngsPlayer.api.unload(instanceName);
    ngsPlayer.api.load(url, instanceName);
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
    const {videos} = this.props.dataModel;
    const currentVideo = videos[this.state.currentVideoIndex];

    const thumbnails = videos.map((item, index) => {
      const thumbClass = classNames({
        'mt3_video-playlist-container--thumbnail': true,
        'mt3_video-playlist-container--active-thumbnail': this.state.currentVideoIndex === index,
        'mt3_hide-play': !this.props.autoContinue
      });
      return <VideoThumbnail key={index} wrapperClass={thumbClass} item={item} onClick={this.handleClick.bind(this, index)}/>
    });
    return(
      <div ref="mainVideoContainer" className="mt3_video-playlist mt3_col-12 mt3_col-lg-12 mt3_bgcolor--black">
        <div className="mt3_col-12 mt3_col-md-9 mt3_video-playlist__flex">
          <div className="mt3_video-playlist__main-head">
            <div className="mt3_video-playlist--heading mt3_video-playlist--heading--border">
              <div className="mt3_video-playlist--heading__title mt3_color--white">{this.props.dataModel.heading}</div>
            </div>
          </div>
          <VideoCaption
            title={currentVideo.title}
            abstract={currentVideo.abstract}
            kickerLabel={currentVideo.kicker? currentVideo.kicker.label: ''}
            duration={currentVideo.duration}
          />
          <EmbeddedVideo model={this.videoModel} lazyLoad={true}/>
        </div>
        <div className="mt3_col-12 mt3_col-md-3">
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
  dataModel: React.PropTypes.shape({
    heading: React.PropTypes.string,
    videos: React.PropTypes.arrayOf(
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
    )
  }).isRequired

}

VideoPlaylist.defaultProps = {
  autoContinue: true
}

export default VideoPlaylist;
