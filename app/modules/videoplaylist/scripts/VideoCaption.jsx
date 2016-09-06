import React, {Component} from 'react';
import _debounce from 'lodash/debounce';
require('jquery.dotdotdot');

const Caption = props => (
  <figcaption className="mt3_caption-container--indent mt3_caption-container--indent--gray">
    <div className="mt3_caption-body mt3_video-playlist--current-information__description" id="js_truncate">
      <span itemProp='description' dangerouslySetInnerHTML={{__html: props.abstract}} />
    </div>
    <br/>
  </figcaption>
);

/**
 * This component renders the video caption below the video component.
 */
class VideoCaption extends Component {

  constructor() {
    super();
    this.truncateAbstract = this.truncateAbstract.bind(this);
  }

  componentDidUpdate() {
    this.truncateAbstract();
  }

  componentDidMount() {
    this.truncateAbstract();
    window.addEventListener('resize', function () {
      $("#js_truncate").trigger('update');
    });
  }

  truncateAbstract() {
    $("#js_truncate").css({height: '6em'}).dotdotdot({
      after: $('<a class="mt3_show-more-link" href="#">Read More</a>'),
      callback: function(isTruncated, original) {
        $('.mt3_show-more-link').on('click', function(event){
          event.preventDefault();
          $("#js_truncate")
            .trigger('destroy')
            .css({ height: 'auto' });
        });
      }
    });
  }

  render() {
    const {title, abstract} = this.props;
    return (
      <div className="mt3_video-playlist--current-information">

        <h3 ref="title" className="mt3_video-playlist--current-information__title">
          <span itemProp='headline' dangerouslySetInnerHTML={{__html: title}} />
        </h3>

        <Caption abstract={abstract} />
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
