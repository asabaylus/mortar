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

import MTPromoCard from '../MTPromoCard';

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

  onLeadMediaUpdate(stateProperty, type, index) {
    return (event) => {
      const value = (type) ? Number(event.target.value) : event.target.value;
      const image = index === 0 ? [{[stateProperty]: {$set: value}}] : [{},{[stateProperty]: {$set: value}}];
      const newState = {
        leadMedia: image
      };
      this.setState(update(this.state, { componentProps : newState }));
    }
  }

  onLeadMediaArrayChange(stateProperty, index) {
    return (event) => {
      const value = event.target.value ? event.target.value.split(',') : null;
      const image = index === 0 ? [{[stateProperty]: {$set: value}}] : [{},{[stateProperty]: {$set: value}}];
      const newState = {
        leadMedia: image
      };
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
              <option value="gallery">Gallery</option>
            </SelectField>
            <SelectField label="Aspect Ratio" onChange={this.onTextChange('config.aspectRatio')} value={props.config.aspectRatio}>
              <option value="3:2">3:2</option>
              <option value="1:1">1:1</option>
              <option value="2:1">2:1</option>
              <option value="16:9">16:9</option>
            </SelectField>
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
          {props.type === 'article' || props.type === 'gallery' ?
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
              <TextField label="Url" onChange={this.onLeadMediaUpdate('url', null, 0)} value={props.leadMedia[0].url} />
              <TextField label="Aspect Ratio" onChange={this.onLeadMediaUpdate('aspectRatio', 'number', 0)} value={props.leadMedia[0].aspectRatio} />
              <TextField label="Alt Text" onChange={this.onLeadMediaUpdate('altText', null, 0)} value={props.leadMedia[0].altText} />
              <TextField label="SrcSet" onChange={this.onLeadMediaArrayChange('srcset', 0)} value={props.leadMedia[0].srcset} />
            </Section>
          : null}
          {props.type === 'video' ?
            <Section text="Lead Media">
              <TextField label="Guid" onChange={this.onLeadMediaUpdate('guid', null, 0)} value={props.leadMedia[0].guid} />
              <TextField label="Video Url" onChange={this.onLeadMediaUpdate('videoUrl', null, 0)} value={props.leadMedia[0].videoUrl} />
              <TextField label="Image Url" onChange={this.onLeadMediaUpdate('imageUrl', null, 0)} value={props.leadMedia[0].imageUrl} />
              <TextField label="Rendition Url" onChange={this.onLeadMediaUpdate('renditionUrl', null, 0)} value={props.leadMedia[0].renditionUrl} />
            </Section>
          : null}
          {props.type === 'gallery' ?
            <Section text="Lead Media">
              <Section text="Image 1">
                <TextField label="Url" onChange={this.onLeadMediaUpdate('url', null, 0)} value={props.leadMedia[0].url} />
                <TextField label="Aspect Ratio" onChange={this.onLeadMediaUpdate('aspectRatio', 'number', 0)} value={props.leadMedia[0].aspectRatio} />
                <TextField label="Alt Text" onChange={this.onLeadMediaUpdate('altText', null, 0)} value={props.leadMedia[0].altText} />
                <TextField label="SrcSet" onChange={this.onLeadMediaArrayChange('srcset', 0)} value={props.leadMedia[0].srcset} />
              </Section>
              <Section text="Image 2">
                <TextField label="Url" onChange={this.onLeadMediaUpdate('url', null, 1)} value={props.leadMedia[1].url} />
                <TextField label="Aspect Ratio" onChange={this.onLeadMediaUpdate('aspectRatio', 'number', 1)} value={props.leadMedia[1].aspectRatio} />
                <TextField label="Alt Text" onChange={this.onLeadMediaUpdate('altText', null, 1)} value={props.leadMedia[1].altText} />
                <TextField label="SrcSet" onChange={this.onLeadMediaArrayChange('srcset', 1)} value={props.leadMedia[1].srcset} />
              </Section>
            </Section>
            : null}
          <ForceButton />
        </Configurator>
    );
  }
}

export default PromoCardConfigurator;
