'use strict';

import React, { Component, PropTypes }  from 'react';
import PromoImage from '../shared/PromoImage.jsx';
import PromoText from '../shared/PromoText.jsx';
import events from '../../scripts/events';
import { generateHref } from '../../scripts/generateHref.js';
import _debounce from 'lodash/debounce';

class Article extends Component {
  constructor(props) {
    super(props);
    this.resizeHandler = null;
    this.getWidth = this.getWidth.bind(this);
    this.state = {
      breakpoint: null
    }
  }

  static defaultProps = {
    ...Component.defaultProps,
    config : {
      overlay : false
    }
  };

  promoClicked(){
    props.onClick();
    Pestle.PubSub.publish(events.promoClicked); // data object may be passed as second arg
  }

  getWidth(){
    const containerWidth = this.refs.promocardContainer.getBoundingClientRect().width;
    this.setState({ breakpoint: containerWidth });
  }

  componentDidMount(){
    this.getWidth();
    this.resizeHandler = _debounce(this.getWidth, 250);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render(){
    let content = [];
    let i = 0;
    const {type, config, link, leadMedia, brandingBadgeLabel, text, theme, ...props} = this.props;
    const attrs = link ? {
      className: "mt3_div-link",
      href: link ? generateHref(link.url, link.trackingCodes) : null,
      target: link ? link.target : null
    } : null;

    const bkgColor = theme === "dark" ? " mt3_promocard-container--dark" : "";

    if(this.state.breakpoint !== null){
      // this builds the structure differently based on the container width, which if above 768 should have nested text overlaying the photo by passing an additional
      // property via the config object
      if(leadMedia && this.state.breakpoint > 768) {
        Object.assign(config, {
          overlay: true
        });
        content.push(
          <a key={i++} {...attrs} />,
          <PromoImage key={i++} type={type} config={config} link={link} leadMedia={leadMedia[0]} brandingBadgeLabel={brandingBadgeLabel} onClick={props.onClick} text={text} />
        );
      }else if(leadMedia && this.state.breakpoint < 768){
        content.push(
          <a key={i++} {...attrs} />,
          <PromoImage key={i++} type={type} config={config} link={link} leadMedia={leadMedia[0]} brandingBadgeLabel={brandingBadgeLabel} onClick={props.onClick} />,
          <PromoText key={i++} config={config} link={link} text={text} theme={theme} type={type} />
        );
      }else{
        content.push(
          <a key={i++} {...attrs} />,
          <PromoText key={i++} config={config} link={link} text={text} theme={theme} type={type} />
        );
      }
    }

    return(
      <div className={"mt3_row mt3_col-12 mt3_promocard-container" + bkgColor} ref="promocardContainer">
        { content }
      </div>
    );
  }

}

Article.PropTypes = {
  id: PropTypes.string,
  theme: PropTypes.string,
  type: PropTypes.oneOf(['article', 'video', 'gallery', 'show', 'schedule']),
  config: PropTypes.object,
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    target: PropTypes.oneOf(['_self', '_parent', '_blank', '_top']),
    trackingCodes: PropTypes.array || PropTypes.string
  }),
  leadMedia: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    aspectRatio: PropTypes.number,
    altText: PropTypes.string,
    srcset: PropTypes.array
  })),
  text: PropTypes.object,
  brandingBadgeLabel: PropTypes.string,
  modal: PropTypes.bool
};

export default Article;
