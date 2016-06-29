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
      onClick: this.handleEvent,
      onFocus: this.handleEvent,
      onBlur: this.handleEvent
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

    if(this.props.type === "link"){
      attrs.href = this.props.link.url;
      attrs.target = this.props.link.target;
      attrs.title = this.props.link.title;
    }

    if (this.props.inactive) {
      attrs.className += '--inactive ';
    }

    // We disable CTA buttons and linksText in author mode to prevent opening external links.
    if (this.props.authorMode) {
      attrs.onClick = function(e) {
        e.stopPropagation();
        e.preventDefault();
      };
    }

    let label;
    if(this.props.icon.name) {
      switch (this.props.icon.align) {
        case "left":
          label = <div className="mt_iconandlabel--horizontal">
                    <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                          alt={ this.props.icon.alt }/>
                    <span class="mt_subh4">{this.props.label}</span>
                  </div>;
          break;
        case "right":
          label = <div className="mt_iconandlabel--horizontal">
                    <span class="mt_subh4">{this.props.label}</span>
                    <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                          alt={ this.props.icon.alt }/>
                  </div>;
          break;
        case "top":
          label = <div className="mt_iconandlabel--vertical">
                    <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                          alt={ this.props.icon.alt }/>
                    <span class="mt_subh4">{this.props.label}</span>
                  </div>;
          break;
        case "bottom":
          label = <div className="mt_iconandlabel--vertical">
                    <span class="mt_subh4">{this.props.label}</span>
                    <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                          alt={ this.props.icon.alt }/>
                  </div>;
          break;
        default:
          label = <div className="mt_iconandlabel--horizontal">
                    <Icon name={this.props.icon.name} align="left" size={this.props.icon.size}
                          alt={ this.props.icon.alt }/>
                    <span class="mt_subh4">{this.props.label}</span>
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

  /*  Private Methods */

  /*
   Proxy for dispatching CTA events only when
   this is a button and must be enabled
   or this is a textLink (however enabled/disabled)
   otherwise nothing happens
   */
  handleEvent(event) {
    if (event.type === 'click' && !this.props.inactive && !this.isTextLink && this.props.path) {
      // If this is a button with a path specified
      // the CTA button will navigate the user to the specified path url
      window.open(this.props.path, this.props.target);
    }
    if (this.props.enabled || this.isTextLink) {
      var ctaEvent = _get( this.props, 'on' + _capitalize(event.type) );

      if (typeof ctaEvent === 'function') {
        ctaEvent.apply(this, arguments);
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
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
  label: PropTypes.string,
  link: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    //https://support.google.com/analytics/answer/1033867?hl=en#more_information_and_examples_for_each_parameter
    trackingCodes: PropTypes.shape({
      utmSource: PropTypes.string,
      utmMedium: PropTypes.string,
      utmTerm: PropTypes.array, // can be multiple keywords - will need to be separated and concatenated in url
      utmContent: PropTypes.string,
      utmCampaign: PropTypes.string
    })
  }),
  inactive: PropTypes.bool,
  inverse: PropTypes.bool,
  // handle all events even if those are not defined by user.
  // so that we can stop propagations when button is disabled
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  style: PropTypes.string,
  type: PropTypes.oneOf(['default', 'submit', 'reset', 'link'])
}

export default CTAButton
