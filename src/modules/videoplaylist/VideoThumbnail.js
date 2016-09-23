'use strict';

import React, {Component} from 'react';
import Image from '@natgeo/modules-images';
import Truncate from 'react-truncate';

export const KICKER_TYPES = ['now', 'next'];

const Kicker = ({type}) => (
  <div className="mt3_kicker-wrapper">
    {(type === 'now') ? <span className="mt3_kicker mt3_color--black thumbnail-kicker--now">now playing</span> : null}
    {(type === 'next') ? <span className="mt3_kicker mt3_color--primary thumbnail-kicker--next">next</span> : null}
  </div>
);

class VideoThumbnail extends Component {

  onClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    const { kickerType } = this.props;
    const imageModel = {
      placeholderBackgroundColor: '#000000',
      src: this.props.item.thumbnail,
      isVideo: true,
      lazyLoad: true,
      aspectRatio: 9/16
    };

    return (
      <div className={this.props.wrapperClass}>
        <Image {...imageModel} />
        <a href={this.props.item.path} className="thumbnail-overlay mt3_none" title={this.props.item.title} data-guid={this.props.item.guid} onClick={this.onClick.bind(this)}>
          {(kickerType) ? <Kicker type={kickerType}/> : null}
          <Truncate lines={2} ellipsis={(<span>...</span>)}>
            <div ref="videoTitle"  dangerouslySetInnerHTML={{__html: this.props.item.title}} />
          </Truncate>
        </a>
      </div>
    )
  }
}

VideoThumbnail.propTypes = {
  wrapperClass: React.PropTypes.string,
  kickerType: React.PropTypes.oneOf(KICKER_TYPES),
  item: React.PropTypes.shape({
    directLink: React.PropTypes.string,
    title: React.PropTypes.string,
    guid: React.PropTypes.string,
    thumbnail: React.PropTypes.string,
    path: React.PropTypes.string,
  }).isRequired
}

VideoThumbnail.defaultProps = {
  item: {
    directLink: '',
    title: '',
    guid: ''
  }
}

export default VideoThumbnail;
