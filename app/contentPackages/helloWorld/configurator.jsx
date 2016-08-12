'use strict';

import React, { Component } from 'react';
import update from 'react/lib/update';
import Configurator from '../configurator/Configurator.jsx';
import { createObjectFromString } from '../configurator/utils.js';
import SelectField from '../configurator/SelectField.jsx';
import TextField from '../configurator/TextField.jsx';
import HelloWorld from './helloWorld.jsx';

class HelloWorldConfigurator extends Component {
  constructor(props) {
    super(props);
    this.state = props.initialProps;

    this.onChange = ::this.onChange;
  }

  onChange(stateProperty) {
    return (event) => {
      const newState = createObjectFromString(stateProperty, { $set: event.target.value });
      this.setState(update(this.state, newState));
    };
  }

  render() {
    const helloComponent = <HelloWorld {...this.state} />;
    return (
        <Configurator component={helloComponent}>
          <TextField label="Title" onChange={this.onChange('title')} value={this.state.title} />
          <TextField label="Image Url" onChange={this.onChange('image.url')} value={this.state.image.url} />
          <TextField label="Image Height" onChange={this.onChange('image.height')} value={this.state.image.height} />
          <SelectField label="Image Position" onChange={this.onChange('image.position')} value={this.state.image.position}>
            <option value="above">Above</option>
            <option value="below">Below</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
          </SelectField>
        </Configurator>
    );
  }
}

export default HelloWorldConfigurator;
