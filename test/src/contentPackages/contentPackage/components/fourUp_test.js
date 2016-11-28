'use strict';

import {shallow} from 'enzyme';
import React from 'react';

import mockModel from './testData';
import FourUpComponent from '../../../../../src/contentPackages/contentpackage/components/FourUp';


describe('FourUp Component', () => {
  let el;
  const options = mockModel;

  before(() => {
    el = shallow(<FourUpComponent
        theme={options.theme}
        model={options.dataModel.components[1]}
    />);
  });

  it('FourUp div should be rendered with expected class', () => {
    expect(el.props().children.props.className).to.equal("mt3_fourup");
  });

  it('Heading should be rendered and display provided text', () => {
    expect(el.childAt(0).childAt(0).html()).to.equal(`<div class="mt3_left-and-right-package-header">The Latest</div>`);
  });

  it('Expect there to be 4 Promo Card components', () => {
    expect(el.find("MTPromoCard")).to.have.length(4);
  });

  it('First Promo Card should have the proper type', () => {
    const firstPromoCard = el.find("MTPromoCard").first();
    expect(firstPromoCard.props().type).to.equal("article");
  });

  it('First Promo Card\'s Lead Media should have the proper aspect ratio', () => {
    const firstPromoCard = el.find("MTPromoCard").first();
    expect(firstPromoCard.props().leadMedia[0].aspectRatio).to.equal(0.66666666666667);
  });

  it('First Promo Card\'s config should have the proper aspect ratio', () => {
    const firstPromoCard = el.find("MTPromoCard").first();
    expect(firstPromoCard.props().config.cardAspectRatio).to.equal("3:2");
  });

  it('The Second Promo Card\'s config should have the proper aspect ratio', () => {
    const secondPromoCard = el.find("MTPromoCard").nodes[1];
    expect(secondPromoCard.props.config.cardAspectRatio).to.equal("16:9");
  });

  it('The Second Promo Card should have the proper title', () => {
    const secondPromoCard = el.find("MTPromoCard").nodes[1];
    expect(secondPromoCard.props.text.title).to.equal("How to Explore the Pantanal");
  });


});
