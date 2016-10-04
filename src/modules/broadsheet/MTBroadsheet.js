'use strict';

import React, { Component, PropTypes }  from 'react';
import PromoImage from '../promocard/components/shared/PromoImage';
import Image from '@natgeo/modules-images';

class Broadsheet extends Component {

  constructor(props) {
    super(props);
    this.resizeHandler = null;
    this.getWidth = this.getWidth.bind(this);
    this.calcAspectRatio = this.calcAspectRatio.bind(this);
    this.state = {
      breakpoint: this.props.parentWidth || null
    }
  }

  getWidth(){
    const containerWidth = this.refs.promocardContainer.getBoundingClientRect().width;
    if(this.state.containerWidth !== containerWidth) {
      this.setState({
        breakpoint: containerWidth
      });
    }
  }

  calcAspectRatio(){
    const width = this.state.breakpoint;
    const parentFrameAspectRatio = this.props.leadMedia.aspectRatio;
    let parentFrameHeightMultiplier;
    switch(parentFrameAspectRatio){
    case '16:9':
      parentFrameHeightMultiplier = 0.5625;
      break;
    case '2:1':
      parentFrameHeightMultiplier = 0.5;
      break;
    case '1:1':
      parentFrameHeightMultiplier = 1;
      break;
    default: //default to 3:2
      parentFrameHeightMultiplier = 0.667;
    }
    const height = width * parentFrameHeightMultiplier;

    let corner = 30;
    if(width > 375 && width < 768){
      corner = 40;
    }else if(width > 768){
      corner = 60;
    }

    return (height - corner) / (width - corner);
  }

  render() {
    const bodyNodes = this.props.mainBody.map((node, index) => {

      if(node.type === 'text') {
        return (
          <div key={index} dangerouslySetInnerHTML={{__html: node.text}} />
        )
      }

      if(node.type === 'image') {
        return(
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
              srcset={node.srcset}
          />
        )
      }

      return (
        <span key={index} >Content Not Found</span>
      );
    });

    return(
      <div className="broadsheet mt3_bgcolor--primary">
        <a className="mt3_color--black mt3_heading--h6--2" href='http://nationalgeographic.com/magazine'>National Geographic Magazine</a>
        <section className="mt3_bgcolor--white">
          <header className="mt3_row" style={{'minHeight': '450px'}}>
            <div className="mt3_broadsheet-leadMedia-header">
              <a className="mt3_broadsheet-leadMedia-issue-date mt3_color--white mt3_haas-heading" href={this.props.issueUrl}>{this.props.issueDate}</a>
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
                config={''}
                leadMedia={this.props.leadMedia}
                childFrameAspectRatio={this.calcAspectRatio()}
                secondImage={false}
                breakpoint={this.state.breakpoint} />
            </div>
          </header>
          <div className="mt3_row">
            <div className="mt3_article mt3_col-8 mt3_col-gut">
            {bodyNodes}
            </div>
            <aside className="mt3_broadsheet-col-right mt3_col-4 mt3_col-gut">
              <header className="mt3_broadsheet-cover-heading mt3_verlag-heading">
                <p><span className="mt3_broadsheet-subscribe-label">Subscribe</span><br/> National Geographic Magazine</p>
                <Image
                  aspectRatio={this.props.coverImage.aspectRatio}
                  frameAspectRatio={this.props.coverImage.aspectRatio}
                  lazyLoad={false}
                  placeholderBackgroundColor={"rgb(0,0,0)"}
                  letterboxBackgroundColor = {"rgb(0,0,0)"}
                  placeholder="none"
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
            </aside>
          </div>
        </section>
      </div>
    );
  }
}

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

export default Broadsheet;
