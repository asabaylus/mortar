'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import deepForceUpdate from 'react-deep-force-update';

import {Pestle, Module} from '@natgeo/pestle';
import ContentPackageConfiguratorComponent from './ContentPackageConfigurator';

class ContentPackageConfigurator extends Module {
  forceUpdate() {
    deepForceUpdate(this.instance);
  }

  init() {
    const props = {
      'id': '3t35sdfj',
      'type': 'two-rails',
      'theme': 'dark',
      'layout': '33x66',
      'dataModel': {
        'components': [
          {
            'itemId': 'lr_mostRead',
            'type': 'mostRead',
            'heading': 'Most Read',
            'stories': [
              {
                'type': 'article',
                'config': {
                  'sponsored': false,
                  'showPlayButton': true,
                  'showByline': true
                },
                'link': {
                  'url': '\/content\/magazine\/en_US\/test-article-by-jani-actman.html',
                  'target': '_self',
                  'trackingCodes': '?utm_medium=site&utm_source=ng.com'
                },
                'leadMedia': [
                  {
                    'imageUrl': '\/content\/dam\/photography\/rights-exempt\/PT_hero_42_153645159.jpg',
                    'title': 'This is the image\'s title in DAM',
                    'aspectRatio': 0.48245614035088,
                    'height': 550,
                    'width': 1140,
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'text': {
                  'title': 'Use this title instead',
                  'dek': 'Sample dek',
                  'publishDate': 'Thu Aug 11 13:28:00 UTC 2016',
                  'kicker': {
                    'label': '<p><a href="http://www.google.com">Weird & Wild</a></p>'
                  }
                },
                'contributor': {
                  'name': 'Jani Actman',
                  'url': '\/content\/contributors\/en_US\/jani-actman.html',
                  'thumbnail': {
                    'imageUrl': '\/content\/dam\/photography\/rights-exempt\/90725-Colorful-Kittens.jpg',
                    'aspectRatio': 0.75038520801233,
                    'height': 487,
                    'width': 649,
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                }
              },
              {
                'type': 'article',
                'config': {
                  'sponsored': false,
                  'showPlayButton': true,
                  'showByline': false
                },
                'link': {
                  'url': '\/content\/magazine\/en_US\/article-with-video-lead.html',
                  'target': '_self'
                },
                'leadMedia': [
                  {
                    'imageUrl': 'http:\/\/pmdvod.nationalgeographic.com\/NG_Video\/334\/483\/160127-utah-wolverines-runners-vin_640x360_609324611664.jpg',
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'text': {
                  'title': 'Article with Video Lead',
                  'publishDate': 'Sun Aug 14 16:28:43 UTC 2016',
                  'kicker': {
                    'label': 'Technology'
                  }
                }
              },
              {
                'type': 'article',
                'config': {
                  'sponsored': true,
                  'showPlayButton': true,
                  'showByline': true
                },
                'link': {
                  'url': 'http:\/\/www.yahoo.com',
                  'target': '_blank'
                },
                'leadMedia': [
                  {
                    'imageUrl': 'http:\/\/www.lovethispic.com\/uploaded_images\/90725-Colorful-Kittens.jpg'
                  }
                ],
                'text': {
                  'title': 'Short Titles are Funny Things',
                  'dek': '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<\/p>\n',
                  'kicker': {
                    'label': 'Technology'
                  },
                  'sponsorContentLabel': 'Partner Content'
                }
              },
              {
                'itemId': 'hero_promocard_0',
                'type': 'video',
                'config': {
                  'aspectRatio': 'photo',
                  'sponsored': false,
                  'showPlayButton': true,
                  'showByline': true
                },
                'link': {
                  'url': 'http:\/\/ngm.nationalgeographic.com\/2007\/05\/zambia-wildlife\/eckstrom-text',
                  'target': '_blank',
                  'trackingCodes': [
                    'utm_medium=website',
                    'utm_source=site'
                  ]
                },
                'leadMedia': [
                  {
                    'url': 'http:\/\/placehold.it\/800x600',
                    'aspectRatio': 0.6667,
                    'altText': 'Picture of a caiman swimming underwater in Pantanal, Brazil',
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ],
                    'guid': '47746161-1e00-4514-9b4f-168f0b552c66',
                    'videoUrl': 'http:\/\/news.localhost.nationalgeographic.com:4502\/content\/dam\/natgeo\/video\/mpx\/news\/c\/ch\/cha\/chasing-ice-photographer-talks-melting-glaciers.mp4',
                    'imageUrl': 'http:\/\/pmdvod.nationalgeographic.com\/NG_Video\/996\/847\/62501_1_1280x720_640x360_177594435674.jpg',
                    'renditionUrl': '\/content\/dam\/natgeo\/video\/mpx\/news\/c\/ch\/cha\/chasing-ice-photographer-talks-melting-glaciers.mp4\/jcr:content\/renditions\/cq5dam.thumbnail.319.319.png'
                  },
                  {
                    'url': 'http:\/\/placehold.it\/800x600',
                    'aspectRatio': 0.6667,
                    'altText': 'Picture of a caiman swimming underwater in Pantanal, Brazil',
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'cta': {
                  'url': 'http:\/\/www.nationalgeographic.com\/magazine\/2016\/05\/yellowstone-national-parks-wildlife-restoration\/',
                  'title': 'This is the CTA Title',
                  'target': '_blank',
                  'seoTitle': 'This is an SEO title'
                },
                'text': {
                  'title': 'This is the title of the card',
                  'dek': 'This is a short dek for the card.',
                  'kicker': {
                    'label': '<p><a href="http://www.cnn.com">Weird & Really Wild</a></p>'
                  },
                  'duration': '<p><i>2:35</i></p>',
                  'publishDate': 'Thu Aug 04 13:30:39 EDT 2016',
                  'sponsorContentLabel': 'This is the Sponsor Content Label'
                },
                'modal': false,
                'brandingBadgeLabel': ''
              },
              {
                'type': 'article',
                'config': {
                  'sponsored': false,
                  'showPlayButton': true,
                  'showByline': true
                },
                'link': {
                  'url': '\/content\/magazine\/en_US\/test-article-by-jani-actman.html',
                  'target': '_self',
                  'trackingCodes': '?utm_medium=site&utm_source=ng.com'
                },
                'leadMedia': [
                  {
                    'imageUrl': '\/content\/dam\/photography\/rights-exempt\/PT_hero_42_153645159.jpg',
                    'title': 'This is the image\'s title in DAM',
                    'aspectRatio': 0.48245614035088,
                    'height': 550,
                    'width': 1140,
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'text': {
                  'title': 'Use this title instead',
                  'dek': 'Sample dek',
                  'publishDate': 'Thu Aug 11 13:28:00 UTC 2016',
                  'kicker': {
                    'label': 'Weird & Wild',
                    'url': '\/content\/news\/en_US\/weird-wild.html',
                    'target': '_self',
                    'trackingCodes': '?utm_medium=site&utm_source=ng.com'
                  }
                },
                'contributor': {
                  'name': 'Jani Actman',
                  'url': '\/content\/contributors\/en_US\/jani-actman.html',
                  'thumbnail': {
                    'imageUrl': '\/content\/dam\/photography\/rights-exempt\/90725-Colorful-Kittens.jpg',
                    'aspectRatio': 0.75038520801233,
                    'height': 487,
                    'width': 649,
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                }
              },
            ]
          },
          {
            'itemId': 'rr_theLatest',
            'type': 'theLatest',
            'heading': 'The Latest',
            'stories': [
              {
                'type': 'article',
                'config': {
                  'sponsored': false,
                  'showPlayButton': true,
                  'showByline': true
                },
                'link': {
                  'url': '\/content\/magazine\/en_US\/test-article-by-jani-actman.html',
                  'target': '_self',
                  'trackingCodes': '?utm_medium=site&utm_source=ng.com'
                },
                'leadMedia': [
                  {
                    'imageUrl': '\/content\/dam\/photography\/rights-exempt\/PT_hero_42_153645159.jpg',
                    'title': 'This is the image\'s title in DAM',
                    'aspectRatio': 0.48245614035088,
                    'height': 550,
                    'width': 1140,
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'text': {
                  'title': 'Use this title instead',
                  'dek': 'Sample dek',
                  'publishDate': 'Thu Aug 11 13:28:00 UTC 2016',
                  'kicker': {
                    'label': 'Weird & Wild',
                    'url': '\/content\/news\/en_US\/weird-wild.html',
                    'target': '_self',
                    'trackingCodes': '?utm_medium=site&utm_source=ng.com'
                  }
                },
                'contributor': {
                  'name': 'Jani Actman',
                  'url': '\/content\/contributors\/en_US\/jani-actman.html',
                  'thumbnail': {
                    'imageUrl': '\/content\/dam\/photography\/rights-exempt\/90725-Colorful-Kittens.jpg',
                    'aspectRatio': 0.75038520801233,
                    'height': 487,
                    'width': 649,
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                }
              },
              {
                'itemId': 'lr_promocard_0',
                'type': 'article',
                'config': {
                  'cardAspectRatio': '19:9',
                  'sponsored': false
                },
                'link': {
                  'url': 'http:\/\/www.nationalgeographic.com\/travel\/destinations\/south-america\/brazil\/exploring-pantanal-brazil',
                  'target': '_self',
                  'trackingCodes': [
                    'utm_medium=website',
                    'utm_source=site'
                  ]
                },
                'leadMedia': [
                  {
                    'url': 'some url',
                    'aspectRatio': 0.6692323,
                    'height': 500,
                    'width': 900,
                    'altText': 'Mars photo',
                    'customCrops': [
                      '16:9',
                      '2:1'
                    ],
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'text': {
                  'title': 'How to Explore the Pantanal',
                  'dek': 'Explore the Pantanal from all corners with this guide to the beauty of this national park and UNESCO World Heritage site.',
                  'publishDate': 'Thu Aug 04 13:30:39 EDT 2016',
                  'kicker': {
                    'label': 'Kicker Label'
                  }
                }
              },
              {
                'itemId': 'lr_promocard_1',
                'type': 'video',
                'config': {
                  'cardAspectRatio': '16:9',
                  'sponsored': false
                },
                'link': {
                  'url': '\/content\/dam\/natgeo\/video\/mpx\/nat-geo-channel\/g\/gu\/gun\/gun-to-the-head.mp4'
                },
                'leadMedia': [
                  {
                    'url': 'some url',
                    'aspectRatio': 0.6692323,
                    'height': 500,
                    'width': 900,
                    'altText': 'Mars photo',
                    'customCrops': [
                      '16:9',
                      '2:1'
                    ],
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'text': {
                  'title': 'Crime in TN',
                  'dek': 'Just when deputies in Sullivan County, Tennessee and Ashe County, North Carolina think they\'ve seen it all, a dispatch call comes in to corral a donkey on the loose in the streets.',
                  'duration': '25 Mins',
                  'publishDate': 'Thu Aug 04 13:30:39 EDT 2016',
                  'kicker': {
                    'label': 'Video Kicker label'
                  }
                }
              },
              {
                'itemId': 'lr_promocard_0',
                'type': 'article',
                'config': {
                  'cardAspectRatio': '19:9',
                  'sponsored': false
                },
                'link': {
                  'url': 'http:\/\/www.nationalgeographic.com\/travel\/destinations\/south-america\/brazil\/exploring-pantanal-brazil',
                  'target': '_self',
                  'trackingCodes': [
                    'utm_medium=website',
                    'utm_source=site'
                  ]
                },
                'leadMedia': [
                  {
                    'url': 'some url',
                    'aspectRatio': 0.6692323,
                    'height': 500,
                    'width': 900,
                    'altText': 'Mars photo',
                    'customCrops': [
                      '16:9',
                      '2:1'
                    ],
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'text': {
                  'title': 'This is the title of the card',
                  'dek': 'This is a short dek for the card.',
                  'kicker': {
                    'label': 'Weird & Wild',
                    'url': 'http:\/\/news.nationalgeographic.com\/2016\/08\/shark-attack\/',
                    'target': '_self',
                    'trackingCodes': '?utm_medium=site&utm_source=ng.com'
                  },
                  'duration': '',
                  'publishDate': 'Thu Aug 04 13:30:39 EDT 2016',
                  'sponsorContentLabel': 'This is the Sponsor Content Label'
                },
              },
              {
                'itemId': 'hero_promocard_0',
                'type': 'gallery',
                'config': {
                  'cardAspectRatio': '3:2',
                  'sponsored': false,
                  'showPlayButton': true,
                  'showByline': true
                },
                'link': {
                  'url': 'http:\/\/ngm.nationalgeographic.com\/2007\/05\/zambia-wildlife\/eckstrom-text',
                  'target': '_blank',
                  'trackingCodes': [
                    'utm_medium=website',
                    'utm_source=site'
                  ]
                },
                'leadMedia': [
                  {
                    'url': 'http:\/\/placehold.it\/800x600',
                    'aspectRatio': 0.6667,
                    'altText': 'Picture of a caiman swimming underwater in Pantanal, Brazil',
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ],
                    'guid': '47746161-1e00-4514-9b4f-168f0b552c66',
                    'videoUrl': 'http:\/\/news.localhost.nationalgeographic.com:4502\/content\/dam\/natgeo\/video\/mpx\/news\/c\/ch\/cha\/chasing-ice-photographer-talks-melting-glaciers.mp4',
                    'imageUrl': 'http:\/\/pmdvod.nationalgeographic.com\/NG_Video\/996\/847\/62501_1_1280x720_640x360_177594435674.jpg',
                    'renditionUrl': '\/content\/dam\/natgeo\/video\/mpx\/news\/c\/ch\/cha\/chasing-ice-photographer-talks-melting-glaciers.mp4\/jcr:content\/renditions\/cq5dam.thumbnail.319.319.png'
                  },
                  {
                    'url': 'http:\/\/placehold.it\/800x600',
                    'aspectRatio': 0.6667,
                    'altText': 'Picture of a caiman swimming underwater in Pantanal, Brazil',
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'cta': {
                  'url': 'http:\/\/www.nationalgeographic.com\/magazine\/2016\/05\/yellowstone-national-parks-wildlife-restoration\/',
                  'title': 'This is the CTA Title',
                  'target': '_blank',
                  'seoTitle': 'This is an SEO title'
                },
                'text': {
                  'title': 'This is the title of the card',
                  'dek': 'This is a short dek for the card.',
                  'kicker': {
                    'label': 'Weird & Wild',
                    'url': 'http:\/\/news.nationalgeographic.com\/2016\/08\/shark-attack\/',
                    'target': '_self',
                    'trackingCodes': '?utm_medium=site&utm_source=ng.com'
                  },
                  'duration': '',
                  'publishDate': 'Thu Aug 04 13:30:39 EDT 2016',
                  'sponsorContentLabel': 'This is the Sponsor Content Label'
                },
                'modal': false,
                'brandingBadgeLabel': ''
              },
              {
                'type': 'article',
                'config': {
                  'sponsored': false,
                  'showPlayButton': true,
                  'showByline': true
                },
                'link': {
                  'url': '\/content\/magazine\/en_US\/test-article-by-jani-actman.html',
                  'target': '_self',
                  'trackingCodes': '?utm_medium=site&utm_source=ng.com'
                },
                'leadMedia': [
                  {
                    'imageUrl': '\/content\/dam\/photography\/rights-exempt\/PT_hero_42_153645159.jpg',
                    'title': 'This is the image\'s title in DAM',
                    'aspectRatio': 0.48245614035088,
                    'height': 550,
                    'width': 1140,
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                ],
                'text': {
                  'title': 'Use this title instead',
                  'dek': 'Sample dek',
                  'publishDate': 'Thu Aug 11 13:28:00 UTC 2016',
                  'kicker': {
                    'label': 'Weird & Wild',
                    'url': '\/content\/news\/en_US\/weird-wild.html',
                    'target': '_self',
                    'trackingCodes': '?utm_medium=site&utm_source=ng.com'
                  }
                },
                'contributor': {
                  'name': 'Jani Actman',
                  'url': '\/content\/contributors\/en_US\/jani-actman.html',
                  'thumbnail': {
                    'imageUrl': '\/content\/dam\/photography\/rights-exempt\/90725-Colorful-Kittens.jpg',
                    'aspectRatio': 0.75038520801233,
                    'height': 487,
                    'width': 649,
                    'srcset': [
                      'http:\/\/placehold.it\/400x300 400w',
                      'http:\/\/placehold.it\/800x600 800w',
                      'http:\/\/placehold.it\/1600x1200 1600w'
                    ]
                  }
                }
              },
            ]
          }
        ]
      },
      "parentEl": document.getElementById("configurator")
    };
    console.log("QQ");
    console.log(props.parentEl);
    this.instance = ReactDOM.render(<ContentPackageConfiguratorComponent initialProps={props} />, this.el);
    Pestle.PubSub.subscribe('Configurator.ForceUpdate', () => { this.forceUpdate(); });
  }
}

Pestle.ModuleManager.register('ContentPackageConfigurator', ContentPackageConfigurator);

export default ContentPackageConfigurator;
