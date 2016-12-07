'use strict';

import React from 'react';
import {shallow, mount} from 'enzyme';

import FiveUpCard from '../../../../../src/contentPackages/contentpackage/components/FiveUpCard';
import mockModel from './testData';


describe('FiveUp Card', () => {

  describe(':: Dark Theme ::Kicker', () => {
    let el;
    const options = mockModel;

    before(() => {
      el = shallow(
        <FiveUpCard
          cardNum={1}
          key={'fiveUp-promo-1'}
          {...options.dataModel.components[0].stories[0]}
          theme={'dark'}
          showImage={true}
          showKicker={true} />
      );
    });

    it('FiveUpCard wrapper should be rendered with expected class', () => {
      expect(el.props().className).to.equal('mt3_fiveup-card');
    });

    it('The first element in the card should be a div wide link', () => {
      expect(el.childAt(0).html()).to.equal('<a class="mt3_fiveup-divlink" href="/content/magazine/en_US/test-article-by-jani-actman.html?utm_medium=site&amp;utm_source=ng.com" target="_self"></a>');
    });

    it('There should be a kicker', () => {
      expect(el.find('.mt3_kicker').length).to.equal(1);
    });

    it('The kicker should have the proper class for its theme', () => {
      expect(el.find('.mt3_kicker').props().className).to.equal('mt3_color--white mt3_kicker');
    });

    it('The kicker link should have the proper href value', () => {
      expect(el.find('.mt3_kicker').props().children.props.href).to.equal('/content/news/en_US/weird-wild.html?utm_medium=site&utm_source=ng.com');
    });

    it('The kicker link should have the proper title value', () => {
      expect(el.find('.mt3_kicker').props().children.props.children).to.equal('Weird & Wild');
    });

    it('There should be a title', () => {
      expect(el.find('.mt3_fiveup-card-title').length).to.equal(1);
    });

    it('The title should have the proper markup', () => {
      expect(el.find('.mt3_fiveup-card-title').html()).to.equal('<div class="mt3_fiveup-card-title">Use this title instead</div>');
    });

    it('The wrapping div should indicate there is an image', () => {
      expect(el.find('.mt3_fiveup-card-row--has-image').length).to.equal(1);
    });

    it('The proper img src should be passed to the component', () => {
      expect(el.childAt(3).props().src).to.equal('/content/dam/photography/rights-exempt/PT_hero_42_153645159.jpg');
    });


    it('The proper frameAspectRatio should be passed to the component', () => {
      expect(el.childAt(3).props().frameAspectRatio).to.equal('16:9');
    });
  });

  describe(':: Light Theme', () => {
    let el;
    const options = mockModel;

    before(() => {

      el = shallow(<FiveUpCard cardNum={1} key={'fiveUp-promo-1'} {...options.dataModel.components[0].stories[0]} theme={'light'} showImage={true} showKicker={true} />);
    });

    it('The kicker should have the proper class for its theme', () => {
      expect(el.find('.mt3_kicker').props().className).to.equal('mt3_color--gray40 mt3_kicker');
    });
  });

  describe(':: Kicker :: No Link', () => {
    let el;
    const options = mockModel;

    before(() => {
      el = shallow(<FiveUpCard cardNum={1} key={'fiveUp-promo-1'} {...options.dataModel.components[0].stories[4]} theme={'light'} showImage={true} showKicker={false} />);
    });

    it('There should NOT be a link in the kicker', () => {
      expect(el.find('.mt3_kicker').find('a').length).to.equal(0);
    });

    it('It should have the proper markup', () => {
      expect(el.find('.mt3_kicker').html()).to.equal('<span class="mt3_color--gray40 mt3_kicker mt3_fiveup-no-kicker">Partner Content</span>');
    });
  });

  describe(':: No Kicker', () => {
    let el;
    const options = mockModel;

    before(() => {
      el = shallow(<FiveUpCard cardNum={1} key={'fiveUp-promo-1'} {...options.dataModel.components[0].stories[0]} theme={'light'} showImage={true} showKicker={false} />);
    });

    it('There should NOT be a kicker', () => {
      expect(el.find('.mt3_kicker').length).to.equal(0);
    });
  });

  describe(':: Sponsored :: No Kicker', () => {
    let el;
    const options = mockModel;

    before(() => {
      el = shallow(<FiveUpCard cardNum={1} key={'fiveUp-promo-1'} {...options.dataModel.components[0].stories[1]} theme={'light'} showImage={true} showKicker={false} />);
    });

    it('There should be a "No Kicker" class', () => {
      expect(el.find('.mt3_fiveup-no-kicker').length).to.equal(1);
    });
  });


  describe(':: No Image', () => {
    let el;
    const options = mockModel;

    before(() => {
      el = mount(
        <FiveUpCard
          cardNum={1}
          key={'fiveUp-promo-1'}
          {...options.dataModel.components[0].stories[0]}
          theme={'light'}
          showImage={false}
          showKicker={false} />);
    });

    it('The wrapping div should NOT indicate there is an image', () => {
      expect(el.find('.mt3_fiveup-card-row--has-image').length).to.equal(0);
    });
  });
});
