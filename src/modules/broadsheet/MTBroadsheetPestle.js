'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import MTBroadsheet from './MTBroadsheet';

class Broadsheet extends Module {

  init() {
    const issue = this.options.endpoint.issue;

    ReactDOM.render(<MTBroadsheet
      coverImage={issue.subscribe.image.imageUrl}
      issueUrl={issue.url}
      issueDate={issue.text.kicker.label}
      mainAuthor={issue.text.contributors.writers[0].name}
      mainBody={issue.body}
      mainPhotographer={issue.text.contributors.photographers[0].name}
      mainTitle={issue.text.title}
      mainUrl={issue.text.kicker.url}
      leadMedia={issue.leadMedia[0]}
      subStoryHeading={issue.subStories.heading}
      subStories={issue.subStories.stories}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Broadsheet', Broadsheet);

export default Broadsheet;
