import React, {Component} from 'react';
import Truncate from 'react-truncate';

const lines = 3;
/**
 * This component renders the video caption below the video component.
 */
class VideoCaption extends Component {

  constructor(props) {
    super(props);
    this.state= {};
    this.toggleLines = this.toggleLines.bind(this);
  }

  toggleLines(evt) {
    evt.preventDefault();
    this.setState({readMore: !this.state.readMore});
  }

  render() {
    const {title, abstract, kickerLabel, duration} = this.props;
    return (
      <div className="mt3_video-playlist--current-information">
      <div className="mt3_kicker-wrapper mt3_color--neutral--xxxl">
        { kickerLabel ? <span className="mt3_kicker">{kickerLabel}</span> : null }
        { duration ? <span className="mt3_kicker">{duration}</span> : null }
      </div>
        <h3 ref="title" className="mt3_video-playlist--current-information__title">
          <span itemProp='headline' dangerouslySetInnerHTML={{__html: title}} />
        </h3>
        <figcaption className="mt3_caption-container--indent mt3_caption-container--indent--gray">
          <p className="mt3_caption-body mt3_video-playlist--current-information__description">
            <Truncate
              lines={this.state.readMore ? 0 : lines}
              ellipsis={<span>... <a onClick={this.toggleLines} className="mt3_show-more-link">Read more</a></span>}>
              <span itemProp='description' dangerouslySetInnerHTML={{__html: abstract}} />
            </Truncate>
          </p>
        </figcaption>
      </div>
    )
  }
}

VideoCaption.propTypes = {
  title: React.PropTypes.string.isRequired,
  abstract: React.PropTypes.string.isRequired,
  kickerLabel: React.PropTypes.string,
  duration: React.PropTypes.string,
};

export default VideoCaption;
