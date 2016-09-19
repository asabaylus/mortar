'use strict';

import React, { Component } from 'react';
import update from 'react/lib/update';

import Configurator from '../../../contentPackages/configurator/Configurator';
import Section from '../../../contentPackages/configurator/Section';
import TextField from '../../../contentPackages/configurator/TextField';
import TextArea from '../../../contentPackages/configurator/TextArea';
import CheckboxField from '../../../contentPackages/configurator/CheckboxField';
import ForceButton from '../../../contentPackages/configurator/ForceButton';
import { createObjectFromString } from '../../../contentPackages/configurator/utils.js';

import VideoPlaylist from '../VideoPlaylist';

class VideoPlaylistConfigurator extends Component {

  constructor(props) {
    super(props);
    this.state = {
      componentProps: props.initialProps
    };
  }

  updateState(stateProperty, value) {
    const newState = createObjectFromString(stateProperty, value);
    this.setState(update(this.state, { componentProps: newState }));
  }

  onToggle(stateProperty) {
    return (event) => {
      this.updateState(stateProperty, { $set: event.target.checked });
    };
  }

  onEndpointChange(stateProperty) {
    return (event) => {
      const { value } = event.target;
      this.updateState(stateProperty, {$set: value});
      this.getDataModel(value);

    }
  }

  onTextChange(stateProperty) {
    return (event) => {
      this.updateState(stateProperty, { $set: event.target.value });
      this.setState({
        items: JSON.parse(event.target.value)
      });
    };
  }

  componentWillMount() {
    this.getDataModel(this.state.componentProps.endpoint);
  }

  getDataModel(endpoint) {
    const rqs = new XMLHttpRequest();
    rqs.open('GET', endpoint);
    rqs.onload = this.onLoadVideoPlaylistModel.bind(this);
    rqs.onerror = () => {
      this.setState({items: JSON.parse(this.props.initialProps.dataModel) });
    };
    rqs.send();
  }

  onLoadVideoPlaylistModel(response) {
    let items;
    if (response.target.status >= 200 && response.target.status < 400) {
      try {
        items = JSON.parse(response.target.responseText);
      } catch (e) {
        items = JSON.parse(this.props.initialProps.dataModel);
      }

    } else {
      items = JSON.parse(this.props.initialProps.dataModel);
    }
    this.setState({items});
  }

  render() {
    const props = this.state.componentProps;
    const component = this.state.items ?
      <VideoPlaylist
        autoContinue={props.autoContinue}
        divID={props.divID}
        dataModel={this.state.items}
      />
      :
      <div>Loading...</div>

    return (
      <Configurator component={component}>
        <Section text="Data">
          <TextField label="Endpoint" onChange={this.onEndpointChange('endpoint')} value={props.endpoint} />
          <TextArea label="JSON Data" onChange={this.onTextChange('dataModel')} value={props.dataModel} />
        </Section>
        <Section text="Behavior">
          <CheckboxField label="Autocontinue" onChange={this.onToggle('autoContinue')} value={props.autoContinue} />
        </Section>
        <ForceButton />
      </Configurator>
    );
  }
}

export default VideoPlaylistConfigurator;

