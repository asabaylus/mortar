'use strict';

import React, { Component, PropTypes }  from 'react';

class Heading extends Component {

  render() {
    let title = [],
      i = 0;

    if(this.props.title){
      title.push(<div key={i++} className="mt3_h3 mt3_color--gray80">{this.props.title}</div>);
    }

    if(this.props.description){
      title.push(<div key={i++} className="mt3_subh4 mt3_color--gray80">{this.props.description}</div>);
    }

    return (
      <div className="mt3_photogallery-heading">
        { title }
      </div>
    );
  }

}

Heading.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
}

export default Heading;
