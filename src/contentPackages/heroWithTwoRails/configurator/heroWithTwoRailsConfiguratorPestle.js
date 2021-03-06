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
      "theme":"dark",
      "heading":"Testo Patronus",
      "headingPosition":"above",
      "headingSize":"standard",
      "parallaxHeading": true,
      "parallaxRails": true,
      "cards":[
         {
            "itemId":"hero_promocard_0",
            "type":"article",
            "config":{
               "cardAspectRatio":"2:1",
               "itemPos":"hero",
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
                 "aspectRatio":0.52197265625,
                 "height":2000,
                 "width":3000,
                 "altText":"Picture of a caiman swimming underwater in Pantanal, Brazil",
                 "srcset":[
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.80.1.jpg 80w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.133.1.jpg 133w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.152.1.jpg 152w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.162.1.jpg 162w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.210.1.jpg 210w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.224.1.jpg 224w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.225.1.jpg 225w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.280.1.jpg 280w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.352.1.jpg 352w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.470.1.jpg 470w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.536.1.jpg 536w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.590.1.jpg 590w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.676.1.jpg 676w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.710.1.jpg 710w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.768.1.jpg 768w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.885.1.jpg 885w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.945.1.jpg 945w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.1190.1.jpg 1190w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/02/01/cannabis_farmers/01cannabis_farmers.adapt.1900.1.jpg 1900w"
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
               "cardAspectRatio":"1:1",
               "itemPos":"lr",
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
            "leadMedia":[
               {
                  "url":"some url",
                  "aspectRatio":0.6692323,
                  "height":500,
                  "width":900,
                  "altText":"Mars photo",
                  "customCrops":[
                     "16:9",
                     "2:1"
                  ],
                  "srcset":[
                    "http://www.nationalgeographic.com/content/dam/photography/PROOF/2016/09/proof_proof_macques/01_snow_monkeys.adapt.280.1.jpg 280w",
                    "http://www.nationalgeographic.com/content/dam/photography/PROOF/2016/09/proof_proof_macques/01_snow_monkeys.adapt.352.1.jpg 352w",
                    "http://www.nationalgeographic.com/content/dam/photography/PROOF/2016/09/proof_proof_macques/01_snow_monkeys.adapt.470.1.jpg 470w",
                    "http://www.nationalgeographic.com/content/dam/photography/PROOF/2016/09/proof_proof_macques/01_snow_monkeys.adapt.536.1.jpg 536w"
                  ]
               }
            ],
            "text":{
               "title":"How to Explore the Pantanal",
               "dek":"Explore the Pantanal from all corners with this guide to the beauty of this national park and UNESCO World Heritage site.",
               "kicker":"Space",
               "publishDate":"Thu Aug 04 13:30:39 EDT 2016",
               "sponsorContentLabel": "Sponsor Content"
            }
         },
         {
            "itemId":"lr_promocard_1",
            "type":"article",
            "config":{
               "cardAspectRatio":"16:9",
               "itemPos":"lr",
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
                  "customCrops":[
                     "16:9",
                     "2:1"
                  ],
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
              "type": "gallery",
              "config": {
                "cardAspectRatio": "16:9",
                "itemPos":"lr",
                "sponsored": false,
                "showByline": true
              },
              "link": {
                "url": "http://ngm.nationalgeographic.com/2007/05/zambia-wildlife/eckstrom-text",
                "target": "_blank",
                "trackingCodes": [
                  "utm_medium=website",
                  "utm_source=site"
                ]
              },
              "leadMedia": [
                {
                  "url": "http://yourshot.nationalgeographic.com/u/fQYSUbVfts-T7pS2VP2wnKyN8wxywmXtY0-FwsgxqjPX4wK5izc-YTW9gtmvsEnEln54oNrHun6fQu0pkYMab9ApYh72qfMEbcE2cHL5IX3iIOOcsbULrLTcuADP8kpLRW06xrs1SDgEbKvevPj3b33DxblJlOJq7biWndO-OWzVAbjfvo1jASzA74P2hRKSEH3NEIahUYFi7I4E/",
                  "aspectRatio": "",
                  "altText": "This is a picture of of a village in Tibet"
                },
                {
                  "url": "http://news.nationalgeographic.com/content/dam/news/2016/08/22/Dresden-Codex.adapt.1190.1.jpg",
                  "aspectRatio": "broadcast",
                  "altText": "Picture of a caiman swimming underwater in Pantanal, Brazil"
                }
              ],
              "text": {
                "title": "This is the title of the card",
                "dek": "This is a short dek for the card.",
                "kicker": {
                  "label": "Weird & Wild",
                  "url": "http://news.nationalgeographic.com/2016/08/shark-attack/",
                  "target": "_blank",
                  "trackingCodes": "?utm_medium=site&utm_source=ng.com"
                },
                "byline": "This is a great byline",
                "photoCount": "12 Photos",
                "publishDate": "Thu Aug 04 13:30:39 EDT 2016",
                "sponsorContentLabel": "This is the sponsor content label"
              },
              "modal": false,
              "brandingBadgeLabel": ""
         },
         {
            "itemId":"rr_showcard_0",
            "type":"show",
            "config":{
               "cardAspectRatio":"2:1",
               "itemPos":"rr",
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
               "cardAspectRatio":"3:2",
               "itemPos":"rr",
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
            "text":{
               "title":"How to Explore the Pantanal",
               "dek":"Explore the Pantanal from all corners with this guide to the beauty of this national park and UNESCO World Heritage site.",
               "kicker": {
                  "label": "Weird & Wild",
                  "style": "",
                  "url": "http://news.nationalgeographic.com/2016/08/shark-attack/",
                  "target": "_self",
                  "trackingCodes": "?utm_medium=site&utm_source=ng.com"
                },
               "publishDate":"Thu Aug 04 13:30:39 EDT 2016"
            }
         },
         {
            "itemId":"rr_promocard_1",
            "type":"article",
            "config":{
               "cardAspectRatio":"2:1",
               "itemPos":"rr",
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
            "leadMedia": [
              {
                 "url":"/content/dam/travel/rights-exempt/Travel-2016/how-explore-pantanal/caiman-swim-pantanal-brazil.jpg",
                 "aspectRatio":0.6666666666666666,
                 "height":2000,
                 "width":3000,
                 "altText":"Picture of a caiman swimming underwater in Pantanal, Brazil",
                 "srcset":[
                   "http://www.nationalgeographic.com/content/dam/news/2016/09/06/skywatch/skywatch-09-06-1.adapt.590.1.jpg 590w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/09/06/skywatch/skywatch-09-06-1.adapt.676.1.jpg 676w",
                   "http://www.nationalgeographic.com/content/dam/news/2016/09/06/skywatch/skywatch-09-06-1.adapt.710.1.jpg 710w"
                 ]
              }
            ],
            "text":{
               "title":"How to Explore the Pantanal",
               "dek":"Explore the Pantanal from all corners with this guide to the beauty of this national park and UNESCO World Heritage site.",
               "kicker":"Sponsor Content",
               "publishDate":"Thu Aug 04 13:30:39 EDT 2016"
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
