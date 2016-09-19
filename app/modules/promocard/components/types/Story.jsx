'use strict';

import React, { Component, PropTypes }  from 'react';
import PromoImage from '../shared/PromoImage.jsx';
import PromoText from '../shared/PromoText.jsx';
import events from '../../scripts/events';
import { generateHref } from '../../scripts/generateHref.js';
import _debounce from 'lodash/debounce';
import ElementQuery from 'react-element-query';

class Story extends Component {
  constructor(props) {
    super(props);
    this.resizeHandler = null;
    this.getWidth = this.getWidth.bind(this);
    this.calcAspectRatio = this.calcAspectRatio.bind(this);
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
    Pestle.PubSub.publish(events.promoClicked); // data object may be passed as second arg
  }

  getWidth(){
    const containerWidth = this.refs.promocardContainer.getBoundingClientRect().width;
    this.setState({
      breakpoint: containerWidth
    });
  }

  calcAspectRatio(){
    //childframeAspectRatio = (parentFrameAspectRatioHEIGHT - 40px) / (parentFrameAspectRatioWIDTH - 40px)
    const width = this.state.breakpoint;
    const parentFrameAspectRatio = this.props.config.aspectRatio;
    let parentFrameHeightMultiplier;
    switch(parentFrameAspectRatio){
      case "broadcast":
        parentFrameHeightMultiplier = 0.5625;
        break;
      case "photo":
        parentFrameHeightMultiplier = 0.667;
        break;
      case "tv":
        parentFrameHeightMultiplier = 0.75;
        break;
      case "square":
        parentFrameHeightMultiplier = 1;
        break;
      default:
        parentFrameHeightMultiplier = parentFrameAspectRatio;
    }
    const height = width * parentFrameHeightMultiplier;

    let corner = 30;
    if(width > 375 && width < 768){
      corner = 40;
    }else if(width > 768){
      corner = 60;
    }

    return (height - corner) / (width - corner);

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
    const {type, config, link, leadMedia, brandingBadgeLabel, text, theme, ...props} = this.props;
    const attrs = link || type === "video" ? {
      className: "mt3_div-link",
      href: link ? generateHref(link.url, link.trackingCodes) : null,
      target: link ? link.target : null
    } : null;
    const bkgColor = theme === "dark" ? " mt3_promocard-container--dark" : "";
    let i = 0;
    let content = [<a key={i++} {...attrs} />];
    const aspectRatio = config.aspectRatio === "broadcast" ? "mt3_intratio--broadcast"
      : config.aspectRatio === "photo" ? "mt3_intratio--photo"
      : config.aspectRatio === "tv" ? "mt3_intratio--tv"
      : config.aspectRatio === "square" ? "mt3_intratio--square"
      : "mt3_intratio--photo";

    if(this.state.breakpoint !== null){

      // this builds the structure differently based on the container width, which if above 768 should have nested text overlaying the photo by passing an additional
      // property via the config object
      if(leadMedia && this.state.breakpoint > 768) {
        Object.assign(config, {
          overlay: true
        });
        if (type === "gallery"){
          content.push(
            <div key={i++} className={`mt3_row mt3_promocard-gallery-images ${aspectRatio}`}>
              <ElementQuery sizes={[{name: 'mt3_promocard-gallery-cta--medium', width: 375 + 40}, {name: 'mt3_promocard-gallery-cta--large', width: 768 + 60} ]}>
                <div className="mt3_color--white mt3_btn mt3_btn--naked mt3_fullwidth mt3_promocard-gallery-cta">
                  <a {...attrs} />
                  <span>Photo Gallery</span>
                  <svg className="mt3_promocard-gallery-cta-icon">
                    <use xlinkHref="#plus"></use>
                  </svg>
                </div>
              </ElementQuery>
              <ElementQuery sizes={[{name: 'mt3_promocard-gallery-images--image1-medium', width: 375}, {name: 'mt3_row mt3_promocard-gallery-images--image1-large', width: 768} ]}>
                <div className="mt3_row mt3_promocard-gallery-images--image1">
                  <a {...attrs} />
                  <PromoImage type={type} config={config} leadMedia={leadMedia[0]} childFrameAspectRatio={this.calcAspectRatio()} link={link} brandingBadgeLabel={brandingBadgeLabel} text={text}/>
                </div>
              </ElementQuery>
              <ElementQuery sizes={[{name: 'mt3_promocard-gallery-images--image2-medium', width: 375}, {name: 'mt3_row mt3_promocard-gallery-images--image2-large', width: 768} ]}>
                <div className="mt3_row mt3_promocard-gallery-images--image2">
                  <PromoImage type={type} config={config} leadMedia={leadMedia[1]} childFrameAspectRatio={this.calcAspectRatio()} secondImage={true} />
                </div>
              </ElementQuery>
            </div>
          );
        }else{
          content.push(
            <PromoImage key={i++} type={type} config={config} link={link} leadMedia={leadMedia[0]} brandingBadgeLabel={brandingBadgeLabel} text={text} />
          );
        }
      } else if (leadMedia && this.state.breakpoint < 768){
          if (type === "gallery"){
            content.push(
              <div key={i++} className={`mt3_row mt3_promocard-gallery-images ${aspectRatio}`}>
                <ElementQuery sizes={[{name: 'mt3_promocard-gallery-cta--medium', width: 375 + 40}, {name: 'mt3_promocard-gallery-cta--large', width: 768 + 60} ]}>
                  <div className="mt3_color--white mt3_btn mt3_btn--naked mt3_fullwidth mt3_promocard-gallery-cta">
                    <a {...attrs} />
                    <span>Photo Gallery</span>
                    <svg className="mt3_promocard-gallery-cta-icon">
                      <use xlinkHref="#plus"></use>
                    </svg>
                  </div>
                </ElementQuery>
                <ElementQuery  sizes={[{name: 'mt3_promocard-gallery-images--image1-medium', width: 375}, {name: 'mt3_row mt3_promocard-gallery-images--image1-large', width: 768} ]}>
                  <div className="mt3_row mt3_promocard-gallery-images--image1">
                    <a {...attrs} />
                    <PromoImage type={type} config={config} leadMedia={leadMedia[0]} childFrameAspectRatio={this.calcAspectRatio()} />
                  </div>
                </ElementQuery>
                <ElementQuery sizes={[{name: 'mt3_promocard-gallery-images--image2-medium', width: 375}, {name: 'mt3_row mt3_promocard-gallery-images--image2-large', width: 768} ]}>
                  <div className="mt3_row mt3_promocard-gallery-images--image2">
                    <PromoImage type={type} config={config} leadMedia={leadMedia[1]} childFrameAspectRatio={this.calcAspectRatio()} secondImage={true} />
                  </div>
                </ElementQuery>
              </div>,
              <PromoText key={i++} config={config} link={link} text={text} theme={theme} type={type} />
            );
          }else {
            content.push(
              <PromoImage key={i++} type={type} config={config} link={link} leadMedia={leadMedia[0]}
                          brandingBadgeLabel={brandingBadgeLabel} text={text}/>,
              <PromoText key={i++} config={config} link={link} text={text} theme={theme} type={type}/>
            );
          }
      }else{
        content.push(
          <PromoText key={i++} config={config} link={link} text={text} theme={theme} type={type} />
        );
      }
    }

    return(
      <div className={"mt3_row mt3_col-12 mt3_promocard-container" + bkgColor} ref="promocardContainer">
        {content}
      </div>
    );
  }

}

Story.PropTypes = {
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

export default Story;
