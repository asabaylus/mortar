'use strict';

import React, { Component, PropTypes } from 'react';
import {default as MTPromoCard} from '../../modules/promocard/MTPromoCard';
import {Pestle} from '@natgeo/pestle';
import PortalWrapper from '../../util/PortalWrapper';

import $ from 'jquery';
import _debounce from 'lodash/debounce';
import railsParallax from '../../util/parallax/railsParallax';

const mobileBreakpoint = 768;

class HeroWithTwoRails extends Component {
  constructor(props) {
    super(props);
    this.resizeHandler = null;
    this._window = $(window);
    this.resetParallax = this.resetParallax.bind(this);
  }

  headingParallax(viewportHeight) {
    const railsDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__rails")[0];
    const headingDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__heading")[0];

    const railsHeight = railsDiv.getBoundingClientRect().height;
    const headingHeight = headingDiv.getBoundingClientRect().height;
    const percentageUnpinned = 0.33;

    let sceneDuration;
    let transformDistance;
    let setPin = true;
    let bottomPositionOverride = null;

    //animate differently depending if both rails are larger than the whole viewport or not
    if(viewportHeight > railsHeight) {
      setPin = false;
      sceneDuration = railsHeight * 0.7;
      transformDistance = railsHeight - headingHeight;
    } else {
      const pageHeadingOffset = (viewportHeight - headingHeight)/2;
      sceneDuration = railsHeight - pageHeadingOffset - headingHeight;
      bottomPositionOverride = railsHeight - headingHeight;
      transformDistance = pageHeadingOffset
    }

    Pestle.PubSub.publish('ParallaxScenes.addParallaxScene', {
      triggerElement: railsDiv,
      duration: sceneDuration,
      parallaxElement: headingDiv.getElementsByClassName("mt3_parallax-wrap")[0],
      transformDistance: transformDistance,
      pinAfterPercentage: setPin ? percentageUnpinned : null,
      bottomPositionOverride: bottomPositionOverride
    });
  }

  resetParallax() {
    const contentWidth = this.props.parentEl.getBoundingClientRect().width;
    const viewportHeight = this._window.height();

    //if the component width is < mobileBreakpoint, cancel parallax effects
    if(contentWidth < mobileBreakpoint) {
      return;
    }

    // build heading scenes
    if(this.props.parallaxHeading && this.props.heading && this.props.heading !== "" && this.props.headingPosition === "below") {
      this.headingParallax(viewportHeight);
    }

    //build rails scene
    if(this.props.parallaxRails) {
      railsParallax({
        leftRail: this.props.parentEl.getElementsByClassName("hero-with-two-rails__left-rail")[0],
        rightRail: this.props.parentEl.getElementsByClassName("hero-with-two-rails__right-rail")[0],
        viewportHeight: viewportHeight
      });
    }

  }

  componentDidMount() {
    if(this.props.parallaxRails || this.props.parallaxHeading) {
      this.resetParallax();
      this.resizeHandler = _debounce(this.resetParallax, 250);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  componentWillUnmount() {
    if(this.props.parallaxRails || this.props.parallaxHeading) {
      window.removeEventListener('resize', this.resizeHandler);
    }

  }
  render() {
    let portalContent = [];
    let heroExists = false;

    //Heading
    if(this.props.heading && this.props.heading !== "") {
      let headingDiv;

      if(this.props.headingPosition === "below") {
        headingDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__heading__wrap")[0];
      } else {
        headingDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__heading__wrap--above")[0];
      }

      if (headingDiv) {
        portalContent.push(
          <PortalWrapper targetDiv={headingDiv} key="heading">
            <div className={`hero-with-two-rails__heading hero-with-two-rails__heading--${this.props.theme}`}>
              <div className="mt3_parallax-wrap--outer">
                <div className="mt3_parallax-wrap">
                  <h1>{this.props.heading}</h1>
                </div>
              </div>
            </div>
          </PortalWrapper>
        );
      } else {
        portalContent.push(
          <div
            className={`hero-with-two-rails__heading hero-with-two-rails__heading--${this.props.theme}`}
            key="heading">
            <h1>{this.props.heading}</h1>
          </div>
        );
      }
    }

    //Promo Cards
    if(this.props.cards && this.props.cards.length) {
      let i = 0;
      for (const card of this.props.cards) {
        //make sure target div exists
        const cardDiv = document.getElementById(card.itemId);
        const cardLocation = card.itemPos || null;

        //pass class if it's the first promo
        const additionalClasses = !i ? "mt3_promocard--first" : "";

        if(cardDiv) {
          //if it's targeted to the hero
          if($(cardDiv.parentNode).hasClass("hero-with-two-rails__hero")) {
            heroExists = true;
          }

          //initial promo width
          let promoWidth = null;
          const parentWidth = this.props.parentEl.getBoundingClientRect().width;

          if (parentWidth > 768) {
            if(parentWidth > 1534 && card.config.itemPos == "lr") {
              promoWidth = 1000;
            } else {
              promoWidth = 600;
            }
          }

          portalContent.push(
            <PortalWrapper targetDiv={cardDiv} key={i++}>
              <MTPromoCard
                {...card}
                additionalClasses={additionalClasses}
                cardLocation={cardLocation}
                parentWidth={promoWidth}
                theme={this.props.theme}/>
            </PortalWrapper>
          );
        } else {
          portalContent.push(
            <MTPromoCard
              {...card}
              additionalClasses={additionalClasses}
              cardLocation={cardLocation}
              theme={this.props.theme}
              key={i++}/>
          );
        }
      }
    }

    //apply "theme" class manually to parent element
    let parentClasses = "hero with two rails mt3_row";
    if(this.props.theme) {
      parentClasses += ` hero-with-two-rails--${this.props.theme}`;
    }
    if(heroExists) {
      parentClasses += ` hero-with-two-rails--no-hero`;
    }
    if(!this.props.heading || this.props.heading === "") {
      parentClasses += ` hero-with-two-rails--no-heading`;
    } else {
      parentClasses += ` hero-with-two-rails--heading-${this.props.headingPosition}`;
    }

    this.props.parentEl.className = parentClasses;

    return (
      <div className="hero-with-two-rails__app">
        {portalContent}
      </div>
    )
  }
}

HeroWithTwoRails.propTypes = {
  cards: PropTypes.array,
  heading: PropTypes.string,
  headingPosition: PropTypes.string,
  parallaxHeading: PropTypes.bool,
  parallaxRails: PropTypes.bool,
  theme: PropTypes.string,
  parentEl: PropTypes.object.isRequired
};

HeroWithTwoRails.defaultProps = {
  headingPosition: 'above',
  parallaxHeading: true,
  parallaxRails: true,
  theme: 'light'
};

export default HeroWithTwoRails;
