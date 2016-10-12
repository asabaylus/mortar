'use strict';

import React, { Component, PropTypes }  from 'react';
import { generateHref } from '../../generateHref';

class PromoText extends Component {

  render() {
    const {...props} = this.props;
    const attrs = {
      className: props.config.overlay || props.theme === 'dark' || props.noImages ? 'mt3_color--white mt3_promocard-kicker mt3_promocard-kicker--inverse' : 'mt3_color--gray40 mt3_promocard-kicker',
      href: props.text.kicker && props.text.kicker.url ? generateHref(props.text.kicker.url, props.text.kicker.trackingCodes) : null,
      target: props.text.kicker && props.text.kicker.target ? props.text.kicker.target : null
    };

    const overlayClasses = props.config.overlay ? 'mt3_color--white mt3_promocard-nested-text' : 'mt3_color--neutral--xxd';
    const subheadColor = props.config.overlay ? 'mt3_color--white' : 'mt3_color--gray40';
    const inverseTitle = props.config.overlay || props.theme === 'dark' || props.noImages ? 'mt3_color--white' : 'mt3_color--black';
    const inverseDek = props.theme === 'dark' ? 'mt3_color--white mt3_promocard-dek--inverse' : props.noImages ? 'mt3_color--white mt3_promocard-dek--text-only' : 'mt3_color--black';
    let sponsoredClasses = props.theme === 'dark' ? 'mt3_color--sponsor mt3_promocard-sponsored mt3_promocard-sponsored--inverse' : 'mt3_color--sponsor mt3_promocard-sponsored';

    //for largest size variation, sponsored kicker oughta be white
    if (props.config.overlay) {
      sponsoredClasses = 'mt3_color--white mt3_promocard-kicker  mt3_promocard-kicker--inverse';
    }

    let titleClass = 'mt3_promocard-title--';

    if (props.breakpoint > 375) {
      if (props.breakpoint > 768) {
        if (props.breakpoint > 1024) {
          titleClass += 'large'
        } else {
          titleClass += 'medium';
        }
      } else {
        titleClass += 'small';
      }
    } else {
      titleClass += 'smallest'
    }

    let i = 0;
    let content  = [];

    const textOnlyHorizontal = props.text.dek ? ' mt3_promocard-nested-text--horizontal' : ' mt3_promocard-nested-text--horizontal-no-dek';

    let subHeadingContent = [];
    let j = 0;

    if(props.text.kicker && props.text.kicker.url && props.text.kicker.style !== 'prompt' && !props.config.sponsored){
      subHeadingContent.push(<a key={j++} {...attrs}>{props.text.kicker.label}</a>);
    } else if(props.config.sponsored){
      subHeadingContent.push(<span key={j++} className={sponsoredClasses}>{props.text.sponsorContentLabel}</span>);
    } else if(props.text.kicker){
      subHeadingContent.push(<span key={j++} className={`${attrs.className}`}>{props.text.kicker.label}</span>);
    }

    (props.type === 'video' && props.text.duration && props.text.kicker && props.text.kicker.style !== 'prompt') ?
      subHeadingContent.push(<div key={j++} className={`${subheadColor} ${attrs.className} mt3_card-subhead--right`}>{props.text.duration}</div>)
    : null;

    (props.type === 'gallery' && props.text.photoCount && props.text.kicker && props.text.kicker.style !== 'prompt') ?
      subHeadingContent.push(<div key={j++} className={`${subheadColor} ${attrs.className} mt3_card-subhead--right`}>{props.text.photoCount} Photos</div>)
    : null;


    if(props.breakpoint < 768){
      content.push(
        <div key={i++}>
          { props.text.kicker || props.config.sponsored ?
            <div className="mt3_row">
              <div className="mt3_promocard-pad">
                {subHeadingContent}
              </div>
            </div> : null }
          <div className="mt3_row">
            <div className="mt3_promocard-pad">
              {props.text.title ?
                <div className={`mt3_promocard-title ${inverseTitle} ${titleClass}`}>{props.text.title}</div>
              : null}
              { props.text.dek && !props.config.overlay ?
                <div className={`mt3_promocard-dek ${inverseDek}`}>{props.text.dek}</div>
              : null}
            </div>
          </div>
          { delete props.config.overlay }
        </div>
      );
    }else if(props.breakpoint > 768 && props.noImages){
      content.push(
        <div key={i++}>
          <div className="mt3_row">
            {subHeadingContent}
          </div>
          <div className={textOnlyHorizontal + textOnlyHorizontal+'--left'}>
            {props.text.title ?
              <div className={`mt3_promocard-title ${inverseTitle} ${titleClass}`}>{props.text.title}</div>
              : null
            }
          </div>
          <div className={textOnlyHorizontal + textOnlyHorizontal+'--right'}>
            { props.text.dek && !props.config.overlay ?
              <div className={`mt3_promocard-dek ${inverseDek}`}>{props.text.dek}</div>
            : null }
          </div>
          { delete props.config.overlay }
        </div>
      );
    }else if(props.breakpoint > 768 && !props.noImages){
      content.push(
        <div key={i++}>
          { props.text.kicker || props.config.sponsored ?
            <div className="mt3_row">
              <div className="mt3_promocard-pad">
                {subHeadingContent}
              </div>
            </div> : null }
          <div className="mt3_row">
            <div className="mt3_promocard-pad">
              {props.text.title ?
                <div className={`mt3_promocard-title ${inverseTitle} ${titleClass}`}>{props.text.title}</div>
                : null}
              { props.text.dek && !props.config.overlay ?
                <div className={`mt3_promocard-dek ${inverseDek}`}>{props.text.dek}</div> : null }
            </div>
          </div>
          { delete props.config.overlay }
        </div>
      );
    }

    return (
      <div className={overlayClasses}>
        {content}
      </div>
    );
  }
}

PromoText.PropTypes = {
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  noImages: PropTypes.bool,
  text: PropTypes.shape({
    title: PropTypes.string,
    dek: PropTypes.string,
    kicker: PropTypes.shape({
      label: PropTypes.string,
      style: PropTypes.string,
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
  theme: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule'])
};

export default PromoText;
