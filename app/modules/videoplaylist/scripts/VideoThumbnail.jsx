import React, {Component} from 'react';
import Image from '@natgeo/modules-images';
import Truncate from 'react-truncate';

class VideoThumbnail extends Component {

  onClick(e) {
    e.preventDefault();
    this.props.onClick();
  }

  render() {
    const imageModel = {
      src: this.props.item.thumbnail,
      isVideo: true,
      lazyLoad: true,
      aspectRatio: 9/16
    };

    return (
      <div className={this.props.wrapperClass}>
        <a href={this.props.item.path} className="mt2_none" title={this.props.item.title} data-guid={this.props.item.guid} onClick={this.onClick.bind(this)}>
          <Image {...imageModel} />
          <Truncate lines={3} ellipsis={(<span>...</span>)}>
            <div ref="videoTitle"  dangerouslySetInnerHTML={{__html: this.props.item.title}} />
          </Truncate>
        </a>
      </div>
    )
  }
}

VideoThumbnail.propTypes = {
  wrapperClass: React.PropTypes.string,
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
