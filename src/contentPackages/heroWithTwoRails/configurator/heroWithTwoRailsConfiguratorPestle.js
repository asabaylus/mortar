'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';

import {Pestle, Module} from '@natgeo/pestle';
import HeroWithTwoRailsConfiguratorComponent from './heroWithTwoRailsConfigurator';

class HeroWithTwoRailsConfigurator extends Module {
  forceUpdate() {
    deepForceUpdate(this.instance);
  }

  init() {
    const props = {
       "type":"hero-two-rails",
       "theme":"light",
       "heading":"King Tut",
       "headingPosition":"above",
       "parallaxHeading":true,
       "cards":[
          {
             "itemId":"hero_promocard_0",
             "itemPos":"hero",
             "type":"article",
             "config":{
                "cardAspectRatio":"2:1",
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
             "itemId":"lr_promocard_0",
             "type":"article",
             "config":{
                "cardAspectRatio":"19:9",
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
                   "url":"some url",
                   "aspectRatio":0.6692323,
                   "height":500,
                   "width":900,
                   "altText":"Mars photo",
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
             "itemId":"lr_promocard_1",
             "type":"article",
             "config":{
                "cardAspectRatio":"16:9",
                "sponsored":false
             },
             "link":{
                "url":"/content/dam/natgeo/video/mpx/nat-geo-channel/g/gu/gun/gun-to-the-head.mp4"
             },
             "leadMedia":[
                {
                   "url":"some url",
                   "aspectRatio":0.6692323,
                   "height":500,
                   "width":900,
                   "altText":"Mars photo",
                   "srcset":[
                      "http://placehold.it/400x300 400w",
                      "http://placehold.it/800x600 800w",
                      "http://placehold.it/1600x1200 1600w"
                   ]
                }
             ],
             "text":{
                "title":"Crime in TN",
                "dek":"Just when deputies in Sullivan County, Tennessee and Ashe County, North Carolina think they've seen it all, a dispatch call comes in to corral a donkey on the loose in the streets.",
                "kicker":"Space",
                "duration":"25 Mins",
                "publishDate":"Thu Aug 04 13:30:39 EDT 2016"
             }
          },
          {
             "itemId":"lr_promocard_2",
             "type":"article",
             "config":{
                "cardAspectRatio":"19:9",
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
                   "url":"some url",
                   "cardAspectRatio":0.6692323,
                   "height":500,
                   "width":900,
                   "altText":"Mars photo",
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
             "itemId":"rr_showcard_0",
             "type":"show",
             "config":{
                "cardAspectRatio":"2:1",
                "sponsored":false,
                "channelMapping":true
             },
             "link":{
                "url":"http://www.nationalgeographic.com/travel/destinations/south-america/brazil/exploring-pantanal-brazil",
                "target":"_self",
                "trackingCodes":[
                   "utm_medium=website",
                   "utm_source=site"
                ]
             },
             "leadMedia": [
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
                "heading":"Friday on Wild",
                "title":"Mars",
                "time":"Sunday 8pm/7c",
                "kicker":"Space"
             },
             "cta":{
                "url":"http://channel.nationalgeographic.com/tv-guide/",
                "title":"See All +",
                "target":"_blank",
                "seo-title":"See more showtimes for this program"
             }
          },
          {
             "itemId":"rr_promocard_0",
             "type":"article",
             "config":{
                "cardAspectRatio":"2:1",
                "sponsored":true
             },
             "link":{
                "url":"http://www.nationalgeographic.com/travel/destinations/south-america/brazil/exploring-pantanal-brazil",
                "target":"_self",
                "trackingCodes":[
                   "utm_medium=website",
                   "utm_source=site"
                ]
             },
             "leadMedia": [
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
                "kicker":"Sponsor Content",
                "publishDate":"Thu Aug 04 13:30:39 EDT 2016"
             }
          },
          {
             "itemId":"rr_promocard_1",
             "type":"show",
             "config":{
                "cardAspectRatio":"2:1",
                "sponsored":false,
                "channelMapping":true
             },
             "link":{
                "url":"http://www.nationalgeographic.com/travel/destinations/south-america/brazil/exploring-pantanal-brazil",
                "target":"_self",
                "trackingCodes":[
                   "utm_medium=website",
                   "utm_source=site"
                ]
             },
             "leadMedia": [
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
                "heading":"Friday on Wild",
                "title":"Mars",
                "time":"Sunday 8pm/7c",
                "kicker":"Space"
             },
             "cta":{
                "url":"http://channel.nationalgeographic.com/tv-guide/",
                "title":"See All +",
                "target":"_blank",
                "seo-title":"See more showtimes for this program"
             }
          }
       ],
       "parentEl": document.getElementById("configurator")
    };

    this.instance = ReactDOM.render(<HeroWithTwoRailsConfiguratorComponent initialProps={props} />, this.el);
    Pestle.PubSub.subscribe('Configurator.ForceUpdate', () => { this.forceUpdate(); });
  }
}

Pestle.ModuleManager.register('HeroWithTwoRailsConfigurator', HeroWithTwoRailsConfigurator);

export default HeroWithTwoRailsConfigurator;
