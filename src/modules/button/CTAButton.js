'use strict';

import React, { Component, PropTypes }  from 'react';
import classNames from 'classnames';

import Label from './Label';

class CTAButton extends Component {

  generateHref(url, trackingCodes) {
    let href = url;

    if(trackingCodes) {
      let terms = '';
      const termsArr = this.props.link.trackingCodes.utmTerm;
      function concatTerms(element, index, array){
        const lastEl = index < array.length - 1;
        terms += lastEl ? element + '+' : element;
      }
      termsArr.forEach(concatTerms);
      href = href
        + '?'
        + 'utm_source=' + trackingCodes.utmSource
        + '&utm_medium=' + trackingCodes.utmMedium
        + '&utm_term=' + terms
        + '&utm_content=' + trackingCodes.utmContent
        + '&utm_campaign=' + trackingCodes.utmCampaign;
    }

    return href;
  }

  render() {
    const {
      icon,
      link,
      type,
      inverse,
      inactive,
      label,
      ...props
      } = this.props;

    let classes;
    if(type === 'link') {
      classes = classNames({
        'mt3_btn': true,
        'mt3_fullwidth': true,
        'mt3_btn--naked': true,
        'mt3_btn--naked--reversed' : inverse,
        'mt3_btn--naked--inactive': inactive
      });
    } else {
      classes = classNames({
        'mt3_btn': true,
        'mt3_fullwidth': true,
        'mt3_btn--default': props.style === 'default',
        'mt3_btn--default--inactive': inactive && props.style === 'default',
        'mt3_btn--secondary': props.style === 'secondary',
        'mt3_btn--secondary--inactive': inactive && props.style === 'secondary',
        'mt3_btn--secondary--reversed': inverse && props.style === 'secondary',
        'mt3_btn--naked': props.style === 'naked',
        'mt3_btn--naked--inactive': inactive && props.style === 'naked',
        'mt3_btn--naked--reversed' : inverse && props.style === 'naked',
        'mt3_btn--success': props.style === 'success',
        'mt3_btn--error': props.style === 'error'
      });
    }

    let attrs = {
      className: classes,
      onClick: inactive ? null : this.props.onClick,
      onFocus: inactive ? null : this.props.onFocus,
      onBlur: inactive ? null : this.props.onBlur
    };

    if(type === 'link') {
      Object.assign(attrs, {
        href: (inactive) ? null : this.generateHref(link.url, link.trackingCodes),
        target: link.target,
        title: link.title
      });
      return (<a {...attrs}><Label icon={icon} label={label} /></a>);
    } else {
      Object.assign(attrs, {
        type
      });
      return (<button {...attrs}><Label icon={icon} label={label} /></button>);
    }
  }
}

CTAButton.propTypes = {
  icon: PropTypes.shape({
    name: PropTypes.string,
    align: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    alt: PropTypes.string
  }),
  inactive: PropTypes.bool,
  inverse: PropTypes.bool,
  label: PropTypes.string,
  link: PropTypes.shape({
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    title: PropTypes.string,
    trackingCodes: PropTypes.shape({
      utmSource: PropTypes.string,
      utmMedium: PropTypes.string,
      utmTerm: PropTypes.array, // can be multiple keywords
      utmContent: PropTypes.string,
      utmCampaign: PropTypes.string
    }),
    url: PropTypes.string.isRequired
  }),
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.oneOf(['default', 'secondary','naked', 'success', 'error']),
  type: PropTypes.oneOf(['button', 'submit', 'reset', 'link'])
}

CTAButton.defaultProps = {
  inactive: false,
  inverse: false,
  style: 'default',
  type: 'button'
}

export default CTAButton;
