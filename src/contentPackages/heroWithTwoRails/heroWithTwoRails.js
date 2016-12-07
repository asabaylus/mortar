'use strict';

import React from 'react';
import _debounce from 'lodash/debounce';
import cx from 'classnames';

import {Pestle} from '@natgeo/pestle';
import MTPromoCard from '../../modules/promocard/MTPromoCard';
import railsParallax from '../../util/parallax/railsParallax';
import PortalWrapper from '../../util/PortalWrapper';


const mobileBreakpoint = 768;  // FIXME

export default class HeroWithTwoRails extends React.Component {
  constructor() {
    super();
    this.heroExists = false;
    this.resizeHandler = null;
    this.resetParallax = ::this.resetParallax;
  }

  headingParallax(viewportHeight, position) {
    const { parentEl } = this.props;
    const railsDiv = parentEl.getElementsByClassName("hero-with-two-rails__rails")[0];
    const headingDiv = parentEl.getElementsByClassName("hero-with-two-rails__heading")[0];
    const headingHeight = headingDiv.getBoundingClientRect().height;
    const pageHeadingOffset = (viewportHeight - headingHeight) / 2;

    let bottomPositionOverride = null,
      heroDiv = null,
      heroHeight = null,
      percentageUnpinned = 0.5,
      railsHeight = railsDiv.getBoundingClientRect().height,
      sceneDuration,
      setPin = true,
      transformDistance,
      triggerElement = railsDiv;

    if (position === "above" && this.heroExists) {
      heroDiv = parentEl.getElementsByClassName("hero-with-two-rails__hero")[0];

      // add hero's height to height of rails
      if (heroDiv) {
        heroHeight = heroDiv.getBoundingClientRect().height;
        railsHeight += heroHeight;

        // percentage of scene that the content is unpinned should roughly equal where the gap between
        // hero and rails ends, centered in the viewport
        percentageUnpinned = (heroHeight - (viewportHeight / 2) + headingHeight ) / railsHeight;
        triggerElement = heroDiv;

      } else {
        position = "below";
      }
    }

    // animate differently depending if both rails are larger than the whole viewport or not
    if (viewportHeight > railsHeight) {
      setPin = false;
      sceneDuration = railsHeight * 0.7;
      transformDistance = railsHeight - headingHeight;

    } else {
      sceneDuration = railsHeight - pageHeadingOffset - headingHeight;
      bottomPositionOverride = railsHeight - headingHeight;
      transformDistance = pageHeadingOffset;
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
    } = this.props,
      contentWidth = parentEl.getBoundingClientRect().width;

    // if the component width is < mobileBreakpoint, cancel parallax effects
    if (contentWidth < mobileBreakpoint) {
      return;
    }

    const viewportHeight = window.innerHeight,
      callHeadingParallax = parallaxHeading && heading && heading !== "";

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
        // make sure target div exists
        const cardDiv = document.getElementById(card.itemId),
          cardLocation = card.config.itemPos || card.itemPos || null;

        // pass class if it's the first promo  // REIMPLEMENT ME
        const additionalClasses = !i ? "mt3_promocard--first" : "";

        // initial promo width
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

    let hasHeading = heading && heading !== "";
    parentEl.className = cx(
      'hero-with-two-rails',
      'mt3_row',
      {
        [`hero-with-two-rails--${theme}`]: theme,
        'hero-with-two-rails--large-heading': headingSize === 'large',
        'hero-with-two-rails--no-hero': !this.heroExists,
        'hero-with-two-rails--no-heading': !hasHeading,
        [`hero-with-two-rails--heading-${headingPosition}`]: hasHeading ,
      }
    );

    return (
      <div className="hero-with-two-rails__app">
        {portalContent}
      </div>
    )
  }
}

HeroWithTwoRails.propTypes = {
  cards: React.PropTypes.array,
  heading: React.PropTypes.string,
  headingPosition: React.PropTypes.string,
  headingSize: React.PropTypes.string,
  parallaxHeading: React.PropTypes.bool,
  parallaxRails: React.PropTypes.bool,
  theme: React.PropTypes.string,
  parentEl: React.PropTypes.object.isRequired
};

HeroWithTwoRails.defaultProps = {
  headingPosition: 'above',
  parallaxHeading: true,
  parallaxRails: true,
  theme: 'light'
};
