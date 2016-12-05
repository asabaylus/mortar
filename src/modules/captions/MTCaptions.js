'use strict';

import React from 'react';


class Captions extends React.Component {
  render() {

    const { caption, credit, title, affiliation } = this.props;

    if (!affiliation && !caption && !credit && !title) {
      return null;
    }

    let bodySection = [];
    let creditSection = [];

    if(title) {
      bodySection.push(
        <span key="title" className="mt3_caption-title" dangerouslySetInnerHTML={{__html: title}} />
      )
    }
    if(caption) {
      bodySection.push(
        <span key="caption"
          className="mt3_caption__caption-text"
          dangerouslySetInnerHTML={{__html: caption}} />
      )
    }

    if(credit) {
      creditSection.push(
        <span
          key="credit"
          dangerouslySetInnerHTML={{__html: credit}} />
      );
    }
    if(affiliation) {
      //add a line break if there's also a credit
      if(credit) {
        creditSection.push(
          <br key="break" />
        );
      }
      creditSection.push(
        <span
          key="affiliation"
          dangerouslySetInnerHTML={{__html: affiliation}} />
      )
    }

    return (
        <figcaption className="mt3_caption-container mt3_caption-container--indent">
          {bodySection ?
            <div className="mt3_caption-body">
              {bodySection}
            </div>
          : null}
          {creditSection ?
            <div className="mt3_caption-credit">
              {creditSection}
            </div>
          : null }
        </figcaption>
    );
  }
}

Captions.propTypes = {
  affiliation: React.PropTypes.string,
  caption: React.PropTypes.string,
  credit: React.PropTypes.string,
  title: React.PropTypes.string
}

export default Captions;
