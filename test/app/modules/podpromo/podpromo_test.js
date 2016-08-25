'use strict';

import Pestle from '@natgeo/mortar-pestle';
import PodPromo from '../../../../app/modules/podpromo/scripts/PodPromoPestle.js';
import PodPromoComponent from '../../../../app/modules/podpromo/scripts/PodPromo.jsx';

import {shallow} from 'enzyme';
import React from 'react';

describe('POD Promo Component', () => {
  describe('Pestle Module', () => {
    before(() => {
      const html = `<div data-pestle-module='PodPromo'>
        <script type="text/json" data-pestle-options>
          {
            "id": "f89234jw",
            "dataModel": {
              "id": "12344678910",
              "type": "pod",
              "config": {
                "aspectRatio": "2:1",
                "yourshot": true,
                "sponsored": true
              },
              "link": {
                "url": "http://www.nationalgeographic.com/photography/photo-of-the-day/08/some-image",
                "target": "_self",
                "trackingCodes": "?utm_medium=site&utm_site=natgeo-hp"
              },
              "leadMedia": [{
                "imageUrl": "http://placehold.it/1140x550.jpg",
                "title": "This is the image's title in DAM",
                "altText": "Picture of a stream of water flowing through the narrow Olo Canyon in Arizona",
                "aspectRatio": 0.4824561403508772,
                "height": 550,
                "width": 1140,
                "srcset": [
                  "http://placehold.it/80x39.jpg 80w",
                  "http://placehold.it/133x64.jpg 133w",
                  "http://placehold.it/152x73.jpg 152w",
                  "http://placehold.it/162x78.jpg 162w",
                  "http://placehold.it/210x101.jpg 210w",
                  "http://placehold.it/224x108.jpg 224w",
                  "http://placehold.it/225x109.jpg 225w",
                  "http://placehold.it/280x135.jpg 280w",
                  "http://placehold.it/352x170.jpg 352w",
                  "http://placehold.it/470x227.jpg 470w",
                  "http://placehold.it/536x259.jpg 536w",
                  "http://placehold.it/590x285.jpg 590w",
                  "http://placehold.it/676x326.jpg 676w",
                  "http://placehold.it/710x343.jpg 710w",
                  "http://placehold.it/768x371.jpg 768w",
                  "http://placehold.it/885x427.jpg 885w",
                  "http://placehold.it/945x456.jpg 945w",
                  "http://placehold.it/1190x574.jpg 1190w",
                  "http://placehold.it/1900x917.jpg 1900w"
                ]
              }],
              "text": {
                "heading": "Photo of the Day",
                "title": "This is the title field",
                "dek": "<p>Forged by the wear of water rushing over rocks, Olo Canyon in Arizona is concealed inside the Grand Canyon. Its alluring landscape includes natural springs and rocks shaped like cathedral amphitheaters.</p> <p><em>See more pictures from the September 2016 story &quot;<a href='http://www.nationalgeographic.com/magazine/2016/09/grand-canyon-development-hiking-national-parks' target='_blank'>Are We Losing the Grand Canyon?</a>&quot; </em></p>",
                "credit": "<p>Photograph by Pete McBride</p>",
                "affiliation": "National Geographic",
                "assetSource":"",
                "kicker": {
                  "label": "Weird & Wild",
                  "url": "/content/news/en_US/weird-wild.html",
                  "target": "_self",
                  "trackingCodes": "?utm_medium=site&utm_source=ng.com"
                },
                "sponsorContentLabel": "Sponsor Content"
              },
              "cta": {
                "url": "http://www.nationalgeographic.com/photography/photo-of-the-day/",
                "title": "See All",
                "target": "_blank",
                "seoTitle": "See more photos"
              }
            }            
          }
        </script>
      </div>`

      insertFixture(html);
      Pestle.init();
    });

    after(() => {
      removeFixture();
    });

    it('should be a class', () => {
      expect(PodPromo).to.be.a('function');
    });

    it('should be registered as a Pestle component', () => {
      expect(Pestle.ModuleManager.getModule('PodPromo')).to.exist;
    });

    it('should mount', () => {
      expect(Pestle.ModuleManager.getInstancesByName('PodPromo')).to.have.length.of.at.least(1);
    });
  });

  describe('React Component: Default Values', () => {
    let wrapper;
    const reactModel = {
      id: '12344678',
      type: 'pod',
      config: {
        aspectRatio: '2:1',
        yourshot: true,
        sponsored: true
      },
      link: {
        url: 'http://www.nationalgeographic.com/photography/photo-of-the-day/08/some-image',
        target: '_self',
        trackingCodes: '?utm_medium=site&utm_site=natgeo-hp'
      },
      leadMedia: [{
        imageUrl: 'http://placehold.it/1140x550.jpg',
        title: 'This is the image title in DAM',
        altText: 'Picture of a stream of water flowing through the narrow Olo Canyon in Arizona',
        aspectRatio: 0.4824561403508772,
        height: 550,
        width: 1140,
        srcset: [
          'http://placehold.it/80x39.jpg 80w',
          'http://placehold.it/133x64.jpg 133w',
          'http://placehold.it/152x73.jpg 152w',
          'http://placehold.it/162x78.jpg 162w',
          'http://placehold.it/210x101.jpg 210w',
          'http://placehold.it/224x108.jpg 224w',
          'http://placehold.it/225x109.jpg 225w',
          'http://placehold.it/280x135.jpg 280w',
          'http://placehold.it/352x170.jpg 352w',
          'http://placehold.it/470x227.jpg 470w',
          'http://placehold.it/536x259.jpg 536w',
          'http://placehold.it/590x285.jpg 590w',
          'http://placehold.it/676x326.jpg 676w',
          'http://placehold.it/710x343.jpg 710w',
          'http://placehold.it/768x371.jpg 768w',
          'http://placehold.it/885x427.jpg 885w',
          'http://placehold.it/945x456.jpg 945w',
          'http://placehold.it/1190x574.jpg 1190w',
          'http://placehold.it/1900x917.jpg 1900w'
        ]
      }],
      text: {
        heading: 'Photo of the Day',
        title: 'This is the title field',
        dek: '<p>This was in the DataModel, but the comopnent does not seem to have a use for it</p>',
        credit: '<p>Photograph by Pete McBride</p>',
        affiliation: 'National Geographic',
        assetSource: '',
        kicker: {
          label: 'Kicker Label',
          url: '/content/news/en_US/weird-wild.html',
          target: '_self',
          trackingCodes: '?utm_medium=site&utm_source=ng.com'
        },
        sponsorContentLabel: 'Sponsor Content'
      },
      cta: {
        url: 'http://www.nationalgeographic.com/photography/photo-of-the-day/',
        title: 'See All',
        target: '_blank',
        seoTitle: 'See more photos'
      }
    };

    before(() => {
      wrapper = shallow(<PodPromoComponent model={reactModel} />);
    });

    it('should include a LazyLoad Component to fire video', () => {
      expect(wrapper.html()).to.include('<div class="LazyLoad"></div>');
    });

    it('should have the correct heading value', () => {
      expect(wrapper.find('.mt3_podpromo-heading').html()).to.equal('<div class="mt3_podpromo-heading">Photo of the Day</div>');
    });

    it('should have the correct title value', () => {
      expect(wrapper.find('.mt3_podpromo-title').html()).to.equal('<div class="mt3_podpromo-title">This is the title field</div>');
    });

    it('should have the correct kicker value', () => {
      expect(wrapper.childAt(0).html()).to.contain('<div class="mt3_podpromo-kicker mt3_podpromo-elevate"><a href="/content/news/en_US/weird-wild.html?utm_medium=site&amp;utm_source=ng.com" target="_self" title="Kicker Label">Kicker Label</a></div>');
    });

    it('should have the correct cta value', () => {
      expect(wrapper.find('.mt3_podpromo-content-container.mt3_podpromo-content-container-top.mt3_podpromo-content-container-right').html()).to.contain('><span>See All</span>');
    });    

    it('should have the correct photo credit value', () => {
      expect(wrapper.find('.mt3_podpromo-photocredit').html()).to.equal('<div class="mt3_podpromo-photocredit"><p>Photograph by Pete McBride</p></div>');
    });

    it('should have the correct photo affiliation value', () => {
      expect(wrapper.find('.mt3_podpromo-affiliation').html()).to.equal('<div class="mt3_podpromo-affiliation">National Geographic</div>');
    });

  });

  describe('React Component: Kicker not linked', () => {
    let wrapper;
    const reactModel = {
      id: '12344678',
      type: 'pod',
      config: {
        aspectRatio: '2:1',
        yourshot: true,
        sponsored: true
      },
      link: {
        url: 'http://www.nationalgeographic.com/photography/photo-of-the-day/08/some-image',
        target: '_self',
        trackingCodes: '?utm_medium=site&utm_site=natgeo-hp'
      },
      leadMedia: [{
        imageUrl: 'http://placehold.it/1140x550.jpg',
        title: 'This is the image title in DAM',
        altText: 'Picture of a stream of water flowing through the narrow Olo Canyon in Arizona',
        aspectRatio: 0.4824561403508772,
        height: 550,
        width: 1140,
        srcset: [
          'http://placehold.it/1900x917.jpg 1900w'
        ]
      }],
      text: {
        heading: 'Photo of the Day',
        title: 'This is the title field',
        dek: '<p>This was in the DataModel, but the comopnent does not seem to have a use for it</p>',
        credit: '<p>Photograph by Pete McBride</p>',
        affiliation: 'National Geographic',
        assetSource: '',
        kicker: {
          label: 'Kicker Label',
          url: '',
          target: '_self',
          trackingCodes: '?utm_medium=site&utm_source=ng.com'
        },
        sponsorContentLabel: 'Sponsor Content'
      },
      cta: {
        url: 'http://www.nationalgeographic.com/photography/photo-of-the-day/',
        title: 'See All',
        target: '_blank',
        seoTitle: 'See more photos'
      }
    };

    before(() => {
      wrapper = shallow(<PodPromoComponent model={reactModel} />);
    });

    it('should have the correct kicker value', () => {
      expect(wrapper.childAt(0).html()).to.contain('<div class="mt3_podpromo-kicker">Kicker Label</div>');
    });
  });

});