'use strict';

import React, { Component } from 'react';
import update from 'react/lib/update';

import Configurator from '../../../contentPackages/configurator/Configurator';
import Section from '../../../contentPackages/configurator/Section';
import SelectField from '../../../contentPackages/configurator/SelectField';
import TextField from '../../../contentPackages/configurator/TextField';
import CheckboxField from '../../../contentPackages/configurator/CheckboxField';
import ForceButton from '../../../contentPackages/configurator/ForceButton';
import { createObjectFromString } from '../../../contentPackages/configurator/utils';

import FourUpComponent from '../components/FourUp';
import FiveUpComponent from '../components/FiveUp';
import LeftAndRightContentPackageComponent from '../ContentPackage.js';

class ContentPackageConfigurator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentProps: props.initialProps
    }
  }

  updateState(stateProperty, value) {
    const newState = createObjectFromString(stateProperty, value);
    this.setState(update(this.state, { componentProps : newState }));
  }

  onTextChange(stateProperty) {
    return (event) => {
      this.updateState(stateProperty, { $set: event.target.value });
    };
  }

  onToggle(stateProperty) {
    return (event) => {
      this.updateState(stateProperty, { $set: event.target.checked });
    };
  }

  onMostReadSubHeadUpdate(stateProperty, type) {
    return (event) => {
      const value = event.target.value;
      // for now hard coding this to update the second components array. In future story when the other side of the content package is created this will need to be revisited.
      const newState = {
        dataModel: {
          components: [{
            [stateProperty]: {$set: value}
          }]
        }
      }
      this.updateSubheadState(newState);
    }
  }

  onSubHeadUpdate(stateProperty, type) {
    return (event) => {
      const value = event.target.value;
      // for now hard coding this to update the second components array. In future story when the other side of the content package is created this will need to be revisited.
      const newState = {
        dataModel: {
          components: [{}, {
            [stateProperty]: {$set: value}
          }]
        }
      }
      this.updateSubheadState(newState);
    }
  }

  updateSubheadState(newState) {
    this.setState(update(this.state, { componentProps : newState }));
  }

  render() {
    const props = this.state.componentProps;
    const ContainerComponent = <LeftAndRightContentPackageComponent theme={props.theme} initialWidth={document.getElementsByTagName('body')[0].getBoundingClientRect().width} fourUpWidth={document.getElementsByTagName('body')[0].getBoundingClientRect().width * 0.58} fourUpModel={props.dataModel.components[1]} fiveUpModel={props.dataModel.components[0]} fiveUpWidth={document.getElementsByTagName('body')[0].getBoundingClientRect().width * 0.42}/>;

    return (
        <Configurator component={ContainerComponent}>
          <Section text="General">
            <TextField label="Most Read Heading" onChange={this.onMostReadSubHeadUpdate('heading')} value={props.dataModel.components[0].heading} />

            <TextField label="Latest Heading" onChange={this.onSubHeadUpdate('heading')} value={props.dataModel.components[1].heading} />
          </Section>
          <ForceButton />
        </Configurator>
    );
  }
}

export default ContentPackageConfigurator;
