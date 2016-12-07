'use strict';

import React from 'react';
import Counter from './Counter';

export default class Heading extends React.Component {
  render() {
    const {
      description,
      title,
    } = this.props;

    return (
      <div className="mt3_photogallery-heading">
        {title &&
          <div className="mt3_h3 mt3_color--gray80">{title}</div>}
        {description &&
          <div className="mt3_subh4 mt3_color--gray80">{description}</div>}
      </div>
    );
  }
}

Heading.propTypes = {
  description: React.PropTypes.string,
  title: React.PropTypes.string
}
