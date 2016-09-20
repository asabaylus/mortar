'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Pestle, Module} from '@natgeo/pestle';
import MTBroadsheet from './MTBroadsheet';

class Broadsheet extends Module {

  init() {
    ReactDOM.render(<MTBroadsheet
      heroAttributon={this.options.heroAttributon}
      heroCaption={this.options.heroCaption}
      heroImage={this.options.heroImage}
      issueDate={this.options.issueDate}
      issueUrl={this.options.issueUrl}
      mainAuthor={this.options.mainAuthor}
      mainAbstract={this.options.mainAbstract}
      mainPhotographer={this.options.mainPhotographer}
      mainTitle={this.options.mainTitle}
      mainUrl={this.options.mainUrl}
      sidebarItems={this.options.sidebarItems}
    />, this.el);
  }
}

Pestle.ModuleManager.register('Broadsheet', Broadsheet);

export default Broadsheet;
