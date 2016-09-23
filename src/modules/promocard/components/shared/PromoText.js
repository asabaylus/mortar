'use strict';

import React, { PropTypes }  from 'react';
import ElementQuery from 'react-element-query';
import { generateHref } from '../../generateHref';

const PromoText = (props) => {

  const attrs = {
    className: props.config.overlay || props.theme === 'dark' ? 'mt3_color--white mt3_promocard-kicker  mt3_promocard-kicker--inverse' : 'mt3_color--gray40 mt3_promocard-kicker',
    href: props.text.kicker ? generateHref(props.text.kicker.url, props.text.kicker.trackingCodes) : null,
    target: props.text.kicker ? props.text.kicker.target : null
  };

  /****** commenting out byline for now as it will most likely need to be added back in later
   {props.text.byline ? <div className="mt3_color--neutral--xxd mt3_h5">{props.text.byline}</div> : null}
   *****/

  const thumbnailPositionColor = props.config.overlay ? 'mt3_color--white mt3_promocard-nested-text' : 'mt3_color--neutral--xxd';
  const subheadColor = props.config.overlay ? 'mt3_color--white' : 'mt3_color--gray40';
  const inverse = props.config.overlay || props.theme === 'dark' ? 'mt3_color--white' : 'mt3_color--black';
  const inverseDek = props.theme === 'dark' ? 'mt3_color--white mt3_promocard-dek--inverse' : 'mt3_color--black';
  let sponsoredClasses = props.theme === 'dark' ? 'mt3_color--sponsor mt3_promocard-sponsored mt3_promocard-sponsored--inverse'
    : 'mt3_color--sponsor mt3_promocard-sponsored';

  //for largest size variation, sponsored kicker oughta be white
  if(props.config.overlay) {
    sponsoredClasses = 'mt3_color--white mt3_promocard-kicker  mt3_promocard-kicker--inverse';
  }

  let titleClass = 'mt3_promocard-title--';

  if(props.breakpoint > 375) {
    if(props.breakpoint > 768) {
      if(props.breakpoint > 1024) {
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

  return(
    <div className={thumbnailPositionColor}>
    { props.text.kicker || props.config.sponsored ?
      <div className="mt3_row">
        <div className="mt3_promocard-pad">
          {props.text.kicker && !props.config.sponsored ? <a {...attrs}>{props.text.kicker.label}</a>
            : props.config.sponsored ? <span className={sponsoredClasses}>{props.text.sponsorContentLabel}</span>
            : null
          }
          {(props.type === 'video' && props.text.duration) ?
            <div className={`${subheadColor} ${attrs.className} mt3_card-subhead--right`}>{props.text.duration}</div>
            : null
          }
          {(props.type === 'gallery' && props.text.photoCount) ?
            <div className={`${subheadColor} ${attrs.className} mt3_card-subhead--right`}>{props.text.photoCount} Photos</div>
            : null
          }
        </div>
      </div> : null }
      <div className="mt3_row">
        <div className="mt3_promocard-pad">
          {props.text.title ?
            <div className={`mt3_promocard-title ${inverse} ${titleClass}`}>{props.text.title}</div>
          : null}
          { props.text.dek && !props.config.overlay ? <div className={`mt3_promocard-dek ${inverseDek}`}>{props.text.dek}</div> : null }
        </div>
      </div>
      { delete props.config.overlay }
    </div>
  );
};

PromoText.PropTypes = {
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
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
  theme: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule'])
};

export default PromoText;
