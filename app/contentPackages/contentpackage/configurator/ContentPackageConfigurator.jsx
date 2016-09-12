'use strict';

import React, { Component } from 'react';
import update from 'react/lib/update';

import Configurator from '../../../contentPackages/configurator/Configurator.jsx';
import Section from '../../../contentPackages/configurator/Section.jsx';
import SelectField from '../../../contentPackages/configurator/SelectField.jsx';
import TextField from '../../../contentPackages/configurator/TextField.jsx';
import CheckboxField from '../../../contentPackages/configurator/CheckboxField.jsx';
import ForceButton from '../../../contentPackages/configurator/ForceButton.jsx';
import { createObjectFromString } from '../../../contentPackages/configurator/utils.js';

import FourUpComponent from '../scripts/components/FourUp.jsx';

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
    const fourUpComponent = <FourUpComponent initialWidth={document.getElementsByTagName('body')[0].getBoundingClientRect().width} theme={props.theme} model={props.dataModel.components[1]} />;
    return (
        <Configurator component={fourUpComponent}>
          <Section text="General">
            <TextField label="Latest Heading" onChange={this.onSubHeadUpdate('heading')} value={props.dataModel.components[1].heading} />
          </Section>
          <ForceButton />
        </Configurator>
    );
  }
}

export default ContentPackageConfigurator;
