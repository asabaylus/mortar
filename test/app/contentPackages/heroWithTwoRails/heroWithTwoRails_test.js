'use strict';

import HeroWithTwoRails from '../../../../app/contentPackages/heroWithTwoRails/heroWithTwoRails.jsx';
import {shallow} from 'enzyme';
import React from 'react';

describe('Hero With Two Rails Content Package', () => {
  let el;
  const options = {
    "type":"hero-two-rails",
    "theme":"dark",
    "heading":"King Tut",
    "cards":[
      {
        "id":"hero_promocard_0",
        "type":"article",
        "config":{
            "aspectRatio":"1:1",
            "sponsored":false
          },
        "link":{
          "url":"http://www.nationalgeographic.com/travel/destinations/south-america/brazil/exploring-pantanal-brazil",
          "target":"_self",
          "trackingCodes":[
            "utm_medium=website",
            "utm_source=site"
          ]
        },
        "leadMedia":[
          {
          "url":"/content/dam/travel/rights-exempt/Travel-2016/how-explore-pantanal/caiman-swim-pantanal-brazil.jpg",
          "aspectRatio":0.6666666666666666,
          "height":2000,
          "width":3000,
          "altText":"Picture of a caiman swimming underwater in Pantanal, Brazil",
          "srcset":[
              "http://placehold.it/400x300 400w",
              "http://placehold.it/800x600 800w",
              "http://placehold.it/1600x1200 1600w"
            ]
          }
        ],
        "text":{
          "title":"How to Explore the Pantanal",
          "dek":"Explore the Pantanal from all corners with this guide to the beauty of this national park and UNESCO World Heritage site.",
          "kicker":"Space",
          "publishDate":"Thu Aug 04 13:30:39 EDT 2016"
        }
      },
      {
         "id":"rr_schedulecard_0",
         "type":"schedule",
         "config":{
            "sponsored":false,
            "channelMapping":true
         },
         "link":{
            "url":"http://channel.nationalgeographic.com/some-show/",
            "target":"_self",
            "trackingCodes":[
               "utm_medium=website",
               "utm_source=site"
            ]
         },
         "text":{
            "heading":"Friday on Wild",
            "title":"Mars Photo Gallery",
            "time":"8pm/7c",
            "kicker":"Space"
         },
         "cta":{
            "url":"http://channel.nationalgeographic.com/tv-guide/",
            "title":"View All Schedules +",
            "target":"_blank",
            "seo-title":"See our schedule of upcoming shows"
         }
      }
    ]
  };

  let testParent = {
    className: "foo",
    getElementsByClassName: function(){
      return {}
    }
  }

  before(() => {
    el = shallow(<HeroWithTwoRails
      {...options}
      parentEl={testParent}
    />);
  });

  it('App div should be rendered with expected class', () => {
    expect(el.html()).to.include(`<div class="hero-with-two-rails__app`);
  });

  it('Heading should be rendered and display provided text', () => {
    expect(el.html()).to.include(`<h1>King Tut</h1>`);
  });

  it('Both items in "cards" array passed in data model should call Promo Card components', () => {
    expect(el.find("MTPromoCard")).to.have.length(2);
  });

  it('Sample Promo Cards passed in data model should be called with expected props', () => {
    const firstPromoCard = el.find("MTPromoCard").first();
    expect(firstPromoCard.props().id).to.equal("hero_promocard_0");
    expect(firstPromoCard.props().type).to.equal("article");
    expect(firstPromoCard.props().config.sponsored).to.be.false;
    expect(firstPromoCard.props().leadMedia[0].aspectRatio).to.equal(0.6666666666666666);
  });

});
