'use strict';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import _debounce from 'lodash/debounce';
import $ from 'jquery';
import 'dotdotdot';

/**
 * This component renders the video caption below the video component.
 */
class VideoCaption extends Component {

  constructor() {
    super();
    this.onAnimationEnd = this.onAnimationEnd.bind(this);
    this.truncateAbstract = this.truncateAbstract.bind(this);
    this.resizeHandler = null;
  }

  componentDidMount() {
    this.el = ReactDOM.findDOMNode(this);

    this.truncateAbstract();
    this.resizeHandler = _debounce(() => {
      this.refreshParentHeight(el);
      $(this.refs.abstract).trigger('update');
    }, 500)
    window.addEventListener('resize', this.resizeHandler);

    this.el.parentNode.addEventListener('transitionend', this.onAnimationEnd, false);

    Object.assign(this.el.style, {
      opacity: 1,
    });
    this.refreshParentHeight(this.el);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
    this.el.parentNode.removeEventListener('transitionend', this.onAnimationEnd);
  }

  onAnimationEnd(event) {
    if(event.propertyName === 'height') {
      this.props.onAnimationEnd();
    }
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

  refreshParentHeight(el) {
    const height = el.offsetHeight;

    Object.assign(el.parentNode.style, {
      height: `${height}px`,
    });
  }

  render() {
    const { duration, kicker, title, abstract } = this.props;

    let subHeadingContent = [];
    let j = 0;

    if(kicker && kicker.url){
      subHeadingContent.push(<a key={j++} className="mt3_kicker mt3_color--white" href={kicker.url} target={kicker.target} dangerouslySetInnerHTML={{__html: kicker.label}} />);
    } else if(kicker){
      subHeadingContent.push(<span key={j++} className="mt3_kicker mt3_color--white" href={kicker.url} target={kicker.target} dangerouslySetInnerHTML={{__html: kicker.label}} />);
    }

    (duration && kicker) ?
      subHeadingContent.push(<span key={j++} className="mt3_kicker mt3_color--white" dangerouslySetInnerHTML={{__html: duration}} />)
      : null;

    return (
      <div
        className="mt3_video-playlist--current-information"
      >
        <div className="mt3_kicker-wrapper">
          {subHeadingContent}
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
  duration: React.PropTypes.string,
  onAnimationEnd: React.PropTypes.func.isRequired,
};

export default VideoCaption;
