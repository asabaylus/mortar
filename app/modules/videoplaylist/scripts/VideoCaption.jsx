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
    const {title, abstract} = this.props;
    return (
      <div>
        <h3 ref="title" className="mt3_h5">
          <span itemProp='headline' dangerouslySetInnerHTML={{__html: title}} />
        </h3>
        <div ref="abstract" className="multi-layout-promos__promo-dek mt3_subh4">
          <Truncate
            lines={this.state.readMore ? 0 : lines}
            ellipsis={<span>... <a onClick={this.toggleLines} className="mt3_show-more-link">Read more</a></span>}>
            <span itemProp='description' dangerouslySetInnerHTML={{__html: abstract}} />
          </Truncate>
        </div>
      </div>
    )
  }
}

VideoCaption.propTypes = {
  title: React.PropTypes.string.isRequired,
  abstract: React.PropTypes.string.isRequired,
};

export default VideoCaption;
