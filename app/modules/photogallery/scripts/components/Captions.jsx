'use strict';

import React, { Component, PropTypes }  from 'react';

class Captions extends Component {

  render(){

    return(
      <figcaption>
        <p className="mt2_color--neutral--xd mt2_row-gut-half">
          <span className="mt2_h5">Photo Title</span>
          <span className="mt2_subh4">This is a photo caption.</span>
        </p>

        <span className="mt2_subh3 mt2_color--neutral--l">
          Photograph by Name Here<br />
          Source: goes here
        </span>
      </figcaption>
    );
  }

}

export default Captions;
