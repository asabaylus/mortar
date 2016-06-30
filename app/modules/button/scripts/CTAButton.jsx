'use strict';

import React, { Component, PropTypes }  from 'react';
import Icon from "../../icon/scripts/icon.jsx";

class CTAButton extends Component {

  render() {
    this.isTextLink = this.props.type === 'link';
    this.isSubmit = this.props.type === 'submit';
    this.isReset = this.props.type === 'reset';

    let attrs = {
      className: 'mt_btn mt_fullwidth ' + 'mt_btn-' + ((this.isTextLink) ? 'naked' : this.props.style),
      // handle all events even if those are not defined by user.
      // so that we can stop propagations when button is disabled
      onClick: this.props.onClick,
      onFocus: this.props.onFocus,
      onBlur: this.props.onBlur
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

    if (this.props.type === "link"){
      attrs.href = this.props.link.url;
      attrs.target = this.props.link.target;
      attrs.title = this.props.link.title;

      // if tracking codes are present, build query string with utm_terms concatenated, separated by plus sign
      // https://support.google.com/analytics/answer/1033867?hl=en#more_information_and_examples_for_each_parameter
      if (this.props.link.trackingCodes){
        let terms = "";
        let termsArr = this.props.link.trackingCodes.utmTerm;
        function concatTerms(element, index, array){
          let lastEl = index < array.length - 1;
          terms += lastEl ? element + "+" : element;
        }
        termsArr.forEach(concatTerms);
        attrs.href = attrs.href + "?" + "utm_source=" + this.props.link.trackingCodes.utmSource + "&utm_medium=" + this.props.link.trackingCodes.utmMedium +
          "&utm_term=" + terms + "&utm_content=" + this.props.link.trackingCodes.utmContent + "&utm_campaign=" + this.props.link.trackingCodes.utmCampaign;
      }
    }

    if (this.props.inactive) {
      attrs.className += "--inactive";
    }

    if (this.props.inverse && (this.props.style === "secondary" || this.props.style === "naked") && !this.props.inactive){
      attrs.className += "--reversed";
    }

    // Disable CTA buttons and linksText in author mode to prevent opening external links.
    if (this.props.authorMode) {
      attrs.onClick = function(e) {
        e.stopPropagation();
        e.preventDefault();
      };
    }

    let label;
    if (this.props.icon.name) {
      switch (this.props.icon.align) {
        case "left":
          label = <div className="mt_iconandlabel--horizontal">
            <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                  alt={ this.props.icon.alt }/>
            <span>{this.props.label}</span>
          </div>;
          break;
        case "right":
          label = <div className="mt_iconandlabel--horizontal">
            <span>{this.props.label}</span>
            <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                  alt={ this.props.icon.alt }/>
          </div>;
          break;
        case "top":
          label = <div className="mt_iconandlabel--vertical">
            <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                  alt={ this.props.icon.alt }/>
            <span>{this.props.label}</span>
          </div>;
          break;
        case "bottom":
          label = <div className="mt_iconandlabel--vertical">
            <span>{this.props.label}</span>
            <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                  alt={ this.props.icon.alt }/>
          </div>;
          break;
        default:
          label = <div className="mt_iconandlabel--horizontal">
            <Icon name={this.props.icon.name} align="left" size={this.props.icon.size}
                  alt={ this.props.icon.alt }/>
            <span>{this.props.label}</span>
          </div>;
          break;
      }
    }else{
      label = this.props.label;
    }

    let button;
    if(this.isTextLink){
      button = <a {...attrs}>{ label }</a>
    }else if (this.isSubmit) {
      button = <button {...attrs}>{ label }</button>
    } else if (this.isReset) {
      button = <button {...attrs}>{ label }</button>
    } else {
      button = <button {...attrs}>{ label }</button>
    }

    return button
  }
}

CTAButton.propTypes = {
  authorMode: PropTypes.bool,
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
      utmTerm: PropTypes.array, // can be multiple keywords - will need to be separated and concatenated in url
      utmContent: PropTypes.string,
      utmCampaign: PropTypes.string
    }),
    url: PropTypes.string.isRequired
  }),
  // handle all events even if those are not defined by user.
  // so that we can stop propagations when button is disabled
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.string,
  type: PropTypes.oneOf(['default', 'submit', 'reset', 'link'])
}

export default CTAButton
