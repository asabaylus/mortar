'use strict';

import React from 'react';


class Attributions extends React.Component {
  render() {

    const { caption, credit } = this.props;

    if (!caption && credit) {
      return null;
    }

    return (
      <figure className="mt3_broadsheet-leadMedia-attributions">
        <figcaption className="mt3_caption-container--indent">
          <p className="mt3_caption-body">
            <span className="mt3_caption-title mt3_visuallyhidden">Photo Title{" "}</span>
            <span dangerouslySetInnerHTML={{__html: caption}} />
          </p>
          <p className="mt3_caption-credit">
            {/* Photograph by */}
            <span
              className="mt3_caption-creditname"
              dangerouslySetInnerHTML={{__html: credit}}></span>
          </p>
        </figcaption>
      </figure>
    );
  }
}

Attributions.propTypes = {
  caption: React.PropTypes.string,
  credit: React.PropTypes.string
}

export default Attributions;
