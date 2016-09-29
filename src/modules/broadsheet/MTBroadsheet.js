'use strict';

import React, { Component, PropTypes }  from 'react';

class Broadsheet extends Component {
  render() {
    const bodyNodes = this.props.mainBody.map((node, index) => {
      if(node.type === 'text') {
        return (
          <div key={index} dangerouslySetInnerHTML={{__html: node.text}} />
        )
      }

      return (
        <img key={index} src={node.imageUrl} />
      )
    });

    return(
      <div>
        <a href='http://nationalgeographic.com/magazine'>National Geographic Magazine</a>
        <section>
          <header>
            <a href={this.props.issueUrl}>{this.props.issueDate}</a>
            <a href={this.props.mainUrl}>
              <h1>{this.props.mainTitle}</h1>
              <p>By: {this.props.mainAuthor}</p>
              <p>Photography: {this.props.mainPhotographer}</p>
            </a>
            <figure>
              <img src={this.props.leadMediaImage} />
              <figcaption>
                {this.props.leadMediaCaption}
                <div dangerouslySetInnerHTML={{__html: this.props.leadMediaCredit}} />
              </figcaption>
            </figure>
          </header>

          {bodyNodes}

          <aside>
            <header>
              <p>Subscribe National Geographic Magazine</p>
              <img src={this.props.coverImage} />
            </header>
            <p>Also in this issue</p>
            <ul>
            {this.props.subStories.map((item, index) => (
              <li key={index}>
              <h2>{item.text.title}</h2>
              <p>{item.text.dek}</p>
              </li>
            ))}
            </ul>
          </aside>
        </section>
      </div>
    );
  }
}

Broadsheet.propTypes = {
  coverImage: PropTypes.string,
  issueDate: PropTypes.string,
  issueUrl: PropTypes.string,
  leadMediaCaption: PropTypes.string,
  leadMediaCredit: PropTypes.string,
  leadMediaImage: PropTypes.string,
  subStoriesHeading: PropTypes.string,
  subStories: PropTypes.array,
  mainAuthor: PropTypes.string,
  mainBody: PropTypes.array,
  mainPhotographer: PropTypes.array,
  mainTitle: PropTypes.string,
  mainUrl: PropTypes.string
}

export default Broadsheet;
