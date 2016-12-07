'use strict';

import React from 'react';
import update from 'react/lib/update';

import Configurator from '../../../contentPackages/configurator/Configurator';
import Section from '../../../contentPackages/configurator/Section';
import SelectField from '../../../contentPackages/configurator/SelectField';
import TextField from '../../../contentPackages/configurator/TextField';
import CheckboxField from '../../../contentPackages/configurator/CheckboxField';
import ForceButton from '../../../contentPackages/configurator/ForceButton';
import { createObjectFromString } from '../../../contentPackages/configurator/utils';
import MTPodPromo from '../PodPromo';


export default class PodPromoConfigurator extends React.Component {
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

  onBoolChange(stateProperty) {
    return (event) => {
      let value = event.target.value === 'true';
      this.updateState(stateProperty, { $set: value });
    };
  }


  onLeadMediaUpdate(stateProperty, type) {
    return (event) => {
      const value = (type) ? Number(event.target.value) : event.target.value;

      const newState = {
        model: {
          leadMedia: [{
            [stateProperty]: {$set: value}
          }]
        }
      }
      this.updateMediaState(newState);
    }
  }

  onToggle(stateProperty) {
    return (event) => {
      this.updateState(stateProperty, { $set: event.target.checked });
    };
  }

  onLeadMediaArrayChange(stateProperty) {
    return (event) => {
      const value = event.target.value ? event.target.value.split(',') : null;
      const newState = {
        model: {
          leadMedia: [{
            [stateProperty]: {$set: value}
          }]
        }
      }
      this.updateMediaState(newState);
    };
  }

  updateMediaState(newState) {
    this.setState(update(this.state, { componentProps : newState }));
  }

  render() {
    const props = this.state.componentProps;
    const promoComponent = <MTPodPromo {...props} />;
    return (
        <Configurator component={promoComponent}>
          <Section text="Text">
            <TextField label="Heading" onChange={this.onTextChange('model.text.brandingBadge')} value={props.model.text.brandingBadge} />
            <TextField label="Title" onChange={this.onTextChange('model.text.title')} value={props.model.text.title} />
          </Section>
          <Section text="Sponsor">
            <SelectField label="Sponsored" onChange={this.onBoolChange('model.config.sponsored')} value={props.model.config.sponsored}>
              <option value="true">True</option>
              <option value="false">False</option>
            </SelectField>
            <TextField label="Sponsor Label" onChange={this.onTextChange('model.text.sponsorContentLabel')} value={props.model.text.sponsorContentLabel} />
          </Section>

          <Section text="Kicker">
            <TextField label="Kicker Label" onChange={this.onTextChange('model.text.kicker.label')} value={props.model.text.kicker.label} />
          </Section>
          <Section text="Link">
            <TextField label="Url" onChange={this.onTextChange('model.link.url')} value={props.model.link.url} />
            <SelectField label="Target" onChange={this.onTextChange('model.link.target')} value={props.model.link.target}>
              <option value="_blank">_blank</option>
              <option value="_self">_self</option>
              <option value="_parent">_parent</option>
              <option value="_top">_top</option>
            </SelectField>
            <TextField label="trackingCodes" onChange={this.onArrayChange('model.link.trackingCodes')} value={props.model.link.trackingCodes} />
          </Section>
          <Section text="Lead Media">
            <TextField label="Image Url" onChange={this.onLeadMediaUpdate('imageUrl')} value={props.model.leadMedia[0].imageUrl} />
            <TextField label="Aspect Ratio" onChange={this.onLeadMediaUpdate('aspectRatio', 'number')} value={props.model.leadMedia[0].aspectRatio} />
            <TextField label="Alt Text" onChange={this.onLeadMediaUpdate('altText')} value={props.model.leadMedia[0].altText} />
            <TextField label="Photo Credit" onChange={this.onTextChange('model.text.credit')} value={props.model.text.credit} />
            <TextField label="Photo Source" onChange={this.onTextChange('model.text.assetSource')} value={props.model.text.assetSource} />
            <TextField label="SrcSet" onChange={this.onLeadMediaArrayChange('srcset')} value={props.model.leadMedia[0].srcset} />
          </Section>
          <Section text="CTA">
            <TextField label="Url" onChange={this.onTextChange('model.cta.linkUrl')} value={props.model.cta.linkUrl} />
            <TextField label="Title" onChange={this.onTextChange('model.cta.linkText')} value={props.model.cta.linkText} />
            <SelectField label="Target" onChange={this.onTextChange('model.cta.linkTarget')} value={props.model.cta.linkTarget}>
              <option value="_blank">_blank</option>
              <option value="_self">_self</option>
              <option value="_parent">_parent</option>
              <option value="_top">_top</option>
            </SelectField>
            <TextField label="Seo Title" onChange={this.onTextChange('model.cta.linkSeoTitle')} value={props.model.cta.linkSeoTitle} />
          </Section>
          <ForceButton />
        </Configurator>
    );
  }
}
