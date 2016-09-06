import React, {Component} from 'react';
import _debounce from 'lodash/debounce';
require('jquery.dotdotdot');

const lines = 3;
/**
 * This component renders the video caption below the video component.
 */
class VideoCaption extends Component {

  constructor(props) {
    super(props);
    this.state= {};
    this.toggleLines = this.toggleLines.bind(this);
    this.truncateAbstract = this.truncateAbstract.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({
      readMore: false
    });
  }

  componentDidMount() {
    this.truncateAbstract();
    const resizeHandler = _debounce(this.truncateAbstract, 500);
    window.addEventListener('resize', resizeHandler);
  }

  componentDidUpdate() {
    this.truncateAbstract();
  }

  truncateAbstract() {
    const $truncEl = $(this.refs.abstract);
    if ($truncEl.length > 0 && !this.state.readMore) {
      $truncEl.dotdotdot({
        after: 'a.mt3_show-more-link'
      });
    }

  }

  toggleLines(evt) {
    evt.preventDefault();
    const $truncEl = $(this.refs.abstract);
    $truncEl.trigger('destroy');
    this.setState({readMore: !this.state.readMore});
  }

  render() {
    const {title, abstract, kickerLabel, duration} = this.props;
    const {readMore} = this.state;
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
          <div style={{height: readMore ? 'auto' : '6em' }} ref="abstract" className="mt3_caption-body mt3_video-playlist--current-information__description">
            <span itemProp='description' dangerouslySetInnerHTML={{__html: abstract}} />
            {!readMore && <a onClick={this.toggleLines} href="#" className="mt3_show-more-link">Read more</a>}
          </div>
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
