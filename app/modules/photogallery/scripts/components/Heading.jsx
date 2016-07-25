'use strict';

import React, { Component, PropTypes }  from 'react';
import Counter from './Counter.jsx';

class Heading extends Component {

  render() {
    let title = [],
        i = 0;

    if(this.props.title){
      title.push(<div key={i++} className="mt2_h3 mt2_color--neutral--xd">{this.props.title}</div>);
    }

    if(this.props.description){
      title.push(<div key={i++} className="mt2_subh4 mt2_color--neutral--xd">{this.props.description}</div>);
    }

    return (
      <div className="mt2_photogallery-heading">
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
