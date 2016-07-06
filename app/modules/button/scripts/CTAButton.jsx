'use strict';

import React, { Component, PropTypes }  from 'react';
import classNames from 'classnames';

import Label from './Label.jsx';

class CTAButton extends Component {

  generateHref(url, trackingCodes) {
    let href = url;

    if(trackingCodes) {
      let terms = "";
      const termsArr = this.props.link.trackingCodes.utmTerm;
      function concatTerms(element, index, array){
        const lastEl = index < array.length - 1;
        terms += lastEl ? element + "+" : element;
      }
      termsArr.forEach(concatTerms);
      href = href
        + "?"
        + "utm_source=" + trackingCodes.utmSource
        + "&utm_medium=" + trackingCodes.utmMedium
        + "&utm_term=" + terms
        + "&utm_content=" + trackingCodes.utmContent
        + "&utm_campaign=" + trackingCodes.utmCampaign;
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

    this.isTextLink = this.props.type === 'link';
    this.isSubmit = this.props.type === 'submit';
    this.isReset = this.props.type === 'reset';

    let classes;
    if(type === 'link') {
      classes = classNames({
        'mt_btn': true,
        'mt_fullwidth': true,
        'mt_btn--naked': true,
        'mt_btn--naked--reversed' : inverse,
        'mt_btn--naked--inactive': inactive
      });
    } else {
      classes = classNames({
        'mt_btn': true,
        'mt_fullwidth': true,
        'mt_btn-default': props.style === 'default',
        'mt_btn-secondary': props.style === 'secondary',
        'mt_btn-secondary--reversed': inverse && props.style === 'secondary',
        'mt_btn--naked': props.style === 'naked',
        'mt_btn--naked--reversed' : inverse && props.style === 'naked',
        'mt_btn--success': props.style === 'success',
        'mt_btn--error': props.style === 'error',
        'mt_btn--naked--inactive': inactive
      });
    }

    const attrs = {
      className: classes,
      onClick: this.props.inactive ? null : this.props.onClick,
      onFocus: this.props.inactive ? null : this.props.onFocus,
      onBlur: this.props.inactive ? null : this.props.onBlur
    };

    if (this.props.type && this.props.type !== "link"){
      if (this.isSubmit){
        attrs.type = 'submit';
      }else if (this.isReset){
        attrs.type = 'reset';
      }else{
        attrs.type = 'button';
      }
    }

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
