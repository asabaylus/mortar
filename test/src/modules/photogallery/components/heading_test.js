'use strict';

import React from 'react';
import {shallow, mount} from 'enzyme';
import Heading from '../../../../../src/modules/photogallery/components/Heading';

describe('Heading Component', () => {
  let wrapper;

  describe('React Component', () => {
    before(() => {
      wrapper = shallow(<Heading
        description="This is a description of this gallery"
        title="This is a wonderful title for this gallery"
      />);
    });

    it('Should have a container', () => {
      expect(wrapper.find('.mt3_photogallery-heading').type()).to.equal("div");
    });

    it('Should have a title with appropriate class', () => {
      expect(wrapper.find('.mt3_photogallery-heading').childAt(0).props().className).to.equal("mt3_h3 mt3_color--gray80");
    });

    it('Title should contain text', () => {
      expect(wrapper.find('.mt3_photogallery-heading').childAt(0).props().children).to.equal("This is a wonderful title for this gallery");
    });

    it('Should have a description with appropriate class', () => {
      expect(wrapper.find('.mt3_photogallery-heading').childAt(1).props().className).to.equal("mt3_subh4 mt3_color--gray80");
    });

    it('Description should have class', () => {
      expect(wrapper.find('.mt3_photogallery-heading').childAt(1).props().children).to.equal("This is a description of this gallery");
    });

  });

});
