'use strict';

import PackageContainer from '../../../../src/contentPackages/contentpackage/ContentPackage';
import mockModel from './components/testData';
import {shallow} from 'enzyme';
import React from 'react';

describe('Content Package Component', () => {

  describe(':: Default', () => {
    let el;
    const options = mockModel;

      before(() => {
        el = shallow(<PackageContainer
            theme={options.theme}
            initialWidth={"1200"}
            fourUpWidth={"400"}
            fourUpModel={options.dataModel.components[1]}
            fiveUpWidth={"500"}
            fiveUpModel={options.dataModel.components[0]}
            parallaxRails={false}
            parentEl={el}
        />);
      });

      it('The Content Package Component should have the proper wrapping className', () => {
        expect(el.props().className).to.equal("mt3_left-and-right-package__portal-wrap");
      });

      it('The Content Package Component should have two children', () => {
        expect(el.props().children.length).to.equal(2);
      });

      it('The first child should have the key "fourUpWrapper"', () => {
        expect(el.props().children[0].key).to.equal('fourUpWrapper');
      });

      it('The first child should have the proper heading', () => {
        expect(el.props().children[0].props.children.props.model.heading).to.equal('The Latest');
      });

      it('The first child should have the proper id', () => {
        expect(el.props().children[0].props.children.props.model.itemId).to.equal('rr_theLatest');
      });

      it('The first child should have the proper number of stories', () => {
        expect(el.props().children[0].props.children.props.model.stories.length).to.equal(6);
      });

      it('The second child should have the key "fiveUpWrapper"', () => {
        expect(el.props().children[1].key).to.equal('fiveUpWrapper');
      });

      it('The second child should have the proper heading', () => {
        expect(el.props().children[1].props.children.props.model.heading).to.equal('Most Read');
      });

      it('The second child should have the proper id', () => {
        expect(el.props().children[1].props.children.props.model.itemId).to.equal('lr_mostRead');
      });

      it('The second child should have the proper number of stories', () => {
        expect(el.props().children[1].props.children.props.model.stories.length).to.equal(5);
      });

  });

});
