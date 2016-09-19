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

import HeroWithTwoRails from '../heroWithTwoRails';

class HeroWithTwoRailsConfigurator extends Component {
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

  render() {
    const props = this.state.componentProps;
    const promoComponent = <HeroWithTwoRails {...props} />;
    return (
        <Configurator component={promoComponent}>
          <Section text="General">
            <TextField label="Heading" onChange={this.onTextChange('heading')} value={props.heading} />
          </Section>

          <SelectField label="Theme" onChange={this.onTextChange('theme')} value={props.theme}>
            <option value="dark">dark</option>
            <option value="light">light</option>
          </SelectField>

          <CheckboxField label="Parallax Heading" onChange={this.onToggle('parallaxHeading')} value={props.parallaxHeading} />
          <ForceButton />
        </Configurator>
    );
  }
}

export default HeroWithTwoRailsConfigurator;
