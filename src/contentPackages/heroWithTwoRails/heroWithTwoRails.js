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
    this.heroExists = false;
    this.resizeHandler = null;
    this._window = $(window);
    this.resetParallax = ::this.resetParallax;
  }

  headingParallax(viewportHeight, position) {
    const railsDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__rails")[0];
    const headingDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__heading")[0];
    const headingHeight = headingDiv.getBoundingClientRect().height;
    const pageHeadingOffset = (viewportHeight - headingHeight) / 2;

    let bottomPositionOverride = null;
    let heroDiv = null;
    let heroHeight = null;
    let percentageUnpinned = 0.5;
    let railsHeight = railsDiv.getBoundingClientRect().height;
    let sceneDuration;
    let setPin = true;
    let transformDistance;
    let triggerElement = railsDiv;

    //if the header is ABOVE the hero (and there is a hero)
    if (position === "above" && this.heroExists) {
      heroDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__hero")[0];

      //add hero's height to height of rails
      if (heroDiv) {
        heroHeight = heroDiv.getBoundingClientRect().height;

        railsHeight += heroHeight;

        //percentage of scene that the content is unpinned should roughly equal where the gap between
        //hero and rails ends, centered in the viewport
        percentageUnpinned = (heroHeight - (viewportHeight / 2) + headingHeight ) / railsHeight;
        triggerElement = heroDiv;
      } else {
        position = "below";
      }
    }

    //animate differently depending if both rails are larger than the whole viewport or not
    if (viewportHeight > railsHeight) {
      setPin = false;
      sceneDuration = railsHeight * 0.7;
      transformDistance = railsHeight - headingHeight;
    } else {
      sceneDuration = railsHeight - pageHeadingOffset - headingHeight;
      bottomPositionOverride = railsHeight - headingHeight;
      transformDistance = pageHeadingOffset
    }

    Pestle.PubSub.publish('ParallaxScenes.addParallaxScene', {
      triggerElement: triggerElement,
      duration: sceneDuration,
      parallaxElement: headingDiv.getElementsByClassName("mt3_parallax-wrap")[0],
      transformDistance: transformDistance,
      pinAfterPercentage: setPin ? percentageUnpinned : null,
      bottomPositionOverride: bottomPositionOverride,
      resetFunction: this.resetParallax
    });
  }

  resetParallax() {
    const {
      heading,
      headingPosition,
      parallaxHeading,
      parallaxRails,
      parentEl,
    } = this.props;
    const contentWidth = parentEl.getBoundingClientRect().width;

    // if the component width is < mobileBreakpoint, cancel parallax effects
    if (contentWidth < mobileBreakpoint) {
      return;
    }

    const viewportHeight = this._window.height();
    const callHeadingParallax = parallaxHeading && heading && heading !== "";

    // build heading scenes
    if (callHeadingParallax) {
      this.headingParallax(viewportHeight, headingPosition);
    }

    // build rails scene
    if (parallaxRails) {
      railsParallax({
        leftRail: parentEl.getElementsByClassName("hero-with-two-rails__left-rail")[0],
        rightRail: parentEl.getElementsByClassName("hero-with-two-rails__right-rail")[0],
        viewportHeight: viewportHeight,
        resetFunction: callHeadingParallax ? null : this.resetParallax
      });
    }
  }

  componentDidMount() {
    if (this.props.parallaxRails || this.props.parallaxHeading) {
      this.resetParallax();
      this.resizeHandler = _debounce(this.resetParallax, 250);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  componentWillUnmount() {
    if (this.props.parallaxRails || this.props.parallaxHeading) {
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  render() {
    const {
      cards,
      heading,
      headingSize,
      headingPosition,
      parentEl,
      theme,
    } = this.props;
    let portalContent = [];

    // Promo Cards
    if (cards && cards.length) {
      let i = 0;
      for (const card of cards) {
        //make sure target div exists
        const cardDiv = document.getElementById(card.itemId);
        const cardLocation = card.config.itemPos || card.itemPos || null;

        //pass class if it's the first promo
        const additionalClasses = !i ? "mt3_promocard--first" : "";

        //initial promo width
        let promoWidth = null;
        const parentWidth = parentEl.getBoundingClientRect().width;

        if (parentWidth > 768) {
          if (parentWidth > 1534 && cardLocation === 'lr') {
            promoWidth = 1000;
          } else if (card.config.itemPos === 'hero'){
            promoWidth = parentWidth;
          } else {
            promoWidth = 600;
          }
        }

        if (cardDiv) {
          //if it's targeted to the hero
          if (cardLocation === "hero") {
            this.heroExists = true;
          }

          portalContent.push(
            <PortalWrapper targetDiv={cardDiv} key={i++}>
              <MTPromoCard
                {...card}
                additionalClasses={additionalClasses}
                cardLocation={cardLocation}
                parentWidth={promoWidth}
                theme={theme} />
            </PortalWrapper>
          );
        } else {
          portalContent.push(
            <MTPromoCard
              {...card}
              additionalClasses={additionalClasses}
              cardLocation={cardLocation}
              theme={theme}
              key={i++} />
          );
        }
      }
    }

    // Heading
    if (heading && heading !== "") {
      let headingDiv;

      if (headingPosition === "below" || !this.heroExists) {
        headingDiv = parentEl.getElementsByClassName("hero-with-two-rails__heading__wrap")[0];
      } else {
        headingDiv = parentEl.getElementsByClassName("hero-with-two-rails__heading__wrap--above")[0];
      }

      if (headingDiv) {
        portalContent.push(
          <PortalWrapper targetDiv={headingDiv} key="heading">
            <div className={`hero-with-two-rails__heading hero-with-two-rails__heading--${theme}`}>
              <div className="mt3_parallax-wrap--outer">
                <div className="mt3_parallax-wrap">
                  <h1>{heading}</h1>
                </div>
              </div>
            </div>
          </PortalWrapper>
        );
      } else {
        portalContent.push(
          <div
            className={`hero-with-two-rails__heading hero-with-two-rails__heading--${theme}`}
            key="heading">
            <h1>{heading}</h1>
          </div>
        );
      }
    }

    // FIXME apply classnames() here
    //apply "theme" class manually to parent element
    let parentClasses = "hero with two rails mt3_row";
    if (theme) {
      parentClasses += ` hero-with-two-rails--${theme}`;
    }

    if (headingSize === 'large') {
      parentClasses += ' hero-with-two-rails--large-heading';
    }

    if (!this.heroExists) {
      parentClasses += ` hero-with-two-rails--no-hero`;
    }
    if (!heading || heading === "") {
      parentClasses += ` hero-with-two-rails--no-heading`;
    } else {
      parentClasses += ` hero-with-two-rails--heading-${headingPosition}`;
    }

    parentEl.className = parentClasses;

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
  headingSize: PropTypes.string,
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
