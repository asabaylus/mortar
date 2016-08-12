'use strict';

import React from 'react';
import {shallow, mount} from 'enzyme';
import HelloWorld from '../../../../app/contentPackages/helloWorld/helloWorld.jsx';

describe('Content Package - Hello World', () => {
  describe('structure', () => {
    let wrapper,
        promo;

    before(() => {
      const props = {
        title: 'Test Title',
        image: {
          url: 'http://http://placehold.it/200x200',
          position: 'left',
          height: 200
        }
      };
      wrapper = mount(<HelloWorld {...props} />);
      promo = wrapper.find('MTPromoCard');
    });

    it('should render a PromoCard', () => {
      expect(promo).to.have.length(1);
    });

    it('should pass title to PromoCard', () => {
      const props = promo.props();
      expect(props.title).to.have.exist;
    });

    it('should pass image object to PromoCard', () => {
      const props = promo.props();
      expect(props.image).to.have.exist;
    });

    it('should pass image url to PromoCard', () => {
      const props = promo.props();
      expect(props.image.url).to.have.exist;
    });

    it('should pass image position to PromoCard', () => {
      const props = promo.props();
      expect(props.image.position).to.have.exist;
    });

    it('should pass image height to PromoCard', () => {
      const props = promo.props();
      expect(props.image.height).to.have.exist;
    });
  });
});
