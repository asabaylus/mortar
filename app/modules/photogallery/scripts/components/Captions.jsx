'use strict';

import React, { Component, PropTypes }  from 'react';

class Captions extends Component {

  render(){

    return(
      <figcaption>
        <p className="mt2_color--neutral--xd mt2_row-gut-half">
          <span className="mt2_h5">{this.props.title}</span>
          <span className="mt2_subh4">{this.props.caption}</span>
        </p>

        <span className="mt2_subh3 mt2_color--neutral--l">
          Photograph by {this.props.credit}<br />
          Source: {this.props.assetSource}
        </span>
      </figcaption>
    );
  }

}

Captions.propTypes = {
  assetSource: PropTypes.string,
  caption: PropTypes.string,
  credit: PropTypes.string,
  title: PropTypes.string
}

export default Captions;
