'use strict';

import React, { Component, PropTypes }  from 'react';
import PromoImage from '../promocard/components/shared/PromoImage';
import Image from '@natgeo/modules-images';
import _debounce from 'lodash/debounce';
import _delay from 'lodash/delay';

class Broadsheet extends Component {

  constructor(props) {
    super(props);
    this.debouncedReveal = null;
    this.reveal = this.reveal.bind(this);
    this.state = {
      breakpoint: this.props.parentWidth || null
    }
  }

  reveal() {
    let el = this.refs.broadsheet;
    let top = el.offsetTop;
    let left = el.offsetLeft;
    let width = el.offsetWidth;
    let height = el.offsetHeight;

    while(el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }

    if (
      top < (window.pageYOffset + window.innerHeight) &&
      left < (window.pageXOffset + window.innerWidth) &&
      (top + height) > window.pageYOffset &&
      (left + width) > window.pageXOffset
    ) {
      // When the BroadSheet enters the viewport animate the gold border, once
      // console.log('broadsheet in viewport');
      this.setState({growClass: "mt3_broadsheet_wrapper--grow"});
      window.removeEventListener('resize', this.debouncedReveal);
      window.removeEventListener('scroll', this.debouncedReveal);
    };
  }

  componentDidMount() {
    // wait a few seconds because the user may need download the contents/images
    // before we start the animation if the broadsheet is inframe on initial
    // page load
    _delay(this.reveal, 2000);
    this.debouncedReveal = _debounce(this.reveal, 500);
    window.addEventListener('resize', this.debouncedReveal);
    window.addEventListener('scroll', this.debouncedReveal);
  }

  componentDidUnMount() {
    window.removeEventListener('resize', this.debouncedReveal);
    window.removeEventListener('scroll', this.debouncedReveal);
  }

  render() {


    // set the aspect ratio for the "hero" image
    // if mobile then 1:1 otherwise 16:9
    // let cardAspectRatio = 0.5649717514124294;
    let cardAspectRatio = 0.5649717514124294;
    if (window.innerWidth < 768) {
      cardAspectRatio = 1;
    }

    const bodyNodes = this.props.mainBody.map((node, index) => {

      if(node.type === 'text') {
        return (
          <div key={index} dangerouslySetInnerHTML={{__html: node.text}} />
        )
      }

      if(node.type === 'image') {
        return(
          <div>
            <Image
              key={index}
              aspectRatio={node.aspectRatio}
              frameAspectRatio={node.aspectRatio}
              lazyLoad={true}
              placeholder="none"
              height={this.props.height}
              width={this.props.width}
              altText={node.altText || ''}
              src={node.imageUrl}
              srcset={node.srcset} />
            <Attributions
              caption={node.caption}
              credit={node.credit} />
          </div>
        )
      }

      return (
        <span key={index} >Content Not Found</span>
      );
    });

    return(
      <div ref="broadsheet" className={"mt3_broadsheet_wrapper " + this.state.growClass} data-reveal="true">
        <div className="mt3_broadsheet">
          <a className="mt3_color--black mt3_heading--h6--2 mt3_broadsheet-magazine-title" href='http://nationalgeographic.com/magazine'>National Geographic Magazine</a>
          <section className="mt3_bgcolor--white">
            <header className="mt3_row">
              <div className="mt3_broadsheet-leadMedia-header">
                <a className="mt3_broadsheet-leadMedia-issue-date mt3_color--white mt3_haas-heading" href={this.props.issueUrl}>
                  <span className="mt3_georgia-heading mt3_broadsheet-leadMedia-issue-date-label mt3_visuallyhidden">
                  Issue Date:</span>
                  {this.props.issueDate}
                </a>
                <a className="mt3_broadsheet-leadMedia-title mt3_btn mt3_btn--naked" href={this.props.mainUrl}>
                  <h1 className="mt3_color--white mt3_haas-heading">{this.props.mainTitle}</h1>
                  <p>
                    <span className="mt3_georgia-heading mt3_broadsheet-leadMedia-by-label">By:</span>
                    <span className="mt3_georgia-heading mt3_broadsheet-leadMedia-by">{this.props.mainAuthor}</span>
                  </p>
                  <p>
                    <span className="mt3_georgia-heading mt3_broadsheet-leadMedia-photograph-label">Photography:</span>
                    <span className="mt3_georgia-heading mt3_broadsheet-leadMedia-photograph">{this.props.mainPhotographer}</span>
                  </p>
                </a>
              </div>
              <div className="mt3_broadsheet-leadMedia-image mt3_promocard-gallery-images--image2-large">
                <PromoImage
                  type="image"
                  config={{
                    "cardAspectRatio": cardAspectRatio
                  }}
                  fadeSpeed={0}
                  leadMedia={this.props.leadMedia}
                  secondImage={false} />
              </div>
            </header>
            <div className="mt3_broadsheet_row">
              <div className="mt3_article mt3_broadsheet-article">
                <Attributions
                  caption={this.props.leadMedia.caption}
                  credit={this.props.leadMedia.credit} />
              {bodyNodes}
              </div>
              <aside className="mt3_broadsheet-aside">
              <div className="mt3_broadsheet-aside-v-background">
                  <header className="mt3_broadsheet-cover-heading mt3_verlag-heading">
                    <p><span className="mt3_broadsheet-subscribe-label">Subscribe</span><br/> National Geographic Magazine</p>
                    <Image
                      aspectRatio={this.props.coverImage.aspectRatio}
                      frameAspectRatio={this.props.coverImage.aspectRatio}
                      lazyLoad={false}
                      placeholderBackgroundColor={"rgb(0,0,0)"}
                      letterboxBackgroundColor = {"rgb(0,0,0)"}
                      placeholder="none"
                      fadeSpeed={0}
                      height={this.props.height}
                      width={this.props.width}
                      altText="National Geographic Magazine Cover Image"
                      src={this.props.coverImage.src}
                      srcset={this.props.coverImage.srcset}
                    />
                  </header>
                  <p className="mt3_broadsheet-story-also-in mt3_verlag-heading">Also in this issue</p>
                  <ul className="mt3_body">
                  {this.props.subStories.map((item, index) => (
                    <li key={index}>
                      <h2 className="mt3_broadsheet-story-title mt3_haas-heading mt3_color--black">{item.text.title}</h2>
                      <p className="mt3_broadsheet-story-dek mt3_color--gray66">{item.text.dek}</p>
                    </li>
                  ))}
                  </ul>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

// TODO: add shape validation for leadMedia and coverImage
Broadsheet.propTypes = {
  coverImage: PropTypes.object,
  issueDate: PropTypes.string,
  issueUrl: PropTypes.string,
  leadMedia: PropTypes.object,
  subStoriesHeading: PropTypes.string,
  subStories: PropTypes.array,
  mainAuthor: PropTypes.string,
  mainBody: PropTypes.array,
  mainPhotographer: PropTypes.string,
  mainTitle: PropTypes.string,
  mainUrl: PropTypes.string
}


class Attributions extends Component {

  render() {
    if (!this.props.caption && this.props.credit) {
      return (<span/>);
    }

    return (
      <figure className="mt3_broadsheet-leadMedia-attributions">
        <figcaption className="mt3_caption-container--indent">
          <p className="mt3_caption-body">
            <span className="mt3_caption-title mt3_visuallyhidden">Photo Title{" "}</span>
            <span dangerouslySetInnerHTML={{__html: this.props.caption}}></span>
          </p>
          <p className="mt3_caption-credit">
            {/* Photograph by */}
            <span
              className="mt3_caption-creditname"
              dangerouslySetInnerHTML={{__html: this.props.credit}}></span>
          </p>
        </figcaption>
      </figure>
    );
  }
}

Attributions.propTypes = {
  caption: PropTypes.string,
  credit: PropTypes.string
}

export default Broadsheet;
