'use strict';

import React, { Component, PropTypes } from 'react';
import _debounce from 'lodash/debounce';
import _delay from 'lodash/delay';

import Image from '@natgeo/modules-images';

import PromoImage from '../promocard/components/shared/PromoImage';
import SubscribeCard from '../subscribecard/MTSubscribeCard';
import Captions from '../captions/MTCaptions';


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
      { top, height } = el.getBoundingClientRect(),
      { innerHeight } = window;

    if (top < innerHeight) {
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

    if(this.props.mountedCallBack) {
      this.props.mountedCallBack(this.props.id)
    }
  }

  componentDidUnMount() {
    this.removeListeners();
  }

  render() {
    // set the aspect ratio for the 'hero' image
    // if mobile then 1:1 otherwise 16:9
    const cardAspectRatio = window.innerWidth < 768 ? 1 : 0.565;

    const { author,
            body,
            heroKicker,
            heroImage,
            heroTitle,
            heroUrl,
            photographer,
            subscribeCardProps,
            substoryProps} = this.props;

    let i = 0;
    let bodyNodes = null;
    let contributorsBlock = [];

    if(author) {
      contributorsBlock.push(
        <p key={i++}>
          <span className='mt3_georgia-heading mt3_broadsheet-leadMedia-by-label'>By:</span>
          <span className='mt3_georgia-heading mt3_broadsheet-leadMedia-by'>{author}</span>
        </p>
      );
    }

    if(photographer) {
      contributorsBlock.push(
        <p key={i++}>
          <span className='mt3_georgia-heading mt3_broadsheet-leadMedia-photograph-label'>Photography:</span>
          <span className='mt3_georgia-heading mt3_broadsheet-leadMedia-photograph'>{photographer}</span>
        </p>
      );
    }

    if(body) {
      bodyNodes = body.map((node, index) => {
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
                altText={node.altText || ''}
                src={node.imageUrl}
                srcset={node.srcset} />
              <Captions
                affiliation={node.affiliation}
                caption={node.caption}
                credit={node.credit}
                title={node.title} />
            </div>
          )
        }

        return (
          <span key={index}>Content Not Found</span>
        );
      });
    }

    return (
      <div ref={ref => this.broadsheet = ref} className='mt3_broadsheet_wrapper' data-reveal='true'>
        <div className='mt3_broadsheet'>
          <a className='mt3_color--black mt3_heading--h6--2 mt3_broadsheet-magazine-title' href='http://nationalgeographic.com/magazine'>National Geographic Magazine</a>

          <section className='mt3_bgcolor--white'>
            <header className='mt3_row'>
                <div className='mt3_broadsheet-leadMedia-header'>

                {heroKicker ?
                  <a className='mt3_broadsheet-leadMedia-issue-date mt3_color--white mt3_haas-heading' href={heroKicker.url}>
                    {heroKicker.label}
                  </a>
                : null }

                <a className='mt3_broadsheet-leadMedia-title mt3_btn mt3_btn--naked' href={heroUrl}>
                  <h1 className='mt3_color--white mt3_haas-heading'>{heroTitle}</h1>
                  {contributorsBlock.length ?
                    contributorsBlock
                  : null}
                </a>
              </div>

              <div className='mt3_broadsheet-leadMedia-image mt3_promocard-gallery-images--image2-large'>
                <PromoImage
                  type='image'
                  config={{
                    cardAspectRatio
                  }}
                  fadeSpeed={0}
                  leadMedia={heroImage}
                  secondImage={false} />
              </div>
            </header>

            <div className='mt3_broadsheet_row'>
              <div className='mt3_article mt3_broadsheet-article'>
                <Captions
                  affiliation={heroImage.affiliation}
                  caption={heroImage.caption}
                  credit={heroImage.credit}
                  title={heroImage.title}/>

                <div id={`${this.props.id}__smartbody`}>
                  {bodyNodes}
                </div>
              </div>

              <aside className='mt3_broadsheet-aside'>
                <div className='mt3_broadsheet-aside-v-background'>
                  {subscribeCardProps ?
                    <SubscribeCard model={subscribeCardProps}/>
                  : null}

                  {substoryProps && substoryProps.stories.length ?
                    <div>
                      <p className='mt3_broadsheet-story-also-in mt3_verlag-heading'>{substoryProps.heading}</p>

                      <ul className='mt3_body'>
                        {substoryProps.stories.map((item, index) => (
                          <li key={index}>
                            <h2 className='mt3_broadsheet-story-title mt3_haas-heading mt3_color--black'>{item.text.title}</h2>
                            <p className='mt3_broadsheet-story-dek mt3_color--gray66'>{item.text.dek}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  : null }
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
  author: PropTypes.string,
  body: PropTypes.array,
  heroImage: PropTypes.shape({
    caption: PropTypes.string,
    credit: PropTypes.string
  }).isRequired,
  heroKicker: PropTypes.string,
  heroTitle: PropTypes.string,
  heroUrl: PropTypes.string,
  photographer: PropTypes.string,
  subscribeCardProps: PropTypes.object,
  substoryProps: PropTypes.object,
  writer: PropTypes.string
}

export default Broadsheet;
