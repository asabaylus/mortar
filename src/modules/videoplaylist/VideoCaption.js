'use strict';

import React, {Component} from 'react';
import _debounce from 'lodash/debounce';
import $ from 'jquery';
import 'jquery.dotdotdot';

/**
 * This component renders the video caption below the video component.
 */
class VideoCaption extends Component {

  constructor() {
    super();
    this.truncateAbstract = this.truncateAbstract.bind(this);
    this.resizeHandler = null;
  }

  componentDidUpdate() {
    this.truncateAbstract();
  }

  componentDidMount() {
    this.truncateAbstract();
    this.resizeHandler = _debounce(() => {
      $(this.refs.abstract).trigger('update');
    }, 500)
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  truncateAbstract() {
    $(this.refs.abstract).css({height: '6em'}).dotdotdot({
      after: $('<a class="mt3_show-more-link mt3_color--white" href="#">Read More</a>'),
      callback: (isTruncated, original) => {
        const $abstractEl = $(this.refs.abstract);
        if (!isTruncated) {
          $abstractEl.css({height: 'auto'});
        }
        $('.mt3_show-more-link').on('click', (event) => {
          event.preventDefault();
          $abstractEl
            .trigger('destroy')
            .css({ height: 'auto' });
        });
      }
    });
  }

  render() {
    const { duration, kicker, title, abstract} = this.props;
    return (
      <div className="mt3_video-playlist--current-information mt3_bgcolor--gray80">
        <div className="mt3_kicker-wrapper">
          {(kicker && kicker.label) ? <a className="mt3_kicker mt3_color--white" href={kicker.url} target={kicker.target}>{kicker.label}</a>
            : (kicker && kicker.html) ? <span className="mt3_kicker mt3_color--white" dangerouslySetInnerHTML={{__html: kicker.html}} />
            : null
          }
          {(duration) ? <span className="mt3_kicker mt3_color--white">{duration}</span> : null}
        </div>
        <h3 ref="title" className="mt3_video-playlist--current-information__title mt3_color--white">
          <span itemProp='headline' dangerouslySetInnerHTML={{__html: title}} />
        </h3>

        <figcaption className="mt3_caption-container--indent mt3_caption-container--indent--gray">
          <div ref="abstract"  className="mt3_caption-body mt3_video-playlist--current-information__description mt3_color--gray40">
            <span itemProp='description' dangerouslySetInnerHTML={{__html: abstract}} />
          </div>
        </figcaption>
      </div>
    )
  }
}

VideoCaption.propTypes = {
  title: React.PropTypes.string.isRequired,
  abstract: React.PropTypes.string.isRequired,
  kicker: React.PropTypes.object,
  duration: React.PropTypes.string
};

export default VideoCaption;
