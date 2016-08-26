'use strict';

import React, { Component, PropTypes } from 'react';
import {default as MTPromoCard} from '../../modules/promocard/scripts/MTPromoCard.jsx';
import PortalWrapper from '../../scripts/util/PortalWrapper.jsx'

class HeroWithTwoRails extends Component {
    render() {
      let portalContent = []

      //apply "theme" class manually to parent element
      if(this.props.theme) {
        this.props.parentEl.className = `hero-with-two-rails hero-with-two-rails--${this.props.theme}`;
      }

      //Heading
      if(this.props.heading) {
        let headingDiv = this.props.parentEl.getElementsByClassName("hero-with-two-rails__heading")[0];
        if (headingDiv) {
          portalContent.push(
            <PortalWrapper targetDiv={headingDiv} key="heading">
              <h1>{this.props.heading}</h1>
            </PortalWrapper>
          );
        } else {
          portalContent.push(
            <h1 key="heading">{this.props.heading}</h1>
          );
        }
      }

      //Promo Cards
      if(this.props.cards && this.props.cards.length) {
        let i = 0;
        for (const card of this.props.cards) {
          //make sure target div exists
          let cardDiv = document.getElementById(card.id);

          if(cardDiv) {
            portalContent.push(
              <PortalWrapper targetDiv={cardDiv} key={i++}>
                <MTPromoCard {...card}/>
              </PortalWrapper>
            );
          } else {
            portalContent.push(
              <MTPromoCard {...card} key={i++}/>
            );
          }
        }
      }

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
  theme: PropTypes.string,
  parentEl: PropTypes.object.isRequired
};

HeroWithTwoRails.defaultProps = {
  theme: 'light'
};

export default HeroWithTwoRails;
