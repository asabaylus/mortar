'use strict';
import React, {Component} from 'react';
import Truncate from 'react-truncate';

/**
 * This component renders the video caption below the video component.
 * TODO: Truncation in the description property
 */
class VideoCaption extends Component {

  render() {
    return (
      <div>
        <h3 ref='title' className='mt2_h5'>
          <span itemProp='headline' dangerouslySetInnerHTML={{__html: this.props.title}} />
        </h3>
        <div ref='abstract' className='multi-layout-promos__promo-dek'>
          <span itemProp='description' className='mt2_subh4' dangerouslySetInnerHTML={{__html: this.props.abstract}} />
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
