'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import MTBroadsheet from './MTBroadsheet';

class Broadsheet extends Module {

  init() {
    const issue = this.options.endpoint.issue,
      heroImage = issue && issue.leadMedia && issue.leadMedia.length ? issue.leadMedia[0] : null;

    //component must have at least a lead image to render
    if(issue && heroImage) {
      let author,
        body = issue.body,
        heroKicker = (issue && issue.issueDate) ? issue.issueDate : null,
        heroTitle,
        heroUrl,
        photographer,
        subscribeCardProps,
        substoryProps;

      if(issue.text) {
        heroTitle = issue.text.title;
        heroUrl = issue.url;
        subscribeCardProps = issue.subscribe;
        substoryProps = issue.subStories;

        if(issue.text.contributors) {
          if(issue.text.contributors.writers && issue.text.contributors.writers.length && issue.text.contributors.writers[0].name) {
            author = issue.text.contributors.writers[0].name;
          }

          if(issue.text.contributors.photographers && issue.text.contributors.photographers.length && issue.text.contributors.photographers[0].name) {
            photographer = issue.text.contributors.photographers[0].name;
          }
        }
      }

      ReactDOM.render(<MTBroadsheet
        author = {author}
        body = {body}
        heroImage = {heroImage}
        heroKicker = {heroKicker}
        heroTitle = {heroTitle}
        heroUrl = {heroUrl}
        photographer = {photographer}
        subscribeCardProps = {subscribeCardProps}
        substoryProps = {substoryProps}
      />, this.el);
    }
  }
}

Pestle.ModuleManager.register('Broadsheet', Broadsheet);

export default Broadsheet;
