'use strict';

import React, { Component, PropTypes }  from 'react';
import * as moment from 'moment';
// import Captions from './components/Sidebar';

class Broadsheet extends Component {
  render() {
    return(
      <div>
        <a href="http://nationalgeographic.com/magazine">National Geographic Magazine</a>
        <section>
          <header>
            <a href={this.props.issueUrl}>{this.props.issueDate}</a>
            <a href={this.props.mainUrl}>
              <h1>{this.props.mainTitle}</h1>
              <p>By: {this.props.mainAuthor}</p>
              <p>Photography: {this.props.mainPhotographer}</p>
            </a>
            <figure>
              <img src={this.props.heroImage} />
              <figcaption>
                {this.props.heroCaption}
                <p>Photograph By: {this.props.heroAttributon}</p>
              </figcaption>
            </figure>

            <div dangerouslySetInnerHTML={{__html: this.props.mainAbstract}} />

            <aside>
              <header>
                <p>Subscribe National Geographic Magazine</p>
                <img src={this.props.sidebarCoverImage} />
              </header>
              <p>Also in this issue</p>
              <ul>
              {this.props.sidebarItems.map((item, index) => (
                <li key={index}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                </li>
              ))}
              </ul>
            </aside>
          </header>
        </section>
      </div>
    );
  }
}

Broadsheet.propTypes = {
  heroAttributon: PropTypes.string,
  heroCaption: PropTypes.string,
  heroImage: PropTypes.string,
  issueDate: PropTypes.string,
  issueUrl: PropTypes.string,
  mainAuthor: PropTypes.string,
  mainAbstract: PropTypes.string,
  mainPhotographer: PropTypes.string,
  mainTitle: PropTypes.string,
  mainUrl: PropTypes.string,
  sidebarItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string
  }))
}

export default Broadsheet;
