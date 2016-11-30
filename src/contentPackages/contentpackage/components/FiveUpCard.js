'use strict';

import React, { PropTypes }  from 'react';

import Image from '@natgeo/modules-images';
import { generateHref } from '../../../modules/promocard/generateHref';


export default class FiveUpCard extends React.Component {

  render() {
    const {
      cardNum,
      config,
      leadMedia,
      link,
      showImage,
      showKicker,
      text,
      theme,
      type,
    } = this.props;

    const attrs = {
      className: theme === 'dark' ? 'mt3_color--white mt3_kicker' : 'mt3_color--gray40 mt3_kicker',
      href: text.kicker ? generateHref(text.kicker.url, text.kicker.trackingCodes) : null,
      target: text.kicker ? text.kicker.target : null
    };

    const kicker = [];

    if (showKicker && text.kicker && !config.sponsored) {
      if (attrs.href) {
        kicker.push(<span key={`kicker-container-${cardNum}`} className={attrs.className}><a href={attrs.href} target={attrs.target} className="mt3_kicker--link">{text.kicker.label}</a></span>);
      } else {
        kicker.push(<span key={`kicker-container-${cardNum}`} className={attrs.className} dangerouslySetInnerHTML={{__html: text.kicker.label}} />);
      }
    } else if (config.sponsored) {
      if (!showKicker) {
        attrs.className += ' mt3_fiveup-no-kicker'
      }
      kicker.push(<span key={`kicker-container-${cardNum}`} className={attrs.className} dangerouslySetInnerHTML={{__html: text.sponsorContentLabel}} />);
    }

    const playButton =
      <button className="mt3_videopromo-button">
        <span className="mt3_visuallyhidden">Play</span>
        <div className="mt3_videopromo-button-container mt3_intratio--natgeo">
          <svg className="mt3_videopromo-button-icon">
            <use xlinkHref="#play"></use>
          </svg>
        </div>
      </button>;

    // setting a class on the top card if it has an image so that it can span 100% width
    const rowClass = (showImage && leadMedia && (leadMedia[0].url || leadMedia[0].imageUrl)) ? 'mt3_row mt3_fiveup-card-row mt3_fiveup-card-row--has-image' : 'mt3_row mt3_fiveup-card-row';

    return (
      <figure className="mt3_fiveup-card">
        { link && link.url ? <a className="mt3_fiveup-divlink" href={generateHref(link.url, link.trackingCodes)} target={link.target} /> : null}

        { text.kicker || config.sponsored ?
        <div className="mt3_row mt3_fiveup-kicker">
          <div className="mt3_kicker-wrapper">
            {kicker.length ? kicker : null}
            {(showKicker && type === 'video' && text.duration) ? <span className={`${attrs.className} mt3_kicker`} dangerouslySetInnerHTML={{__html: text.duration}} /> : null}
          </div>
        </div> : null }

        <div className={rowClass}>
          {text.title ? <div className="mt3_fiveup-card-title" dangerouslySetInnerHTML={{__html: text.title}} /> : null}
        </div>

        { showImage && leadMedia && leadMedia[0] ?
          <Image
            aspectRatio={leadMedia[0].aspectRatio}
            frameAspectRatio={'16:9'}
            lazyLoad={false}
            altText={leadMedia[0].altText}
            src={leadMedia[0].url || leadMedia[0].imageUrl}
            srcset={leadMedia[0].srcset}
          /> : null
        }

        { (config.showPlayButton && showImage)
          || (type === 'video' && showImage) ? playButton : null
        }
      </figure>
    );
  }
}

FiveUpCard.PropTypes = {
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  theme: PropTypes.string,
  config: PropTypes.object,
  showImage: PropTypes.bool,
  cardNum: PropTypes.number,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  leadMedia: PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    altText: PropTypes.string,
    srcset: PropTypes.array,
    imageUrl: PropTypes.string
  }),
  text: PropTypes.shape({
    title: PropTypes.string,
    dek: PropTypes.string,
    kicker: PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
      target: PropTypes.string,
      seoTitle: PropTypes.string,
      trackingCodes: PropTypes.array || PropTypes.string
    }),
    photoCount: PropTypes.number,
    byline: PropTypes.string,
    duration: PropTypes.string,
    publishDate: PropTypes.string,
    sponsorContentLabel: PropTypes.string
  }),
  cta: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string,
    target: PropTypes.string,
    seoTitle: PropTypes.string
  }),
  brandingBadgeLabel: PropTypes.string
};
