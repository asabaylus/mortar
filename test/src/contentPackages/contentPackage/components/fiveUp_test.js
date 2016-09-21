'use strict';

import FiveUpComponent from '../../../../../src/contentPackages/contentpackage/components/FiveUp';
import mockModel from './testData';
import {shallow} from 'enzyme';
import React from 'react';

describe('FiveUp Component', () => {
  let el;
  const options = mockModel;

  before(() => {
    el = shallow(<FiveUpComponent
        theme={options.theme}
        model={options.dataModel.components[0]}
    />);
  });

  it('FiveUp div should be rendered with expected class', () => {
    expect(el.props().children.props.className).to.equal("mt3_fiveup");
  });

  it('Heading should be rendered and display provided text', () => {
    expect(el.childAt(0).childAt(0).html()).to.equal(`<div class="mt3_left-and-right-package-header">Most Read</div>`);
  });

  it('Expect there to be 5 Card components', () => {
    expect(el.find("FiveUpCard")).to.have.length(5);
  });

  it('First Card should have the proper type', () => {
    const firstPromoCard = el.find("FiveUpCard").first();
    expect(firstPromoCard.props().type).to.equal("article");
  });

  it('First Promo Card\'s Lead Media should have the proper aspect ratio', () => {
    const firstPromoCard = el.find("FiveUpCard").first();
    expect(firstPromoCard.props().leadMedia[0].aspectRatio).to.equal(0.48245614035088);
  });

  it('First Promo Card\'s config should have the proper aspect ratio', () => {
    const firstPromoCard = el.find("FiveUpCard").first();
    expect(firstPromoCard.props().config.aspectRatio).to.equal("16:9");
  });

  it('The Second Promo Card should have the proper title', () => {
    const secondPromoCard = el.find("FiveUpCard").nodes[1];
    expect(secondPromoCard.props.text.title).to.equal("Photo Gallery Test Ipsum");
  });


});
