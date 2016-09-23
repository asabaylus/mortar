'use strict';

import React, { Component, PropTypes } from 'react';
import {default as MTPromoCard} from '../../modules/promocard/MTPromoCard';
import PortalWrapper from '../../util/PortalWrapper';

import { TweenLite, CSSPlugin } from 'gsap';
import ScrollMagic from 'scrollmagic';
import $ from 'jquery';
import _debounce from 'lodash/debounce';


//additional Scrollmagic plugins: GSAP API, debug indicators. Debug plugin commented out here - uncomment to debug
import 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js';
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js';

const mobileBreakpoint = 768;

class HeroWithTwoRails extends Component {
  constructor(props) {
    super(props);
    this.enableParallax = false;
    this.resizeHandler = null;
    this._window = $(window);
    this.resetParallax = this.resetParallax.bind(this);
    this.scrollmagicController = null;
  }

  headingParallax(viewportHeight) {
    const railsDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__rails")[0];
    const headingDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__heading")[0];

    const railsHeight = railsDiv.getBoundingClientRect().height;
    const headingHeight = headingDiv.getBoundingClientRect().height;
    let firstTransitionDuration;
    let firstTransitionDistance;
    let secondTransitionDuration;
    let setPin = true;

    //animate differently depending if both rails are larger than the whole viewport or not
    if(viewportHeight > railsHeight) {
      setPin = false;
      firstTransitionDuration = railsHeight * 0.7;
      firstTransitionDistance = railsHeight - headingHeight;
    } else {
      let pageHeadingOffset = (viewportHeight - headingHeight)/2;

      firstTransitionDuration = railsHeight / 3;
      firstTransitionDistance = pageHeadingOffset + firstTransitionDuration;
      secondTransitionDuration = railsHeight - pageHeadingOffset - headingHeight - firstTransitionDuration;
    }

    new ScrollMagic.Scene({
        triggerElement: railsDiv,
        duration: firstTransitionDuration
      })
      .setTween(headingDiv, {y: `${firstTransitionDistance}px`, ease: Linear.easeNone})
      /*
        for debugging, uncomment this next line, and make sure the "debug.addIndicators.js" plugin is imported
      */
      //.addIndicators()
      .addTo(this.scrollmagicController);

    //part 2 - stay fixed in middle of viewport until package exits viewport.
    if(setPin) {
      new ScrollMagic.Scene({
          triggerElement: railsDiv,
          duration: secondTransitionDuration,
          offset: firstTransitionDuration
        })
        .setPin(headingDiv)
        //.addIndicators()
        .addTo(this.scrollmagicController);
    }
  }

  railsParallax(viewportHeight) {
    const leftRail = this.props.parentEl.getElementsByClassName("hero-with-two-rails__left-rail")[0];
    const rightRail = this.props.parentEl.getElementsByClassName("hero-with-two-rails__right-rail")[0];

    //if both rails aren't present, do not create parallax effect
    if(!leftRail || !rightRail) { return }

    const leftRailHeight = leftRail.getBoundingClientRect().height;
    const rightRailHeight = rightRail.getBoundingClientRect().height;
    const railDifference = Math.abs(leftRailHeight - rightRailHeight);

    // if the rails are not sufficiently unequal, do not create parallax effect
    if(railDifference < 100) {
      return;
    }

    let shorterRail;
    let tallerRail;
    let tallerRailHeight;
    let railsDuration;

    //assign vars depending on which rail is taller
    if(leftRailHeight < rightRailHeight) {
      shorterRail = leftRail;
      tallerRail = rightRail;
      tallerRailHeight = rightRailHeight;
    } else {
      shorterRail = rightRail;
      tallerRail = leftRail;
      tallerRailHeight = leftRailHeight;
    }

    //animate differently depending if both rails are larger than the whole viewport or not
    if(viewportHeight > tallerRailHeight) {
      railsDuration = viewportHeight - tallerRailHeight;
    } else {
      railsDuration = tallerRailHeight - viewportHeight;
    }

    // build scenes
    new ScrollMagic.Scene({
      triggerElement: tallerRail,
      duration: railsDuration
     })
      .setTween(shorterRail, {y: railDifference, ease: Linear.easeNone})
     /*
       for debugging, uncomment this next line, and make sure the "debug.addIndicators.js" plugin is imported
     */
      //.addIndicators()
      .addTo(this.scrollmagicController);
  }

  resetParallax() {
    const contentWidth = this.props.parentEl.getBoundingClientRect().width;
    const viewportHeight = this._window.height();


    //if there's already a ScrollMagic controller, destroy it
    if(this.scrollmagicController) {
      //pass an argument of true to "reset" the scene
      this.scrollmagicController = this.scrollmagicController.destroy(true);
    }

    //if the component width is < mobileBreakpoint, cancel parallax effects
    if(contentWidth < mobileBreakpoint) {
      return;
    }

    // init controller
    this.scrollmagicController = new ScrollMagic.Controller(
      {
        globalSceneOptions: {
          triggerHook: 0
        }
      }
    );

    // build heading scenes
    if(this.props.parallaxHeading && this.props.heading && this.props.heading !== "" && this.props.headingPosition === "below") {
      this.headingParallax(viewportHeight);
    }

    //build rails scene
    this.railsParallax(viewportHeight);

  }
  componentDidMount() {
    /* NOTE: temporarily disabling parallax, unless a "enableParallax" query var is found */
    const queryVars = window.location.search.substring(1);
    if (queryVars.indexOf('enableParallax') !== -1) {
      this.enableParallax = true;
    }

    if(this.enableParallax) {
      this.resetParallax();
      this.resizeHandler = _debounce(this.resetParallax, 250);
      window.addEventListener('resize', this.resizeHandler);
    }
  }

  componentWillUnmount() {
    /* NOTE: temporarily disabling parallax, unless a "enableParallax" query var is found */
    if(this.enableParallax) {
      window.removeEventListener('resize', this.resizeHandler);
    }

  }
  render() {
    let portalContent = [];
    let heroExists = false;
    const parentWidth = this.props.parentEl.getBoundingClientRect().width > 768 ? 600 : null;

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
              <h1>{this.props.heading}</h1>
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

          portalContent.push(
            <PortalWrapper targetDiv={cardDiv} key={i++}>
              <MTPromoCard
                {...card}
                additionalClasses={additionalClasses}
                cardLocation={cardLocation}
                parentWidth={parentWidth}
                theme={this.props.theme}/>
            </PortalWrapper>
          );
        } else {
          portalContent.push(
            <MTPromoCard
              {...card}
              additionalClasses={additionalClasses}
              cardLocation={cardLocation}
              parentWidth={parentWidth}
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
  theme: PropTypes.string,
  parentEl: PropTypes.object.isRequired
};

HeroWithTwoRails.defaultProps = {
  headingPosition: 'above',
  parallaxHeading: true,
  theme: 'light'
};

export default HeroWithTwoRails;
