'use strict';

import React, { Component, PropTypes }  from 'react';
import cx from 'classnames';

let kickerClasses;

class PromoText extends Component {

  render() {
    const {...props} = this.props;

    const kickerIsLink = /<a/g; //check if the kicker contains an <a/> tag, this will affect z-index of class applied

    if(props.config.overlay || props.theme === 'dark' || props.noImages){
      kickerClasses = 'mt3_color--white mt3_promocard-kicker mt3_promocard-kicker--inverse';
    }else if(props.text.kicker && props.text.kicker.label.match(kickerIsLink)){
      kickerClasses = 'mt3_color--black mt3_color--black mt3_promocard-kicker mt3_promocard-kicker--linked';
    }else{
      kickerClasses = 'mt3_color--black mt3_promocard-kicker';
    }

    const attrs = {
      className: kickerClasses
    };

    const overlayClasses = props.config.overlay ? 'mt3_color--white mt3_promocard-nested-text' : 'mt3_color--neutral--xxd';
    const subheadColor = props.config.overlay ? 'mt3_color--white' : 'mt3_color--black';
    const inverseTitle = props.config.overlay || props.theme === 'dark' || props.noImages ? 'mt3_color--white' : 'mt3_color--black';

    const dekClass = cx({
      'mt3_promocard-dek--text-only': props.noImages,
      'mt3_color--white mt3_promocard-dek--inverse': props.theme === 'dark',
      'mt3_color--black': !props.noImages && props.theme === 'light'
    });

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

    //kicker. first, check if sponsored kicker should be used
    if(props.config.sponsored) {
      const sponsorText = props.text.sponsorContentLabel || 'Sponsored Content';
      subHeadingContent.push(<span key={j++} className={sponsoredClasses} dangerouslySetInnerHTML={{__html: sponsorText}} />);
    } else {
      //when not sponsored, render normal kicker
      if (props.text.kicker) {
        let kicker = props.text.kicker;
        //does the kicker have text it should display
        if(kicker.label) {
          //should it be a link?
          if(kicker.url && kicker.style !== 'prompt' && !props.config.sponsored) {
            subHeadingContent.push(<a key={j++} {...attrs}>{props.text.kicker.label}</a>);
          } else {
            subHeadingContent.push(<span key={j++} className={`${attrs.className}`} dangerouslySetInnerHTML={{__html: props.text.kicker.label}} />);
          }
        }
      }
    }

    //additional custom fields
    let customField = (props.type === 'video' && props.text.duration) || (props.type === 'gallery' && props.text.photoCount);
    if(customField) {
      //don't render if the kicker style is "prompt"
      if(props.text.kicker && props.text.kicker.style === 'prompt') {
        return;
      } else {
        subHeadingContent.push(<div key={j++} className={`${subheadColor} ${attrs.className} mt3_card-subhead--right`} dangerouslySetInnerHTML={{__html: customField}} />);
      }
    }

    let title = [];
    let dek = [];

    if(props.text.title) {
      title.push(
        <div key="title" className={`mt3_promocard-title ${inverseTitle} ${titleClass}`} dangerouslySetInnerHTML={{__html: props.text.title}}/>
      );
    }
    if(props.text.dek && !props.config.overlay) {
      dek.push(
        <div key="dek" className={`mt3_promocard-dek ${dekClass}`} dangerouslySetInnerHTML={{__html: props.text.dek}}/>
      );
    }

    if(props.breakpoint < 768){
      content.push(
        <div key={i++}>
          { props.text.kicker || props.config.sponsored || props.text.duration || props.text.photoCount ?
            <div className="mt3_row">
              <div className="mt3_promocard-pad">
                {subHeadingContent}
              </div>
            </div> : null }
          <div className="mt3_row">
            <div className="mt3_promocard-pad">
              {title.length ? title : null}
              {dek.length ? dek : null}
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
          <div className={textOnlyHorizontal + textOnlyHorizontal+'--left mt3_col-gut mt3_col-md-7'}>
            {title.length ? title : null}
          </div>
          <div className={textOnlyHorizontal + textOnlyHorizontal+'--right mt3_col-gut mt3_col-md-5'}>
            {dek.length ? dek : null}
          </div>
          { delete props.config.overlay }
        </div>
      );
    }else if(props.breakpoint > 768 && !props.noImages){
      content.push(
        <div key={i++}>
          { props.text.kicker || props.config.sponsored || props.text.duration || props.text.photoCount ?
            <div className="mt3_row">
              <div className="mt3_promocard-pad">
                {subHeadingContent}
              </div>
            </div> : null }
          <div className="mt3_row">
            <div className="mt3_promocard-pad">
              {title.length ? title : null}
              {dek.length ? dek : null}
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
