'use strict';

import React, { Component, PropTypes } from 'react';
import _debounce from 'lodash/debounce';
import _delay from 'lodash/delay';

import Image from '@natgeo/modules-images';

import PromoImage from '../promocard/components/shared/PromoImage';
import Attributions from './MTAttributions';


class Broadsheet extends Component {

  constructor(props) {
    super(props);
    this.reveal = ::this.reveal;
    this.removeListeners = ::this.removeListeners;
    this.debouncedReveal = _debounce(this.reveal, 500);
  }

  reveal() {
    // if component gets visible (within viewport) sets class for
    // animating yellow border
    const el = this.broadsheet,
      { top, left, width, height } = el.getBoundingClientRect(),
      { pageXOffset, pageYOffset,
        innerWidth, innerHeight } = window;

    if (top < (pageYOffset + innerHeight) && left < (pageXOffset + innerWidth)
      && (top + height) > pageYOffset && (left + width) > pageXOffset)
    {
      // When the BroadSheet enters the viewport animate the gold border, once
      this.broadsheet.classList.add('mt3_broadsheet_wrapper--grow');
      this.removeListeners();
    };
  }

  removeListeners() {
    window.removeEventListener('resize', this.debouncedReveal);
    window.removeEventListener('scroll', this.debouncedReveal);
  }

  componentDidMount() {
    // wait a few seconds because the user may need download the contents/images
    // before we start the animation if the broadsheet is inframe on initial
    // page load
    _delay(this.reveal, 2000);
    window.addEventListener('resize', this.debouncedReveal);
    window.addEventListener('scroll', this.debouncedReveal);
  }

  componentDidUnMount() {
    this.removeListeners();
  }

  render() {
    // set the aspect ratio for the 'hero' image
    // if mobile then 1:1 otherwise 16:9
    // let cardAspectRatio = 0.5649717514124294;
    const cardAspectRatio = window.innerWidth < 768 ? 1 : 0.565;
    const {
      coverImage,
      issueDate,
      issueUrl,
      leadMedia,
      mainAuthor,
      mainPhotographer,
      mainTitle,
      mainUrl,
      subStories,
      height, width,
    } = this.props;
    const bodyNodes = this.props.mainBody.map((node, index) => {

      if (node.type === 'text') {
        return (
          <div key={index} dangerouslySetInnerHTML={{__html: node.text}} />
        )
      }

      if (node.type === 'image') {
        return(
          <div key={index}>
            <Image
              aspectRatio={node.aspectRatio}
              frameAspectRatio={node.aspectRatio}
              lazyLoad={true}
              placeholder='none'
              height={height}
              width={width}
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
        <span key={index}>Content Not Found</span>
      );
    });

    return (
      <div ref={ref => this.broadsheet = ref} className='mt3_broadsheet_wrapper' data-reveal='true'>
        <div className='mt3_broadsheet'>
          <a className='mt3_color--black mt3_heading--h6--2 mt3_broadsheet-magazine-title' href='http://nationalgeographic.com/magazine'>National Geographic Magazine</a>

          <section className='mt3_bgcolor--white'>
            <header className='mt3_row'>
              <div className='mt3_broadsheet-leadMedia-header'>
                <a className='mt3_broadsheet-leadMedia-issue-date mt3_color--white mt3_haas-heading' href={issueUrl}>
                  <span className='mt3_georgia-heading mt3_broadsheet-leadMedia-issue-date-label mt3_visuallyhidden'>
                  Issue Date:</span>
                  {issueDate}
                </a>

                <a className='mt3_broadsheet-leadMedia-title mt3_btn mt3_btn--naked' href={mainUrl}>
                  <h1 className='mt3_color--white mt3_haas-heading'>{mainTitle}</h1>
                  <p>
                    <span className='mt3_georgia-heading mt3_broadsheet-leadMedia-by-label'>By:</span>
                    <span className='mt3_georgia-heading mt3_broadsheet-leadMedia-by'>{mainAuthor}</span>
                  </p>
                  <p>
                    <span className='mt3_georgia-heading mt3_broadsheet-leadMedia-photograph-label'>Photography:</span>
                    <span className='mt3_georgia-heading mt3_broadsheet-leadMedia-photograph'>{mainPhotographer}</span>
                  </p>
                </a>
              </div>

              <div className='mt3_broadsheet-leadMedia-image mt3_promocard-gallery-images--image2-large'>
                <PromoImage
                  type='image'
                  config={{
                    cardAspectRatio
                  }}
                  fadeSpeed={0}
                  leadMedia={leadMedia}
                  secondImage={false} />
              </div>
            </header>

            <div className='mt3_broadsheet_row'>
              <div className='mt3_article mt3_broadsheet-article'>
                <Attributions
                  caption={leadMedia.caption}
                  credit={leadMedia.credit} />

                  {bodyNodes}
              </div>

              <aside className='mt3_broadsheet-aside'>
                <div className='mt3_broadsheet-aside-v-background'>
                  <header className='mt3_broadsheet-cover-heading mt3_verlag-heading'>
                    <p><span className='mt3_broadsheet-subscribe-label'>Subscribe</span><br/> National Geographic Magazine</p>

                    <Image
                      aspectRatio={coverImage.aspectRatio}
                      lazyLoad={false}
                      placeholderBackgroundColor={'rgb(0,0,0)'}
                      letterboxBackgroundColor = {'rgb(0,0,0)'}
                      placeholder='none'
                      fadeSpeed={0}
                      height={height}
                      width={width}
                      altText='National Geographic Magazine Cover Image'
                      src={coverImage.src}
                      srcset={coverImage.srcset}
                    />
                  </header>

                  <p className='mt3_broadsheet-story-also-in mt3_verlag-heading'>Also in this issue</p>

                  <ul className='mt3_body'>
                  {subStories.map((item, index) => (
                    <li key={index}>
                      <h2 className='mt3_broadsheet-story-title mt3_haas-heading mt3_color--black'>{item.text.title}</h2>
                      <p className='mt3_broadsheet-story-dek mt3_color--gray66'>{item.text.dek}</p>
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

Broadsheet.propTypes = {
  coverImage: PropTypes.shape({
    aspectRatio: PropTypes.number,
    srcset: PropTypes.array,
    src: PropTypes.string,
  }),
  issueDate: PropTypes.string,
  issueUrl: PropTypes.string,
  leadMedia: PropTypes.shape({
    caption: PropTypes.string,
    credit: PropTypes.string
  }),
  subStories: PropTypes.array,
  mainAuthor: PropTypes.string,
  mainBody: PropTypes.array,
  mainPhotographer: PropTypes.string,
  mainTitle: PropTypes.string,
  mainUrl: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
}

export default Broadsheet;
