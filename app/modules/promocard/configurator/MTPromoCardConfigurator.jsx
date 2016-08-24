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

import MTPromoCard from '../scripts/MTPromoCard.jsx';

class PromoCardConfigurator extends Component {
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

  onNumberChange(stateProperty) {
    return (event) => {
      const value = Number(event.target.value);
      this.updateState(stateProperty, { $set: value });
    };
  }

  onArrayChange(stateProperty) {
    return (event) => {
      const value = event.target.value ? event.target.value.split(',') : null;
      this.updateState(stateProperty, { $set: value });
    };
  }

  onObjectChange(stateProperty) {
    return (event) => {
      let value;
      try {
        value = JSON.parse(event.target.value);
      } catch(e) { }

      this.updateState(stateProperty, { $set: value });
    };
  }

  onTextChange(stateProperty) {
    return (event) => {
      this.updateState(stateProperty, { $set: event.target.value });
    };
  }

  onLeadMediaUpdate(stateProperty, type) {
    return (event) => {
      const value = (type) ? Number(event.target.value) : event.target.value;

      const newState = {
        leadMedia: [{
          [stateProperty]: {$set: value}
        }]
      }
      this.updateMediaState(newState);
    }
  }

  onLeadMediaArrayChange(stateProperty) {
    return (event) => {
      const value = event.target.value ? event.target.value.split(',') : null;
      const newState = {
        leadMedia: [{
          [stateProperty]: {$set: value}
        }]
      }
      this.updateMediaState(newState);
    };
  }

  updateMediaState(newState) {
    this.setState(update(this.state, { componentProps : newState }));
  }

  onToggle(stateProperty) {
    return (event) => {
      this.updateState(stateProperty, { $set: event.target.checked });
    };
  }

  render() {
    const props = this.state.componentProps;
    const promoComponent = <MTPromoCard {...props} />;
    return (
        <Configurator component={promoComponent}>
          <Section text="General">
            <SelectField label="Type" onChange={this.onTextChange('type')} value={props.type}>
              <option value="article">Article</option>
              <option value="video">Video</option>
            </SelectField>
            <TextField label="Aspect Ratio" onChange={this.onTextChange('config.aspectRatio')} value={props.config.aspectRatio} />
            <CheckboxField label="Sponsored" onChange={this.onToggle('config.sponsored')} value={props.config.sponsored} />
            <TextField label="Sponsor Content Label" onChange={this.onTextChange('sponsorContentLabel')} value={props.text.sponsorContentLabel} />
            <CheckboxField label="Show Play Button" onChange={this.onToggle('config.showPlayButton')} value={props.config.showPlayButton} />
          </Section>
          <Section text="Text">
            <TextField label="Kicker" onChange={this.onTextChange('text.kicker.label')} value={props.text.kicker.label} />
            <TextField label="Kicker Url" onChange={this.onTextChange('text.kicker.url')} value={props.text.kicker.url} />
            <TextField label="Kicker Target" onChange={this.onTextChange('text.kicker.target')} value={props.text.kicker.target} />
            <TextField label="Title" onChange={this.onTextChange('text.title')} value={props.text.title} />
            <TextField label="Dek" onChange={this.onTextChange('text.dek')} value={props.text.dek} />
            {props.type === 'video' ?
            <TextField label="Duration" onChange={this.onTextChange('text.duration')} value={props.text.duration} />
            : null }
          </Section>
          {props.type === 'article' ?
          <Section text="Link">
            <TextField label="Url" onChange={this.onTextChange('link.url')} value={props.link.url} />
            <SelectField label="Target" onChange={this.onTextChange('link.target')} value={props.link.target}>
              <option value="_blank">_blank</option>
              <option value="_self">_self</option>
              <option value="_parent">_parent</option>
              <option value="_top">_top</option>
            </SelectField>
            <TextField label="trackingCodes" onChange={this.onArrayChange('link.trackingCodes')} value={props.link.trackingCodes} />
          </Section>
          : null}
          {props.type === 'article' ?
          <Section text="Lead Media">
            <TextField label="Url" onChange={this.onLeadMediaUpdate('url')} value={props.leadMedia[0].url} />
            <TextField label="Aspect Ratio" onChange={this.onLeadMediaUpdate('aspectRatio')} value={props.leadMedia[0].aspectRatio} />
            <TextField label="Alt Text" onChange={this.onLeadMediaUpdate('altText')} value={props.leadMedia[0].altText} />
            <TextField label="SrcSet" onChange={this.onLeadMediaArrayChange('srcset')} value={props.leadMedia[0].srcset} />
          </Section>
          : null}
          {props.type === 'video' ?
          <Section text="Lead Media">
            <TextField label="Guid" onChange={this.onLeadMediaUpdate('guid')} value={props.leadMedia[0].guid} />
            <TextField label="Video Url" onChange={this.onLeadMediaUpdate('videoUrl')} value={props.leadMedia[0].videoUrl} />
            <TextField label="Image Url" onChange={this.onLeadMediaUpdate('imageUrl')} value={props.leadMedia[0].imageUrl} />
            <TextField label="Rendition Url" onChange={this.onLeadMediaUpdate('renditionUrl')} value={props.leadMedia[0].renditionUrl} />
          </Section>
          : null}
          <ForceButton />
        </Configurator>
    );
  }
}

export default PromoCardConfigurator;
