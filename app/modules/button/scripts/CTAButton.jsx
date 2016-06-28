'use strict';

import React, { Component, PropTypes }  from 'react';
import Icon from "../../icon/scripts/icon.jsx";

class CTAButton extends Component {

  render() {
    this.isTextLink = this.props.type === 'link';
    this.isSubmit = this.props.type === 'submit';
    this.isReset = this.props.type === 'reset';

    var attrs = {
      title: this.props.link.title,
      href: this.props.path,
      target: this.props.target,
      className: this.props.className + ' cta ' + ((this.isTextLink) ? 'cta-textLink ' : 'cta-button '),
      // handle all events even if those are not defined by user.
      // so that we can stop propagations when button is disabled
      onClick: this.handleEvent,
      onFocus: this.handleEvent,
      onBlur: this.handleEvent,
      ngsIsEdit: NGS.core_site.sandbox.aem.isEditMode()
    };

    if (!this.props.enabled) {
      attrs.className += ' cta--disabled ';
    }

    // We disable CTA buttons and linksText on edit mode due to prevent opening external links.
    // Otherwise CORS errors are shown and CQ is no longer functional.
    if (attrs.ngsIsEdit && this.props.path && this.props.path[0] !== '#') {
      attrs.className += ' cta--ngs-is-edit ';
      attrs.onClick = function(e) {
        NGS.core_site.sandbox.log.info('Prevented CTA from addressing the link ' + attrs.href);
        e.stopPropagation();
        e.preventDefault();
      };
    }

    // If the user didn't customize className,
    // then we should handle the status and apply
    // the proper default classes using Mortar's styles
    if (!this.props.className) {
      if (this.isTextLink) {
        attrs.className += 'mt_btn mt_btn--naked ';
      } else {
        attrs.className += 'mt_btn ' + ((this.props.enabled) ? 'mt_btn--primary ' : 'mt_btn--disabled ');
      }
    }

    let label;
    if(this.props.icon) {
      switch (this.props.icon.align) {
        case "left" || "":
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
          label = <div className="mt_iconandlabel--horizontal">
            <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                  alt={ this.props.icon.alt }/>
            <span class="mt_subh4">{this.props.label}</span>
          </div>;
          break;
        case "bottom":
          label = <div className="mt_iconandlabel--horizontal">
            <span class="mt_subh4">{this.props.label}</span>
            <Icon name={this.props.icon.name} align={this.props.icon.align} size={this.props.icon.size}
                  alt={ this.props.icon.alt }/>
          </div>;
          break;
        default:
          label = this.props.label;
          break;
      }
    }

    let button;
    if(this.isTextLink){
      button = <a {...attrs}>{ label }</a>
    }else if (this.isSubmit) {
      button = <input {...attrs}>{ label }</input>
    } else if (this.isReset) {
      button = <input {...attrs}>{ label }</input>
    } else {
      button = <button {...attrs}>{ label }</button>
    }

    return (
      {button}
    )
  }

  /*  Private Methods */

  /*
   Proxy for dispatching CTA events only when
   this is a button and must be enabled
   or this is a textLink (however enabled/disabled)
   otherwise nothing happens
   */
  handleEvent(event) {
    if (event.type === 'click' && this.props.enabled && !this.isTextLink && this.props.path) {
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
  className: PropTypes.string,
  icon: PropTypes.shape({
    name: PropTypes.string,
    align: PropTypes.string,
    size: PropTypes.string,
    color: PropTypes.string,
    alt: PropTypes.string
  }),
  link: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self, _parent, _blank, _top']).isRequired,
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
  type: PropTypes.string
}

export default CTAButton
